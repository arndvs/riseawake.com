import { Link } from '@/components/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'For People Who Need A Little Push. The RISE™ Smart Adjustable Base.',
}

function BedIcon({ status }: { status: string }) {
  const isDiscontinued = status === 'discontinued'
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
      className={isDiscontinued ? 'text-foreground/12' : 'text-accent/40'}
    >
      <rect
        x="10"
        y="38"
        width="100"
        height="26"
        rx="2"
        className={isDiscontinued ? 'fill-foreground/4' : 'fill-accent/8'}
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="10"
        y="27"
        width="100"
        height="14"
        rx="2"
        className={isDiscontinued ? 'fill-foreground/4' : 'fill-accent/8'}
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <rect
        x="13"
        y="29"
        width="22"
        height="10"
        rx="1.5"
        fill="currentColor"
        opacity="0.4"
      />
      <line
        x1="10"
        y1="34"
        x2="110"
        y2="34"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="22"
        y1="38"
        x2="22"
        y2="64"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="98"
        y1="38"
        x2="98"
        y2="64"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle
        cx="22"
        cy="67"
        r="3"
        className={isDiscontinued ? 'fill-foreground/4' : 'fill-accent/8'}
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle
        cx="98"
        cy="67"
        r="3"
        className={isDiscontinued ? 'fill-foreground/4' : 'fill-accent/8'}
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <rect
        x="86"
        y="50"
        width="14"
        height="5"
        rx="1"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  )
}

function ProductCard({
  name,
  generation,
  tagline,
  description,
  status,
  href,
  detail,
}: {
  name: string
  generation: string
  tagline: string
  description: string
  status: 'discontinued' | 'sold-out'
  href: string
  detail: string
}) {
  return (
    <Link href={href} className="group block">
      <div className="h-full rounded-sm border border-edge bg-surface p-10 md:p-14">
        <div className="mb-10 flex items-center justify-between">
          <span
            className={`rounded-sm px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] ${
              status === 'discontinued'
                ? 'border border-edge bg-foreground/5 text-foreground-muted'
                : 'border border-accent/20 bg-accent/10 text-accent'
            }`}
          >
            {status === 'discontinued'
              ? 'Discontinued'
              : 'Sold Out — Notify Me'}
          </span>
          <span className="text-xs text-foreground-muted">{generation}</span>
        </div>

        <div className="mb-10 flex h-40 w-full items-center justify-center rounded-sm border border-edge-subtle bg-foreground/2">
          <BedIcon status={status} />
        </div>

        <h3 className="mb-3 font-display text-4xl tracking-tight text-foreground">
          {name}
        </h3>
        <p className="mb-6 text-sm italic text-accent/75">
          &ldquo;{tagline}&rdquo;
        </p>
        <p className="mb-10 text-sm leading-relaxed text-foreground-secondary">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-edge pt-6">
          <span className="text-xs text-foreground-muted">{detail}</span>
          <span className="text-xs font-medium uppercase tracking-widest text-foreground-secondary transition-colors duration-300 group-hover:text-foreground">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main>
        <section className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,var(--color-accent)_0%,transparent_70%)] opacity-[0.07]" />

          <div className="relative z-10 flex min-h-screen flex-col px-6 pt-28 pb-10">
            <div className="mx-auto mb-8 w-full max-w-5xl text-center">
              <div className="mb-7 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-accent/50" />
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground-muted">
                  Smart Adjustable Base
                </span>
                <div className="h-px w-12 bg-accent/50" />
              </div>

              <h1 className="mb-4 font-display text-hero leading-none text-foreground">
                Rise.{' '}
                <span className="text-transparent [-webkit-text-stroke:1px_var(--color-foreground-muted)]">
                  Inevitably.
                </span>
              </h1>

              <p className="mx-auto max-w-lg text-sm font-light leading-relaxed text-foreground-muted md:text-base">
                The bed that gets you up. Whether you&rsquo;re ready or not.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
              <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-edge bg-surface shadow-hero">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-25 animate-glow-pulse rounded-full border border-accent/35" />
                    <div className="flex size-19 items-center justify-center rounded-full border border-accent/45 bg-accent/18 backdrop-blur-xl">
                      <svg
                        width="22"
                        height="24"
                        viewBox="0 0 22 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 2L20 12L3 22V2Z"
                          className="fill-foreground/90"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-full mt-5 whitespace-nowrap text-center">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-muted">
                        Watch the film
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-1.5 animate-glow-pulse rounded-full bg-accent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-secondary">
                    RISE™
                  </span>
                </div>
                <div className="pointer-events-none absolute top-4 right-4">
                  <span className="rounded-sm border border-edge bg-page/75 px-2.5 py-1 text-[10px] uppercase tracking-widest text-foreground-secondary">
                    Push Mode
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 w-full max-w-6xl">
              <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <div className="size-1.5 animate-glow-pulse rounded-full bg-accent" />
                  <p className="text-xs text-foreground-muted">
                    <span className="text-foreground-secondary">
                      &ldquo;The Remote&rdquo;
                    </span>{' '}
                    — a short film. One morning. One button.
                  </p>
                </div>
                <p className="text-[10px] italic text-foreground-muted/50">
                  Dave did not consent to this film. Dave arrived at work on
                  time. Results typical.
                </p>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <Link
                    href="/products/push"
                    className="whitespace-nowrap rounded-sm bg-accent px-8 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-accent-hover"
                  >
                    Join the Waitlist
                  </Link>
                  <Link
                    href="/about"
                    className="whitespace-nowrap rounded-sm border border-edge px-8 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted transition-all duration-300 hover:text-foreground-secondary"
                  >
                    Our Story
                  </Link>
                </div>
                <p className="hidden max-w-70 text-right text-xs italic leading-relaxed text-foreground-muted md:block">
                  For People Who Need A Little Push.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-edge-subtle px-6 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-display leading-relaxed tracking-tight text-foreground">
              Most mornings, you need more than an alarm.
              <br />
              <span className="text-foreground-muted">
                You need a system that has already decided.
              </span>
            </p>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                The Product Line
              </p>
              <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
                From Nudge to Push.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground-muted">
                A decade of research into the science of not wanting to get up.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ProductCard
                name="The Nudge"
                generation="First Generation"
                tagline="It made its feelings known."
                description="The RISE Nudge introduced passive morning accountability. A precision tensioning system applied graduated discomfort to the sleeping surface until remaining in bed became the less appealing option. It didn't take you anywhere. It simply made staying a choice you had to keep making."
                status="discontinued"
                href="/products/nudge"
                detail="Discontinued — 2019"
              />
              <ProductCard
                name="The Push"
                generation="Current Generation"
                tagline="It doesn't wait for you to decide."
                description="The RISE Push introduced Push Mode — a fully autonomous routing system that activates on schedule, transitions to vertical, and delivers you to your obligations with the quiet confidence of someone who has already had their coffee. One button. No off switch. By design."
                status="sold-out"
                href="/products/push"
                detail="Join the waitlist"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-edge-subtle px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Push Mode
              </p>
              <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
                How it works.
              </h2>
            </div>

            <div className="grid gap-px bg-edge-subtle md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Activation',
                  body: 'Press RISE. Push Mode initializes. The system confirms your input with a single glow response. There is no confirmation dialog. There is no undo.',
                },
                {
                  step: '02',
                  title: 'Transition',
                  body: 'The base rises to vertical. The mattress retention system holds. Your sheet begins tensioning from center outward. The pillow node initiates. The morning has begun.',
                },
                {
                  step: '03',
                  title: 'Delivery',
                  body: 'You are delivered to your routine. Bathroom. Closet. Kitchen. The base navigates with precision. Push Mode completes when you reach your point of departure. Not before.',
                },
              ].map((item) => (
                <div key={item.step} className="bg-surface p-10 md:p-14">
                  <p className="mb-6 font-display text-5xl text-accent/28">
                    {item.step}
                  </p>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-foreground-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Customer Outcomes
              </p>
              <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
                Results may vary.
                <br />
                <span className="text-foreground-muted">
                  Usually they don&rsquo;t.
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    'I genuinely cannot tell if I like this product. I made VP last quarter. I haven\u2019t decided if those are related.',
                  name: 'K.M.',
                  title: 'VP, Operations',
                  stars: 4,
                },
                {
                  quote:
                    "I pressed the button thinking it would adjust my back support. I arrived at my desk at 8:47am. I'm not sure what happened in between.",
                  name: 'D.K.',
                  title: 'Analyst, 3 years',
                  stars: 5,
                },
                {
                  quote:
                    "My husband bought one. He's never been late. We don't really talk about it.",
                  name: 'Anonymous',
                  title: 'Verified Purchase',
                  stars: 5,
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-edge bg-surface p-8"
                >
                  <div className="mb-6 flex gap-0.5" role="img" aria-label={`${t.stars} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        aria-hidden="true"
                        className={`text-xs ${s < t.stars ? 'text-accent/80' : 'text-foreground-muted/30'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mb-8 text-sm italic leading-relaxed text-foreground-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-xs font-medium text-foreground-secondary">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground-muted">
                      {t.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-edge-subtle bg-surface px-6 py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
            {[
              { stat: '98%', label: 'On-time arrival rate' },
              { stat: '0', label: 'Off switches' },
              { stat: '4.7★', label: 'Average rating' },
              { stat: '∞', label: 'Snooze prevention' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="mb-2 font-display text-display text-foreground">
                  {s.stat}
                </p>
                <p className="text-xs uppercase tracking-widest text-foreground-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-40 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-foreground-muted">
              Ready?
            </p>
            <h2 className="mb-8 font-display text-display leading-tight tracking-tight text-foreground">
              You&rsquo;ve been hitting
              <br />
              snooze long enough.
            </h2>
            <p className="mb-12 text-sm leading-relaxed text-foreground-muted">
              The Push is currently out of stock. Join the waitlist.
              <br />
              Push Mode will be available to you soon.
            </p>
            <Link
              href="/products/push"
              className="inline-block rounded-sm bg-accent px-10 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-hover"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
