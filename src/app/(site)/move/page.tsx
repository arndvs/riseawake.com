'use client'

import { Link } from '@/components/link'
import { useState } from 'react'

const CONFIRMING = [
  'Vertical navigation. Stairs. Both directions.',
  'A distinct product. Not an update to the Push.',
  'A recurring Vertical Navigation Services subscription.',
  'Premium pricing. Above the Push.',
  'No discount for current Push or Nudge owners.',
  'It exists. It is being developed.',
]

const NOT_CONFIRMING = [
  'Timeline.',
  'Price.',
  'Subscription fee.',
  'Form factor.',
  'Whether Push Mode will be included.',
  'Whether Push Mode in the Move will have an off switch.',
  'When you will hear more.',
]

export default function MovePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <main>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(color-mix(in srgb, var(--color-foreground-muted) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-foreground-muted) 3%, transparent) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-14 inline-flex items-center gap-2 rounded-sm border border-edge-subtle bg-foreground/3 px-4 py-2">
            <div className="size-1.5 rounded-full bg-foreground-muted/50" />
            <span className="text-[10px] tracking-[0.22em] text-foreground-muted/70 uppercase">
              In Development
            </span>
          </div>

          <div className="mb-4">
            <p className="mb-3 text-xs tracking-[0.22em] text-foreground-muted/50 uppercase">
              RISE™
            </p>
            <h1 className="font-display text-[clamp(5rem,18vw,14rem)] leading-none tracking-tight text-foreground">
              Move.
            </h1>
          </div>

          <p className="mb-3 text-base leading-relaxed text-foreground-muted md:text-lg">
            Next-generation vertical navigation.
          </p>
          <p className="mb-16 text-sm text-foreground-muted/40 italic">
            Up. And down. Both directions. All floors.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mb-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                required
                className="flex-1 rounded-sm border border-edge bg-foreground/4 px-4 py-3 text-xs text-foreground transition-all duration-200 outline-none focus:border-accent/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-sm border border-edge bg-foreground/8 px-6 py-3 text-xs font-medium tracking-[0.14em] whitespace-nowrap text-foreground-secondary uppercase transition-all duration-300 disabled:cursor-not-allowed"
              >
                {loading ? '...' : 'Notify Me'}
              </button>
            </form>
          ) : (
            <div className="mx-auto mb-6 max-w-md py-4 text-center">
              <p className="mb-1 text-sm font-medium text-foreground-secondary">
                You&rsquo;re on the list.
              </p>
              <p className="text-xs leading-relaxed text-foreground-muted">
                We&rsquo;ll be in touch when we&rsquo;re ready to tell you more.
                That may be a while.
              </p>
            </div>
          )}

          <p className="mx-auto max-w-sm text-[10px] leading-relaxed text-foreground-muted/30">
            Joining this list does not reserve a unit, guarantee pricing, or
            constitute any agreement with RISE™. Current Push owners will be
            notified at the same time as everyone else. There is no priority
            queue. There is no loyalty discount.
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-20">
          <span className="text-[9px] tracking-[0.2em] text-foreground-muted uppercase">
            What we know
          </span>
          <div className="h-8 w-px bg-linear-to-b from-foreground-muted/60 to-transparent" />
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Disclosure
            </p>
            <h2 className="font-display text-3xl tracking-tight text-foreground-secondary md:text-4xl">
              What RISE™ is saying.
              <br />
              <span className="text-foreground-muted/50">
                And what it isn&rsquo;t.
              </span>
            </h2>
          </div>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            <div className="bg-surface-alt p-8">
              <p className="mb-6 text-xs font-medium tracking-[0.16em] text-foreground-muted uppercase">
                Confirmed
              </p>
              <ul className="flex flex-col gap-4">
                {CONFIRMING.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground-secondary"
                  >
                    <span className="mt-1 shrink-0 text-foreground-muted">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-alt p-8">
              <p className="mb-6 text-xs font-medium tracking-[0.16em] text-foreground-muted/60 uppercase">
                Not Confirmed
              </p>
              <ul className="flex flex-col gap-4">
                {NOT_CONFIRMING.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground-muted italic"
                  >
                    <span className="mt-1 shrink-0 text-foreground-muted/40">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Context
          </p>
          <h2 className="mb-10 font-display text-3xl tracking-tight text-foreground-secondary md:text-4xl">
            The stairs problem.
          </h2>
          <div className="space-y-4 text-sm leading-loose text-foreground-muted">
            <p>
              The RISE™ Push operates on casters. Casters are wheels. Wheels and
              stairs are a fundamental mechanical incompatibility that no amount
              of software can resolve. The Push&rsquo;s staircase limitation has
              been documented in its product specifications since launch. It is
              in{' '}
              <Link
                href="/legal/terms#s7"
                className="text-foreground-secondary underline"
              >
                Section 7 of the Terms of Service
              </Link>
              . It is disclosed in{' '}
              <Link
                href="/activate"
                className="text-foreground-secondary underline"
              >
                the activation process at Stage 5
              </Link>
              . It appears in the product specs.
            </p>
            <p>
              Approximately 34% of US residential housing stock involves
              multi-story navigation. RISE™ has been aware of this figure since
              before the Push launched. We have been working on a solution since
              Q3 2022.
            </p>
            <p>
              The Move is not an update to the Push. It is a different product
              with a different mechanical architecture. It navigates staircases
              in both directions — ascending and descending — attended and
              unattended. The solo return commute goes up the stairs. The bed
              comes home.
            </p>
            <p className="text-foreground-muted/50 italic">
              We are not providing additional detail at this time.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Pricing Structure
          </p>
          <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground-secondary md:text-4xl">
            Vertical Navigation Services.
          </h2>
          <p className="mb-6 text-sm leading-loose text-foreground-muted">
            Staircase navigation in both directions requires real-time spatial
            mapping, dynamic load calculation, step-by-step surface
            verification, and continuous telemetry during vertical transitions.
            This is ongoing cloud compute. It is not a one-time firmware
            feature. RISE™ will pass this cost to the user as a monthly Vertical
            Navigation Services subscription.
          </p>
          <p className="mb-6 text-sm leading-loose text-foreground-muted">
            Without the subscription, the Move operates as a flat-surface bed.
            With it, staircase navigation — in both directions — is available.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                label: 'Hardware',
                value: 'Not announced',
                note: 'Premium pricing. Above the Push.',
              },
              {
                label: 'VNS Subscription',
                value: 'Not announced',
                note: 'Required for staircase navigation.',
              },
              {
                label: 'Push owner discount',
                value: 'None',
                note: 'The Push works. The Move is different.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-edge-subtle bg-foreground/3 p-6 text-center"
              >
                <p className="mb-3 text-xs tracking-[0.14em] text-foreground-muted uppercase">
                  {item.label}
                </p>
                <p
                  className={`mb-2 font-display text-xl tracking-tight ${
                    item.value === 'None'
                      ? 'text-rise-error/50'
                      : 'text-foreground-secondary'
                  }`}
                >
                  {item.value}
                </p>
                <p className="text-[10px] leading-relaxed text-foreground-muted/50 italic">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-foreground-muted/50 italic">
            Push owners: you have a Push. It works. It will continue to work on
            flat surfaces. The Move is a different product for a different
            problem. We appreciate your understanding and your original
            purchase, which was not contingent on staircase capability, as the
            product specifications have always clearly stated.
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-snug tracking-tight text-foreground-secondary italic">
            &ldquo;We are aware of the stairs.
            <br />
            All of them.
            <br />
            Both directions.
            <br />
            We are doing something about it.&rdquo;
          </p>
          <p className="text-xs text-foreground-muted">
            Dr. Eleanor Voss, Founder & CEO
          </p>
          <p className="mt-1 text-[10px] text-foreground-muted/30 italic">
            Press release, February 3, 2025. Full release:{' '}
            <Link
              href="/press/rise-move-announcement"
              className="text-foreground-muted/50 underline"
            >
              riseawake.com/press/rise-move-announcement
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-sm border border-edge-subtle bg-surface-alt p-8">
          <p className="mb-3 text-xs font-medium text-foreground-secondary">
            A note for current Push owners.
          </p>
          <p className="mb-3 text-sm leading-loose text-foreground-muted">
            Your Push is not being discontinued. It is not being replaced. It
            will continue to operate exactly as it was designed to operate, on
            flat surfaces, at the compliance rate you have come to expect,
            indefinitely.
          </p>
          <p className="mb-3 text-sm leading-loose text-foreground-muted">
            The Move is a different product. It addresses a different
            constraint. If you have stairs and wish to address them, the Move
            will be available for purchase at the standard price when it is
            released.
          </p>
          <p className="text-xs leading-relaxed text-foreground-muted/50 italic">
            There is no trade-in program. There is no loyalty discount. There is
            no upgrade path. These are consistent with{' '}
            <Link
              href="/legal/terms"
              className="text-foreground-muted/60 underline"
            >
              RISE™&rsquo;s standard policies
            </Link>{' '}
            and with our philosophy about the past.
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-3xl tracking-tight text-foreground-secondary">
            We&rsquo;ll tell you when we&rsquo;re ready.
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-foreground-muted">
            No timeline. No price. No further details.
            <br />
            Just a list. You may be on it.
          </p>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                required
                className="flex-1 rounded-sm border border-edge bg-foreground/4 px-4 py-3 text-xs text-foreground transition-all duration-200 outline-none focus:border-accent/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-sm border border-edge bg-foreground/8 px-6 py-3 text-xs font-medium tracking-[0.14em] text-foreground-secondary uppercase"
              >
                {loading ? '...' : 'Notify Me'}
              </button>
            </form>
          ) : (
            <p className="text-sm text-foreground-muted">
              You&rsquo;re on the list. We&rsquo;ll be in touch.
            </p>
          )}
        </div>
      </section>

    </main>
  )
}
