/**
 * Quick test script to send both email templates via Resend.
 * Usage: npx tsx scripts/test-emails.tsx
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { Resend } from 'resend'
import { ApplicationConfirmationEmail } from '../src/emails/application-confirmation'
import { ApplicationNotificationEmail } from '../src/emails/application-notification'

const resend = new Resend(process.env.RESEND_API_KEY!)
const emailFrom =
  process.env.RESEND_FROM_EMAIL || 'RISE Awake <careers@riseawake.com>'

const TEST_RECIPIENT = 'arndvs@gmail.com'

async function main() {
  const submittedAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  console.log('Sending confirmation email to', TEST_RECIPIENT, '...')
  const { data: confData, error: confError } = await resend.emails.send({
    from: emailFrom,
    to: TEST_RECIPIENT,
    subject: 'Application received — Senior Frontend Engineer',
    react: ApplicationConfirmationEmail({
      firstName: 'Aaron',
      roleTitle: 'Senior Frontend Engineer',
      roleId: 'sr-frontend-eng',
      submittedAt,
    }),
  })

  if (confError) {
    console.error('Confirmation email FAILED:', confError)
  } else {
    console.log('Confirmation email sent:', confData?.id)
  }

  console.log('\nSending notification email to', TEST_RECIPIENT, '...')
  const { data: notifData, error: notifError } = await resend.emails.send({
    from: emailFrom,
    to: TEST_RECIPIENT,
    subject: 'New application: Aaron Test — Senior Frontend Engineer',
    react: ApplicationNotificationEmail({
      firstName: 'Aaron',
      lastName: 'Test',
      email: TEST_RECIPIENT,
      phone: '(555) 123-4567',
      roleTitle: 'Senior Frontend Engineer',
      roleId: 'sr-frontend-eng',
      experienceLevel: 'Senior (5+ years)',
      availability: 'Immediately',
      whyJoinRise:
        'I believe in building technology that elevates human potential. RISE Awake aligns with my passion for purpose-driven engineering.',
      hasResume: true,
      resumeFileName: 'aaron-test-resume.pdf',
      submittedAt,
      ipAddress: '127.0.0.1',
    }),
  })

  if (notifError) {
    console.error('Notification email FAILED:', notifError)
  } else {
    console.log('Notification email sent:', notifData?.id)
  }

  console.log('\nDone.')
}

main().catch(console.error)
