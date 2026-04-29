import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from 'react-email'

interface SpamAlertEmailProps {
  formType: string
  blockReason: string
  ip: string
  details: string
  email?: string
  timestamp: string
}

export function SpamAlertEmail({
  formType = 'Referral',
  blockReason = 'honeypot',
  ip = '0.0.0.0',
  details = '',
  email,
  timestamp = new Date().toISOString(),
}: SpamAlertEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Blocked {formType} submission — {blockReason}
      </Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                'rise-brand': '#0A6B5A',
                'rise-dark': '#1D1D1F',
                'rise-gray': '#6E6E73',
                'rise-bg': '#FAFAFA',
                'rise-surface': '#FFFFFF',
                'rise-edge': 'rgb(0 0 0 / 0.08)',
                'rise-danger': '#dc2626',
              },
            },
          },
        }}
      >
        <Body className="mx-auto bg-rise-bg font-sans">
          <Container className="mx-auto max-w-140 px-4 py-8">
            {/* Header */}
            <Section className="mb-8 text-center">
              <Text className="text-[11px] font-semibold tracking-[0.2em] text-rise-brand">
                RISE AWAKE
              </Text>
            </Section>

            <Section className="rounded-xl border border-rise-edge bg-rise-surface p-8">
              <Heading
                as="h1"
                className="mb-2 text-xl font-bold text-rise-danger"
              >
                Spam Submission Blocked
              </Heading>

              <Text className="mb-6 text-sm text-rise-gray">
                A {formType.toLowerCase()} form submission was automatically blocked.
                No emails were sent to the target. Review the details below.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              {/* Block Details */}
              <Section className="mb-4 rounded-lg border border-rise-danger/20 bg-rise-danger/5 p-4">
                <Text className="mb-1 text-xs font-semibold tracking-wider text-rise-danger">
                  BLOCK REASON
                </Text>
                <Text className="text-sm font-medium text-rise-dark">
                  {blockReason}
                </Text>
              </Section>

              {/* Submission Details */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <Row label="Form" value={formType} />
                  <Row label="IP Address" value={ip} highlight />
                  {email && <Row label="Email Provided" value={email} />}
                  <Row label="Timestamp" value={new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} />
                  {details && <Row label="Details" value={details} />}
                </tbody>
              </table>

              <Hr className="my-6 border-rise-edge" />

              {/* Actions Taken */}
              <Text className="mb-2 text-xs font-semibold tracking-wider text-rise-gray">
                ACTIONS TAKEN
              </Text>
              <Text className="text-sm text-rise-dark">
                • No referral email sent to target{'\n'}
                • Silent success returned to submitter{'\n'}
                • IP logged for pattern analysis{'\n'}
                • Consider adding to BLOCKED_IPS if repeated
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-[11px] text-rise-gray">
                RISE Spam Prevention — automated alert
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr>
      <td
        style={{
          padding: '8px 12px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#6E6E73',
          verticalAlign: 'top',
          width: '120px',
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          color: highlight ? '#dc2626' : '#1D1D1F',
          fontWeight: highlight ? 600 : 400,
          verticalAlign: 'top',
        }}
      >
        {value}
      </td>
    </tr>
  )
}
