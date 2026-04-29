import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp, REFERRAL_RATE_LIMIT } from '@/lib/rate-limit'
import { validateHoneypotServer, type HoneypotServerData } from '@/lib/honeypot'
import { checkSuspiciousEmail } from '@/lib/email-validation'
import { checkIPHub } from '@/lib/ip-check'
import { sendBlockedSubmissionNotification, sendFormSubmissionNotification } from '@/lib/slack'
import { ReferralToFriendEmail } from '@/emails/referral-to-friend'
import { ReferralConfirmationEmail } from '@/emails/referral-confirmation'
import { SpamAlertEmail } from '@/emails/spam-alert'

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(key)
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Fire-and-forget spam alert email + Slack notification */
function alertSpam(
  reason: Parameters<typeof sendBlockedSubmissionNotification>[0]['reason'],
  ip: string,
  details: string,
  email?: string,
): void {
  const notifyTo = process.env.RESEND_NOTIFY_EMAIL || 'careers@riseawake.com'
  const emailFrom = process.env.RESEND_FROM_EMAIL || 'RISE <hello@riseawake.com>'
  const timestamp = new Date().toISOString()

  // Spam alert email (best-effort)
  try {
    const resend = getResendClient()
    resend.emails.send({
    from: emailFrom,
    to: notifyTo,
    subject: `[SPAM] Blocked referral — ${reason}`,
    react: SpamAlertEmail({
      formType: 'Referral',
      blockReason: reason,
      ip,
      details,
      email,
      timestamp,
    }),
  }).catch((err) => console.error('[refer] Spam alert email failed:', err))
  } catch { /* RESEND_API_KEY missing — skip alert */ }

  // Slack notification (best-effort)
  sendBlockedSubmissionNotification({
    formType: 'Referral',
    reason,
    ip,
    details,
    email,
  }).catch((err) => console.error('[refer] Slack notification failed:', err))
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()

    // ─── Rate limiting ──────────────────────────────────────────────
    const ip = getClientIp(request)
    const rateResult = checkRateLimit(ip, REFERRAL_RATE_LIMIT)

    if (!rateResult.allowed) {
      alertSpam('rate_limit', ip, `Exceeded ${REFERRAL_RATE_LIMIT.maxRequests} referrals in 24h`)
      return NextResponse.json(
        { error: 'Too many referrals. Please try again later.' },
        { status: 429 },
      )
    }

    // ─── Honeypot validation ────────────────────────────────────────
    const honeypotData: HoneypotServerData = {
      website: json.website,
      confirmEmail: json.confirmEmail,
      phoneNumber: json.phoneNumber,
      companyName: json.companyName,
      newsletterOptIn: json.newsletterOptIn,
      submitTime: json.submitTime,
    }
    const honeypotResult = validateHoneypotServer(honeypotData)

    if (honeypotResult.triggered) {
      alertSpam('honeypot', ip, honeypotResult.reason ?? 'Honeypot triggered')
      // Silent success — don't tip off bots
      return NextResponse.json({ success: true })
    }

    // ─── IPHub geo-blocking ─────────────────────────────────────────
    const ipCheck = await checkIPHub(ip)

    if (!ipCheck.allowed) {
      const reason = ipCheck.reason === 'manually_blocked' ? 'iphub_manually_blocked' : 'iphub_proxy'
      alertSpam(reason, ip, `${ipCheck.reason} — ISP: ${ipCheck.data?.isp ?? 'unknown'}, Country: ${ipCheck.data?.countryCode ?? 'unknown'}`)
      // Silent success
      return NextResponse.json({ success: true })
    }

    // ─── Extract and validate fields ────────────────────────────────
    const senderName = typeof json.senderName === 'string' ? json.senderName.trim() : ''
    const senderEmail = typeof json.senderEmail === 'string' ? json.senderEmail.trim().toLowerCase() : ''
    const friendName = typeof json.friendName === 'string' ? json.friendName.trim() : ''
    const friendEmail = typeof json.friendEmail === 'string' ? json.friendEmail.trim().toLowerCase() : ''

    if (!senderName || !senderEmail || !friendName || !friendEmail) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      )
    }

    if (senderName.length > 100 || friendName.length > 100) {
      return NextResponse.json(
        { error: 'Name is too long.' },
        { status: 400 },
      )
    }

    if (!EMAIL_REGEX.test(senderEmail) || !EMAIL_REGEX.test(friendEmail)) {
      return NextResponse.json(
        { error: 'Please enter valid email addresses.' },
        { status: 400 },
      )
    }

    if (senderEmail === friendEmail) {
      return NextResponse.json(
        { error: 'You cannot refer yourself.' },
        { status: 400 },
      )
    }

    // ─── Suspicious email detection ─────────────────────────────────
    const senderCheck = checkSuspiciousEmail(senderEmail)
    if (senderCheck.suspicious) {
      alertSpam('suspicious_email', ip, senderCheck.reason ?? 'Suspicious sender email', senderEmail)
      return NextResponse.json({ success: true })
    }

    const friendCheck = checkSuspiciousEmail(friendEmail)
    if (friendCheck.suspicious) {
      alertSpam('suspicious_email', ip, friendCheck.reason ?? 'Suspicious friend email', friendEmail)
      return NextResponse.json({ success: true })
    }

    // ─── Send emails ────────────────────────────────────────────────
    const emailFrom = process.env.RESEND_FROM_EMAIL || 'RISE <hello@riseawake.com>'
    const resend = getResendClient()

    // Email to the friend
    try {
      await resend.emails.send({
        from: emailFrom,
        to: friendEmail,
        subject: `${senderName} thinks you should see this`,
        react: ReferralToFriendEmail({
          friendName,
          senderName,
          senderEmail,
        }),
      })
    } catch (emailErr) {
      console.error('[refer] Friend email failed:', emailErr)
      return NextResponse.json(
        { error: 'Failed to send referral. Please try again.' },
        { status: 500 },
      )
    }

    // Confirmation to the sender (best-effort)
    try {
      await resend.emails.send({
        from: emailFrom,
        to: senderEmail,
        subject: `Your referral to ${friendName} has been sent`,
        react: ReferralConfirmationEmail({
          senderName,
          friendName,
          friendEmail,
        }),
      })
    } catch (emailErr) {
      console.error('[refer] Confirmation email failed:', emailErr)
    }

    // Slack notification for successful referral (best-effort)
    sendFormSubmissionNotification({
      formType: 'Referral',
      fields: {
        'From': `${senderName} (${senderEmail})`,
        'To': `${friendName} (${friendEmail})`,
        'IP': ip,
      },
    }).catch((err) => console.error('[refer] Slack success notification failed:', err))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[refer] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
