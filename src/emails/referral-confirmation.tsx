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

interface ReferralConfirmationEmailProps {
  senderName: string
  friendName: string
  friendEmail: string
}

export function ReferralConfirmationEmail({
  senderName = 'Sender',
  friendName = 'Friend',
  friendEmail = 'friend@example.com',
}: ReferralConfirmationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Your referral to {friendName} has been sent.
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

            {/* Main content */}
            <Section className="rounded-2xl border border-solid border-rise-edge bg-rise-surface px-8 py-10">
              <Heading
                as="h1"
                className="m-0 mb-2 text-[24px] font-bold leading-tight tracking-tight text-rise-dark"
              >
                Referral sent.
              </Heading>
              <Text className="mt-0 text-[14px] leading-relaxed text-rise-gray">
                You did the right thing.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Hi {senderName},
              </Text>
              <Text className="text-[15px] leading-relaxed text-rise-dark">
                We&apos;ve sent an email to {friendName} ({friendEmail})
                introducing them to RISE. They&apos;ll receive a single
                message — we don&apos;t follow up, and we don&apos;t add
                them to any list.
              </Text>

              {/* Status card */}
              <Section className="my-6 rounded-xl bg-[#F5F5F7] px-6 py-5">
                <Text className="m-0 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  REFERRAL STATUS
                </Text>
                <Text className="m-0 mt-2 text-[17px] font-semibold text-rise-dark">
                  Delivered to {friendName}
                </Text>
                <Text className="m-0 mt-1 text-[12px] font-mono text-rise-gray">
                  {friendEmail}
                </Text>
              </Section>

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Whether they act on it is between them and their alarm
                clock. You&apos;ve done your part.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[13px] leading-relaxed text-rise-gray">
                Thank you for sharing RISE. The snooze button has had a
                monopoly long enough.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-[11px] font-semibold tracking-[0.2em] text-rise-gray">
                RISE AWAKE
              </Text>
              <Text className="mt-1 text-[11px] leading-relaxed text-[#AEAEB2]">
                Smart Adjustable Base technology for people who need a
                little push.
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

export default ReferralConfirmationEmail
