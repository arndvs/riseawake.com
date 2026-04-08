import InvestorLayout from '@/components/investors/investor-layout'
import { Link } from '@/components/link'

const RISK_FACTORS = [
  {
    title: 'Push Mode Regulatory Risk',
    body: 'Regulatory bodies in three jurisdictions have initiated preliminary inquiries into autonomous morning routing systems. RISE™ has engaged counsel in each jurisdiction. We believe our position is sound. Our position is that Push Mode cannot be interrupted and that this is a feature. The courts have agreed in the cases where this has been tested. We do not guarantee they will continue to agree.',
  },
  {
    title: 'Single Mode Dependency Risk',
    body: 'Substantially all of RISE™\u2019s revenue is derived from products featuring Push Mode. We do not offer an alternative mode. If Push Mode were found to be harmful, restricted, or \u2014 least likely \u2014 unpopular, our business would be materially affected. We do not believe Push Mode will be found to be any of these things. We have built a product that is working correctly.',
  },
  {
    title: 'Audio Data Regulatory Risk',
    body: 'RISE™ collects audio data from sleep environments as described in our Privacy Policy. Regulatory frameworks governing this collection are evolving. RISE™ believes its current practices are compliant with applicable law in most jurisdictions. In jurisdictions where compliance is uncertain, RISE™ is monitoring developments. RISE™ considers monitoring to be appropriate at this stage.',
  },
  {
    title: 'Autonomous Navigation Incident Risk',
    body: 'The Push\u2019s autonomous navigation capability, including the solo return commute, may result in interactions with third parties, property, or public infrastructure. RISE™ maintains appropriate insurance. All claims to date have been resolved. We do not disclose claim details. We note that the number of incidents has been proportionally small relative to total solo commutes completed.',
  },
  {
    title: 'Occupancy Data Sensitivity Risk',
    body: 'The granularity of RISE™\u2019s occupancy detection data \u2014 2,048 sensors at 2.5cm spacing \u2014 creates meaningful data sensitivity. This data is retained, classified, and in some cases shared as described in our Sleep & Environmental Data Policy. Regulatory and reputational risks associated with this data category are real. They are being managed.',
  },
  {
    title: 'Waitlist Concentration Risk',
    body: '340,000 prospective customers are currently on the Push waitlist. These individuals represent significant future revenue. If a material portion of the waitlist were to lose interest, be acquired by a competitor, or independently develop the capacity to self-initiate morning routines without assistance, revenue projections would be affected. RISE™ considers the last scenario unlikely based on available data.',
  },
  {
    title: 'Dependency Risk',
    body: 'Extended Push Mode use reduces users\u2019 capacity for self-initiated morning routines. RISE™ considers this an alignment of user behavior with product design intent and not a compensable harm. Regulators in two jurisdictions have expressed interest in this dynamic. RISE™ is engaged.',
  },
  {
    title: 'The Push Pro Risk',
    body: 'RISE™ has acknowledged the existence of The Push Pro in certain investor communications and in this document\u2019s footnotes. Details of The Push Pro have not been disclosed. If The Push Pro fails to meet the expectations created by not disclosing its details, investor sentiment may be affected. RISE™ does not consider this a significant risk. RISE™ is confident in The Push Pro.',
  },
]

const FINANCIALS = [
  {
    year: 'FY2020',
    revenue: '$2.1M',
    growth: '\u2014',
    margin: '12%',
    units: '940',
  },
  {
    year: 'FY2021',
    revenue: '$8.4M',
    growth: '+300%',
    margin: '41%',
    units: '3,800',
  },
  {
    year: 'FY2022',
    revenue: '$23.7M',
    growth: '+182%',
    margin: '55%',
    units: '10,600',
  },
  {
    year: 'FY2023',
    revenue: '$38.2M',
    growth: '+61%',
    margin: '63%',
    units: '17,100',
  },
  {
    year: 'FY2024',
    revenue: '$89.4M',
    growth: '+134%',
    margin: '68%',
    units: '47,000',
  },
]

const LEADERSHIP = [
  {
    name: 'Dr. Eleanor Voss',
    title: 'Founder & Chief Executive Officer',
    note: 'PhD Behavioral Sleep Science, Stanford. Has not been late since 2021.',
  },
  {
    name: 'James Park',
    title: 'General Counsel',
    note: 'Former regulatory counsel, FTC. Joined RISE™ after the first autonomous navigation inquiry.',
  },
  {
    name: 'Dr. Mara Chen',
    title: 'Chief Product Officer',
    note: 'Architect of Push Mode navigation system. Holds 11 of RISE™\u2019s 23 granted patents.',
  },
  {
    name: 'Thomas Ellery',
    title: 'Chief Financial Officer',
    note: 'Former Goldman Sachs. Managing the S-1 process. Has been briefed on Appendix C.',
  },
]

const TABLE_HEADERS = [
  'Year',
  'Revenue',
  'YoY Growth',
  'Gross Margin',
  'Units Shipped',
]

export default function AnnualReportPage() {
  return (
    <InvestorLayout>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 pt-8">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Annual Report
            </p>
            <h1 className="mb-2 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-foreground">
              FY2024 Annual Report
            </h1>
            <p className="text-xs text-foreground-muted/60">
              RISE™ Technologies, Inc. · Fiscal Year ending December 31, 2024
            </p>
          </div>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              1. Executive Summary
            </h2>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              FY2024 was RISE™&rsquo;s strongest year on record and, we believe,
              the year the adjustable base market ceased to be the relevant
              frame of reference for what we do. Revenue reached $89.4M,
              representing 134% growth over FY2023. Push Mode compliance among
              active users reached 98%. The waitlist reached 340,000. We shipped
              47,000 units.
            </p>
            <p className="text-sm leading-loose text-foreground-muted">
              These numbers tell a story about product-market fit. The deeper
              story is about what happens when 47,000 people stop making a
              decision every morning and start simply executing one they made
              once, when they pressed a button.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              2. Financial Highlights
            </h2>
            <div className="overflow-x-auto">
              <table className="mb-4 w-full text-xs">
                <thead>
                  <tr className="border-b border-edge-subtle">
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="py-3 pr-6 text-left font-medium tracking-widest text-foreground-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FINANCIALS.map((row, i) => {
                    const isCurrent = i === FINANCIALS.length - 1
                    return (
                      <tr
                        key={i}
                        className={`border-b border-edge-subtle/40 ${isCurrent ? 'bg-accent/4' : ''}`}
                      >
                        <td
                          className={`py-3 pr-6 font-medium ${isCurrent ? 'text-foreground' : 'text-foreground-secondary'}`}
                        >
                          {row.year}
                        </td>
                        <td
                          className={`py-3 pr-6 ${isCurrent ? 'text-foreground' : 'text-foreground-muted'}`}
                        >
                          {row.revenue}
                        </td>
                        <td
                          className={`py-3 pr-6 ${isCurrent ? 'text-accent' : 'text-foreground-muted'}`}
                        >
                          {row.growth}
                        </td>
                        <td
                          className={`py-3 pr-6 ${isCurrent ? 'text-foreground' : 'text-foreground-muted'}`}
                        >
                          {row.margin}
                        </td>
                        <td
                          className={`py-3 pr-6 ${isCurrent ? 'text-foreground' : 'text-foreground-muted'}`}
                        >
                          {row.units}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { stat: '$180', label: 'Customer Acquisition Cost' },
                { stat: '27 days', label: 'CAC Payback Period' },
                { stat: '$2,400', label: 'Customer LTV' },
                { stat: '71', label: 'Net Promoter Score' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-sm border border-edge-subtle bg-surface-alt p-5 text-center"
                >
                  <p className="mb-1 font-display text-2xl text-foreground">
                    {s.stat}
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-foreground-muted uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              3. Business Overview
            </h2>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              RISE™ manufactures and operates the RISE™ Smart Adjustable Base —
              a platform consisting of the Push hardware, Push Mode software,
              self-making mechanism, and autonomous navigation system. The
              product is sold as a complete system. There are no accessories, no
              companion products, and no optional features. Push Mode is not
              optional.
            </p>
            <p className="text-sm leading-loose text-foreground-muted">
              The self-making mechanism — a sheet tensioning system and single
              pneumatic pillow node that operate during Push Mode — is the
              product&rsquo;s most underappreciated feature from a financial
              standpoint. It creates daily active engagement with the product
              independent of the morning routing function. The bed is always
              doing something. The data this generates is, separately, an asset.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              4. Market Opportunity
            </h2>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              RISE™ does not size its opportunity against the adjustable bed
              market ($15B globally) or the sleep economy ($432B). These are the
              wrong reference frames. RISE™ addresses the productivity loss
              market: the estimated $4.2 trillion in annual global economic
              output lost to inadequate morning routines.
            </p>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              By our calculation, each Push Mode user recovers an average of 34
              minutes of productive morning time per day relative to their
              pre-Push baseline. Across 47,000 active users, this represents
              approximately $42B in recovered productive value annually at
              median knowledge worker rates. We have addressed approximately 1%
              of our addressable market.
            </p>
            <div className="rounded-sm border border-accent/12 bg-accent/5 p-5">
              <p className="text-xs leading-loose text-foreground-muted">
                <strong className="text-foreground-secondary">TAM:</strong> $4.2
                trillion (global productivity loss attributable to morning
                routine deficiency) ·{' '}
                <strong className="text-foreground-secondary">SAM:</strong> $890
                billion (addressable with current Push Mode geography and price
                point) ·{' '}
                <strong className="text-foreground-secondary">SOM:</strong>{' '}
                $89.4M (FY2024 actual) ·{' '}
                <strong className="text-accent">
                  We are 1% of the way there.
                </strong>
              </p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              5. Risk Factors
            </h2>
            <p className="mb-6 text-xs leading-loose text-foreground-muted/60">
              The following risk factors could materially affect our business,
              financial condition, and results. This list is not exhaustive.
              RISE™ has attempted to identify the most significant risks. We
              have not identified risks we are not aware of, which is a
              limitation of this exercise that we acknowledge.
            </p>
            <div className="flex flex-col gap-4">
              {RISK_FACTORS.map((r, i) => (
                <div
                  key={i}
                  className="rounded-sm border border-edge-subtle bg-surface-alt p-6"
                >
                  <h3 className="mb-3 text-xs font-medium tracking-[0.14em] text-foreground-secondary uppercase">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-loose text-foreground-muted">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              5a. Growth Strategy — Vertical Navigation
            </h2>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              RISE™&rsquo;s current platform is optimized for flat-surface
              residential environments. We are aware of this constraint.
              Approximately 34% of US residential housing stock involves
              multi-story navigation. We have not addressed this market. We
              intend to.
            </p>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              Our R&D team has been developing next-generation vertical
              navigation infrastructure since Q3 2022. In February 2025, we
              confirmed the existence of this program publicly under the name{' '}
              <strong className="font-medium text-foreground-secondary">
                RISE™ Move
              </strong>
              . We confirmed that it navigates staircases in both directions —
              ascending and descending — attended and unattended. We confirmed
              that it will be priced above the current Push and will include a
              recurring Vertical Navigation Services subscription. We confirmed
              that current Push owners will receive no preferential pricing.
            </p>
            <p className="text-sm leading-loose text-foreground-muted">
              We are not disclosing timeline, price, form factor, or any
              specification beyond the above. Multi-story residences represent a
              meaningful expansion of our addressable market. We are not
              providing a revised TAM estimate until the product is closer to
              announcement. Investors who wish to be notified when additional
              information becomes available may visit{' '}
              <Link href="/move" className="text-accent underline">
                riseawake.com/move
              </Link>
              .
            </p>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
              6. Leadership & Governance
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {LEADERSHIP.map((p) => (
                <div
                  key={p.name}
                  className="rounded-sm border border-edge-subtle bg-surface-alt p-6"
                >
                  <p className="mb-1 text-sm font-medium text-foreground-secondary">
                    {p.name}
                  </p>
                  <p className="mb-3 text-xs text-accent">{p.title}</p>
                  <p className="text-xs leading-relaxed text-foreground-muted">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-sm border border-edge-subtle/60 bg-surface-inset p-4">
            <p className="text-[10px] leading-loose text-foreground-muted">
              This annual report contains forward-looking statements. Actual
              results may differ materially. Financial figures are unaudited
              summaries — full audited statements available to accredited
              investors upon request (90-day fulfillment). Risk factors listed
              are not exhaustive. RISE™ has not identified risks it is not aware
              of. Push Mode compliance data independently verified by RISE™
              Internal Analytics. Third-party verification pending.
            </p>
          </div>
        </div>
      </article>
    </InvestorLayout>
  )
}
