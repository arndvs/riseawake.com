import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from 'react-email'

interface ApplicationConfirmationEmailProps {
  firstName: string
  roleTitle: string
  roleId: string
  submittedAt: string
}

export function ApplicationConfirmationEmail({
  firstName = 'Applicant',
  roleTitle = 'Research Position',
  roleId = 'ROLE-001',
  submittedAt = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}: ApplicationConfirmationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        We received your application for {roleTitle} at RISE
      </Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                'rise-blue': '#1A4FD6',
                'rise-blue-light': '#4C7CFF',
                'rise-dark': '#1D1D1F',
                'rise-gray': '#6E6E73',
                'rise-bg': '#FAFAFA',
                'rise-surface': '#FFFFFF',
                'rise-edge': 'rgb(0 0 0 / 0.08)',
              },
            },
          },
        }}
      >
        <Body className="mx-auto bg-rise-bg font-sans">
          <Container className="mx-auto max-w-140 px-4 py-8">
            {/* Header */}
            <Section className="mb-8 text-center">
              <Text className="text-[11px] font-semibold tracking-[0.2em] text-rise-blue">
                RISE AWAKE
              </Text>
            </Section>

            {/* Main content */}
            <Section className="rounded-2xl border border-solid border-rise-edge bg-rise-surface px-8 py-10">
              <Heading
                as="h1"
                className="m-0 mb-2 text-[24px] font-bold leading-tight tracking-tight text-rise-dark"
              >
                Application received
              </Heading>
              <Text className="mt-0 text-[14px] leading-relaxed text-rise-gray">
                {submittedAt}
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Hi {firstName},
              </Text>
              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Thank you for your interest in joining RISE. We&apos;ve
                received your application for the following position:
              </Text>

              {/* Role card */}
              <Section className="my-6 rounded-xl bg-[#F5F5F7] px-6 py-5">
                <Text className="m-0 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  POSITION
                </Text>
                <Text className="m-0 mt-1 text-[17px] font-semibold text-rise-dark">
                  {roleTitle}
                </Text>
                <Text className="m-0 mt-1 text-[12px] font-mono text-rise-gray">
                  {roleId}
                </Text>
              </Section>

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Dr. Voss and the team will review your submission carefully.
                If your background aligns with the role, we&apos;ll be in
                touch to discuss next steps.
              </Text>
              <Text className="text-[15px] leading-relaxed text-rise-dark">
                We appreciate the time you took to apply. The work we do at
                RISE demands exceptional people, and we take every
                application seriously.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[13px] leading-relaxed text-rise-gray">
                If you have questions about your application or need to
                update any information, reply to this email. Please include
                your application reference ({roleId}) in the subject line.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-[11px] font-semibold tracking-[0.2em] text-rise-gray">
                RISE AWAKE
              </Text>
              <Text className="mt-1 text-[11px] leading-relaxed text-[#AEAEB2]">
                This is an automated confirmation. Please do not reply
                unless you need to update your application.
              </Text>
              <Text className="mt-4 text-[11px] text-[#AEAEB2]">
                <Link
                  href="https://riseawake.com"
                  className="text-rise-gray underline"
                >
                  riseawake.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ApplicationConfirmationEmail
