'use client'

import { useState } from 'react'
import { JOB_OPENINGS } from '@/lib/careers-data'

const JOBS = JOB_OPENINGS

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<string | null>(null)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-eyebrow text-foreground-muted uppercase">
            Open Roles
          </p>
          <h1 className="mb-6 font-display text-display text-foreground-strong">
            Careers.
          </h1>
          <p className="mb-4 max-w-2xl text-body text-foreground-secondary">
            RISE is 312 people building the product that removes the decision
            from the morning. We are preparing for an IPO. We have specific
            problems. Several of them are in the job descriptions.
          </p>
          <p className="max-w-2xl text-body text-foreground-muted">
            {JOBS.length} open roles. The job descriptions are accurate. Read
            them carefully.
          </p>

          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { stat: '312', label: 'Employees' },
              { stat: 'IPO', label: 'Q3 2026' },
              { stat: '98%', label: 'Compliance rate' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded border border-edge bg-surface-alt p-4 text-center"
              >
                <p className="font-display text-2xl tracking-tight text-foreground">
                  {s.stat}
                </p>
                <p className="text-[10px] tracking-widest text-foreground-muted uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="border-t border-edge-subtle px-6 pb-24">
        <div className="mx-auto max-w-4xl pt-16">
          <div className="flex flex-col gap-3">
            {JOBS.map((job) => {
              const isOpen = openJob === job.id
              return (
                <div
                  key={job.id}
                  className={`overflow-hidden rounded border transition-colors ${
                    isOpen
                      ? 'border-edge bg-surface-alt/60'
                      : 'border-edge-subtle bg-surface-alt'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setOpenJob(isOpen ? null : job.id)}
                    className="w-full cursor-pointer border-none bg-transparent p-5 text-left"
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <div className="flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          {job.urgent && (
                            <span className="rounded-sm bg-red-500/10 px-1.5 py-0.5 text-[9px] tracking-wider text-red-500/70 uppercase">
                              Urgent
                            </span>
                          )}
                          <span className="text-[9px] tracking-wide text-foreground-muted">
                            {job.id}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground-secondary">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-3">
                          {[
                            job.department,
                            job.location,
                            job.type,
                            job.level,
                          ].map((t) => (
                            <span
                              key={t}
                              className="text-[10px] text-foreground-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[11px] text-foreground-secondary">
                          {job.salary}
                        </p>
                        <p className="mt-0.5 text-[10px] text-accent/60">
                          {job.equity} equity
                        </p>
                        <p className="mt-1 text-[9px] text-foreground-muted">
                          {isOpen ? '\u25B2' : '\u25BC'}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-edge-subtle px-6 pb-7">
                      {/* Description */}
                      <div className="mt-5 mb-5">
                        <p className="mb-2.5 text-[10px] tracking-widest text-foreground-muted uppercase">
                          About This Role
                        </p>
                        <p className="text-xs leading-relaxed whitespace-pre-line text-foreground-secondary/70">
                          {job.description}
                        </p>
                      </div>

                      {/* Requirements */}
                      <div className="mb-5">
                        <p className="mb-2.5 text-[10px] tracking-widest text-foreground-muted uppercase">
                          Requirements
                        </p>
                        <div className="flex flex-col gap-2">
                          {job.requirements.map((req, i) => (
                            <div key={i} className="flex gap-2.5">
                              <span className="mt-px shrink-0 text-[11px] text-accent/50">
                                &mdash;
                              </span>
                              <p className="text-[11px] leading-relaxed text-foreground-secondary/65">
                                {req}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Note */}
                      {job.note && (
                        <div className="mb-5 rounded border border-yellow-500/12 bg-yellow-500/[0.04] px-3.5 py-3">
                          <p className="text-[10px] leading-relaxed text-yellow-500/65 italic">
                            Note: {job.note}
                          </p>
                        </div>
                      )}

                      {/* Apply */}
                      <div className="flex items-center gap-3">
                        <a
                          href={`/careers/apply?position=${job.id}`}
                          className="cursor-pointer rounded bg-accent px-6 py-2.5 text-[11px] font-medium tracking-wider text-accent-on uppercase no-underline"
                        >
                          Apply for This Role
                        </a>
                        <span className="text-[10px] text-foreground-muted">
                          Posted {job.posted}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* No CTO note */}
          <div className="mt-16 rounded-lg border border-edge bg-surface-alt p-8">
            <p className="mb-2 text-xs font-medium text-foreground-secondary">
              A note on what is not listed here.
            </p>
            <p className="text-xs leading-relaxed text-foreground-muted">
              RISE does not currently have an open Chief Technology Officer
              position. The role has been vacant since December 14, 2020.
              Technical and product strategy is led by the CPO. The Board has
              authorized this arrangement to continue. A search has not been
              initiated.
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-foreground-muted/60">
              If you believe you are the right person for a role at RISE that is
              not listed here, you may send a letter to Dr. Voss directly at the
              address in the footer. She reads all letters. She responds to
              fewer than she reads. The ratio is not published.
            </p>
          </div>

          {/* Application process */}
          <div className="mt-4 rounded border border-edge-subtle bg-surface-alt/50 p-6">
            <p className="mb-2.5 text-[10px] tracking-widest text-foreground-muted uppercase">
              Application Process
            </p>
            <p className="text-[11px] leading-relaxed text-foreground-muted">
              Click &ldquo;Apply for This Role&rdquo; on any listing above. The
              form asks for your information, role-specific questions, and an
              optional resume. No cover letter required. One paragraph explaining
              why you read the job description carefully. RISE reviews all
              applications. Response time: 2–3 weeks. Phone screen, then
              technical assessment, then panel interview. References checked.
              Equity vesting: 4-year standard, 1-year cliff. Push Mode device
              provided on day one of employment. Its use is encouraged. Its use
              is not mandatory. That distinction matters to us.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
