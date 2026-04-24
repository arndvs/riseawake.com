'use client'

import { Link } from '@/components/link'

const CASE_STUDIES = [
  {
    org: 'Regional Transit Authority',
    type: 'Public Sector — Transportation',
    size: '1,200 operators enrolled',
    result: '94.7% on-time morning departure rate, up from 71.2%',
    period: '18-month pilot, 2023–2024',
    quote:
      'We had a 23.5-minute average delay in operator morning reporting. It is now 4.1 minutes. We do not fully understand the mechanism. The mechanism is not our concern.',
    attribution: 'Director of Operations — name withheld by request',
    dataNote:
      'Operator compliance data shared with the Authority under Section 13 of the Sleep & Environmental Data Policy. Operators were informed of data sharing at enrollment. Opt-out requires discontinuing device use.',
  },
  {
    org: 'Professional Services Firm',
    type: 'Private Sector — Consulting',
    size: '87 senior associates enrolled',
    result:
      'Client meeting punctuality: 98.3% (was 84.1%). Billable hour capture increased 11.2%.',
    period: '12-month pilot, Q1–Q4 2024',
    quote:
      'The ROI calculation is straightforward. The conversation about whether we should be doing this is less straightforward. We have decided that the ROI calculation is the relevant one.',
    attribution: 'Chief People Officer — name withheld by request',
    dataNote:
      'Individual compliance data reviewed weekly by HR. Compliance below 90% over a 30-day period flagged for performance review discussion. This was disclosed to employees at enrollment.',
  },
  {
    org: 'Logistics Company',
    type: 'Private Sector — Supply Chain',
    size: '340 warehouse shift leads enrolled',
    result:
      'Shift start compliance: 99.1%. Unplanned absence rate reduced 34%.',
    period: '24-month program, 2023–2024',
    quote: 'We had a morning problem. We no longer have a morning problem.',
    attribution: 'VP Operations — name withheld by request',
    dataNote:
      'Aggregate compliance data reported monthly. Individual data available to line managers upon written request to HR. The request process takes approximately 3 business days.',
  },
]

const PRICING = [
  {
    tier: 'Corporate Essentials',
    price: '$3,800',
    period: 'per device / year',
    min: '25 devices minimum',
    includes: [
      'Push Mode device (leased)',
      'Monthly aggregate compliance reporting',
      'HR dashboard — department-level data',
      'Standard support',
      'Section 13 data sharing agreement',
    ],
    note: 'Device is leased, not purchased. On employee departure, device is returned. Data remains with RISE per the data retention policy.',
    accent: false,
  },
  {
    tier: 'Corporate Professional',
    price: '$5,200',
    period: 'per device / year',
    min: '10 devices minimum',
    includes: [
      'Push Mode device (leased)',
      'Weekly individual compliance reports',
      'HR dashboard — individual-level data',
      'RISE Index score access',
      'Priority support',
      'Dedicated account manager',
      'Section 13 data sharing agreement — extended',
    ],
    note: 'Individual RISE Index scores are visible to authorized HR personnel. Employees are informed of this at enrollment.',
    accent: true,
  },
  {
    tier: 'Corporate Enterprise',
    price: 'Custom',
    period: 'contact us',
    min: '100+ devices',
    includes: [
      'Push Mode device (leased or purchased)',
      'Real-time compliance dashboard',
      'Full individual data access via DataKit API',
      'Audio classification metadata (restricted tier)',
      'Relationship inference and co-presence data',
      'Custom reporting',
      'Dedicated engineering support',
      'On-site installation available',
    ],
    note: 'Audio classification metadata and relationship inference data are available at this tier. Employees are informed at enrollment that this data category exists. The specific content is not shared with employees.',
    accent: false,
  },
]

export default function EnterprisePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.05]" />
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-eyebrow text-foreground-muted uppercase">
            RISE for Organizations
          </p>
          <h1 className="mb-6 font-display text-display text-foreground-strong">
            Your people have
            <br />
            <span className="text-foreground-muted/30">already decided.</span>
          </h1>
          <p className="mb-4 max-w-2xl text-body text-foreground-secondary">
            The morning compliance problem is not a motivation problem. Your
            employees want to be on time. They have a hardware problem. Push
            Mode is the structural intervention that makes their decision hold.
          </p>
          <p className="max-w-2xl text-body text-foreground-muted/50">
            Their compliance data will be shared with you as described in the
            Privacy Policy, Section 13. They cannot opt out without
            discontinuing use of the product.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-block glow-btn rounded-full bg-accent px-10 py-4 text-xs font-medium tracking-widest text-accent-on uppercase"
            >
              Request a Pilot
            </Link>
            <Link
              href="#pricing"
              className="inline-block rounded-full border border-edge bg-surface-alt px-10 py-4 text-xs font-medium tracking-widest text-foreground-muted uppercase"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-px bg-edge-subtle md:grid-cols-4">
            {[
              {
                stat: '98%',
                label: 'Consumer compliance rate',
                sub: 'Cross-context baseline',
              },
              {
                stat: '94.7%',
                label: 'Corporate pilot average',
                sub: '3 active pilots',
              },
              {
                stat: '312K+',
                label: 'Morning sessions logged',
                sub: 'Corporate accounts',
              },
              {
                stat: 'Section 13',
                label: 'Data sharing',
                sub: 'Privacy Policy',
              },
            ].map((s) => (
              <div key={s.label} className="bg-surface p-8">
                <p className="mb-1 font-display text-3xl tracking-tight text-foreground">
                  {s.stat}
                </p>
                <p className="text-[11px] text-foreground-secondary">
                  {s.label}
                </p>
                <p className="mt-1 text-[9px] text-foreground-muted">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
                The Problem
              </p>
              <h2 className="mb-6 font-display text-subsection text-foreground-strong">
                The morning gap costs organizations more than they measure.
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-foreground-secondary/65">
                The 45-minute window between when your people say they will be
                ready and when they actually are represents lost billable hours,
                delayed shift starts, and compounding lateness that most
                organizations have accepted as structural.
              </p>
              <p className="text-sm leading-relaxed text-foreground-muted/50">
                It is not structural. It is a hardware problem. Your employees
                do not have the right hardware.
              </p>
            </div>
            <div>
              <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
                The Intervention
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: 'Structural, not motivational',
                    body: 'Push Mode does not ask your employees to be more disciplined. It changes the structure of their morning so discipline is not required.',
                  },
                  {
                    title: 'Non-interruptible by design',
                    body: 'Once initiated, Push Mode cannot be manually overridden. This is a feature. The decision was made the night before. What follows is execution.',
                  },
                  {
                    title: 'Data visible to you',
                    body: 'Individual compliance data, RISE Index scores, and session logs are available to authorized HR personnel under the corporate data sharing agreement.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded border border-edge bg-surface-alt p-5"
                  >
                    <p className="mb-1.5 text-xs font-medium text-foreground-secondary">
                      {item.title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-foreground-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
            Pilot Results
          </p>
          <h2 className="mb-16 font-display text-subsection text-foreground-strong">
            Organizations using Push Mode.
          </h2>

          <div className="flex flex-col gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.org}
                className="rounded border border-edge bg-surface-alt p-8"
              >
                <div className="mb-6 flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-foreground-secondary">
                      {cs.org}
                    </p>
                    <p className="text-[10px] text-foreground-muted">
                      {cs.type} · {cs.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-medium text-emerald-500/80">
                      {cs.result}
                    </p>
                    <p className="mt-0.5 text-[10px] text-foreground-muted">
                      {cs.period}
                    </p>
                  </div>
                </div>
                <blockquote className="mb-3 border-l-2 border-accent/30 pl-4 text-sm leading-relaxed text-foreground-secondary/70 italic">
                  &ldquo;{cs.quote}&rdquo;
                </blockquote>
                <p className="mb-2 text-[10px] text-foreground-muted">
                  &mdash; {cs.attribution}
                </p>
                <p className="text-[10px] leading-relaxed text-yellow-500/50 italic">
                  Data note: {cs.dataNote}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-foreground-muted/40 italic">
            Organization names withheld by request. Results verified by RISE
            Internal Analytics. Independent third-party verification of
            corporate pilot data is in progress. Expected completion Q2 2025.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
            Pricing
          </p>
          <h2 className="mb-4 font-display text-subsection text-foreground-strong">
            Corporate pricing.
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-foreground-muted">
            All tiers require a Section 13 data sharing agreement executed by an
            authorized representative of the organization. This agreement
            governs what compliance data is shared with you and how. It is not
            optional.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.tier}
                className={`flex flex-col rounded border p-8 ${
                  tier.accent
                    ? 'border-accent/20 bg-accent/[0.05]'
                    : 'border-edge bg-surface-alt'
                }`}
              >
                <p
                  className={`mb-3 text-[10px] tracking-widest uppercase ${
                    tier.accent ? 'text-accent/70' : 'text-foreground-muted'
                  }`}
                >
                  {tier.tier}
                </p>
                <p className="mb-1 font-display text-3xl tracking-tight text-foreground">
                  {tier.price}
                </p>
                <p className="text-[11px] text-foreground-muted">
                  {tier.period}
                </p>
                <p className="mb-5 text-[10px] text-foreground-muted/50">
                  {tier.min}
                </p>
                <div className="mb-6 flex flex-1 flex-col gap-2">
                  {tier.includes.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="shrink-0 text-[11px] text-emerald-500/60">
                        ✓
                      </span>
                      <p className="text-[11px] leading-snug text-foreground-secondary/65">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                {tier.note && (
                  <p className="mb-4 text-[10px] leading-relaxed text-yellow-500/50 italic">
                    {tier.note}
                  </p>
                )}
                <a
                  href="mailto:enterprise@riseawake.com?subject=Enterprise%20Inquiry"
                  className={`block w-full rounded py-2.5 text-center text-[11px] font-medium tracking-widest uppercase no-underline ${
                    tier.accent
                      ? 'bg-accent text-accent-on'
                      : 'bg-surface text-foreground-muted'
                  }`}
                >
                  {tier.price === 'Custom' ? 'Contact Us' : 'Request Pilot'}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded border border-edge-subtle bg-surface-alt/50 p-6">
            <p className="text-[11px] leading-relaxed text-foreground-muted/50">
              All corporate programs require execution of a Section 13 data
              sharing agreement prior to device deployment. Enrolled employees
              will be informed that compliance data is shared with their
              organization at enrollment. The specific data fields shared depend
              on the tier. Employees who wish to opt out must discontinue use of
              the device. Devices are leased at the Essentials and Professional
              tiers and must be returned upon employee departure or program
              termination. Data collected during the program is retained by RISE
              under the standard data retention policy regardless of program
              termination.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-edge-subtle bg-surface px-6 py-24 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
            Get Started
          </p>
          <h2 className="mb-6 font-display text-subsection text-foreground-strong">
            Start a corporate pilot.
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-foreground-secondary/65">
            Pilots begin with a minimum of 10 devices and a 90-day commitment.
            The Section 13 data sharing agreement is executed at pilot
            initiation, not at program expansion.
          </p>
          <p className="mb-6 text-xs text-foreground-muted">
            Enterprise inquiries: enterprise@riseawake.com
          </p>
          <p className="text-[10px] leading-relaxed text-foreground-muted/40 italic">
            RISE corporate programs are currently available in the United
            States, Canada, and the United Kingdom. Programs in other markets
            are subject to regulatory review of autonomous morning routing
            device classification. RISE does not accelerate regulatory
            timelines.
          </p>
        </div>
      </section>
    </main>
  )
}
