/**
 * Slack webhook notifications — ported from AlignSD
 *
 * Sends structured notifications to Slack via incoming webhooks.
 * Falls back to console.log in dev or when no webhook URL is configured.
 */

interface SlackField {
  title: string
  value: string
  short: boolean
}

interface SlackAttachment {
  color: string
  title: string
  fields: SlackField[]
  footer: string
  ts: number
}

interface SlackPayload {
  channel: string
  username: string
  icon_emoji: string
  text: string
  attachments: SlackAttachment[]
}

// ── Core sender ──────────────────────────────────────────────────────────────

async function sendWebhook(payload: SlackPayload): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[slack] No webhook URL configured. Payload:', JSON.stringify(payload, null, 2))
    }
    return
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[slack] Webhook failed:', response.status, await response.text())
    }
  } catch (err) {
    console.error('[slack] Webhook error:', err)
  }
}

// ── Blocked submission notification ──────────────────────────────────────────

export type BlockReason =
  | 'rate_limit'
  | 'honeypot'
  | 'iphub_proxy'
  | 'iphub_manually_blocked'
  | 'suspicious_email'
  | 'spam_detected'

interface BlockedSubmissionData {
  formType: string
  reason: BlockReason
  ip: string
  details: string
  email?: string
}

const BLOCK_REASON_LABELS: Record<BlockReason, string> = {
  rate_limit: 'Rate Limited',
  honeypot: 'Honeypot Triggered',
  iphub_proxy: 'Proxy/VPN Detected',
  iphub_manually_blocked: 'Manually Blocked IP',
  suspicious_email: 'Suspicious Email',
  spam_detected: 'Spam Detected',
}

export async function sendBlockedSubmissionNotification(data: BlockedSubmissionData): Promise<void> {
  const channel = process.env.SLACK_SECURITY_CHANNEL || process.env.SLACK_NOTIFICATION_CHANNEL || '#notifications'

  const fields: SlackField[] = [
    { title: 'Form', value: data.formType, short: true },
    { title: 'Block Reason', value: BLOCK_REASON_LABELS[data.reason], short: true },
    { title: 'IP Address', value: data.ip, short: true },
    { title: 'Details', value: data.details, short: false },
  ]

  if (data.email) {
    fields.push({ title: 'Email', value: data.email, short: true })
  }

  await sendWebhook({
    channel,
    username: 'RISE Security',
    icon_emoji: ':shield:',
    text: `🚫 Blocked submission on ${data.formType}`,
    attachments: [
      {
        color: '#dc2626',
        title: `🚫 Blocked: ${BLOCK_REASON_LABELS[data.reason]}`,
        fields,
        footer: 'RISE Spam Prevention',
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  })
}

// ── Form submission notification (successful) ────────────────────────────────

interface FormSubmissionData {
  formType: string
  fields: Record<string, string>
}

export async function sendFormSubmissionNotification(data: FormSubmissionData): Promise<void> {
  const channel = process.env.SLACK_NOTIFICATION_CHANNEL || '#notifications'

  const fields: SlackField[] = Object.entries(data.fields).map(([title, value]) => ({
    title,
    value,
    short: title.length < 20,
  }))

  await sendWebhook({
    channel,
    username: 'RISE',
    icon_emoji: ':sunrise:',
    text: `📬 New ${data.formType} submission`,
    attachments: [
      {
        color: '#0A6B5A',
        title: `📬 New ${data.formType}`,
        fields,
        footer: 'RISE',
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  })
}
