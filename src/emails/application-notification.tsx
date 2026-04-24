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

interface ApplicationNotificationEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  roleTitle: string
  roleId: string
  experienceLevel: string
  availability: string
  whyJoinRise: string
  hasResume: boolean
  resumeFileName?: string
  submittedAt: string
  ipAddress?: string
}

export function ApplicationNotificationEmail({
  firstName = 'Jane',
  lastName = 'Doe',
  email = 'jane@example.com',
  phone = '+1 555-0100',
  roleTitle = 'Research Position',
  roleId = 'ROLE-001',
  experienceLevel = 'senior',
  availability = '2_weeks',
  whyJoinRise = 'I believe in the mission...',
  hasResume = true,
  resumeFileName = 'resume.pdf',
  submittedAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  ipAddress = '—',
}: ApplicationNotificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        New application: {firstName} {lastName} for {roleTitle}
      </Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                'rise-blue': '#1A4FD6',
                'rise-dark': '#1D1D1F',
                'rise-gray': '#6E6E73',
                'rise-muted': '#AEAEB2',
                'rise-bg': '#FAFAFA',
                'rise-surface': '#FFFFFF',
                'rise-inset': '#F5F5F7',
                'rise-edge': 'rgb(0 0 0 / 0.08)',
                'rise-yellow': '#eab308',
              },
            },
          },
        }}
      >
        <Body className="mx-auto bg-rise-bg font-sans">
          <Container className="mx-auto max-w-150 px-4 py-8">
            {/* Header */}
            <Section className="mb-6">
              <Text className="m-0 text-[11px] font-semibold tracking-[0.2em] text-rise-blue">
                RISE INTERNAL
              </Text>
            </Section>

            {/* Main content */}
            <Section className="rounded-2xl border border-solid border-rise-edge bg-rise-surface px-8 py-8">
              {/* Status badge + heading */}
              <Text className="m-0 mb-2 inline-block rounded-md bg-rise-yellow/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-rise-yellow">
                NEEDS REVIEW
              </Text>
              <Heading
                as="h1"
                className="m-0 mt-3 text-[22px] font-bold leading-tight tracking-tight text-rise-dark"
              >
                New application received
              </Heading>
              <Text className="mt-1 text-[13px] text-rise-gray">
                {submittedAt}
              </Text>

              <Hr className="my-6 border-rise-edge" />

              {/* Applicant info grid */}
              <Section className="mb-6 rounded-xl bg-rise-inset px-6 py-5">
                <Text className="m-0 mb-3 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  APPLICANT
                </Text>
                <Row label="Name" value={`${firstName} ${lastName}`} />
                <Row label="Email" value={email} />
                <Row label="Phone" value={phone} />
                <Row label="Experience" value={experienceLevel} />
                <Row label="Availability" value={availability} />
                {ipAddress && ipAddress !== '—' && (
                  <Row label="IP" value={ipAddress} />
                )}
              </Section>

              {/* Position */}
              <Section className="mb-6 rounded-xl bg-rise-inset px-6 py-5">
                <Text className="m-0 mb-3 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  POSITION
                </Text>
                <Text className="m-0 text-[16px] font-semibold text-rise-dark">
                  {roleTitle}
                </Text>
                <Text className="m-0 mt-1 font-mono text-[12px] text-rise-gray">
                  {roleId}
                </Text>
              </Section>

              {/* Why RISE */}
              <Section className="mb-6">
                <Text className="m-0 mb-2 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  WHY JOIN RISE
                </Text>
                <Text className="m-0 rounded-xl bg-rise-inset px-6 py-4 text-[14px] leading-relaxed text-rise-dark">
                  {whyJoinRise}
                </Text>
              </Section>

              {/* Resume */}
              <Section className="mb-2">
                <Text className="m-0 mb-2 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  RESUME
                </Text>
                <Text className="m-0 text-[14px] text-rise-dark">
                  {hasResume ? (
                    <>
                      {resumeFileName} — stored in Convex. View in the{' '}
                      <span className="font-semibold text-rise-blue">
                        Internal Dashboard
                      </span>
                      .
                    </>
                  ) : (
                    <span className="text-rise-muted">
                      No resume attached.
                    </span>
                  )}
                </Text>
              </Section>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[13px] leading-relaxed text-rise-gray">
                Review this application in the internal dashboard at
                /internal/applications. Role-specific answers and the full
                resume are available there.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-6 text-center">
              <Text className="text-[10px] text-rise-muted">
                This is an automated notification from riseawake.com.
                Do not forward outside the organization.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text className="m-0 mb-1 text-[13px] text-rise-dark">
      <span className="inline-block w-24 text-rise-gray">{label}:</span>
      {value}
    </Text>
  )
}

export default ApplicationNotificationEmail
