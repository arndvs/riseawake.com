import { InvestorLayout } from '@/components/investors/investor-layout'

const VISION_LOG = [
  {
    version: 'Vision 1.0',
    date: 'Q1 2021',
    change: 'Initial publication. 10-year horizon only.',
  },
  {
    version: 'Vision 2.0',
    date: 'Q1 2022',
    change:
      "Extended to 20-year horizon. Children's product line added, then removed from same document.",
  },
  {
    version: 'Vision 3.0',
    date: 'Q1 2023',
    change:
      'RISE™ Index added as strategic asset. First reference to regulatory engagement.',
  },
  {
    version: 'Vision 4.0',
    date: 'Q1 2024',
    change:
      'Platform language introduced. Solo commute codified as product feature.',
  },
  {
    version: 'Vision 5.0',
    date: 'Q1 2025',
    change:
      'Current document. IPO context added. Push Pro first public acknowledgment.',
  },
]

export default function VisionPage() {
  return (
    <InvestorLayout>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 border-b border-edge-subtle pb-8 pt-8">
            <p className="mb-6 text-[10px] leading-loose text-foreground-muted">
              Published: Q1 2025 · Updated annually · This document reflects
              RISE™&rsquo;s long-range strategic intent as of the date of
              publication. Forward-looking statements are subject to risks and
              uncertainties. Results will exceed expectations.
            </p>
            <p className="mb-4 text-eyebrow uppercase text-foreground-muted">
              RISE™ Technologies, Inc.
            </p>
            <h1 className="mb-4 font-display text-display leading-[1.1] tracking-tight text-foreground">
              The Morning After:
              <br />A 20-Year Vision for
              <br />
              Human Potential
            </h1>
            <p className="text-sm italic text-foreground-muted">
              Vision Document 5.0 — Dr. Eleanor Voss, Founder & CEO
            </p>
          </div>

          <div className="mb-20">
            <p className="mb-6 font-display text-subsection leading-snug tracking-tight text-foreground-secondary">
              Every morning, approximately 4.2 billion people intend to get up
              earlier than they do.
            </p>
            <p className="mb-4 text-sm leading-loose text-foreground-muted">
              The gap between that intention and what actually happens — measured
              in aggregate across the global workforce — represents the single
              largest source of untapped human potential on Earth. It is larger
              than the productivity gains of the internet. It is larger than the
              productivity gains of electricity. It has never been addressed,
              because until now, it has never been possible to address it.
            </p>
            <p className="text-sm italic leading-loose text-foreground-secondary">
              RISE™ intends to close that gap entirely. Not reduce it. Close it.
            </p>
          </div>

          <div className="mb-20">
            <div className="mb-8 flex items-baseline gap-4">
              <span className="font-display text-[5rem] leading-none tracking-tighter text-foreground">
                5
              </span>
              <div>
                <p className="text-eyebrow uppercase text-foreground-muted">
                  Year Vision
                </p>
                <p className="text-sm text-accent">2026 — 2030</p>
              </div>
            </div>
            <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground">
              Push Mode in Every Bedroom.
            </h2>
            <div className="space-y-4 text-sm leading-loose text-foreground-muted">
              <p>
                By 2030, RISE™ projects 2 million Push units in active global
                use, with Push Mode available across 47 countries. The RISE™
                platform expands beyond hardware to become the operating layer
                for morning productivity — a connected system integrating
                calendar, transit, environmental, and biometric data to deliver
                users to their obligations with precision that improves as it
                learns.
              </p>
              <p>
                Corporate wellness adoption accelerates. Three of the five
                largest corporate wellness programs integrate Push Mode
                compliance metrics into employee health programs. HR departments
                are not the audience RISE™ imagined when the company was founded.
                They are, it turns out, highly motivated buyers.
              </p>
              <p>
                The RISE™ Sleep Science Institute publishes its first major
                longitudinal study, drawing on data from 400,000 Push Mode users
                across five years. The findings are significant enough that two
                governments request briefings. RISE™ provides them.
              </p>
              <p>
                A municipal transit authority in a northern European country
                pilots Push Mode for shift workers. On-time rates improve by
                34%. The pilot expands. RISE™ considers this a proof point. It
                is also a contract.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-edge-subtle bg-surface-inset p-5">
              <p className="text-sm italic leading-loose text-foreground-muted">
                &ldquo;By 2030, we expect Push Mode to be as unremarkable as the
                alarm clock — present in bedrooms, expected by employers,
                understood to be simply part of how mornings work.&rdquo;
              </p>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-8 flex items-baseline gap-4">
              <span className="font-display text-[5rem] leading-none tracking-tighter text-foreground-secondary">
                10
              </span>
              <div>
                <p className="text-eyebrow uppercase text-foreground-muted">
                  Year Vision
                </p>
                <p className="text-sm text-accent/70">2026 — 2035</p>
              </div>
            </div>
            <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground-secondary">
              The Platform.
            </h2>
            <div className="space-y-4 text-sm leading-loose text-foreground-muted">
              <p>
                RISE™ is not a bed company. The 10-year vision makes this
                explicit. Push Mode becomes a platform: third-party integrations
                with calendar systems, transit applications, coffee makers, and
                smart home devices. The bed knows your first meeting. It knows
                the traffic. It knows — with increasing accuracy — what kind of
                morning you need before you do.
              </p>
              <p>
                RISE™ Health launches: a research and clinical division
                publishing longitudinal data on 2 million users, revealing
                correlations between Push Mode consistency and measurable health
                outcomes — cardiovascular markers, cognitive performance,
                reported life satisfaction. The data is published. The
                implications are significant enough to be controversial. RISE™
                publishes them anyway.
              </p>
              <p>
                The RISE™ Index becomes a recognized metric. Employers begin to
                ask about it. Insurance companies express interest. RISE™
                declines to license the Index externally. It remains proprietary.
                The decision to keep it proprietary is its own signal.
              </p>
              <p>
                Push Mode available in 89 countries. The product is translated.
                The philosophy requires no translation.
              </p>
              <p>
                By 2035, the platform extends to multi-story environments. The
                architectural constraint that has defined the first generation of
                RISE™ products — flat-surface navigation only — is resolved. The
                RISE™ Move, confirmed in development in February 2025, is no
                longer new. It is expected. The question of which floor you sleep
                on is no longer a question the bed cannot answer.
              </p>
              <p className="italic text-foreground-muted/60">
                Note: A children&rsquo;s product line was explored in 2032 and
                paused. The question of when Push Mode is appropriate for
                developing autonomy is one RISE™ takes seriously. We are not
                ready to answer it yet. We are preparing to be ready.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-edge-subtle bg-surface-inset p-5">
              <p className="text-sm italic leading-loose text-foreground-muted">
                &ldquo;We have spent ten years asking what happens when people
                get up on time. The data is beginning to tell us. The answer is
                better than we expected, and we expected a great deal.&rdquo;
              </p>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-8 flex items-baseline gap-4">
              <span className="font-display text-[5rem] leading-none tracking-tighter text-foreground-muted">
                20
              </span>
              <div>
                <p className="text-eyebrow uppercase text-foreground-muted/60">
                  Year Vision
                </p>
                <p className="text-sm text-accent/50">2026 — 2045</p>
              </div>
            </div>
            <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground-muted">
              A World That Starts on Time.
            </h2>
            <div className="space-y-4 text-sm leading-loose text-foreground-muted/80">
              <p>
                Push Mode is infrastructure. The question in 2045 is not whether
                you have it — it is which tier. RISE™ operates across five
                subscription levels, from the residential Push to
                enterprise-grade Morning Architecture deployed at the
                institutional level. The bed is the client-side device. The
                platform is the product.
              </p>
              <p>
                The productivity gap — the $4.2 trillion annual loss RISE™
                identified in 2024 — has been reduced by an estimated 60–70%.
                Economists argue about the counterfactual. RISE™ publishes its
                own analysis annually. The analysis is peer-reviewed by the
                RISE™ Sleep Science Institute, which is a RISE™ subsidiary.
                RISE™ acknowledges this is not ideal for the peer review process.
                The analysis stands.
              </p>
              <p>
                The concept of &ldquo;snooze&rdquo; has become historical.
                Younger generations do not recognize it as a behavior. It is
                described to them the way dial-up internet is described to
                millennials: a thing that existed, that people used, that was
                never as good as what replaced it.
              </p>
              <p>
                Push Mode has been studied by governments, regulated by three
                international bodies, and defended in court in seven
                jurisdictions. RISE™ has not lost a case. The legal argument, in
                each instance, is the same: Push Mode cannot be interrupted. This
                is a feature. The court has been provided with the data. The data
                has been persuasive.
              </p>
              <p>
                The question of what Push Mode does to human agency — raised in a
                2027 Atlantic article, a 2031 Senate hearing, and a 2038
                philosophical treatise that sells 400,000 copies — remains
                officially open. RISE™ has a considered position. The position
                is: agency is expressed in the decision to press the button.
                Everything after that is execution. This position has held up in
                seven courts. It will hold up in more.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-edge-subtle/60 bg-surface-inset p-6">
              <p className="text-sm italic leading-loose text-foreground-muted/70">
                &ldquo;We are sometimes asked what RISE™ looks like in 2045. The
                honest answer is that we do not know precisely — the world
                changes, products evolve, categories that do not yet exist will
                become important. What we do know is this: in 2045, the alarm
                clock will be a museum piece. The snooze button will be a
                cultural artifact. And somewhere — in a bedroom in a city we
                cannot yet name, in a country that may not yet have heard of us —
                a person who intended to rise at 6am will rise at 6am. They will
                not have chosen to do so in the moment. They will have chosen to
                do so at some earlier point, when they pressed a button, and the
                button did what it was built to do.&rdquo;
              </p>
            </div>
          </div>

          <div className="border-t border-edge-subtle py-20 text-center">
            <p className="font-display text-section tracking-tight text-foreground-secondary">
              We are on schedule.
            </p>
          </div>

          <div className="border-t border-edge-subtle pt-8">
            <p className="mb-6 text-eyebrow uppercase text-foreground-muted">
              Vision Update Log
            </p>
            <div className="flex flex-col gap-px bg-edge-subtle/30">
              {VISION_LOG.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-6 bg-surface-alt p-4"
                >
                  <span className="min-w-20 shrink-0 text-xs font-medium text-foreground-secondary">
                    {v.version}
                  </span>
                  <span className="min-w-15 shrink-0 text-xs text-foreground-muted">
                    {v.date}
                  </span>
                  <span className="text-xs leading-relaxed text-foreground-muted">
                    {v.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </InvestorLayout>
  )
}
