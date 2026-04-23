import {
  InvestorLayout,
  IRMetricCard,
} from '@/components/investors/investor-layout'
import { Link } from '@/components/link'

const METRICS = [
  { stat: '$89.4M', label: 'FY2024 Revenue', note: '+134% year-over-year' },
  {
    stat: '340,000',
    label: 'Active Waitlist',
    note: 'Demand constraint. By design.',
  },
  { stat: '68%', label: 'Gross Margin', note: 'FY2024' },
  {
    stat: '98%',
    label: 'Push Mode Compliance',
    note: 'vs. 74% Nudge generation',
  },
]

const NEWS = [
  {
    date: 'April 2, 2025',
    headline: 'RISE™ Files S-1 with SEC — IPO Anticipated Q3 2026',
    tag: 'Corporate',
  },
  {
    date: 'February 14, 2025',
    headline: 'FY2024 Annual Report Now Available',
    tag: 'Financial',
  },
  {
    date: 'November 8, 2024',
    headline:
      'RISE™ Closes $120M Series C to Accelerate Global Push Mode Deployment',
    tag: 'Funding',
  },
]

const QUICK_LINKS = [
  {
    label: 'Vision 2045',
    desc: 'Where RISE™ intends to be in 5, 10, and 20 years.',
    href: '/investors/vision',
    accent: true,
  },
  {
    label: 'CEO Letter',
    desc: 'Annual letter from Dr. Eleanor Voss, Founder & CEO.',
    href: '/investors/shareholder-letter',
    accent: false,
  },
  {
    label: 'Annual Report',
    desc: 'FY2024 full annual report including risk factors.',
    href: '/investors/annual-report',
    accent: false,
  },
  {
    label: 'Meeting Minutes',
    desc: 'FY2024 Annual General Meeting. Q&A included.',
    href: '/investors/meeting-minutes',
    accent: false,
  },
  {
    label: 'Financials',
    desc: 'Revenue, margins, unit economics, and geographic expansion.',
    href: '/investors/financials',
    accent: false,
  },
  {
    label: 'Press',
    desc: 'Media coverage and third-party commentary.',
    href: '/investors/press',
    accent: false,
  },
]

export default function InvestorsPage() {
  return (
    <InvestorLayout>
      <section className="px-6 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 pt-8">
            <p className="mb-5 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Investor Relations
            </p>
            <h1 className="font-display text-display leading-[1.05] tracking-tight text-foreground">
              Redefining the $4.2 trillion
              <br />
              productivity gap.
              <br />
              <span className="text-foreground-muted">
                One morning at a time.
              </span>
            </h1>
          </div>

          <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
            {METRICS.map((m) => (
              <IRMetricCard
                key={m.label}
                stat={m.stat}
                label={m.label}
                note={m.note}
              />
            ))}
          </div>

          <div className="mb-20">
            <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Latest
            </p>
            <div className="flex flex-col gap-3">
              {NEWS.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 rounded-xl border border-edge-subtle bg-surface-alt p-5"
                >
                  <span className="mt-0.5 shrink-0 text-[10px] text-foreground-muted">
                    {n.date}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed text-foreground-secondary">
                    {n.headline}
                  </span>
                  <span className="shrink-0 rounded-xl border border-accent/12 bg-accent/8 px-2 py-1 text-[10px] text-accent">
                    {n.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Resources
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {QUICK_LINKS.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className={`group block rounded-xl border p-6 transition-all duration-300 hover:shadow-md ${
                    q.accent
                      ? 'border-accent/20 bg-accent/6 hover:border-accent/35'
                      : 'border-edge-subtle bg-surface-alt hover:border-accent/20'
                  }`}
                >
                  <h3
                    className={`mb-2 text-sm font-medium ${
                      q.accent ? 'text-foreground' : 'text-foreground-secondary'
                    }`}
                  >
                    {q.label}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                    {q.desc}
                  </p>
                  <span
                    className={`inline-block text-xs ${
                      q.accent ? 'text-accent' : 'text-foreground-muted'
                    }`}
                  >
                    View →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-edge-subtle bg-surface-alt p-8">
            <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Investor Relations Contact
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm font-medium text-foreground-secondary">
                  Dr. Eleanor Voss
                </p>
                <p className="mb-3 text-xs text-foreground-muted">
                  Founder & Chief Executive Officer
                </p>
                <p className="text-xs text-accent">ir@riseawake.com</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-foreground-secondary">
                  Media Inquiries
                </p>
                <p className="mb-3 text-xs text-foreground-muted">
                  Press & Communications
                </p>
                <p className="text-xs text-accent">press@riseawake.com</p>
              </div>
            </div>
            <p className="mt-8 border-t border-edge-subtle pt-6 text-[10px] leading-loose text-foreground-muted">
              All materials provided for informational purposes only.
              Forward-looking statements involve risks and uncertainties. Push
              Mode compliance data independently verified by RISE™ Internal
              Analytics. Third-party verification pending. Past compliance rates
              do not guarantee future compliance rates. RISE™ is not responsible
              for investor decisions made based on information contained herein,
              including the decision to invest, which RISE™ nonetheless
              encourages.
            </p>
          </div>
        </div>
      </section>
    </InvestorLayout>
  )
}
