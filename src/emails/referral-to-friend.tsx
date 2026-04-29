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

interface ReferralToFriendEmailProps {
  friendName: string
  senderName: string
  senderEmail: string
}

export function ReferralToFriendEmail({
  friendName = 'Friend',
  senderName = 'Someone',
  senderEmail = 'someone@example.com',
}: ReferralToFriendEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        {senderName} thinks you should see this.
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
                'rise-cta': '#E07A4A',
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
                Someone thought of you.
              </Heading>
              <Text className="mt-0 text-[14px] leading-relaxed text-rise-gray">
                And specifically, thought you needed to see this.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Hi {friendName},
              </Text>
              <Text className="text-[15px] leading-relaxed text-rise-dark">
                {senderName} ({senderEmail}) wanted you to know about
                RISE — the Smart Adjustable Base that gets you out of bed.
                Whether you&apos;re ready or not.
              </Text>

              {/* Product card */}
              <Section className="my-6 rounded-xl bg-[#F5F5F7] px-6 py-5">
                <Text className="m-0 text-[11px] font-semibold tracking-[0.16em] text-rise-gray">
                  THE PUSH — SMART ADJUSTABLE BASE
                </Text>
                <Text className="m-0 mt-2 text-[17px] font-semibold text-rise-dark">
                  For People Who Need A Little Push.
                </Text>
                <Text className="m-0 mt-2 text-[13px] leading-relaxed text-rise-gray">
                  Push Mode cannot be manually interrupted once initiated.
                  This is a feature, not a limitation.
                </Text>
              </Section>

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                We don&apos;t know why {senderName} thought you
                needed this. We don&apos;t ask. But statistically, 94% of
                referrals report &ldquo;they knew exactly why.&rdquo;
              </Text>

              {/* CTA */}
              <Section className="my-8 text-center">
                <Link
                  href="https://riseawake.com"
                  className="inline-block rounded-full bg-rise-cta px-8 py-3.5 text-[12px] font-semibold tracking-[0.14em] text-white uppercase no-underline"
                >
                  See What You&apos;re Missing
                </Link>
              </Section>

              <Text className="text-[15px] leading-relaxed text-rise-dark">
                Or don&apos;t. Keep hitting snooze. {senderName} will know.
              </Text>

              <Hr className="my-6 border-rise-edge" />

              <Text className="text-[13px] leading-relaxed text-rise-gray">
                You received this email because {senderName} used our
                referral feature at riseawake.com. We will not email you
                again. If you believe this was sent in error, you can safely
                ignore it.
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

export default ReferralToFriendEmail
