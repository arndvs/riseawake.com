import { InvestorLayout } from '@/components/investors/investor-layout'

const QA = [
  {
    q: 'Has the company considered adding a manual override to Push Mode in response to customer feedback?',
    questioner: 'Shareholder, via proxy',
    a: 'We have considered it extensively. The data on this is clear: users who retain an override use it. Users who use it do not achieve the outcomes Push Mode is designed to deliver. Adding an override is not a feature we can add without fundamentally changing what the product does. We will not be adding one. We appreciate the question.',
    respondent: 'Dr. Voss',
  },
  {
    q: 'Can you speak to the 340,000-unit waitlist? Is this a supply constraint or a deliberate strategy?',
    questioner: 'Institutional investor',
    a: 'Both. We have chosen not to outpace our quality standards. We have also found that scarcity functions as a meaningful signal. People on our waitlist want the product more than people who can simply buy it. They arrive at Push Mode with a commitment that improves outcomes. The waitlist is, in some ways, part of the product.',
    respondent: 'Dr. Voss',
  },
  {
    q: 'The Sleep & Environmental Data Policy references Appendix C in several places. Appendix C does not appear to be publicly available. Can the company describe what it contains?',
    questioner: 'Proxy, institutional',
    a: 'Appendix C is a restricted disclosure available to institutional investors under NDA. I can confirm it exists. Next question.',
    respondent: 'James Park, General Counsel',
  },
  {
    q: 'What is the timeline for The Push Pro?',
    questioner: 'Retail shareholder',
    a: 'We are not currently disclosing details of The Push Pro. It exists. It is in development. That is what we are saying today.',
    respondent: 'Dr. Voss',
  },
  {
    q: 'The Autonomous Navigation Disclosure mentions that the bed\u2019s legal status during the solo commute is unresolved in most jurisdictions. Is RISE™ exposed to regulatory risk here?',
    questioner: 'Institutional investor',
    a: 'Regulatory frameworks for autonomous morning routing devices are evolving. We are engaged with regulatory bodies in three jurisdictions. We believe our position is sound. Our position is that the user authorized the commute by pressing the button. The courts have agreed, in the cases where this has been tested.',
    respondent: 'James Park, General Counsel',
  },
  {
    q: 'My apartment has stairs. The bed stops at the bottom every morning. When will this be fixed?',
    questioner: 'Retail shareholder, via proxy',
    a: 'It is being worked on. It will not be free. There is no loyalty discount for current Push owners. The product that addresses this is called the RISE™ Move. We are not providing further details today. You may join a notification list at riseawake.com/move.',
    respondent: 'Dr. Voss',
  },
  {
    q: 'My wife says our Push is following her to work. Is that expected behavior?',
    questioner: 'Retail shareholder',
    a: 'Yes. Next question.',
    respondent: 'Dr. Voss',
  },
  {
    q: 'The Privacy Policy states that RISE™ collects audio data. Can you characterize how extensively that data is used internally?',
    questioner: 'Proxy, institutional',
    a: 'The audio classification system is used for product improvement and Push Mode calibration. Personnel access is governed by our Privacy Policy, Section 19. We consider our practices compliant with applicable law in most jurisdictions. In jurisdictions where this is uncertain, we are monitoring developments.',
    respondent: 'James Park, General Counsel',
  },
  {
    q: 'When will I get my bed? I\u2019ve been on the waitlist for 14 months.',
    questioner: 'Retail shareholder, via phone',
    a: "You're on the list. Next question.",
    respondent: 'Dr. Voss',
  },
]

const RESOLUTIONS = [
  {
    title: 'Approval of FY2024 Financial Statements',
    result: 'Passed unanimously',
  },
  {
    title: 'Re-election of Board Members (all standing)',
    result: 'Passed (97% in favour)',
  },
  {
    title: 'Approval of Equity Incentive Plan Expansion',
    result: 'Passed (94% in favour)',
  },
  {
    title: 'Advisory Vote on Executive Compensation',
    result: 'Passed (89% in favour)',
  },
  {
    title: 'Proposal to Add Push Mode Override (shareholder-submitted)',
    result: 'Defeated (3% in favour)',
  },
]

const ACTIONS = [
  { action: 'Prepare S-1 for Q3 2026 filing', owner: 'CFO' },
  {
    action:
      'Monitor autonomous device regulatory landscape across all active markets',
    owner: 'General Counsel',
  },
  {
    action: 'Provide Push Pro timeline for board review by Q2 2025',
    owner: 'CPO',
  },
  {
    action:
      'Publish RISE™ Move press release and launch riseawake.com/move notification page',
    owner: 'Marketing & Communications',
  },
  {
    action: 'Publish Appendix G (company holiday schedule)',
    owner: 'Legal & Compliance',
  },
  { action: 'No action required on Push Mode override proposal', owner: 'N/A' },
]

const MEETING_DETAILS = [
  { label: 'Date', value: 'March 14, 2025' },
  { label: 'Location', value: 'RISE™ Headquarters, San Francisco CA' },
  { label: 'Convened', value: '10:04am Pacific Time' },
  { label: 'Adjourned', value: '2:31pm Pacific Time' },
  { label: 'Quorum', value: 'Confirmed (83.4% of shares represented)' },
  { label: 'Chair', value: 'Dr. Eleanor Voss, Founder & CEO' },
]

export default function MeetingMinutesPage() {
  return (
    <InvestorLayout>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 pt-8">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Official Record
            </p>
            <h1 className="mb-2 font-display text-section tracking-tight text-foreground">
              Annual General Meeting
            </h1>
            <p className="text-xs text-foreground-muted/60">
              Minutes of Meeting — March 14, 2025 · San Francisco, California
            </p>
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-2">
            {MEETING_DETAILS.map((item) => (
              <div
                key={item.label}
                className="flex justify-between rounded-xl border border-edge-subtle bg-surface-alt p-4"
              >
                <span className="text-xs text-foreground-muted">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-foreground-secondary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground-secondary">
              Resolutions
            </h2>
            <div className="flex flex-col gap-px bg-edge-subtle/30">
              {RESOLUTIONS.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 bg-surface-alt p-4"
                >
                  <span className="text-xs leading-relaxed text-foreground-secondary">
                    {r.title}
                  </span>
                  <span
                    className={`shrink-0 rounded-xl border px-2 py-1 text-[10px] ${
                      r.result.startsWith('Defeated')
                        ? 'border-rise-error/12 bg-rise-error/8 text-rise-error/70'
                        : 'border-accent/12 bg-accent/8 text-accent'
                    }`}
                  >
                    {r.result}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-foreground-muted/60">
              Note on Resolution 5: The proposal to add a Push Mode manual
              override was submitted by a retail shareholder and is included
              here as a matter of record. It received 3% of votes cast. RISE™
              thanks the shareholder for their engagement with the governance
              process.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground-secondary">
              Shareholder Q&A
            </h2>
            <div className="flex flex-col gap-4">
              {QA.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-edge-subtle bg-surface-alt p-6"
                >
                  <p className="mb-2 text-[10px] tracking-widest text-foreground-muted/60">
                    Q — {item.questioner}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-foreground-secondary italic">
                    &ldquo;{item.q}&rdquo;
                  </p>
                  <p className="mb-2 text-[10px] tracking-widest text-accent">
                    A — {item.respondent}
                  </p>
                  <p className="text-sm leading-loose text-foreground-muted">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground-secondary">
              Action Items
            </h2>
            <div className="flex flex-col gap-px bg-edge-subtle/30">
              {ACTIONS.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 bg-surface-alt p-4"
                >
                  <span className="text-xs leading-relaxed text-foreground-muted">
                    {a.action}
                  </span>
                  <span className="shrink-0 text-[10px] text-foreground-muted/60">
                    → {a.owner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-edge-subtle/60 bg-surface-inset p-4">
            <p className="text-[10px] leading-loose text-foreground-muted">
              These minutes are a summary record of the Annual General Meeting
              of RISE™ Technologies, Inc. held March 14, 2025. They have been
              approved by the Board of Directors. Audio recording of the meeting
              is retained by RISE™ in accordance with its standard data
              retention policies. The recording is not available to
              shareholders. A transcript may be requested; fulfillment time is
              90 days.
            </p>
          </div>
        </div>
      </article>
    </InvestorLayout>
  )
}
