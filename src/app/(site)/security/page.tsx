import { Link } from '@/components/link'
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Security — RISE™',
  description:
    'How RISE™ protects your data, your privacy, and your morning routine. Certifications, compliance, and infrastructure.',
  path: '/security',
})

// ── Certification badge data ────────────────────────────────────────────────

const CERTIFICATIONS = [
  {
    name: 'SOC 2 Type II',
    status: 'Pending',
    detail: 'Application submitted Q3 2023. Audit engagement confirmed.',
    footnote: 'Status: Awaiting auditor availability.',
  },
  {
    name: 'SOC 1 Type II',
    status: 'Pending',
    detail:
      'Readiness assessment initiated Q1 2024. Internal controls documentation in progress.',
    footnote: 'Documentation 40% complete as of August 2024.',
  },
  {
    name: 'ISO 27001',
    status: 'In Progress',
    detail:
      'Gap assessment complete. 14 of 93 controls implemented. Remediation in progress.',
    footnote: 'Gap assessment completed: June 2023.',
  },
  {
    name: 'HIPAA',
    status: 'Applicable',
    detail:
      'RISE™ has implemented applicable security policies and procedures to ensure compliance with all applicable rules and regulations.',
    footnote:
      'For compliance purposes, RISE™ considers itself a Business Associate. BAA template: Awaiting Legal Review.',
  },
  {
    name: 'GDPR',
    status: 'Acknowledged',
    detail:
      'RISE™ acknowledges the General Data Protection Regulation and has taken steps to understand its requirements.',
    footnote:
      'Data Protection Officer appointment: Pending. DPA template drafted Q2 2023.',
  },
  {
    name: 'CCPA / CPRA',
    status: 'Noted',
    detail:
      'RISE™ is aware of the California Consumer Privacy Act and its amendments. A compliance review has been initiated.',
    footnote: 'Review initiated: March 2024. Current status: Initiated.',
  },
]

// ── Security features data ──────────────────────────────────────────────────

const FEATURES = [
  {
    title: 'Enterprise-Grade Encryption',
    description:
      'All data transmitted between your RISE™ base and our cloud infrastructure is protected using 256-bit SSL/TLS encryption — the same standard used by leading financial institutions. Data at rest is encrypted using AES-256 with keys managed through our internal key management service.',
    footnote:
      'SSL certificate last renewed: August 11, 2024. Key rotation last completed: August 12, 2024.',
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'RISE™ operates entirely on Amazon Web Services (AWS), leveraging industry-leading infrastructure security, redundancy, and compliance certifications. Our team follows best practices and internal guidelines to ensure safety and durability of all customer data.',
    footnote:
      'Infrastructure configuration last reviewed: August 2024. Reviewer: A. Reyes.',
  },
  {
    title: 'Continuous Monitoring',
    description:
      'Our IT Security team monitors access events across all RISE™ systems around the clock. Every anomalous access attempt triggers an automated notification. Our team has been notified of 100% of flagged events and maintains full awareness of all ongoing access patterns.',
    footnote: 'The team is aware. The team has been aware.',
  },
  {
    title: 'State-of-the-Art Backups',
    description:
      'Your data is continuously backed up across multiple secure locations, updated throughout the day, every day. Our backup infrastructure ensures data durability regardless of circumstances.',
    footnote:
      'Backup restoration last tested: Q2 2024. Next test scheduled: Q4 2024.',
  },
  {
    title: 'Web Application Firewall',
    description:
      'RISE™ leverages the latest in WAF technologies to detect and mitigate denial-of-service attacks and other malicious traffic patterns before they impact the platform. All API calls are monitored and analyzed in real time.',
    footnote:
      'WAF rules last updated: July 2024. Update cadence: As needed.',
  },
  {
    title: 'Key Rotation',
    description:
      'Encryption is only as strong as the privacy of the encryption key. Our system leverages key rotation to ensure all data is secured with keys that change on a regular schedule, stored using FIPS 140-2 validated hardware security modules.',
    footnote:
      'Last rotation: August 12, 2024. Rotation schedule: Regular.',
  },
  {
    title: 'Role-Based Access Controls',
    description:
      'All internal documents and systems are governed by a four-tier classification system: Internal, Confidential, Restricted, and Dr.\u00a0Voss Eyes Only. Access is granted based on role, department, and operational need.',
    footnote:
      'Access control enforcement layer: Scheduled for implementation. Document visibility default: Public.',
  },
  {
    title: 'Incident Response',
    description:
      'RISE™ maintains a documented incident response plan with a target response time SLA of less than 4 hours. All incidents are logged, categorized, and tracked through resolution. Our Q4 2024 resolution rate was 91%.',
    footnote:
      'Remaining 9% of incidents have been monitored since Q3 2022. Monitoring continues.',
  },
]

// ── Compliance progress data ────────────────────────────────────────────────

const COMPLIANCE_PROGRESS = [
  {
    name: 'SOC 2 Type II',
    progress: 18,
    initiated: 'Q3 2023',
    label: 'On Track',
  },
  {
    name: 'ISO 27001',
    progress: 15,
    initiated: 'Q2 2023',
    label: 'On Track',
  },
  {
    name: 'HIPAA Compliance',
    progress: 28,
    initiated: 'Q1 2024',
    label: 'On Track',
  },
  {
    name: 'Penetration Testing',
    progress: 22,
    initiated: 'Q2 2024',
    label: 'Scheduled',
  },
  {
    name: 'Third-Party Audit',
    progress: 12,
    initiated: 'Q3 2024',
    label: 'In Progress',
  },
]

// ── Shield icon component ───────────────────────────────────────────────────

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 2L4 10v12c0 10.5 6.8 20.3 16 22.8 9.2-2.5 16-12.3 16-22.8V10L20 2z"
        className="fill-accent/8 stroke-accent/40"
        strokeWidth="1.5"
      />
      <path
        d="M15 22l4 4 8-8"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        className="fill-accent/8 stroke-accent/40"
        strokeWidth="1.5"
      />
      <path
        d="M8 11V7a4 4 0 1 1 8 0v4"
        className="stroke-accent/40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Security
          </p>
          <h1 className="mb-6 font-display text-display tracking-tight text-foreground">
            Security at RISE™
          </h1>
          <p className="mb-6 max-w-2xl text-base leading-loose text-foreground-secondary">
            Trust is the foundation of everything we build. When you invite
            RISE™ into your bedroom, your morning routine, and your commute,
            you&rsquo;re trusting us with more than data — you&rsquo;re trusting
            us with the first and last moments of your day. We take that
            seriously.
          </p>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            Our security program is designed to protect the data generated by
            2,048 pressure sensors, environmental audio classification, occupancy
            detection, relationship status inference, and autonomous navigation
            telemetry. We understand the sensitivity of this information.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/security/trust-center"
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-6 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent/12"
            >
              Visit Trust Center
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/legal/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-sm font-medium text-foreground-secondary transition-colors duration-200 hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* ── Certification Badges ── */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Compliance & Certifications
          </p>
          <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
            Industry-Recognized Standards
          </h2>
          <p className="mb-14 max-w-xl text-sm leading-relaxed text-foreground-muted">
            RISE™ is committed to achieving and maintaining compliance with the
            security frameworks that matter most to our customers.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col rounded-xl border border-edge-subtle bg-surface-alt p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <ShieldIcon className="h-10 w-10 shrink-0" />
                  <span className="rounded-xl border border-edge-subtle bg-foreground/4 px-2 py-0.5 text-[10px] text-foreground-muted/50">
                    {cert.status}
                  </span>
                </div>
                <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                  {cert.name}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                  {cert.detail}
                </p>
                <p className="mt-auto text-[10px] italic leading-relaxed text-foreground-muted/40">
                  {cert.footnote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Availability ── */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
              Reliability
            </p>
            <h2 className="mb-2 font-display text-hero tracking-tight text-foreground">
              99.97%
            </h2>
            <p className="mb-3 text-sm font-medium text-foreground-secondary">
              Platform Availability
            </p>
            <p className="max-w-lg text-xs leading-relaxed text-foreground-muted/50">
              Calculated for periods during which monitoring infrastructure was
              operational. Excludes scheduled maintenance windows, unscheduled
              maintenance events, and intervals during which the monitoring
              service itself was unavailable. Availability is measured across
              customer-facing services only. Internal systems, including the
              document management portal, are excluded from this calculation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Security Features Grid ── */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Infrastructure
          </p>
          <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
            How We Protect Your Data
          </h2>
          <p className="mb-14 max-w-xl text-sm leading-relaxed text-foreground-muted">
            From encryption in transit to access controls at rest, every layer
            of the RISE™ platform is designed with security as a first
            principle.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col rounded-xl border border-edge-subtle bg-surface-alt p-7"
              >
                <div className="mb-4">
                  <LockIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                  {feature.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                  {feature.description}
                </p>
                <p className="mt-auto text-[10px] italic leading-relaxed text-foreground-muted/40">
                  {feature.footnote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Progress ── */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Progress
          </p>
          <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
            Certification Progress
          </h2>
          <p className="mb-14 max-w-xl text-sm leading-relaxed text-foreground-muted">
            RISE™ is actively pursuing industry certifications across multiple
            security and compliance frameworks. All programs are on track.
          </p>

          <div className="space-y-6">
            {COMPLIANCE_PROGRESS.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground-secondary">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-foreground-muted/40">
                      Initiated: {item.initiated}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-accent/12 bg-accent/8 px-2 py-0.5 text-[10px] text-accent/70">
                      {item.label}
                    </span>
                    <span className="text-xs tabular-nums text-foreground-muted">
                      {item.progress}%
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
                  <div
                    className="h-full rounded-full bg-accent/40 transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[10px] leading-relaxed text-foreground-muted/40">
            Progress percentages are approximate and reflect internal
            milestones. Milestone definitions were established at program
            initiation and have not been revised. Timeline estimates are not
            provided. RISE™ is committed to completing all certifications.
          </p>
        </div>
      </section>

      {/* ── Data Handling ── */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Data Practices
          </p>
          <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
            Responsible Data Handling
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-7">
              <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                Data Retention
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                RISE™ retains personal data only as long as necessary for
                operational purposes and in accordance with applicable
                regulations. Retention periods are defined per data category
                and reviewed periodically.
              </p>
              <p className="text-[10px] italic leading-relaxed text-foreground-muted/40">
                Audio data access log distribution list last audited: 2019.
                Audit of the audit schedule: Pending.
              </p>
            </div>

            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-7">
              <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                Data Minimization
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                We collect only the data required to deliver, improve, and
                secure the RISE™ experience. This includes pressure sensor
                telemetry, environmental audio classification, occupancy
                patterns, navigation logs, and relationship inference data.
              </p>
              <p className="text-[10px] italic leading-relaxed text-foreground-muted/40">
                Excluding data stored in browser localStorage for operational
                continuity purposes.
              </p>
            </div>

            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-7">
              <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                Third-Party Audits
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                RISE™ engages independent auditors on an annual basis to
                evaluate the effectiveness of our security controls,
                infrastructure resilience, and data handling practices.
              </p>
              <p className="text-[10px] italic leading-relaxed text-foreground-muted/40">
                Most recent audit: In progress. Prior audit: In progress.
                Auditor selection for next audit: Under review.
              </p>
            </div>

            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-7">
              <h3 className="mb-3 text-sm font-medium text-foreground-secondary">
                Penetration Testing
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                Regular penetration testing is conducted to identify and
                remediate vulnerabilities before they can be exploited.
                Testing is performed by qualified third-party security
                firms.
              </p>
              <p className="text-[10px] italic leading-relaxed text-foreground-muted/40">
                Last completed: Q2 2024. Next scheduled: Q4 2024.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Security Team & Contact ── */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            Our Team
          </p>
          <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
            Dedicated Security Operations
          </h2>
          <p className="mb-14 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            Our IT Security team is the backbone of RISE™&rsquo;s security
            posture. Every flagged event is acknowledged. Every anomalous
            access pattern is noted. The team maintains continuous awareness
            of all security-relevant activity across the platform.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-edge-subtle bg-surface p-7 text-center">
              <p className="mb-1 font-display text-subsection tracking-tight text-foreground">
                100%
              </p>
              <p className="text-xs text-foreground-muted">
                Event notification rate
              </p>
            </div>
            <div className="rounded-xl border border-edge-subtle bg-surface p-7 text-center">
              <p className="mb-1 font-display text-subsection tracking-tight text-foreground">
                &lt;\u00a04h
              </p>
              <p className="text-xs text-foreground-muted">
                Target response SLA
              </p>
            </div>
            <div className="rounded-xl border border-edge-subtle bg-surface p-7 text-center">
              <p className="mb-1 font-display text-subsection tracking-tight text-foreground">
                24/7
              </p>
              <p className="text-xs text-foreground-muted">
                Awareness maintained
              </p>
            </div>
          </div>

          <p className="mt-8 text-[10px] italic leading-relaxed text-foreground-muted/40">
            &ldquo;Awareness maintained&rdquo; reflects the team&rsquo;s
            notification receipt status. The team has been notified of all
            events. The team is aware. The team has been aware for some time.
            The team will continue to be aware.
          </p>
        </div>
      </section>

      {/* ── Responsible Disclosure ── */}
      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Responsible Disclosure
              </p>
              <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
                Bug Bounty Program
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-foreground-muted">
                RISE™ welcomes responsible security disclosure from researchers
                and the broader security community. We value the contributions
                of independent researchers in helping us maintain the integrity
                of our platform.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-foreground-muted">
                To date, we have received zero vulnerability reports through
                this program. We attribute this to the robustness of our
                security posture.
              </p>
              <Link
                href="/security/report"
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-5 py-2.5 text-xs font-medium text-accent transition-colors duration-200 hover:bg-accent/12"
              >
                Submit a Report
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Contact
              </p>
              <h2 className="mb-4 font-display text-subsection tracking-tight text-foreground">
                Security Inquiries
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-foreground-muted">
                For security-related questions, audit requests, or compliance
                inquiries, please contact our security team. All inquiries
                are acknowledged and routed to the appropriate team member.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-foreground-secondary">
                  security@riseco.online
                </p>
                <p className="text-sm text-foreground-secondary">
                  compliance@riseco.online
                </p>
              </div>
              <p className="mt-6 text-[10px] italic leading-relaxed text-foreground-muted/40">
                Average response time: Under review. Response time SLA has
                not been established for external inquiries. Internal
                response time SLA (&lt;\u00a04h) applies to automated system
                notifications only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-edge-subtle bg-foreground/2 p-6">
            <p className="text-xs leading-loose text-foreground-muted">
              RISE™ is committed to the security and privacy of our
              customers&rsquo; data. This page represents our current security
              posture and ongoing compliance efforts as of the date of last
              update. Certification statuses, compliance progress, and
              infrastructure details are provided for informational purposes
              and may not reflect the most current state of any given program.
              RISE™ makes no warranties, express or implied, regarding the
              completeness or timeliness of any certification process. For the
              most current information, please visit our Trust Center.
            </p>
            <p className="mt-4 text-[10px] text-foreground-muted/40">
              Last updated: August 12, 2024.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
