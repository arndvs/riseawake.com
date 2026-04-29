'use client'

import { Link } from '@/components/link'
import { ReferAFriend } from '@/components/refer-a-friend'
import {
  getAllFeatures,
  getAllSpecs,
  getPushTiers,
  type ProductTier,
} from '@/lib/products'
import { useState } from 'react'

const tiers = getPushTiers()
const allFeatures = getAllFeatures()
const allSpecs = getAllSpecs()

function PushBedIllustration() {
  return (
    <svg
      width="160"
      height="300"
      viewBox="0 0 160 300"
      fill="none"
      aria-hidden="true"
      className="text-brand"
    >
      <rect
        x="30"
        y="20"
        width="100"
        height="220"
        rx="3"
        className="fill-brand/6 stroke-brand/35"
        strokeWidth="1.2"
      />
      <rect
        x="34"
        y="24"
        width="92"
        height="212"
        rx="2"
        className="fill-brand/4 stroke-brand/15"
        strokeWidth="0.6"
      />
      <line x1="34" y1="80" x2="126" y2="80" className="stroke-brand/12" strokeWidth="0.5" />
      <line x1="34" y1="140" x2="126" y2="140" className="stroke-brand/8" strokeWidth="0.5" />
      <rect
        x="40"
        y="28"
        width="80"
        height="36"
        rx="2"
        className="fill-brand/12 stroke-brand/25"
        strokeWidth="0.8"
      />
      <line
        x1="80" y1="28" x2="80" y2="64"
        className="stroke-brand/15"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <line x1="18" y1="20" x2="30" y2="80" className="stroke-brand/30" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="142" y1="20" x2="130" y2="80" className="stroke-brand/30" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="44" cy="244" rx="8" ry="4" className="fill-brand/8 stroke-brand/30" strokeWidth="0.8" />
      <ellipse cx="116" cy="244" rx="8" ry="4" className="fill-brand/8 stroke-brand/30" strokeWidth="0.8" />
      <rect x="102" y="195" width="20" height="8" rx="1" className="fill-brand/15 stroke-brand/25" strokeWidth="0.5" />
      <text x="112" y="201" textAnchor="middle" fontSize="4" className="fill-brand/70" fontFamily="DM Sans, sans-serif" letterSpacing="1">RISE</text>
      <line x1="10" y1="260" x2="150" y2="260" className="stroke-brand/8" strokeWidth="0.8" />
      {[20, 40, 60, 80, 100, 120, 140].map((x, i) => (
        <line key={i} x1={x} y1="260" x2={x - 4} y2="270" className="stroke-brand/5" strokeWidth="0.5" />
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
        <rect x="25" y="10" width="90" height="260" rx="8" className="fill-rise-charcoal/90 stroke-brand/20" strokeWidth="1" />
        <rect x="26" y="11" width="88" height="258" rx="7.5" className="fill-foreground/1" />
        <text x="70" y="60" textAnchor="middle" fontSize="8" className="fill-foreground/20" fontFamily="DM Sans, sans-serif" letterSpacing="4">RISE</text>
        <circle cx="70" cy="155" r="34" className="fill-brand/8 stroke-brand/35" strokeWidth="1" />
        <circle cx="70" cy="155" r="34" className="fill-brand/6 animate-glow-pulse" />
        <circle cx="70" cy="155" r="28" className="fill-brand/12 stroke-brand/25" strokeWidth="0.5" />
        <text x="70" y="158" textAnchor="middle" fontSize="10" className="fill-brand" fontFamily="DM Sans, sans-serif" letterSpacing="3" fontWeight="500">RISE</text>
        <circle cx="70" cy="155" r="4" className="fill-brand/30 animate-glow-pulse" />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_55%,var(--color-brand)_0%,transparent_70%)] opacity-[0.12]" />
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,var(--color-brand)_0%,transparent_65%)] opacity-[0.09]" />

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
              <div className="mb-8 rounded-xl border border-brand/15 bg-brand/6 px-4 py-3 text-xs leading-relaxed text-foreground-secondary">
                <span className="font-medium text-brand">
                  Currently out of stock.
                </span>{' '}
                Demand for The Push has exceeded our production capacity. Submit
                your email below to receive notification when Push Mode becomes
                available to you.
              </div>

              <div className="relative flex h-105 w-full items-center justify-center overflow-hidden rounded-xl border border-brand/12 bg-surface-alt">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,var(--color-brand)_0%,transparent_70%)] opacity-[0.06]" />
                <PushBedIllustration />
                <div className="absolute right-8 bottom-8">
                  <div className="size-2 animate-glow-pulse rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-[10px] tracking-[0.12em] text-foreground-muted">
                  Model RP-01
                </span>
                <span className="text-[10px] tracking-[0.12em] text-brand/50">
                  Current Generation
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="mb-4">
                <span className="rounded-xl border border-brand/20 bg-brand/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
                  Out of Stock
                </span>
              </div>

              <h1 className="mb-2 font-display text-display text-foreground-strong">
                The Push
              </h1>
              <p className="mb-8 text-sm italic text-brand/75">
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
                        className="flex-1 rounded-lg border border-edge bg-foreground/5 px-4 py-3 text-xs text-foreground transition-all duration-200 outline-none focus:border-brand/40"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="whitespace-nowrap rounded-full bg-brand px-6 py-3 text-xs font-medium uppercase tracking-widest text-brand-on transition-all duration-300 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? '...' : 'Notify Me'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex size-8 items-center justify-center rounded-full border border-brand/30 bg-brand/15">
                      <span className="text-sm text-brand">✓</span>
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
                By submitting your email, you join the Push Mode waitlist and
                acknowledge that Push Mode cannot be manually interrupted once
                initiated. Unsubscribing from RISE communications forfeits your
                waitlist position permanently. See{' '}
                <a href="/legal/terms" className="underline">
                  Terms of Service §7
                </a>
                . Have a productive day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tier Comparison ────────────────────────────────── */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              Product Line
            </p>
            <h2 className="mb-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Choose your PUSH.
            </h2>
            <p className="mx-auto max-w-xl text-body text-foreground-secondary">
              Same core engineering. Same 98% compliance rate. Same non-negotiable morning.
              The difference is in how much of your bed the machine handles — and how quietly it does it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((tier) => {
              const isHighlighted = tier.tier === 'push-select'
              return (
                <div
                  key={tier.id}
                  className={`flex flex-col rounded-xl p-8 ${
                    isHighlighted
                      ? 'border border-brand/25 bg-brand/6 shadow-elevated'
                      : 'border border-edge bg-surface-alt shadow-card'
                  }`}
                >
                  {isHighlighted && (
                    <div className="mb-4">
                      <span className="rounded-xl bg-brand/15 px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-brand">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="mb-1 font-display text-2xl text-foreground-strong">
                    {tier.name}
                  </h3>
                  <p className="mb-6 text-xs italic text-foreground-muted">
                    {tier.tagline}
                  </p>

                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="font-display text-[2.5rem] tracking-tight text-foreground-strong">
                      {tier.price != null
                        ? `$${tier.price.toLocaleString()}`
                        : 'TBD'}
                    </span>
                  </div>
                  <p className="mb-6 text-[10px] text-foreground-muted/50">
                    Currently out of stock
                  </p>

                  <p className="mb-3 text-[10px] tracking-[0.16em] uppercase text-foreground-muted">
                    What Ships
                  </p>
                  <ul className="mb-6 flex flex-1 flex-col gap-2">
                    {tier.includes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground-secondary"
                      >
                        <span className="mt-px shrink-0 text-brand/70">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mb-3 text-[10px] tracking-[0.16em] uppercase text-foreground-muted/60">
                    Self-Making Scope
                  </p>
                  <p className="mb-8 text-[10px] leading-relaxed text-foreground-muted">
                    {tier.selfMaking}
                  </p>

                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className={`w-full cursor-pointer rounded-full py-3 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-brand text-brand-on'
                        : 'border border-edge bg-foreground/6 text-foreground-secondary hover:bg-foreground/10'
                    }`}
                  >
                    Join Waitlist
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Sound Comparison ───────────────────────────────── */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              Sound Profile
            </p>
            <h2 className="mb-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              What it sounds like.
            </h2>
            <p className="mx-auto max-w-xl text-body text-foreground-secondary">
              Same frequency architecture. Different texture entirely.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-edge">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-edge bg-surface-alt">
                  <th className="p-4 text-left font-medium text-foreground-muted">
                    Quality
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      className={`p-4 text-left font-medium ${
                        tier.tier === 'push-select'
                          ? 'text-brand'
                          : 'text-foreground-muted'
                      }`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecs
                  .filter((s) => s.label === 'Motor Hum' || s.label === 'Track System' || s.label === 'Sound Profile')
                  .map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={
                        i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'
                      }
                    >
                      <td className="p-4 font-medium text-foreground-muted">
                        {spec.label}
                      </td>
                      {(['push', 'push-select', 'push-plus'] as ProductTier[]).map(
                        (t) => (
                          <td
                            key={t}
                            className="p-4 text-foreground-secondary"
                          >
                            {spec.byTier?.[t] ?? spec.value}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Technology ─────────────────────────────────────── */}
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
            {allFeatures.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-edge bg-surface-alt p-8"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl border border-brand/15 bg-brand/10">
                  <span className="text-base text-brand/80">{f.icon}</span>
                </div>
                <h3 className="mb-2 text-sm font-medium text-foreground-secondary">
                  {f.title}
                </h3>
                {f.tiers.length < 3 && (
                  <p className="mb-3 text-[10px] tracking-[0.12em] uppercase text-brand/60">
                    {f.tiers.includes('push-plus') && !f.tiers.includes('push')
                      ? 'PUSH+ Only'
                      : f.tiers.map((t) =>
                          t === 'push' ? 'PUSH' : t === 'push-select' ? 'Select' : 'PUSH+'
                        ).join(' · ')}
                  </p>
                )}
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
              Technical Details — By Tier
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-edge">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-edge bg-surface-alt">
                  <th className="p-4 text-left font-medium text-foreground-muted">
                    Spec
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      className={`p-4 text-left font-medium ${
                        tier.tier === 'push-select'
                          ? 'text-brand'
                          : 'text-foreground-muted'
                      }`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={
                      i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'
                    }
                  >
                    <td className="p-4 font-medium text-foreground-muted">
                      {spec.label}
                    </td>
                    {(['push', 'push-select', 'push-plus'] as ProductTier[]).map(
                      (t) => (
                        <td
                          key={t}
                          className={`p-4 text-foreground-secondary ${
                            spec.label === 'Off Switch' ||
                            spec.label === 'Interruption'
                              ? 'text-brand/70'
                              : ''
                          }`}
                        >
                          {spec.label === 'Staircase Navigation' ? (
                            <>
                              Not supported —{' '}
                              <Link
                                href="/move"
                                className="text-brand/65 underline"
                              >
                                RISE Move
                              </Link>
                            </>
                          ) : (
                            spec.byTier?.[t] ?? spec.value
                          )}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-lg">
          <div className="mb-10 text-center">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Know someone who needs Push Mode?
            </p>
            <h2 className="mb-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              They can&rsquo;t push the button
              <br />
              <span className="text-foreground-muted">if they don&rsquo;t know it exists.</span>
            </h2>
            <p className="text-body text-foreground-secondary">
              Some people are still setting alarms. Multiple alarms.
              You know who they are.
            </p>
          </div>
          <ReferAFriend />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-edge-subtle px-6 py-32 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-brand)_0%,transparent_70%)] opacity-[0.06]" />
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
            className="inline-block cursor-pointer rounded-full bg-brand px-10 py-4 text-xs font-medium uppercase tracking-[0.16em] text-brand-on transition-colors hover:bg-brand-hover"
          >
            Notify Me →
          </button>
        </div>
      </section>

    </main>
  )
}
