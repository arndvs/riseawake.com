'use client'

import InvestorLayout from '@/components/investors/investor-layout'

const COVERAGE = [
  {
    outlet: 'Future of Work Quarterly',
    quote: 'The most consequential piece of furniture since the alarm clock.',
    date: 'October 2024',
    stars: 5,
    tone: 'positive' as const,
  },
  {
    outlet: 'The Atlantic',
    quote:
      'RISE™\u2019s Push Mode raises questions about autonomy and consent that the company declines to answer. We include this coverage because we believe in transparency. We also believe our answers are in the documentation, which the Atlantic reporter did not read.',
    date: 'September 2024',
    stars: null,
    tone: 'neutral' as const,
    riseNote: true,
  },
  {
    outlet: 'Wired',
    quote:
      'I arrived at my desk at 8:47am. I don\u2019t know what happened between the bedroom and the elevator. I got more done than usual.',
    date: 'August 2024',
    stars: 4,
    tone: 'positive' as const,
  },
  {
    outlet: 'Business Insider',
    quote:
      'Dr. Voss declined to comment on reports that a user\u2019s Push followed them to a location she described only as \u2018appropriate.\u2019',
    date: 'July 2024',
    stars: null,
    tone: 'neutral' as const,
  },
  {
    outlet: 'Consumer Reports',
    quote:
      '4.7 stars. We cannot fully explain this score. The product does something. We are still determining what.',
    date: 'June 2024',
    stars: 5,
    tone: 'positive' as const,
  },
  {
    outlet: 'Fast Company',
    quote:
      'RISE™ has done something extraordinary: they have made getting up feel inevitable. Whether that is a comfort or a warning depends on the morning.',
    date: 'May 2024',
    stars: null,
    tone: 'positive' as const,
  },
  {
    outlet: 'The New York Times',
    quote:
      'The waitlist has 340,000 people on it. We spoke to several. None of them could explain why they signed up. All of them said they would do it again.',
    date: 'April 2024',
    stars: null,
    tone: 'positive' as const,
  },
  {
    outlet: 'Bloomberg',
    quote:
      'Push Mode compliance rate: 98%. This is higher than most medications. Unlike most medications, it has no off switch. RISE™ says this is a feature.',
    date: 'March 2024',
    stars: null,
    tone: 'neutral' as const,
  },
  {
    outlet: 'TechCrunch',
    quote:
      'We asked for an interview with the Push. RISE™ said the Push does not give interviews. The Push arrived at our office at 8:52am. It stayed until 5pm. We got more done than usual.',
    date: 'February 2024',
    stars: 4,
    tone: 'positive' as const,
  },
  {
    outlet: 'The Guardian',
    quote:
      'A bed that won\u2019t let you stay. In late capitalism, this passes for innovation. Four stars.',
    date: 'January 2024',
    stars: 4,
    tone: 'neutral' as const,
  },
]

export default function InvestorPressPage() {
  return (
    <InvestorLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 pt-8">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              Press & Coverage
            </p>
            <h1 className="mb-4 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-foreground">
              What they&rsquo;re saying.
            </h1>
            <p className="max-w-xl text-sm leading-loose text-foreground-muted">
              Selected coverage from FY2024. RISE™ includes all significant
              coverage, including coverage that raises questions. We are
              confident in our answers. The answers are in the documentation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((item, i) => (
              <div
                key={i}
                className="flex flex-col rounded-sm border border-edge-subtle bg-surface-alt p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-foreground-secondary">
                    {item.outlet}
                  </p>
                  <p className="shrink-0 text-[10px] text-foreground-muted/60">
                    {item.date}
                  </p>
                </div>
                <p className="mb-4 flex-1 text-sm leading-loose text-foreground-muted italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                {item.stars && (
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        className={`text-[11px] ${
                          s < item.stars! ? 'text-accent' : 'text-edge-subtle'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                {item.riseNote && (
                  <div className="mt-2 border-t border-edge-subtle pt-3">
                    <p className="text-[10px] leading-relaxed text-accent/70">
                      Note from RISE™: This coverage is included for
                      completeness. The documentation is at riseawake.com/legal.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-sm border border-edge-subtle/60 bg-surface-inset p-6">
            <p className="mb-3 text-xs leading-loose text-foreground-muted">
              <strong className="text-foreground-secondary">
                Media inquiries:
              </strong>{' '}
              press@riseawake.com
            </p>
            <p className="text-xs leading-loose text-foreground-muted/60">
              RISE™ responds to all media inquiries within 5 business days. Dr.
              Voss is available for comment on product performance, company
              vision, and the decision not to include an off switch. She is not
              available for comment on pending litigation, Appendix C, or The
              Push Pro. She will comment on The Push Pro when RISE™ is ready to
              comment on The Push Pro.
            </p>
          </div>
        </div>
      </section>
    </InvestorLayout>
  )
}
