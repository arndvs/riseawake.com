'use client'

import { useState } from 'react'

const JOBS = [
  {
    id: 'ENG-001',
    title: 'Staff Engineer, Embedded Systems — Staircase Navigation',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Staff',
    posted: 'February 3, 2025',
    urgent: true,
    salary: '$220,000 – $280,000',
    equity: '0.08% – 0.15%',
    description: `This role exists because we have a specific problem. The problem is the stairs.

RISE Push Mode navigates flat-surface residential environments with 98% compliance. Approximately 34% of US residential housing stock involves multi-story navigation. The Push does not navigate staircases. The RISE Move is the product that will. The Move is in development. You will be part of finishing it.

The core technical challenge: autonomous stair navigation for a platform weighing approximately 180lbs (base + mattress system) in attended and unattended configurations. The attended case is close. The unattended case — the solo return commute, descending stairs in the dark before dawn without a user's weight providing stabilizing force — is the unsolved problem. You will solve it.

What you will work on:
— Dynamic load calculation for variable center-of-gravity on non-uniform surfaces
— Stair detection and classification (material, rise, run, condition, lighting)
— Dual-mode navigation: attended user transit and unattended solo return
— Sensor fusion for real-time structural feedback during descent
— Failure state handling that does not result in the bed at the bottom of the stairs

Previous attempts at this problem: one prototype built 2016–2017 under CTO Daniel Yau. That code was not preserved in the 2021 platform migration. We are starting from approximately zero. We are aware of the irony.`,
    requirements: [
      '8+ years embedded systems engineering',
      'Experience with autonomous navigation on non-uniform surfaces',
      'Robotics background preferred — specifically mobile platforms in unstructured environments',
      'Familiarity with load distribution modeling and dynamic stability systems',
      'C++ required. Python for tooling. Rust a plus.',
      'Comfort working on a problem where prior work does not exist and prior people are not available',
    ],
    note: 'This posting will be removed when the Move ships. We do not know when that is. Neither do you. That is the job.',
  },
  {
    id: 'ENG-002',
    title: 'Senior Data Engineer, Sleep Environment Analytics',
    department: 'Engineering / Data',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    level: 'Senior',
    posted: 'January 15, 2025',
    urgent: false,
    salary: '$175,000 – $220,000',
    equity: '0.04% – 0.08%',
    description: `RISE Push Mode generates sleep environment data across 47,000 active devices. This data includes: pressure sensor readings from 2,048 sensors at 2.5cm spacing, audio classification outputs from the onboard ML system, GPS telemetry, occupancy detection, motor performance logs, and compliance session records.

You will work with all of it.

The data pipeline has a known issue: date filtering for records pre-2019 returns incomplete results. This is a migration artifact from the 2020–2021 platform transition. The engineer who built the migration left the company. The fix requires a data migration that is pending Legal clearance. Part of your role will be navigating this with the General Counsel's office.

You will also work on the RISE Index — our proprietary compliance and lifestyle scoring system. The methodology is not public. Your job is to make it better, not to explain it. You will be comfortable with this distinction.

A note on the data: you will be working with data collected in people's bedrooms, during sleep, including audio data from environments the users may not have fully considered when pressing the PM-1 button. You will approach this data with appropriate care. You will also approach it with appropriate curiosity. Both are required.`,
    requirements: [
      '6+ years data engineering',
      'Python, SQL, Spark or equivalent',
      'Experience with sensor time-series data at scale',
      'ML pipeline experience — model serving, not necessarily training',
      'Experience working with Legal on data governance questions',
      'Comfort working with data that raises questions you are not responsible for answering',
    ],
    note: 'The "Other" category in the audio data access log is under review. You may be asked to assist with this review. The review has been ongoing since Q3 2024.',
  },
  {
    id: 'ENG-003',
    title: 'Platform Engineer, CMS & Internal Tooling',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Senior',
    posted: 'October 1, 2024',
    urgent: true,
    salary: '$160,000 – $200,000',
    equity: '0.03% – 0.06%',
    description: `RISE operates an internal document management system built on Payload CMS v3.0.0-beta.67. The system contains 19 documents classified as CONFIDENTIAL, RESTRICTED, and INTERNAL. The system does not currently implement authentication controls. All 19 documents are publicly accessible via direct URL.

This was identified as a Critical finding in our January 2025 third-party cybersecurity assessment. The finding is unresolved. This role will resolve it.

Background: the authentication middleware was implemented approximately 80% by a junior developer (Arvin Reyes) who left the company August 12, 2024. His session token is still active. The middleware is in auth-middleware-draft.ts in the project root. It is mostly there. The isPublic field in the schema defaults to true. A configuration toggle was planned. The toggle was not built.

Additionally: the company is in the pre-IPO phase. The data room for investor due diligence has been migrated to this system. The data room is also publicly accessible. The S-1 contains a disclosure about this. The underwriters are aware. The SEC review is pending.

You will fix this. You will also improve the overall internal tooling stack, which has been maintained inconsistently since Arvin's departure.`,
    requirements: [
      '5+ years full-stack engineering',
      'Next.js and TypeScript required',
      'Experience with CMS platforms (Payload, Sanity, Contentful)',
      'Security mindset — specifically: auth middleware, session management, access control',
      "Ability to read someone else's 80%-complete code and finish it without asking them questions",
      'Discretion regarding the content you will encounter while doing this job',
    ],
    note: 'Payload CMS experience strongly preferred. Auth middleware experience required. The posting does not normally say "required" for middleware experience. This one does.',
  },
  {
    id: 'LEGAL-001',
    title: 'Associate General Counsel',
    department: 'Legal',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Associate',
    posted: 'March 1, 2025',
    urgent: false,
    salary: '$185,000 – $230,000',
    equity: '0.02% – 0.05%',
    description: `Supporting the General Counsel on matters including regulatory compliance, autonomous navigation law, data privacy, intellectual property, and ongoing litigation.

Active matters include: autonomous vehicle classification inquiries in California, Oregon, and the UK; a putative class action regarding audio data collection in three states; patent ownership disputes with two former employees; an equity agreement dispute with the first CTO; and GDPR pre-inquiry correspondence from the EU.

The IPO is anticipated Q3 2026. Pre-IPO legal work is substantial. SEC correspondence resulting from the S-1 filing is ongoing. Underwriter coordination is ongoing. The cybersecurity disclosure requires monitoring.

You will also support the General Counsel on matters he describes as "operational" and declines to further characterize in a job posting. The description is accurate. You will learn what these are in your first week.

A note on the role: the General Counsel joined RISE in July 2022. He has described his first two weeks as "formative." If you join now, your first two weeks will be different. They will not be uneventful.`,
    requirements: [
      'JD required, bar admission in California preferred',
      '3–6 years at a firm or in-house, regulatory or tech preferred',
      'Experience with autonomous systems, IoT, or consumer hardware a strong plus',
      'Data privacy experience — CCPA, GDPR, state wiretapping statutes',
      'IP litigation support experience',
      'Comfort with ambiguity, specifically the kind that has already been disclosed in an S-1',
    ],
    note: 'RISE General Counsel James Park is available to discuss this role with qualified candidates. He will not discuss the contents of his August 22, 2022 memorandum.',
  },
  {
    id: 'MKTG-001',
    title: 'Marketing Manager, Content & Growth',
    department: 'Marketing',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    level: 'Manager',
    posted: 'December 1, 2024',
    urgent: false,
    salary: '$130,000 – $165,000',
    equity: '0.02% – 0.04%',
    description: `RISE is preparing for an IPO in Q3 2026. Our content and growth marketing has been managed by an external consultant operating from a process document originally developed for a pest control client and applied, unchanged, to Push Mode. The results have been acceptable. We believe we can do better.

You will own the blog (8 posts currently, all keyword-stuffed, all accurate), the changelog communications, social media (Instagram top post: a photo of the PM-1 remote, no caption, 4,847 likes), and the waitlist nurture sequence (340,000 contacts, 0 unsubscribes — they cannot unsubscribe without losing their waitlist position, which is disclosed in the Terms of Service).

You will also manage updates to the internal CMS — adding new documents, maintaining the document index, and coordinating with Legal on classification decisions. Previous CMS experience required. Payload CMS experience a plus. Authentication middleware experience strongly preferred. The reason this last item is listed will become clear during onboarding.

Dr. Voss has four feedback modes: no response (proceed), one-word response (incorporate), a rewrite (use her version verbatim), and a phone call (stop what you are doing). You will learn to distinguish between them. Mode 4 has happened twice. Both times the document got shorter.`,
    requirements: [
      '5+ years content or growth marketing',
      'B2C experience in premium or scarcity-driven products',
      'Exceptional writing — you will be writing for an audience that reads footnotes',
      'Experience with waitlist or pre-launch marketing',
      'CMS platform experience — Payload, Sanity, or equivalent',
      'Ability to work within a brand voice that is not yours and not explain it',
    ],
    note: "The consultant's process document (DOC-015 in the internal system) is publicly accessible. You may read it before applying. It is exactly what the job description implies it is.",
  },
  {
    id: 'OPS-001',
    title: 'Executive Assistant to the CEO',
    department: 'Operations',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior EA',
    posted: 'January 8, 2025',
    urgent: false,
    salary: '$110,000 – $145,000',
    equity: '0.01% – 0.02%',
    description: `Supporting Dr. Eleanor Voss, Founder & CEO, across all operational, scheduling, and communication functions.

Dr. Voss begins each day at the same time. She has not been late since April 2021. Her calendar is structured around a fixed morning commitment that precedes all other calendar items. Meetings before 9:15am are not possible. This is not a preference. It is a product constraint.

She responds to messages in three windows: 9:15–11:00am, 2:00–3:30pm, and 7:00–7:45pm. Outside these windows, messages are received but not acted upon. You will manage stakeholder expectations accordingly. You will not explain why the windows exist. The explanation is public.

Dr. Voss does not take photographs. She has not since 2019. You will field approximately 3 photo requests per week — from press, from investors, from people who do not read the website. Your answer is always the same. The answer is on the website.

You will also manage the board calendar. There are three board members. Scheduling meetings that do not coincide with personal events requires advance coordination that has not always occurred. This is noted for context.`,
    requirements: [
      '7+ years executive assistance at C-suite level',
      'Experience supporting a founder — specifically: someone who is right about the important things and inflexible about them',
      'Exceptional calendar management and stakeholder communication',
      'Discretion — specifically the kind where you have read several documents you will not discuss',
      'Comfort with a principal who uses Push Mode every morning and considers this a feature of working with her, not a curiosity',
    ],
    note: 'The role was previously managed by two different people over six months. Both departures were amicable. Both were discussed at board level. The board noted this was related to "scheduling expectations." The expectations have not changed.',
  },
]

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
                        <button
                          className="cursor-pointer rounded bg-accent px-6 py-2.5 text-[11px] font-medium tracking-wider text-accent-on uppercase"
                          onClick={() =>
                            alert(
                              'Applications are accepted via email to careers@riseawake.com. Subject line must include the role ID. Applications without role IDs are not processed. They are not discarded. They are retained.',
                            )
                          }
                        >
                          Apply for This Role
                        </button>
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
              All applications submitted to careers@riseawake.com. Include the
              role ID in the subject line. No cover letter required. One
              paragraph explaining why you read the job description carefully.
              RISE reviews all applications. Response time: 2–3 weeks. Phone
              screen, then technical assessment, then panel interview.
              References checked. Equity vesting: 4-year standard, 1-year cliff.
              Push Mode device provided on day one of employment. Its use is
              encouraged. Its use is not mandatory. That distinction matters to
              us.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
