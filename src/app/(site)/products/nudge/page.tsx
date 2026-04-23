import { Button } from '@/components/button'
import { Link } from '@/components/link'

const SPECS = [
  { label: 'Model', value: 'RN-01 (Nudge)' },
  { label: 'Generation', value: 'First Generation (2013–2019)' },
  { label: 'Status', value: 'Permanently Discontinued' },
  { label: 'Push Mode', value: 'Not Supported' },
  { label: 'Discomfort Gradient', value: '7-stage passive tensioning' },
  { label: 'Sheet System', value: 'Manual (user-operated)' },
  { label: 'Pillow System', value: 'Not included' },
  { label: 'Off Switch', value: 'Yes (this was later reconsidered)' },
  { label: 'Caster Base', value: 'Stationary' },
  { label: 'App Support', value: 'Discontinued — iOS 9 only' },
  { label: 'Warranty', value: 'Expired' },
  { label: 'Support', value: 'Legacy customers: riseawake.com/help' },
]

const FEATURES = [
  {
    title: 'Graduated Discomfort Technology™',
    body: 'The Nudge introduced our proprietary 7-stage GDT system. Beginning 45 minutes before your target wake time, the sleeping surface would imperceptibly increase surface resistance, reducing ambient comfort by approximately 12% per stage. By stage 7, remaining in bed required active commitment. We respected that commitment. We simply made it harder.',
  },
  {
    title: 'Passive Accountability Engine',
    body: "Unlike its successor, the Nudge never moved. It simply made not-moving progressively less rewarding. A philosophy not unlike a good manager: it didn't do the work for you. It created conditions in which the alternative to doing the work became unappealing.",
  },
  {
    title: 'Thermal Dissonance Mode',
    body: "Optional add-on for the Nudge platform. The outer 8 inches of the sleeping surface would cool to 61°F while the center zone remained warm. The effect was subtle. Psychologically, it was significant. You could stay. But the bed was gently suggesting that you didn't have to.",
  },
  {
    title: 'The Nudge Remote',
    body: 'The original RISE remote featured three buttons: Set, Cancel, and Defer. The ability to cancel and defer Morning Mode was later reviewed in customer outcome studies. The Push remote has one button. This was an intentional product decision based on that data.',
  },
]

function NudgeBedIllustration() {
  return (
    <svg
      width="200"
      height="260"
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden="true"
      className="text-foreground"
    >
      <rect
        x="20"
        y="80"
        width="160"
        height="100"
        rx="3"
        className="fill-foreground/3 stroke-foreground/10"
        strokeWidth="1"
      />
      <rect
        x="20"
        y="60"
        width="160"
        height="24"
        rx="3"
        className="fill-foreground/4 stroke-foreground/8"
        strokeWidth="0.8"
      />
      <rect
        x="25"
        y="63"
        width="40"
        height="18"
        rx="2"
        className="fill-foreground/7"
      />
      <line
        x1="20"
        y1="75"
        x2="180"
        y2="75"
        className="stroke-foreground/6"
        strokeWidth="0.8"
      />
      <rect
        x="28"
        y="180"
        width="8"
        height="20"
        rx="1"
        className="fill-foreground/5 stroke-foreground/8"
        strokeWidth="0.8"
      />
      <rect
        x="164"
        y="180"
        width="8"
        height="20"
        rx="1"
        className="fill-foreground/5 stroke-foreground/8"
        strokeWidth="0.8"
      />
      <rect
        x="145"
        y="150"
        width="28"
        height="10"
        rx="1"
        className="fill-foreground/6"
      />
      <g opacity="0.4">
        {[0, 1, 2, 3, 4, 5, 6].map((n) => (
          <rect
            key={n}
            x={30 + n * 20}
            y="115"
            width="14"
            height={4 + n * 2}
            rx="1"
            className="fill-foreground/5 stroke-foreground/6"
            strokeWidth="0.5"
          />
        ))}
      </g>
      <text
        x="100"
        y="235"
        textAnchor="middle"
        fontSize="9"
        className="fill-foreground/20"
        fontFamily="DM Sans, sans-serif"
        letterSpacing="3"
      >
        RISE NUDGE
      </text>
    </svg>
  )
}

export default function NudgePage() {
  return (
    <main>

      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-foreground)_0%,transparent_70%)] opacity-[0.025]" />

        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-12 text-xs text-foreground-muted/40">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground-muted">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products/nudge" className="transition-colors hover:text-foreground-muted">Products</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground-secondary">The Nudge</li>
            </ol>
          </nav>

          <div className="grid items-start gap-16 md:grid-cols-2">
            <div>
              <div className="mb-8 rounded-xl border border-edge bg-foreground/3 px-4 py-3 text-xs leading-relaxed text-foreground-muted">
                <span className="font-medium text-foreground-secondary">
                  This product has been discontinued.
                </span>{' '}
                The Nudge is no longer available for purchase. Legacy support
                inquiries can be directed to{' '}
                <Link
                  href="/help"
                  className="underline transition-colors hover:text-foreground-secondary"
                >
                  riseawake.com/help
                </Link>
                . We recommend{' '}
                <Link
                  href="/products/push"
                  className="underline transition-colors hover:text-foreground-secondary"
                >
                  The Push
                </Link>
                .
              </div>

              <div className="relative flex h-105 w-full items-center justify-center overflow-hidden rounded-xl border border-edge bg-surface-alt">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-foreground/1 to-transparent" />
                <NudgeBedIllustration />
                <div
                  className="absolute inset-0 flex -rotate-12 items-center justify-center"
                >
                  <p className="rounded-xl border border-edge px-6 py-2 text-[10px] font-medium tracking-[0.3em] text-foreground/8 uppercase">
                    Discontinued
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-[10px] tracking-[0.12em] text-foreground-muted">
                  Model RN-01
                </span>
                <span className="text-[10px] tracking-[0.12em] text-foreground-muted">
                  2013 — 2019
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="mb-4">
                <span className="rounded-xl border border-edge bg-foreground/5 px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] text-foreground-muted uppercase">
                  Discontinued
                </span>
              </div>

              <h1 className="mb-2 font-display text-display text-foreground/85">
                The Nudge
              </h1>
              <p className="mb-8 text-sm text-foreground-muted italic">
                First Generation — &ldquo;It made its feelings known.&rdquo;
              </p>

              <div className="mb-8 h-px bg-edge-subtle" />

              <p className="mb-6 text-sm leading-relaxed text-foreground-secondary">
                The original RISE smart adjustable base. The Nudge was the
                product that asked the question no one had thought to ask:{' '}
                <em>what if the bed was on your side?</em>
              </p>
              <p className="mb-6 text-sm leading-relaxed text-foreground-secondary">
                Not against you. Not indifferent to you. <em>On your side</em> —
                in the way that a friend who genuinely wants you to succeed
                might be, which is to say: occasionally uncomfortable to be
                around, but correct.
              </p>
              <p className="mb-10 text-sm leading-relaxed text-foreground-muted">
                The Nudge never moved you anywhere. It simply made staying a
                progressively active choice, until not staying became the path
                of least resistance. A philosophy with a 74% reported morning
                compliance rate. We later learned that 74% was not good enough.
              </p>

              <div className="mb-6 rounded-xl border border-edge bg-foreground/3 p-6">
                <p className="mb-2 text-xs font-medium text-foreground-secondary">
                  This product is no longer available.
                </p>
                <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                  If you are a legacy Nudge customer, support documentation
                  remains available. For a more effective solution, we recommend
                  The Push.
                </p>
                <Button variant="cta" href="/products/push">
                  Upgrade to The Push →
                </Button>
              </div>

              <p className="text-center text-[10px] leading-relaxed text-foreground-muted/30">
                RISE™ does not offer trade-in credit for discontinued models.
                <br />
                This is consistent with our philosophy about the past.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Technology
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground/75 md:text-5xl">
              What it did.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-edge bg-surface-alt p-8"
              >
                <h3 className="mb-4 text-sm font-medium text-foreground-secondary">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Specifications
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground/75">
              Technical Details
            </h2>
          </div>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {SPECS.map((s, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-6 bg-surface-alt p-5"
              >
                <span className="min-w-35 text-xs font-medium text-foreground-muted">
                  {s.label}
                </span>
                <span className="text-right text-xs text-foreground-secondary">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-32 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            The Next Step
          </p>
          <h2 className="mb-6 font-display text-4xl tracking-tight text-foreground md:text-5xl">
            The Push doesn&rsquo;t suggest.
            <br />
            <span className="text-foreground-muted">It delivers.</span>
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-foreground-muted">
            Everything the Nudge aspired to be, plus Push Mode, autonomous
            navigation, and the knowledge that the decision has been made for
            you.
          </p>
          <Button variant="primary" size="lg" href="/products/push">
            View The Push
          </Button>
        </div>
      </section>

    </main>
  )
}
