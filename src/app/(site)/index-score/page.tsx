import { Link } from '@/components/link'

const FACTORS = [
  {
    label: 'Morning compliance rate',
    desc: 'The percentage of Push Mode sessions in which you arrived at your destination within the configured time window. Updated after every session.',
  },
  {
    label: 'Activation profile inputs',
    desc: 'Self-reported lifestyle factors entered during the 12-stage activation process, including sleep consistency, morning resistance, and disclosed habits.',
  },
  {
    label: 'Behavioral drift',
    desc: 'The degree to which your actual morning behavior diverges from your activation configuration over time. Tracked and weighted.',
  },
  {
    label: 'Session consistency',
    desc: 'The regularity of your Push Mode usage relative to your configured schedule. Unexplained gaps are noted. Vacation Mode suspends scoring.',
  },
  {
    label: 'Environmental factors',
    desc: 'Duration estimates versus actual durations at each configured stop. The kitchen stop is the most common source of negative drift.',
  },
  {
    label: 'Notes and disclosures',
    desc: 'The content of the notes you provided to the bed during activation. These are retained and weighted. We are not specific about how.',
  },
]

const SCORE_RANGES = [
  {
    range: '0\u201330',
    label: 'Needs significant support',
    note: 'Push Mode was designed for this range. This is not a judgment. It is a starting point.',
  },
  {
    range: '31\u201350',
    label: 'Below operational baseline',
    note: 'The most common range among new activations. Push Mode typically improves this within 30 days.',
  },
  {
    range: '51\u201370',
    label: 'Operational',
    note: 'The functional range. Most active users reside here. Push Mode calibrates to maintain and improve.',
  },
  {
    range: '71\u201385',
    label: 'High compliance',
    note: 'Above average. Push Mode has less work to do. It does it anyway.',
  },
  {
    range: '86\u2013100',
    label: 'Exceptional compliance',
    note: 'Rare. The bed notes this. It does not change anything about how Push Mode operates. The button works the same.',
  },
]

export default function IndexScorePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.05]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-eyebrow text-foreground-muted uppercase">
            Compliance & Lifestyle Scoring
          </p>
          <h1 className="mb-6 font-display text-display text-foreground-strong">
            The RISE Index.
          </h1>
          <p className="mb-4 max-w-xl text-body text-foreground-secondary">
            Every RISE account holder has a RISE Index score. The score is
            calculated at activation and updated after each Push Mode session. It
            reflects your current morning compliance profile.
          </p>
          <p className="max-w-xl text-body italic text-foreground-muted">
            The methodology is not disclosed. Scores range from 0 to 100. The
            distribution is not shared.
          </p>
        </div>
      </section>

      {/* What it measures */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-eyebrow text-foreground-muted uppercase">
            What the Index measures
          </p>
          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {FACTORS.map(({ label, desc }) => (
              <div key={label} className="bg-surface p-8">
                <p className="mb-3 text-xs font-medium text-foreground-secondary">
                  {label}
                </p>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score ranges */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-eyebrow text-foreground-muted uppercase">
            Score ranges
          </p>
          <div className="flex flex-col gap-3">
            {SCORE_RANGES.map(({ range, label, note }) => (
              <div
                key={range}
                className="flex gap-5 rounded border border-edge bg-surface-alt p-4"
              >
                <div className="min-w-14">
                  <span className="font-display text-lg text-accent">
                    {range}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-foreground-secondary">
                    {label}
                  </p>
                  <p className="text-[11px] leading-relaxed text-foreground-muted">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            Methodology
          </p>
          <div className="rounded-lg border border-edge bg-surface-alt p-8">
            <p className="mb-4 text-body text-foreground-secondary">
              The RISE Index methodology is proprietary and not disclosed. RISE
              has made this decision deliberately and does not anticipate
              changing it.
            </p>
            <p className="mb-4 text-body text-foreground-muted">
              The inputs that contribute to the Index are described above. The
              weighting, formula, and score adjustment logic are internal. RISE
              DataKit subscribers can view their historical score timeline,
              individual session contributions, and score trajectory. The formula
              itself is not available through DataKit.
            </p>
            <p className="text-body text-foreground-muted/60">
              RISE does not share Index scores with third parties except as
              described in the{' '}
              <Link
                href="/legal/privacy"
                className="text-foreground-muted underline transition-colors hover:text-foreground-secondary"
              >
                Privacy Policy
              </Link>{' '}
              and the{' '}
              <Link
                href="/legal/sleep-data-policy"
                className="text-foreground-muted underline transition-colors hover:text-foreground-secondary"
              >
                Sleep & Environmental Data Policy
              </Link>
              . Your Index score cannot be deleted. Closed accounts retain their
              score. This is addressed in the{' '}
              <Link
                href="/legal/push-mode-eula"
                className="text-foreground-muted underline transition-colors hover:text-foreground-secondary"
              >
                Push Mode EULA
              </Link>
              .
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-edge-subtle bg-surface-alt/50 p-6">
            <p className="text-xs text-foreground-muted">
              DOC-008 — RISE Index Methodology
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground-muted/60">
              Internal documentation on the RISE Index methodology exists. It is
              classified RESTRICTED. It is available in the internal document
              system. The methodology section of that document is redacted.
            </p>
          </div>
        </div>
      </section>

      {/* View your score */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            View your score
          </p>
          <h2 className="mb-6 font-display text-subsection text-foreground-strong">
            Your score exists
            <br />
            <span className="text-foreground-muted/40">
              whether or not you have viewed it.
            </span>
          </h2>
          <p className="mb-8 text-body text-foreground-muted">
            RISE DataKit provides access to your score timeline, session
            history, and compliance data. DataKit requires a verified RISE
            account. Account verification requires an activated device.
          </p>
          <Link
            href="/sdk"
            className="glow-btn inline-block rounded-full bg-accent px-10 py-4 text-xs font-medium tracking-widest text-accent-on uppercase"
          >
            RISE DataKit &rarr;
          </Link>
          <p className="mt-5 text-[10px] leading-relaxed text-foreground-muted/40">
            Your RISE Index score was calculated when you activated your device.
            It has been updated every morning since.
            <br />
            If you have not yet activated, your score is pending.{' '}
            <Link
              href="/activate"
              className="text-foreground-muted/50 underline"
            >
              Activate your device.
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
