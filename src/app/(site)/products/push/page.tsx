'use client'

import { Link } from '@/components/link'
import { useState } from 'react'

const SPECS = [
  { label: 'Model', value: 'RP-01 (Push)' },
  { label: 'Generation', value: 'Current Generation' },
  { label: 'Push Mode', value: 'Included — Non-negotiable' },
  { label: 'Interruption', value: 'Not supported by design' },
  { label: 'Sheet System', value: 'Autonomous tensioning bar (center-out)' },
  { label: 'Pillow System', value: 'Single pneumatic node, gradual cycle' },
  { label: 'Caster Base', value: 'Low-profile, near-silent, high-torque' },
  { label: 'Staircase Navigation', value: 'Not supported — see RISE™ Move' },
  { label: 'Navigation', value: 'Precision room mapping, autonomous' },
  { label: 'Raising Arc', value: '0° – 90°+ continuous, motor-assisted' },
  { label: 'Motor Hum', value: 'Warm, low, 42Hz baseline' },
  { label: 'Remote', value: 'PM-1 — single function' },
  { label: 'Off Switch', value: 'Not applicable' },
  { label: 'Warranty', value: '5 years (Push Mode: lifetime)' },
  { label: 'Availability', value: 'Currently out of stock' },
]

const FEATURES = [
  {
    icon: '↑',
    title: 'Push Mode',
    body: "One press. The base activates, transitions to vertical, and begins routing you through your morning with the precision of a system that has studied the problem carefully and arrived at a conclusion. There is no option to pause Push Mode. This was considered during development and found to be contrary to the product's purpose.",
  },
  {
    icon: '⊡',
    title: 'Autonomous Sheet Tensioning',
    body: 'A tensioning bar travels the inner frame rails drawing your fitted sheet progressively taut from the center outward — slowly, one wrinkle at a time, across the full span of your morning. It does not rush. By the time you are tying your tie, your bed is already made. These are not equivalent achievements.',
  },
  {
    icon: '○',
    title: 'Pillow Restoration Node',
    body: 'A single pneumatic node at the frame\u2019s upper edge runs a long, calibrated cycle: gradual inflation, sustained hold, controlled deflation. The pillow is restored to form and centered. The entire process takes longer than feels necessary. This is deliberate. The Push does not hurry.',
  },
  {
    icon: '◈',
    title: 'Precision Caster Navigation',
    body: "Low-profile, near-silent casters beneath the base allow continuous, smooth motion across all floor surfaces. The Push does not walk. It rolls — with the inevitability of heavy furniture pushed by someone who knows where they're going. There is no rhythm to it. No mechanical stepping. It simply advances.",
  },
  {
    icon: '▣',
    title: 'Mattress Retention System',
    body: 'A low-profile retention lip and integrated strapping system secures the mattress at all angles of operation. The mattress remains on the base in all three states: flat, raised, and vertical. This is a deliberate engineering decision. The Push is always a complete bed. Even when it is standing upright in your hallway.',
  },
  {
    icon: '⬡',
    title: 'The PM-1 Remote',
    body: "One button. The button initiates Push Mode. That is its complete list of functions. Fine print on the reverse reads: 'Push Mode cannot be manually interrupted once initiated. This is a feature, not a limitation. Have a productive day!' The remote glows warm white, steady, patient. It has been glowing all night.",
  },
]

function PushBedIllustration() {
  return (
    <svg
      width="160"
      height="300"
      viewBox="0 0 160 300"
      fill="none"
      aria-hidden="true"
      className="text-accent"
    >
      <rect
        x="30"
        y="20"
        width="100"
        height="220"
        rx="3"
        className="fill-accent/6 stroke-accent/35"
        strokeWidth="1.2"
      />
      <rect
        x="34"
        y="24"
        width="92"
        height="212"
        rx="2"
        className="fill-accent/4 stroke-accent/15"
        strokeWidth="0.6"
      />
      <line x1="34" y1="80" x2="126" y2="80" className="stroke-accent/12" strokeWidth="0.5" />
      <line x1="34" y1="140" x2="126" y2="140" className="stroke-accent/8" strokeWidth="0.5" />
      <rect
        x="40"
        y="28"
        width="80"
        height="36"
        rx="2"
        className="fill-accent/12 stroke-accent/25"
        strokeWidth="0.8"
      />
      <line
        x1="80" y1="28" x2="80" y2="64"
        className="stroke-accent/15"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <line x1="18" y1="20" x2="30" y2="80" className="stroke-accent/30" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="142" y1="20" x2="130" y2="80" className="stroke-accent/30" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="44" cy="244" rx="8" ry="4" className="fill-accent/8 stroke-accent/30" strokeWidth="0.8" />
      <ellipse cx="116" cy="244" rx="8" ry="4" className="fill-accent/8 stroke-accent/30" strokeWidth="0.8" />
      <rect x="102" y="195" width="20" height="8" rx="1" className="fill-accent/15 stroke-accent/25" strokeWidth="0.5" />
      <text x="112" y="201" textAnchor="middle" fontSize="4" className="fill-accent/70" fontFamily="DM Sans, sans-serif" letterSpacing="1">RISE</text>
      <line x1="10" y1="260" x2="150" y2="260" className="stroke-accent/8" strokeWidth="0.8" />
      {[20, 40, 60, 80, 100, 120, 140].map((x, i) => (
        <line key={i} x1={x} y1="260" x2={x - 4} y2="270" className="stroke-accent/5" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function RemoteIllustration() {
  return (
    <div className="relative">
      <svg
        width="140"
        height="280"
        viewBox="0 0 140 280"
        fill="none"
        aria-hidden="true"
      >
        <rect x="25" y="10" width="90" height="260" rx="8" className="fill-rise-charcoal/90 stroke-accent/20" strokeWidth="1" />
        <rect x="26" y="11" width="88" height="258" rx="7.5" className="fill-foreground/1" />
        <text x="70" y="60" textAnchor="middle" fontSize="8" className="fill-foreground/20" fontFamily="DM Sans, sans-serif" letterSpacing="4">RISE™</text>
        <circle cx="70" cy="155" r="34" className="fill-accent/8 stroke-accent/35" strokeWidth="1" />
        <circle cx="70" cy="155" r="34" className="fill-accent/6 animate-glow-pulse" />
        <circle cx="70" cy="155" r="28" className="fill-accent/12 stroke-accent/25" strokeWidth="0.5" />
        <text x="70" y="158" textAnchor="middle" fontSize="10" className="fill-accent" fontFamily="DM Sans, sans-serif" letterSpacing="3" fontWeight="500">RISE</text>
        <circle cx="70" cy="155" r="4" className="fill-accent/30 animate-glow-pulse" />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_55%,var(--color-accent)_0%,transparent_70%)] opacity-[0.12]" />
    </div>
  )
}

export default function PushPage() {
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
    }, 1200)
  }

  return (
    <main>

      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,var(--color-accent)_0%,transparent_65%)] opacity-[0.09]" />

        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-12 text-xs text-foreground-muted/40">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground-muted">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products/push" className="transition-colors hover:text-foreground-muted">Products</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground-secondary">The Push</li>
            </ol>
          </nav>

          <div className="grid items-start gap-16 md:grid-cols-2">
            <div>
              <div className="mb-8 rounded-xl border border-accent/15 bg-accent/6 px-4 py-3 text-xs leading-relaxed text-foreground-secondary">
                <span className="font-medium text-accent">
                  Currently out of stock.
                </span>{' '}
                Demand for The Push has exceeded our production capacity. Submit
                your email below to receive notification when Push Mode becomes
                available to you.
              </div>

              <div className="relative flex h-105 w-full items-center justify-center overflow-hidden rounded-xl border border-accent/12 bg-surface-alt">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
                <PushBedIllustration />
                <div className="absolute right-8 bottom-8">
                  <div className="size-2 animate-glow-pulse rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-[10px] tracking-[0.12em] text-foreground-muted">
                  Model RP-01
                </span>
                <span className="text-[10px] tracking-[0.12em] text-accent/50">
                  Current Generation
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="mb-4">
                <span className="rounded-xl border border-accent/20 bg-accent/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                  Out of Stock
                </span>
              </div>

              <h1 className="mb-2 font-display text-display text-foreground-strong">
                The Push
              </h1>
              <p className="mb-8 text-sm italic text-accent/75">
                Current Generation — &ldquo;It doesn&rsquo;t wait for you to
                decide.&rdquo;
              </p>

              <div className="mb-8 h-px bg-edge-subtle" />

              <p className="mb-6 text-body text-foreground-secondary">
                The RISE Push is the product that answered the question the
                Nudge couldn&rsquo;t:{' '}
                <em>what if the bed simply handled it?</em>
              </p>
              <p className="mb-6 text-body text-foreground-secondary">
                Push Mode activates on your schedule. The base rises to
                vertical. You are delivered, with quiet and unhurried precision,
                through each stage of your morning routine — bathroom, closet,
                kitchen, departure — until you are where you need to be.
              </p>
              <p className="mb-10 text-body text-foreground-secondary">
                While this is happening, the bed is also making itself. Slowly.
                One wrinkle at a time. It will be ready when you return. It has
                already decided to be.
              </p>

              <div className="mb-6 rounded-xl border border-edge bg-foreground/3 p-6">
                {!submitted ? (
                  <>
                    <p className="mb-1 text-xs font-medium text-foreground-secondary">
                      Notify me when available
                    </p>
                    <p className="mb-5 text-xs leading-relaxed text-foreground-muted">
                      Enter your email and we&rsquo;ll contact you when The Push
                      is back in stock. Push Mode will be available to you soon.
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3 sm:flex-row"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        aria-label="Email address"
                        required
                        className="flex-1 rounded-lg border border-edge bg-foreground/5 px-4 py-3 text-xs text-foreground transition-all duration-200 outline-none focus:border-accent/40"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="whitespace-nowrap rounded-full bg-accent px-6 py-3 text-xs font-medium uppercase tracking-widest text-accent-on transition-all duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? '...' : 'Notify Me'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex size-8 items-center justify-center rounded-full border border-accent/30 bg-accent/15">
                      <span className="text-sm text-accent">✓</span>
                    </div>
                    <p className="mb-2 text-sm font-medium text-foreground-secondary">
                      You&rsquo;re on the list.
                    </p>
                    <p className="text-xs leading-relaxed text-foreground-muted">
                      We&rsquo;ll notify you when The Push is available.
                      <br />
                      Push Mode will find you.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-center text-[10px] leading-relaxed text-foreground-muted/25">
                By submitting your email, you acknowledge that Push Mode cannot
                be
                <br />
                manually interrupted once initiated. Have a productive day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              Technology
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              What it does.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-edge bg-surface-alt p-8"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-accent/15 bg-accent/10">
                  <span className="text-base text-accent/80">{f.icon}</span>
                </div>
                <h3 className="mb-4 text-sm font-medium text-foreground-secondary">
                  {f.title}
                </h3>
                <p className="text-body text-foreground-secondary">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
                Push Mode
              </p>
              <h2 className="mb-8 font-display text-4xl tracking-tight text-foreground md:text-5xl">
                One button.
                <br />
                <span className="text-foreground-muted">No exceptions.</span>
              </h2>
              <p className="mb-6 text-body text-foreground-secondary">
                The PM-1 remote has one button. The button does one thing.
                Pressing it a second time confirms the input. There is no third
                option. Push Mode does not offer a snooze. It does not offer a
                delay. It offers the morning.
              </p>
              <p className="text-body text-foreground-secondary">
                Fine print on the remote reverse:{' '}
                <em>
                  &ldquo;Push Mode cannot be manually interrupted once
                  initiated. This is a feature, not a limitation. Have a
                  productive day!&rdquo;
                </em>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <RemoteIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              Specifications
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground-strong">
              Technical Details
            </h2>
          </div>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {SPECS.map((s, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-6 bg-surface-alt p-5"
              >
                <span className="min-w-40 text-xs font-medium text-foreground-muted">
                  {s.label}
                </span>
                <span
                  className={`text-right text-xs ${
                    s.label === 'Off Switch' || s.label === 'Interruption'
                      ? 'text-accent/70'
                      : s.label === 'Staircase Navigation'
                        ? 'text-foreground-secondary'
                        : 'text-foreground-secondary'
                  }`}
                >
                  {s.label === 'Staircase Navigation' ? (
                    <>
                      Not supported — see{' '}
                      <Link
                        href="/move"
                        className="text-accent/65 underline"
                      >
                        RISE™ Move
                      </Link>
                    </>
                  ) : (
                    s.value
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-edge-subtle px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
        <div className="relative z-10 mx-auto max-w-xl">
          <p className="mb-8 text-eyebrow uppercase text-foreground-muted">
            Join the Waitlist
          </p>
          <h2 className="mb-6 font-display text-4xl tracking-tight text-foreground md:text-5xl">
            Push Mode
            <br />
            <span className="text-foreground-muted">
              will be available to you soon.
            </span>
          </h2>
          <p className="mb-10 text-body text-foreground-secondary">
            We&rsquo;ll be in touch when The Push is back in stock.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block cursor-pointer rounded-full bg-accent px-10 py-4 text-xs font-medium uppercase tracking-[0.16em] text-accent-on transition-colors hover:bg-accent-hover"
          >
            Notify Me →
          </button>
        </div>
      </section>

    </main>
  )
}
