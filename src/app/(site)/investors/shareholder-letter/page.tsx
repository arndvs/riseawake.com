import { InvestorLayout } from '@/components/investors/investor-layout'

const SECTIONS = [
  {
    heading: 'To Our Shareholders,',
    body: `FY2024 was the year the gap began to close.

I founded RISE™ in 2009 with a single observation: the gap between intention and action costs the global economy an estimated $2.1 trillion annually in lost productive hours. Most of that loss happens in the first 45 minutes of the morning. I spent six years studying why before I built anything. I wanted to understand the problem before I proposed a solution.

The solution, it turned out, was simpler than I expected: remove the decision.`,
  },
  {
    heading: 'The Numbers',
    body: `FY2024 revenue reached $89.4 million, a 134% increase year-over-year. Gross margins held at 68%. We shipped 47,000 Push units against a waitlist of 340,000. We ended the year with 312 employees, up from 48 in 2021.

The waitlist deserves a comment. 340,000 people are waiting for a product that, by their own description in our research interviews, they are slightly afraid of. They want it anyway. RISE™ considers this the most important data point in our investor materials.

Push Mode compliance reached 98% among active users. The Nudge generation, our previous flagship, achieved 74%. The gap — 24 percentage points — is the value of removing the decision. That number is what RISE™ is built on.`,
  },
  {
    heading: 'The Product',
    body: `The Push is not a bed. I want to be clear about this, because investors who think we are in the adjustable bed market will model us incorrectly. We are in the morning market. The bed is the delivery mechanism. Push Mode is the product.

Push Mode does one thing: it closes the gap between intention and action for the 45-minute window that determines the trajectory of a person's day. It does this by being non-interruptible. The non-interruptibility is not a limitation of our engineering. It is the engineering. Every version of the product since our first prototype has been designed around the same principle: the decision was made when the button was pressed. What follows is execution.

Our self-making mechanism — the sheet tensioning system and pneumatic pillow node that operate during Push Mode — is the product's most underappreciated feature. While the user is routing through their morning, the bed is preparing for their return. It has been making itself for six years. It has never been late.`,
  },
  {
    heading: 'The Market',
    body: `We sometimes present RISE™ as a sleep technology company. This is accurate but incomplete. The better framing is that we are a human potential company operating in the sleep environment.

Our addressable market is not the $15 billion adjustable bed market. Our addressable market is the $4.2 trillion annual productivity loss attributable to inadequate morning routines. We have addressed, by our calculation, approximately $42 billion of that market in FY2024 through the productivity gains of our active users. We are 1% of the way there.

We find this encouraging.`,
  },
  {
    heading: 'The Road Ahead',
    body: `FY2025 priorities: international expansion (we enter four new markets in Q2), Push Pro development (timeline not yet disclosed), and the RISE™ Platform — the software layer that connects Push Mode to calendar, transit, and environmental data to make each morning smarter than the last.

We are also, as announced in our April S-1 filing, preparing for a public offering. I want to address this directly: RISE™ does not need the capital. We are profitable. We have a $120M Series C that remains largely undeployed. We are going public because the scale of the opportunity ahead requires a public company's access to talent, partnerships, and further capital at a rate that private markets cannot efficiently provide.

We are going public because the $4.2 trillion gap will not close itself.`,
  },
  {
    heading: 'A Closing Thought',
    body: `We are sometimes asked whether RISE™ intends to expand beyond the bedroom. The question reveals a misunderstanding of what we have built. We have not built a bed. We have built a relationship between a person and their obligations — a relationship in which the bed is the intermediary, and the obligations always win. The bedroom is where that relationship begins. We are excited about where it goes from there.

Have a productive year.`,
  },
]

export default function ShareholderLetterPage() {
  return (
    <InvestorLayout>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 pt-8">
            <div className="mb-8 rounded-xl border border-edge-subtle bg-surface-alt p-6">
              <p className="mb-1 text-xs text-foreground-secondary">
                RISE™ Technologies, Inc.
              </p>
              <p className="mb-1 text-xs text-foreground-muted">
                Annual Letter to Shareholders — Fiscal Year 2024
              </p>
              <p className="text-xs text-foreground-muted/60">
                From the desk of Dr. Eleanor Voss, Founder & Chief Executive
                Officer
              </p>
            </div>
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              Shareholder Letter
            </p>
            <h1 className="mb-2 font-display text-section tracking-tight text-foreground-strong">
              FY2024 Annual Letter
            </h1>
            <p className="text-xs text-foreground-muted/60">
              Dr. Eleanor Voss · March 1, 2025
            </p>
          </div>

          {SECTIONS.map((section, i) => (
            <div key={i} className="mb-10">
              {i > 0 && (
                <h2 className="mb-5 font-display text-2xl tracking-tight text-foreground-secondary">
                  {section.heading}
                </h2>
              )}
              {i === 0 && (
                <p className="mb-5 text-sm font-medium text-foreground-secondary">
                  {section.heading}
                </p>
              )}
              <div className="whitespace-pre-line text-body text-foreground-secondary">
                {section.body}
              </div>
            </div>
          ))}

          <div className="mt-12 border-t border-edge-subtle pt-8">
            <p className="mb-1 text-sm italic text-foreground-secondary">
              With conviction,
            </p>
            <p className="mb-1 font-display text-2xl text-foreground-strong">
              Dr. Eleanor Voss
            </p>
            <p className="mb-1 text-xs text-foreground-muted">
              Founder & Chief Executive Officer, RISE™ Technologies, Inc.
            </p>
            <p className="mb-8 text-xs text-foreground-muted/60">
              March 1, 2025 · San Francisco, California
            </p>
            <div className="rounded-xl border border-accent/10 bg-accent/5 p-4">
              <p className="text-[10px] leading-loose text-foreground-muted">
                Dr. Voss wrote this letter at 6:47am. She has used the Push
                every morning since 2021. She has not been late once. She does
                not own a snooze button. She is not sure she ever did.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-edge-subtle/60 bg-surface-inset p-4">
            <p className="text-[10px] leading-loose text-foreground-muted">
              This letter contains forward-looking statements within the meaning
              of applicable securities laws. These statements involve risks and
              uncertainties. Actual results may differ materially from those
              projected. RISE™ is not responsible for investor decisions made
              based on the contents of this letter, including the decision to
              invest, which RISE™ nonetheless encourages. Push Mode compliance
              data independently verified by RISE™ Internal Analytics.
            </p>
          </div>
        </div>
      </article>
    </InvestorLayout>
  )
}
