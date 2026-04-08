'use client'

import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { useState } from 'react'

const STAGES = [
  {
    number: '01',
    title: 'The Person',
    desc: 'Height, weight, dominant side of bed, sleep position, self-assessed resistance to mornings.',
    duration: '3 min',
    note: null,
    flagged: false,
  },
  {
    number: '02',
    title: 'The Household',
    desc: 'Number of occupants, additional persons, pets, any household members who have not consented to Push Mode.',
    duration: '4 min',
    note: null,
    flagged: false,
  },
  {
    number: '03',
    title: 'The Bedroom',
    desc: 'Room dimensions, furniture placement, ceiling height, floor surface, door width. Photo upload optional but recommended.',
    duration: '8 min',
    note: 'Ceiling height under 84" will affect Push Mode operation.',
    flagged: false,
  },
  {
    number: '04',
    title: 'The Morning Sequence',
    desc: 'Drag-and-drop ordering of your morning stops. Duration estimates for each. The bed will compare these to your actual times.',
    duration: '10 min',
    note: 'Duration estimates are monitored. Persistent underestimation results in automatic adjustment.',
    flagged: false,
  },
  {
    number: '05',
    title: 'Environment Mapping',
    desc: 'Dimensions and layouts of all spaces your morning sequence passes through. Hallway width is critical.',
    duration: '15 min',
    note: 'Staircase navigation is not supported. RISE™ is working on this. See RISE™ Move.',
    flagged: true,
  },
  {
    number: '06',
    title: 'Departure Configuration',
    desc: 'How you leave. Driveway or building. Vehicle type and position. GPS coordinates of home and primary destination.',
    duration: '6 min',
    note: null,
    flagged: false,
  },
  {
    number: '07',
    title: 'The Closet',
    desc: 'Dress code standards by day type. Outfit verification calibration. The item you always forget.',
    duration: '5 min',
    note: 'The bed cannot see your outfit. It infers correctness from time and behavior.',
    flagged: false,
  },
  {
    number: '08',
    title: 'The Kitchen',
    desc: 'Coffee maker type and location. Vessel. Additions requiring the refrigerator. Other kitchen tasks.',
    duration: '4 min',
    note: 'The bed does not carry coffee. This is a known limitation.',
    flagged: false,
  },
  {
    number: '09',
    title: 'Habits & Tendencies',
    desc: 'Sleep schedule, lifestyle factors, night-before habits, self-assessed morning difficulty.',
    duration: '5 min',
    note: 'Disclosed habits affect Push Mode intensity on relevant mornings.',
    flagged: false,
  },
  {
    number: '10',
    title: 'Scheduling',
    desc: 'Weekly Push Mode schedule. Vacation mode. Work from home configuration. Secondary destinations with GPS coordinates.',
    duration: '5 min',
    note: null,
    flagged: false,
  },
  {
    number: '11',
    title: 'Emergency Protocols',
    desc: 'Emergency contact. Medical information. Anomaly response preferences.',
    duration: '4 min',
    note: 'RISE™ recommends completion. This stage is labeled Advanced Configuration.',
    flagged: false,
  },
  {
    number: '12',
    title: 'Review & Activate',
    desc: 'Summary of all configured settings. Eight acknowledgments. The final button.',
    duration: '3 min',
    note: 'Activation cannot be undone.',
    flagged: false,
  },
]

type FormState =
  | 'idle'
  | 'validating'
  | 'invalid'
  | 'refund-warning'
  | 'continue'

export default function ActivatePage() {
  const [serial, setSerial] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [refundAcknowledged, setRefundAcknowledged] = useState(false)

  const handleSerialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = serial.trim().toUpperCase()
    if (!cleaned.startsWith('RSB-') || cleaned.length < 8) {
      setFormState('invalid')
      return
    }
    setFormState('refund-warning')
  }

  const handleBeginActivation = () => {
    if (refundAcknowledged) setFormState('continue')
  }

  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-40 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.07]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Device Activation
          </p>
          <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight tracking-tight text-foreground">
            Activate Your Push.
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-loose text-foreground-muted">
            Before Push Mode can operate, the bed needs to know everything. Your
            spaces, your sequence, your habits, your schedule, your GPS
            coordinates, and your honest assessment of how resistant you are to
            mornings.
          </p>
          <p className="mb-16 max-w-xl text-sm italic leading-loose text-foreground-muted/60">
            Activation takes 45–90 minutes. RISE™ recommends completing it
            before your first intended Push Mode morning. The bed will operate on
            default settings until then. Most users find the default settings
            inadequate.
          </p>

          {/* Serial number form */}
          <div className="mb-6 rounded-sm border border-edge bg-surface-alt p-8">
            {formState === 'continue' ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <div className="size-2 animate-glow-pulse rounded-full bg-accent" />
                </div>
                <p className="mb-3 font-display text-2xl tracking-tight text-foreground">
                  Activation initiated.
                </p>
                <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                  Serial{' '}
                  <span className="font-mono text-accent/70">
                    {serial.trim().toUpperCase()}
                  </span>{' '}
                  registered.
                </p>
                <p className="mb-8 text-xs italic leading-relaxed text-foreground-muted/50">
                  The refund window has closed. Proceed through the 12 stages
                  below.
                </p>
                <div className="inline-flex items-center gap-3 rounded-sm bg-accent px-6 py-3 text-white">
                  <span className="text-xs font-medium uppercase tracking-[0.14em]">
                    Stage 01 — The Person →
                  </span>
                </div>
                <p className="mt-4 text-[10px] text-foreground-muted/30">
                  Full interactive form coming soon. Your serial has been
                  recorded.
                </p>
              </div>
            ) : formState === 'refund-warning' ? (
              <div>
                <p className="mb-1 text-xs font-medium text-foreground-secondary">
                  Before you begin.
                </p>
                <p className="mb-6 text-xs leading-relaxed text-foreground-muted">
                  Serial{' '}
                  <span className="font-mono text-foreground-secondary">
                    {serial.trim().toUpperCase()}
                  </span>{' '}
                  located. Your device is ready for activation.
                </p>

                <div className="mb-6 rounded-sm border border-edge bg-foreground/3 p-5">
                  <p className="mb-3 text-xs font-medium text-foreground-secondary">
                    Refund Policy — Please Read
                  </p>
                  <p className="mb-3 text-xs leading-relaxed text-foreground-muted">
                    Submitting your serial number initiates activation. Under{' '}
                    <Link
                      href="/legal/terms#s7"
                      className="text-accent/60 underline"
                    >
                      Section 7 of the Terms of Service
                    </Link>
                    , RISE™ does not offer refunds after activation has been
                    initiated.
                  </p>
                  <p className="mb-3 text-xs leading-relaxed text-foreground-muted">
                    If you discover during activation that your living
                    environment is incompatible with Push Mode — including
                    staircase navigation requirements, insufficient ceiling
                    height, or inadequate hallway width — this incompatibility
                    was present at time of purchase and does not constitute
                    grounds for refund.
                  </p>
                  <p className="text-xs italic leading-relaxed text-foreground-muted/50">
                    Product specifications, including all known Push Mode
                    environmental limitations, have been available at
                    riseco.online/products/push since launch.
                  </p>
                </div>

                <label className="mb-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={refundAcknowledged}
                    onChange={(e) => setRefundAcknowledged(e.target.checked)}
                    className="mt-0.5 shrink-0 accent-accent"
                  />
                  <span className="text-xs leading-relaxed text-foreground-muted">
                    I understand that initiating activation closes the refund
                    window, and that any environmental incompatibilities
                    discovered during the activation process are not grounds for
                    refund.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={handleBeginActivation}
                    disabled={!refundAcknowledged}
                    className="rounded-sm border-none px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 disabled:cursor-not-allowed disabled:bg-accent/30 disabled:text-white/30"
                    style={{
                      background: refundAcknowledged
                        ? 'var(--color-accent)'
                        : undefined,
                      color: refundAcknowledged ? 'white' : undefined,
                    }}
                  >
                    Begin Activation
                  </button>
                  <button
                    onClick={() => {
                      setFormState('idle')
                      setRefundAcknowledged(false)
                    }}
                    className="cursor-pointer rounded-sm border border-edge bg-transparent px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSerialSubmit}>
                <p className="mb-2 text-xs font-medium text-foreground-secondary">
                  Enter your device serial number
                </p>
                <p className="mb-5 text-xs leading-relaxed text-foreground-muted">
                  Located on the label affixed to the underside of the base
                  frame. Readable by lying on the floor beneath the bed with a
                  light source and reading upward. Format:
                  RSB-XXXXXXXXXXXXXXXX.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={serial}
                    onChange={(e) => {
                      setSerial(e.target.value)
                      setFormState('idle')
                    }}
                    placeholder="RSB-"
                    className={`flex-1 rounded-sm border px-4 py-3 font-mono text-sm tracking-wider text-foreground outline-none transition-all duration-200 ${
                      formState === 'invalid'
                        ? 'border-rise-error/40 bg-foreground/4'
                        : 'border-edge bg-foreground/4'
                    } focus:border-accent/40`}
                    spellCheck={false}
                    autoCapitalize="characters"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-sm border-none bg-accent px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition-all duration-300"
                  >
                    Locate Device
                  </button>
                </div>
                {formState === 'invalid' && (
                  <p className="mt-3 text-xs text-rise-error/70">
                    Serial number not recognized. Verify the format
                    (RSB-XXXXXXXXXXXXXXXX) and try again. If the label is
                    unreadable, contact{' '}
                    <Link href="/help" className="underline">
                      support
                    </Link>
                    .
                  </p>
                )}
                <p className="mt-4 text-[10px] leading-relaxed text-foreground-muted/40">
                  Submitting your serial number initiates activation and closes
                  the refund window.{' '}
                  <Link
                    href="/legal/terms#s7"
                    className="text-foreground-muted/60 underline"
                  >
                    Section 7, Terms of Service.
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* THE 12 STAGES */}
      <section className="border-t border-edge-subtle px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-muted">
              What to expect
            </p>
            <h2 className="mb-4 font-display text-3xl tracking-tight text-foreground md:text-4xl">
              12 stages. 45–90 minutes.
              <br />
              <span className="text-foreground-muted">
                Everything the bed needs to know.
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Each stage configures a different aspect of your morning. Progress
              is saved between stages. You may pause and return. The bed will be
              here.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {STAGES.map((stage) => (
              <div
                key={stage.number}
                className={`rounded-sm border p-6 ${
                  stage.flagged
                    ? 'border-edge-subtle bg-foreground/[0.015]'
                    : 'border-edge bg-surface-alt'
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`shrink-0 font-display text-[1.8rem] leading-none ${
                      stage.flagged
                        ? 'text-foreground-muted/30'
                        : 'text-accent/25'
                    }`}
                    style={{ minWidth: '48px' }}
                  >
                    {stage.number}
                  </span>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                      <h3
                        className={`text-sm font-medium ${
                          stage.flagged
                            ? 'text-foreground-muted'
                            : 'text-foreground-secondary'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <span className="shrink-0 text-[10px] text-foreground-muted/50">
                        ~{stage.duration}
                      </span>
                    </div>
                    <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                      {stage.desc}
                    </p>
                    {stage.note && (
                      <p className="mt-2 text-[10px] italic leading-relaxed text-foreground-muted/50">
                        {stage.flagged ? (
                          <>
                            {stage.note.replace(' See RISE™ Move.', '')}{' '}
                            <Link
                              href="/move"
                              className="text-accent/50 underline"
                            >
                              See RISE™ Move.
                            </Link>{' '}
                            The refund window closes at Stage 01.{' '}
                            <Link
                              href="/legal/terms#s7"
                              className="text-foreground-muted/60 underline"
                            >
                              Section 7.
                            </Link>
                          </>
                        ) : (
                          stage.note
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THE BED COLLECTS */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            What activation collects
          </p>
          <h2 className="mb-10 font-display text-3xl tracking-tight text-foreground-secondary">
            Everything it needs.
            <br />
            <span className="text-foreground-muted">
              Nothing it doesn&rsquo;t.
            </span>
          </h2>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {[
              {
                category: 'Physical Profile',
                items: [
                  'Height and weight',
                  'Sleep position and dominant side',
                  'Mobility considerations',
                  'Self-assessed morning resistance (1–10)',
                ],
              },
              {
                category: 'Household',
                items: [
                  'All occupants (height, weight, schedule)',
                  'Pets (species, size, morning location)',
                  'Consent status of secondary occupants',
                ],
              },
              {
                category: 'Environment',
                items: [
                  'Room dimensions for all stops',
                  'Furniture placement maps',
                  'Ceiling height and door widths',
                  'Floor surface types',
                  'Bedroom photos (4 directions)',
                  'Staircase disclosure',
                ],
              },
              {
                category: 'Morning Sequence',
                items: [
                  'All stops in order',
                  'Duration estimates per stop',
                  'Dress code standards by day type',
                  'The item you always forget',
                ],
              },
              {
                category: 'Location',
                items: [
                  'GPS coordinates of home',
                  'GPS coordinates of work',
                  'Up to 5 secondary destinations',
                  'Departure point configuration',
                ],
              },
              {
                category: 'Schedule & Habits',
                items: [
                  'Target wake time',
                  'Weekly Push Mode schedule',
                  'Night-before lifestyle factors',
                  'Vacation and WFH modes',
                ],
              },
              {
                category: 'Emergency',
                items: [
                  'Emergency contact name and number',
                  'Medical information (optional)',
                  'Anomaly response preferences',
                ],
              },
              {
                category: 'Acknowledgments',
                items: [
                  'Refund policy (Section 7)',
                  'Environmental compatibility',
                  'Staircase limitation',
                  'Push Mode non-interruptibility (×8)',
                ],
              },
            ].map((group) => (
              <div key={group.category} className="bg-surface-alt p-6">
                <p className="mb-3 text-xs font-medium text-foreground-secondary">
                  {group.category}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-foreground-muted"
                    >
                      <span className="mt-px shrink-0 text-accent/40">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-foreground-muted/40">
            All activation data is retained and used in accordance with the{' '}
            <Link
              href="/legal/privacy"
              className="text-foreground-muted/60 underline"
            >
              Privacy Policy
            </Link>
            ,{' '}
            <Link
              href="/legal/sleep-data-policy"
              className="text-foreground-muted/60 underline"
            >
              Sleep & Environmental Data Policy
            </Link>
            , and{' '}
            <Link
              href="/legal/push-mode-eula"
              className="text-foreground-muted/60 underline"
            >
              Push Mode EULA
            </Link>
            . Room photos are retained indefinitely. GPS coordinates are shared
            with the autonomous navigation system and retained for the solo
            return commute. Emergency contact information is stored securely and
            accessed at RISE™&rsquo;s discretion.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-edge-subtle px-6 py-32 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Ready?
          </p>
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-foreground">
            The bed is ready
            <br />
            <span className="text-foreground-muted">when you are.</span>
          </h2>
          <p className="mb-12 text-sm leading-relaxed text-foreground-muted">
            Enter your serial number above to begin. Activation takes 45–90
            minutes. Your progress is saved. You may pause between stages. The
            bed will wait.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glow-btn inline-block cursor-pointer rounded-sm border-none bg-accent px-10 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white"
          >
            Begin Activation →
          </button>
          <p className="mt-6 text-[10px] leading-relaxed text-foreground-muted/30">
            Entering your serial number closes the refund window.{' '}
            <Link
              href="/legal/terms#s7"
              className="text-foreground-muted/50 underline"
            >
              Section 7, Terms of Service.
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
