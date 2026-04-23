'use client'

import { Link } from '@/components/link'
import { useState } from 'react'

const FAQ = [
  {
    q: 'Can Push Mode be turned off?',
    a: 'Push Mode cannot be manually interrupted once initiated. This is a feature, not a limitation. If you are asking this question, the mode is likely already running. We recommend leaning into it.',
  },
  {
    q: 'I pressed the button multiple times and the bed did not stop. Is my remote broken?',
    a: 'Your remote is functioning correctly. The PM-1 remote initiates Push Mode. That is its complete list of functions. Each press confirms your original input. The bed has received your message. It will continue.',
  },
  {
    q: 'The bed navigated me to the wrong room.',
    a: "Please check whether the room the bed delivered you to was, in fact, the right room. In our customer outcome studies, the bed's navigation has proven correct in 98% of cases where the user believed it to be incorrect. We recommend reconsidering your intended destination.",
  },
  {
    q: 'My pillow is not centered after the remaking cycle.',
    a: 'The pillow node runs a full gradual cycle during the morning routine, completing its final calibration while you are tying your tie or equivalent finishing task. If you are checking the pillow before this point, the cycle is not complete. Please finish getting ready.',
  },
  {
    q: 'The bed followed me to work.',
    a: 'Yes. The Push returns to your residence independently following the completion of Push Mode. It uses the same routing it used to deliver you. If you are concerned about this, we understand. Most users report finding it reassuring within two to three weeks.',
  },
  {
    q: 'The bed stops at my stairs. Can this be fixed?',
    a: 'The Push is not compatible with staircase navigation. This is a hardware constraint, not a software one. The caster base operates on flat and gradual-gradient surfaces only. No update will change this. RISE™ is developing the RISE™ Move — a next-generation platform that addresses vertical navigation in both directions. We are not providing timelines or pricing. Current Push owners will be able to purchase it when it is available at the standard price. There is no loyalty discount. We appreciate your patience and your purchase.',
  },
  {
    q: 'I have a RISE Nudge. Can I upgrade?',
    a: 'The RISE Nudge is a discontinued product. We respect the role it played in your mornings and do not offer trade-in credit. We recommend The Push, which is currently out of stock but available for waitlist registration.',
  },
  {
    q: 'How do I stop Push Mode from activating?',
    a: 'You would need to not press the button. We recognize this may be more difficult than it sounds.',
  },
  {
    q: "The warranty documentation references something called 'The Push Pro.' What is that?",
    a: 'We are not currently accepting questions about The Push Pro.',
  },
]

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <main>

      <section className="relative overflow-hidden px-6 pt-40 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.05]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex items-center gap-2 text-xs text-foreground-muted/40">
            <Link
              href="/"
              className="transition-colors hover:text-foreground-muted"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground-secondary">Support</span>
          </div>

          <p className="mb-5 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Support
          </p>
          <h1 className="mb-6 font-display text-hero leading-none text-foreground">
            We&rsquo;re here
            <br />
            <span className="text-foreground-muted">to help you adapt.</span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-foreground-muted">
            If you are reading this, Push Mode is likely already running. We
            understand. Most questions resolve themselves by the time you reach
            the office. For everything else, we are here.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-accent/12 bg-accent/6 px-4 py-3">
            <div className="animate-glow-pulse size-1.5 rounded-full bg-accent/80" />
            <p className="text-xs text-foreground-secondary">
              You were referred here from the RISE™ PM-1 remote.{' '}
              <span className="text-foreground-muted">riseawake.com/help</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              title: 'Push Mode',
              desc: "Frequently asked questions about why it won't stop.",
              href: '#faq',
            },
            {
              title: 'Legacy Products',
              desc: 'Support for the RISE Nudge and earlier models.',
              href: '#faq',
            },
            {
              title: 'Warranty',
              desc: '5 years on hardware. Push Mode: lifetime.',
              href: '#warranty',
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="block rounded-xl border border-edge bg-surface-alt p-6 no-underline transition-colors hover:border-edge-strong"
            >
              <h3 className="mb-2 text-sm font-medium text-foreground-secondary">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-foreground-muted">
                {item.desc}
              </p>
              <p className="mt-4 text-xs text-accent/60">View →</p>
            </a>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              FAQ
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Common questions.
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-edge bg-surface-alt"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent p-6 text-left"
                >
                  <span className="text-sm font-medium text-foreground-secondary">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-accent/60 transition-transform duration-300"
                    style={{
                      transform:
                        openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-hidden={openFaq !== i}
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: openFaq === i ? '300px' : '0',
                  }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-foreground-secondary">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="warranty"
        className="border-t border-edge-subtle bg-surface-alt px-6 py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Warranty
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground">
              Coverage Details
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Hardware',
                period: '5 Years',
                items: [
                  'Frame and caster base',
                  'Sheet tensioning mechanism',
                  'Pillow pneumatic node',
                  'Strut and raising arc system',
                  'Motor and drive components',
                ],
              },
              {
                title: 'Push Mode',
                period: 'Lifetime',
                items: [
                  'Activation and routing logic',
                  'Navigation precision calibration',
                  'PM-1 remote functionality',
                  'Mode initiation',
                  'The decision to not include an off switch',
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="rounded-xl border border-edge bg-foreground/3 p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <h3 className="text-sm font-medium text-foreground-secondary">
                    {plan.title}
                  </h3>
                  <span className="rounded-xl border border-accent/15 bg-accent/10 px-3 py-1 text-xs text-accent/80">
                    {plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-xs text-foreground-muted"
                    >
                      <span className="mt-px text-accent/50">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-foreground-muted/50">
            Warranty does not cover: reluctance to use the product, attempts to
            manually interrupt Push Mode, events described by the user as
            &ldquo;it just kept going,&rdquo; or any outcome described as
            &ldquo;not what I expected.&rdquo; RISE™ Technologies, Inc. is not
            liable for career advancement resulting from product use.
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Contact
            </p>
            <h2 className="mb-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Get in touch.
            </h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Our support team responds within 2–3 business days. If Push Mode
              has already started, we respectfully suggest finishing your
              morning first.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="help-name" className="text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
                  Name
                </label>
                <input
                  id="help-name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="rounded-lg border border-edge bg-foreground/4 px-4 py-3 text-sm text-foreground transition-all duration-200 outline-none focus:border-accent/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="help-email" className="text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
                  Email
                </label>
                <input
                  id="help-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="rounded-lg border border-edge bg-foreground/4 px-4 py-3 text-sm text-foreground transition-all duration-200 outline-none focus:border-accent/40"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="help-subject" className="text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
                  Subject
                </label>
                <select
                  id="help-subject"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  required
                  className={`rounded-lg border border-edge bg-foreground/4 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-accent/40 ${
                    formState.subject
                      ? 'text-foreground'
                      : 'text-foreground-muted'
                  }`}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="push-mode">Push Mode — General Enquiry</option>
                  <option value="push-stop">
                    Push Mode — It Will Not Stop
                  </option>
                  <option value="navigation">Navigation & Routing</option>
                  <option value="remaking">
                    Sheet / Pillow Remaking System
                  </option>
                  <option value="remote">PM-1 Remote</option>
                  <option value="nudge">Legacy Nudge Support</option>
                  <option value="waitlist">Push Waitlist</option>
                  <option value="warranty">Warranty</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="help-message" className="text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
                  Message
                </label>
                <textarea
                  id="help-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="resize-none rounded-lg border border-edge bg-foreground/4 px-4 py-3 text-sm text-foreground transition-all duration-200 outline-none focus:border-accent/40"
                />
              </div>
              <div className="flex items-center justify-between md:col-span-2">
                <p className="max-w-90 text-[10px] leading-relaxed text-foreground-muted/30">
                  By submitting this form you acknowledge that Push Mode cannot
                  be manually interrupted and agree to our terms of service.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-accent px-8 py-3 text-xs font-medium tracking-widest text-accent-on uppercase transition-all duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                <span className="text-lg text-accent">✓</span>
              </div>
              <p className="mb-4 font-display text-3xl tracking-tight text-foreground">
                Message received.
              </p>
              <p className="text-sm leading-relaxed text-foreground-muted">
                We&rsquo;ll be in touch within 2–3 business days.
                <br />
                We trust Push Mode has taken care of the rest.
              </p>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
