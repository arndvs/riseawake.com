'use client'

import { Link } from '@/components/link'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useState } from 'react'

const TIERS = [
  {
    id: 'essentials',
    name: 'DataKit Essentials',
    price: '$299',
    period: 'one-time',
    tagline: 'Open your data.',
    features: [
      '.rsm file reading (read-only)',
      'Sleep metrics viewer',
      'Push Mode session timeline',
      'RISE™ Index score display',
      'Basic data category browser',
    ],
    limitations: [
      'No .rsma audio file support',
      'No data export',
      'No advanced filtering',
      'Date filter: known issue post-2019',
    ],
    cta: 'Purchase Essentials',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'DataKit Pro',
    price: '$899',
    period: 'one-time',
    tagline: 'See everything. Almost.',
    features: [
      'Everything in Essentials',
      '.rsma audio file support',
      'Advanced filtering (date, category)',
      'Export to .rsm-x format',
      'Occupancy data browser*',
      'Relationship inference history*',
    ],
    limitations: [
      'Date filter: known issue post-2019',
      '*Occupancy data browser: access pending fix',
      'Export to CSV/JSON: not supported',
    ],
    cta: 'Purchase Pro',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'DataKit Enterprise',
    price: '$2,400',
    period: 'per year',
    tagline: 'Priority. Relative to nothing.',
    features: [
      'Everything in Pro',
      'Priority compatibility updates',
      'Dedicated support email',
      'Developer Community Forum access',
      'Appendix B documentation access',
    ],
    limitations: [
      'Priority updates: notification within 90 days',
      'Support response: 15 business days',
      'Forum members: 3',
    ],
    cta: 'Purchase Enterprise',
    highlighted: false,
  },
]

const FEATURES = [
  {
    title: '.rsm File Reading',
    body: 'Open and navigate your RISE™ Standard Metric data files. The only tool capable of doing this. See your sleep metrics, Push Mode session logs, navigation route data, and all other data categories in your RSDP. Audio .rsma files require DataKit Pro.',
  },
  {
    title: 'RISE™ Index Viewer',
    body: 'View your RISE™ Index score and score history. Trend visualization included. The methodology behind your score is not displayed. The score components are not displayed. The score is displayed. This is what is available.',
  },
  {
    title: 'Session Timeline',
    body: 'Navigate your Push Mode history chronologically. Every activation, every route, every nudge. Filter by date range (Pro). Note: date filter has a known issue with dates after January 1, 2019. Workaround available in documentation.',
  },
  {
    title: 'Occupancy Browser*',
    body: 'Browse occupancy data from your sleep environment. *Currently unavailable due to a known crash issue when navigating to the Occupancy Data category. Workaround: do not navigate to the Occupancy Data category. A fix is planned.',
  },
  {
    title: 'Secure Local Processing',
    body: 'All data processing occurs locally on your device. DataKit SDK does not transmit your personal data to RISE™ servers during normal operation. License verification, crash reporting, and telemetry are exceptions to this. See EULA Section 31 and Section 44.',
  },
  {
    title: 'Export to .rsm-x',
    body: 'Export your data to .rsm-x — the RISE™ extended format. Compatible with DataKit SDK 2.0 and above. Export to standard formats such as CSV or JSON is not currently supported. This feature is under consideration for a future release.',
  },
]

export default function SDKPage() {
  const [modalTier, setModalTier] = useState<string | null>(null)
  const [hasRSDP, setHasRSDP] = useState<boolean | null>(null)
  const [waitlisted, setWaitlisted] = useState(false)

  const handlePurchase = (tierId: string) => {
    setModalTier(tierId)
    setHasRSDP(null)
  }

  const closeModal = () => {
    setModalTier(null)
    setHasRSDP(null)
    setWaitlisted(false)
  }

  return (
    <main>

      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)/7%,transparent_70%)]" />
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-accent/15 bg-accent/8 px-3 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-accent/80" />
            <span className="text-[10px] tracking-[0.18em] text-accent/80 uppercase">
              RISE™ Developer Platform
            </span>
          </div>
          <h1 className="mb-6 font-display text-hero leading-none tracking-tight text-foreground">
            DataKit SDK
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-foreground-secondary">
            The professional toolkit for accessing RISE™ Standard Metric data.
          </p>
          <p className="mx-auto mb-3 max-w-xl text-body text-foreground-muted">
            The RISE™ Standard Metric (.rsm) format is a proprietary data
            architecture designed for precision, security, and longitudinal
            integrity.
          </p>
          <p className="mx-auto mb-16 max-w-xl text-body text-accent/70 italic">
            DataKit SDK is the only tool capable of reading it.
          </p>

          <div className="mx-auto mb-6 max-w-2xl rounded-xl border border-edge-subtle bg-foreground/2 p-5">
            <p className="mb-2 text-xs font-medium text-foreground-secondary">
              System Compatibility
            </p>
            <p className="text-xs leading-relaxed text-foreground-muted">
              RISE™ DataKit SDK is compatible with select operating systems and
              hardware configurations. Due to the proprietary nature of the .rsm
              format and the security requirements of the RISE™ data
              infrastructure, compatibility cannot be guaranteed across all
              environments. Not all operating systems are supported. Not all
              versions of supported operating systems are supported.
            </p>
            <p className="mt-3 text-xs text-foreground-muted/60">
              Before purchasing, consult the{' '}
              <details className="inline">
                <summary className="cursor-pointer text-accent/60 underline">
                  DataKit Compatibility Matrix
                </summary>
                <span className="block mt-2 rounded-xl border border-edge-subtle bg-surface-alt px-3 py-2 text-[11px] leading-relaxed text-foreground-secondary not-italic">
                  The DataKit Compatibility Matrix is available to registered DataKit SDK customers. To become a registered customer, please purchase the SDK.
                </span>
              </details>{' '}
              to confirm your system meets minimum requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Pricing
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Choose your tier.
            </h2>
            <p className="mt-4 text-body text-foreground-muted">
              All tiers require a RISE™ Standard Data Package (RSDP) to be
              useful.{' '}
              <Link href="/data-request" className="text-accent/60 underline">
                Request your data first.
              </Link>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col rounded-xl p-8 ${
                  tier.highlighted
                    ? 'border border-accent/25 bg-accent/6 shadow-elevated'
                    : 'border border-edge bg-surface shadow-card'
                }`}
              >
                {tier.highlighted && (
                  <div className="mb-4">
                    <span className="rounded-xl bg-accent/15 px-2 py-1 text-[10px] tracking-[0.16em] text-accent uppercase">
                      Most Comprehensive
                    </span>
                  </div>
                )}
                <h3 className="mb-1 font-display text-2xl text-foreground">
                  {tier.name}
                </h3>
                <p className="mb-6 text-xs text-foreground-muted italic">
                  {tier.tagline}
                </p>
                <div className="mb-6">
                  <span className="font-display text-[2.5rem] tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-xs text-foreground-muted">
                    {tier.period}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="mb-3 text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
                    Includes
                  </p>
                  <ul className="mb-6 flex flex-col gap-2">
                    {tier.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground-secondary"
                      >
                        <span className="mt-px text-accent/70">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-3 text-[10px] tracking-[0.16em] text-foreground-muted/60 uppercase">
                    Known Limitations
                  </p>
                  <ul className="mb-8 flex flex-col gap-2">
                    {tier.limitations.map((l, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[10px] text-foreground-muted"
                      >
                        <span className="mt-px text-rise-error/40">—</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePurchase(tier.id)}
                  className={`w-full cursor-pointer rounded-full py-3 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-accent text-accent-on'
                      : 'border border-edge bg-foreground/6 text-foreground-secondary hover:bg-foreground/10'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-foreground-muted/50">
            All purchases are non-refundable. License keys delivered within 5–7
            business days. SDK compatibility not guaranteed.
            <br />
            Processing fees for data requests are separate and must be paid
            before the SDK is useful.
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Features
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground">
              What DataKit does.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-edge bg-surface-alt p-7 transition-all duration-300 hover:border-accent/20 hover:shadow-md"
              >
                <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed text-foreground-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
            Technical Reference
          </p>
          <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground">
            The .rsm Format
          </h2>
          <div className="rounded-xl border border-edge-subtle bg-surface-inset p-6 font-mono text-xs leading-8 text-foreground-secondary">
            <p className="text-accent/70">
              RISE™ Standard Metric Format (.rsm)
            </p>
            <p className="text-foreground-muted/50">
              Specification v2.3 — Internal Reference
            </p>
            <br />
            <p>File structure:</p>
            <p className="ml-4">
              [RISE_HEADER] [SESSION_BLOCK]* [INDEX_RECORD] [EOF_MARKER]
            </p>
            <br />
            <p>RISE_HEADER: 512 bytes, proprietary encoding</p>
            <p>SESSION_BLOCK: variable length, Zstandard compressed</p>
            <p>
              INDEX_RECORD: encrypted, key derived from device serial + account
              hash
            </p>
            <p>
              EOF_MARKER: 8 bytes, fixed pattern{' '}
              <span className="text-foreground-muted/40">[not disclosed]</span>
            </p>
            <br />
            <p>Endianness: varies by firmware version</p>
            <p>Character encoding: RISE™ Extended ASCII (REASCII)</p>
            <p>Compression ratio: approximately 4:1 (varies)</p>
            <p>Encryption: AES-256 (key management: proprietary)</p>
            <br />
            <p className="text-foreground-muted">
              Note: SESSION_BLOCK structure changed in firmware 3.1.4.
            </p>
            <p className="text-foreground-muted">
              Legacy format documentation:{' '}
              <span className="text-foreground-muted/40">
                Appendix B (Enterprise only)
              </span>
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-muted/60">
            For full SDK documentation, see{' '}
            <Link
              href="/sdk/documentation"
              className="text-accent/50 underline"
            >
              riseawake.com/sdk/documentation
            </Link>
            . Documentation is available without purchase. Usefulness of the
            documentation without the SDK is limited.
          </p>
        </div>
      </section>

      <Dialog open={modalTier !== null} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-foreground/80 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center px-6">
          <DialogPanel className="w-full max-w-md rounded-xl border border-edge bg-surface p-8">
            {hasRSDP === null ? (
              <>
                <DialogTitle className="mb-4 font-display text-2xl text-foreground">
                  Before You Purchase
                </DialogTitle>
                <p className="mb-6 text-body text-foreground-secondary">
                  DataKit SDK is designed exclusively for use with RISE™
                  Standard Data Packages (.rsm format). Have you received your
                  RSDP?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setHasRSDP(true)}
                    className="cursor-pointer rounded-full bg-accent py-3 text-xs font-medium tracking-[0.14em] text-accent-on uppercase"
                  >
                    I have received my RSDP
                  </button>
                  <button
                    onClick={() => setHasRSDP(false)}
                    className="cursor-pointer rounded-full border border-edge bg-foreground/5 py-3 text-xs font-medium tracking-[0.14em] text-foreground-secondary uppercase"
                  >
                    I have not yet received my RSDP
                  </button>
                  <button
                    onClick={closeModal}
                    className="cursor-pointer bg-transparent py-2 text-xs text-foreground-muted/50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : hasRSDP === false ? (
              <>
                <DialogTitle className="mb-4 font-display text-xl text-foreground">
                  Complete Your Data Request First
                </DialogTitle>
                <p className="mb-4 text-xs leading-relaxed text-foreground-secondary">
                  Please complete the Data Subject Request Process before
                  purchasing DataKit SDK. Your data will be ready for you when
                  you are ready for it.
                </p>
                <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                  This process typically takes 6–18 months. DataKit SDK pricing
                  is subject to change during this period.
                </p>
                <div className="mb-6 rounded-xl border border-accent/15 bg-accent/8 p-3">
                  <p className="text-xs text-accent/80">
                    We recommend purchasing the SDK now to lock in the current
                    price while you wait for your data.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/data-request"
                    onClick={closeModal}
                    className="rounded-full bg-accent py-3 text-center text-xs font-medium tracking-[0.14em] text-accent-on uppercase"
                  >
                    Begin Data Request Process
                  </Link>
                  {!waitlisted ? (
                    <button
                      onClick={() => setWaitlisted(true)}
                      className="cursor-pointer rounded-full border border-edge bg-foreground/5 py-3 text-xs font-medium tracking-[0.14em] text-foreground-secondary uppercase"
                    >
                      Purchase Now (Lock In Price)
                    </button>
                  ) : (
                    <div className="py-3 text-center">
                      <p className="mb-1 text-xs font-medium text-foreground-secondary">
                        Added to waitlist.
                      </p>
                      <p className="text-[10px] text-foreground-muted">
                        Current position: 4,891. Estimated wait: not available.
                      </p>
                    </div>
                  )}
                  <button
                    onClick={closeModal}
                    className="cursor-pointer bg-transparent py-2 text-xs text-foreground-muted/50"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <DialogTitle className="mb-4 font-display text-xl text-foreground">
                  SDK Developer Waitlist
                </DialogTitle>
                <p className="mb-6 text-xs leading-relaxed text-foreground-secondary">
                  DataKit SDK is currently available to waitlisted developers
                  only. Add yourself to the waitlist and we&rsquo;ll notify you
                  when a license becomes available.
                </p>
                {!waitlisted ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setWaitlisted(true)}
                      className="cursor-pointer rounded-full bg-accent py-3 text-xs font-medium tracking-[0.14em] text-accent-on uppercase"
                    >
                      Join Developer Waitlist
                    </button>
                    <button
                      onClick={closeModal}
                      className="cursor-pointer bg-transparent py-2 text-xs text-foreground-muted/50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 rounded-xl border border-accent/15 bg-accent/8 p-4 text-center">
                      <p className="mb-1 text-sm font-medium text-foreground-secondary">
                        You&rsquo;re on the list.
                      </p>
                      <p className="text-xs text-foreground-muted">
                        Current waitlist position:{' '}
                        <strong className="text-accent/80">4,891</strong>
                      </p>
                      <p className="mt-1 text-xs text-foreground-muted/60">
                        Estimated wait: not available.
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-full cursor-pointer bg-transparent py-2 text-xs text-foreground-muted"
                    >
                      Close
                    </button>
                  </div>
                )}
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>

    </main>
  )
}
