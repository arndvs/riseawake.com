import { Button } from '@/components/button'
import { Link } from '@/components/link'

type TimelineEntry = {
  product: string | null
  type: string
  status?: string
  headline: string
  body: string
  outcome?: string | null
  isCurrentProduct?: boolean
  isRedacted?: boolean
}

type TimelineEra = {
  year: string
  era: string
  isAccent: boolean
  entries: TimelineEntry[]
}

const TIMELINE: TimelineEra[] = [
  {
    year: '2009',
    era: 'The Question',
    isAccent: false,
    entries: [
      {
        product: null,
        type: 'founding',
        headline: 'RISE Technologies, Inc. is founded.',
        body: 'The company begins with a single research question: why, given that every human being knows they need to get up, do so many of them not? The answer, after eighteen months of study, is both obvious and unexplored. The problem is not information. The problem is not intention. The problem is the moment between deciding and doing. RISE will own that moment.',
      },
    ],
  },
  {
    year: '2011',
    era: 'The Soft Approach',
    isAccent: false,
    entries: [
      {
        product: 'RISE Ambient',
        type: 'product',
        status: 'Discontinued',
        headline: 'Light, optimistically.',
        body: 'The first product. Panels embedded in the bed frame emit a slow sunrise simulation beginning 30 minutes before the target wake time, shifting from deep amber to bright white. The clinical logic is sound — light suppresses melatonin production. The real-world logic is less sound. One blackout curtain renders it irrelevant. Discontinued after one winter in Seattle.',
        outcome:
          'Outcome: Beloved by people who were already good at getting up.',
      },
      {
        product: 'RISE Tone',
        type: 'product',
        status: 'Discontinued',
        headline: 'Sound, optimistically.',
        body: 'Low-frequency resonance emitted through the frame, designed to shift the user from deep sleep to light sleep without fully waking them — priming them, in theory, for a graceful transition to consciousness. Clinical studies are promising. Real-world results are not. Several beta users report sleeping better than they ever have.',
        outcome:
          "Outcome: Discontinued. Inadvertently created the world's most effective white noise machine.",
      },
    ],
  },
  {
    year: '2012',
    era: 'The Escalation',
    isAccent: false,
    entries: [
      {
        product: 'RISE Thermal',
        type: 'product',
        status: 'Discontinued',
        headline: 'Temperature, with conviction.',
        body: 'The mattress surface cools progressively from 6am onward — edges first, then inward — shrinking the comfortable warm center until there is, theoretically, nowhere left to hide. The theory holds. Users find the center. They stay there. The center is warm. They have adapted.',
        outcome:
          'Outcome: Users purchased better blankets. Sales of RISE Thermal blankets, a product RISE does not make, increased.',
      },
      {
        product: 'RISE Gradient',
        type: 'product',
        status: 'Discontinued',
        headline: 'Gravity, as an ally.',
        body: 'An automated incline raises the head of the bed by one degree every two minutes beginning at 5am. By 6am the user is essentially sitting up. Gravity, the thinking goes, will handle the rest. The thinking is partially correct. Some users stand. Others discover they can sleep at a significant incline. One user reaches 45 degrees and does not wake up.',
        outcome:
          'Outcome: Discontinued. The laws of physics are insufficient motivation.',
      },
      {
        product: 'RISE Alarm',
        type: 'product',
        status: 'Discontinued',
        headline: 'Vibration, confidently.',
        body: "A high-torque vibration motor embedded in the frame. In testing, described as 'like sleeping next to something that has decided.' In market, described as 'a large phone on silent.' Slept through by 94% of beta testers. The remaining 6% report being startled into a state of alertness they describe as 'not restful.'",
        outcome:
          'Outcome: 94% failure rate. This figure will inform every subsequent product decision.',
      },
    ],
  },
  {
    year: '2013',
    era: 'The Nudge Era Begins',
    isAccent: false,
    entries: [
      {
        product: 'RISE NudgeSense',
        type: 'product',
        status: 'Discontinued',
        headline: 'Awareness, as a product.',
        body: "The first product in the Nudge line. Sensors in the frame detect when the user has been stationary for too long past their target wake time and send a push notification to their phone. The notification reads: 'Time to rise.' The user's phone is on the nightstand. The user is asleep. This is the entire product.",
        outcome:
          'Outcome: Beloved by people who were already getting up. Invisible to everyone else.',
      },
      {
        product: 'RISE NudgeLight',
        type: 'product',
        status: 'Discontinued',
        headline: 'The Ambient, rebranded.',
        body: 'The sunrise simulation technology, relaunched under the Nudge brand with improved panel brightness and a companion app. The app allows users to customize their sunrise color temperature, duration, and schedule. The app has a 4.8 star rating. The product has a 2.1 star rating. The problem is still the blackout curtains.',
        outcome:
          'Outcome: The app is discontinued alongside the product. Users mourn the app.',
      },
    ],
  },
  {
    year: '2014',
    era: 'The Nudge Era: Physical Contact',
    isAccent: false,
    entries: [
      {
        product: 'RISE NudgeWarm',
        type: 'product',
        status: 'Discontinued',
        headline: 'The Thermal, with better branding.',
        body: 'Refined thermal mapping cools the outer 8 inches of the mattress surface while preserving a warm center zone. The gradient is steeper and more precisely calibrated than the original Thermal. A new name. The same center. Users remain in it.',
        outcome:
          'Outcome: RISE accepts that comfort is adaptive. The user will always find the warm center. A different approach is required.',
      },
      {
        product: 'RISE NudgeTone',
        type: 'product',
        status: 'Discontinued',
        headline: 'Vibration, with better marketing.',
        body: "The vibration motor, redesigned with a more precise frequency profile and renamed. The pulses are described in marketing materials as 'purposeful.' Users describe them as 'actually quite soothing.' Average additional sleep per NudgeTone user: 23 minutes. The product is, by every measurable outcome, making the problem worse.",
        outcome:
          'Outcome: Discontinued. RISE will not again attempt to make the bed more comfortable as a strategy for getting people out of it.',
      },
    ],
  },
  {
    year: '2015',
    era: 'The Nudge Era: Movement',
    isAccent: false,
    entries: [
      {
        product: 'RISE NudgeEdge',
        type: 'product',
        status: 'Discontinued',
        headline: 'The first movement.',
        body: 'The first RISE product to physically move the user. A slow lateral tilt toward the edge of the bed — approximately 8 degrees over 20 minutes — applying the gentle logic of a ship listing toward port. The user, like water, should flow toward the low point. The user, unlike water, has a center of mass and a preference. They roll back. Every time.',
        outcome:
          'Outcome: 100% of users who rolled toward the edge rolled back. RISE notes that the direction was correct. The mechanism was not.',
      },
    ],
  },
  {
    year: '2016',
    era: 'The Nudge: Presence',
    isAccent: false,
    entries: [
      {
        product: 'RISE NudgeBar',
        type: 'product',
        status: 'Discontinued',
        headline: 'Something that simply expects.',
        body: "A padded arm extends from the side of the frame and rests — with steadily increasing pressure — against the user's shoulder. Not a push. Not a tilt. A presence. The NudgeBar does not move the user. It makes the user aware that something is there, and that it has expectations. The pressure increases approximately 0.4 PSI per minute. At stage 7, the user must choose between consciousness and actively deciding to remain.",
        outcome:
          "Outcome: 74% morning compliance rate. A cult following. Letters from users who describe the NudgeBar as 'the only thing that understands me.' RISE notes 74% is not good enough. A successor is authorized.",
      },
    ],
  },
  {
    year: '2019',
    era: 'The Conclusion',
    isAccent: true,
    entries: [
      {
        product: 'RISE Nudge',
        type: 'product',
        status: 'Discontinued',
        headline: 'The line, consolidated.',
        body: 'The Nudge sub-brand is consolidated into a single product — the RISE Nudge — representing the best of the NudgeBar platform with refinements from the full Nudge product line. The Nudge is the best version of passive accountability RISE can build. It is the last product RISE will build that does not move the person. Karen has one. It made her a VP.',
        outcome:
          'Outcome: Discontinued 2019. Replaced by something that does not wait for the user to decide.',
      },
    ],
  },
  {
    year: '2021',
    era: 'The Push',
    isAccent: true,
    entries: [
      {
        product: 'RISE Push',
        type: 'product',
        status: 'Current — Out of Stock',
        headline: 'The answer.',
        body: 'After twelve years, nine product lines, and a 94% average failure rate across early models, RISE arrives at the only conclusion the data supports: the bed must move the person. Not suggest. Not tilt. Not vibrate. Not apply presence. Move. Push Mode activates, transitions the base to vertical, and navigates the user through their full morning routine with the quiet, unhurried precision of a system that has already decided how this ends. One button. No off switch. By design.',
        outcome: 'Currently out of stock. Join the waitlist.',
        isCurrentProduct: true,
      },
    ],
  },
  {
    year: 'Soon.',
    era: "What's Next",
    isAccent: true,
    entries: [
      {
        product: 'RISE Push Pro',
        type: 'product',
        status: 'Not Announced',
        headline:
          'We are not currently accepting questions about The Push Pro.',
        body: 'RISE is not currently accepting questions about The Push Pro.',
        outcome: null,
        isRedacted: true,
      },
      {
        product: 'RISE Move',
        type: 'product',
        status: 'In Development',
        headline: 'We are aware of the stairs.',
        body: 'The Push addresses flat surfaces. Approximately 34% of residential housing stock involves multi-story navigation. RISE has been aware of this figure since before the Push launched. The RISE Move addresses vertical navigation — ascending and descending — attended and unattended. The solo return commute navigates stairs. The bed comes home.',
        outcome: 'No timeline. No price. Both directions.',
      },
    ],
  },
]

const PRINCIPLES = [
  {
    number: '01',
    title: 'The problem is not information.',
    body: 'Every person who has ever failed to get up on time knew they needed to get up on time. RISE does not solve an information problem. It solves a doing problem. These are different problems requiring different solutions.',
  },
  {
    number: '02',
    title: 'Comfort is adaptive.',
    body: "The user will always find the warm center. They will sleep through the vibration. They will grow accustomed to the pressure. Any product that relies on the user's discomfort as its mechanism will eventually face a user who has adapted to the discomfort. RISE does not rely on discomfort. It relies on momentum.",
  },
  {
    number: '03',
    title: 'The decision cannot be left to the user.',
    body: 'This is the lesson twelve years of product development taught us. Not that users are incapable of making the decision — they are — but that the moment of decision is precisely the moment when they are least equipped to make it. Push Mode removes the moment of decision from the equation entirely. There is no decision. There is only the morning.',
  },
  {
    number: '04',
    title: 'This is a feature, not a limitation.',
    body: 'Push Mode cannot be manually interrupted once initiated. We have been asked, many times, whether this was an oversight. It was not. The off switch was considered. The off switch was a product of the same thinking that produced the NudgeSense — the belief that the user, given the option, would make the right choice. We know better now.',
  },
]

function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  const isCurrent = entry.isCurrentProduct
  const isRedacted = entry.isRedacted

  const cardBg = isCurrent
    ? 'border-accent/20 bg-accent/6'
    : isRedacted
      ? 'border-edge-subtle bg-foreground/1'
      : 'border-edge bg-surface-alt'

  if (entry.type === 'founding') {
    return (
      <div className={`flex-1 rounded-xl border p-6 md:p-8 ${cardBg}`}>
        <h3 className="mb-4 font-display text-2xl text-foreground-secondary">
          {entry.headline}
        </h3>
        <p className="text-body text-foreground-secondary">
          {entry.body}
        </p>
      </div>
    )
  }

  return (
    <div className={`flex-1 rounded-xl border p-6 md:p-8 ${cardBg}`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {entry.product && (
            <span
              className={`font-display text-xl tracking-tight ${
                isCurrent
                  ? 'text-foreground'
                  : isRedacted
                    ? 'text-foreground/15'
                    : 'text-foreground-secondary'
              }`}
            >
              {entry.product}
            </span>
          )}
          {entry.status && (
            <span
              className={`rounded-xl border px-2.5 py-1 text-[10px] tracking-widest uppercase ${
                isCurrent
                  ? 'border-accent/20 bg-accent/15 text-accent'
                  : isRedacted
                    ? 'border-edge-subtle bg-foreground/2 text-foreground/12'
                    : 'border-edge bg-foreground/4 text-foreground-muted/60'
              }`}
            >
              {entry.status}
            </span>
          )}
        </div>
      </div>

      <p
        className={`mb-3 text-sm font-medium italic ${
          isRedacted ? 'text-foreground/20' : 'text-foreground-secondary'
        }`}
      >
        {entry.headline}
      </p>

      <p
        className={`mb-4 text-body ${
          isRedacted ? 'text-foreground/12' : 'text-foreground-muted'
        }`}
      >
        {entry.body}
      </p>

      {entry.outcome && (
        <div
          className={`border-t pt-4 ${
            isCurrent ? 'border-accent/10' : 'border-edge-subtle'
          }`}
        >
          {isCurrent ? (
            <Button variant="cta" size="sm" href="/products/push">
              Join the Waitlist →
            </Button>
          ) : entry.product === 'RISE Move' ? (
            <div className="flex items-center gap-4">
              <p className="text-xs text-foreground-muted italic">
                No timeline. No price. Both directions.
              </p>
              <Link href="/move" className="text-xs text-accent/60 underline">
                riseawake.com/move →
              </Link>
            </div>
          ) : (
            <p
              className={`text-xs italic ${
                isRedacted
                  ? 'text-foreground-muted/20'
                  : 'text-foreground-muted/60'
              }`}
            >
              {entry.outcome}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>

      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.07]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-foreground-muted, rgba(255,255,255,0.018)) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground-muted, rgba(255,255,255,0.018)) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.08,
            maskImage:
              'radial-gradient(ellipse 90% 80% at 50% 50%, black 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
            About RISE
          </p>
          <h1 className="mb-8 font-display text-hero leading-none text-foreground-strong">
            Twelve years.
            <br />
            <span className="text-foreground-muted">One conclusion.</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground-secondary">
            RISE has spent over a decade asking why people don&rsquo;t get up
            when they know they should. We tried light. We tried sound. We tried
            temperature. We tried vibration. We tried presence. We tried
            discomfort. We tried every polite option available to us.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary">
            Then we built something that doesn&rsquo;t wait for the user to
            decide.
          </p>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              What We Learned
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              The principles.
            </h2>
          </div>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.number} className="bg-surface-alt p-10 md:p-12">
                <p className="mb-6 font-display text-5xl text-accent/25">
                  {p.number}
                </p>
                <h3 className="mb-4 text-sm font-medium text-foreground-secondary">
                  {p.title}
                </h3>
                <p className="text-body text-foreground-secondary">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Product History
            </p>
            <h2 className="mb-6 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              The full arc.
            </h2>
            <p className="max-w-xl text-body text-foreground-secondary">
              Every product RISE has ever made. In order. With honesty about
              what worked and what didn&rsquo;t. Most of them didn&rsquo;t. That
              is the point.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-22 w-px bg-linear-to-b from-transparent via-edge to-transparent md:left-30" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map((era, eraIndex) => (
                <div key={era.year} className="relative">
                  <div className="mt-14 mb-8 flex items-start gap-8 first:mt-0 md:gap-12">
                    <div className="w-18 shrink-0 pt-0.5 text-right">
                      <span
                        className={`font-display text-lg tracking-tight md:text-xl ${
                          era.isAccent ? 'text-accent/50' : 'text-foreground/15'
                        }`}
                      >
                        {era.year}
                      </span>
                    </div>

                    <div className="relative mt-1.5 shrink-0">
                      <div
                        className={`-ml-1.5 size-3 rounded-full border ${
                          eraIndex === TIMELINE.length - 1
                            ? 'border-accent/50 bg-accent/30'
                            : era.isAccent
                              ? 'border-accent/50 bg-accent/60'
                              : 'border-foreground/15 bg-foreground/12'
                        }`}
                      />
                    </div>

                    <div>
                      <p
                        className={`text-xs font-medium tracking-[0.18em] uppercase ${
                          era.isAccent ? 'text-accent/70' : 'text-foreground/20'
                        }`}
                      >
                        {era.era}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {era.entries.map((entry, entryIndex) => (
                      <div
                        key={entryIndex}
                        className="flex items-start gap-8 md:gap-12"
                      >
                        <div className="w-18 shrink-0" />

                        <div className="relative mt-4.5 shrink-0">
                          <div
                            className={`-ml-1 size-2 rounded-full border ${
                              entry.isCurrentProduct
                                ? 'border-accent/70 bg-accent shadow-[0_0_8px_var(--color-accent)]'
                                : entry.isRedacted
                                  ? 'border-foreground/8 bg-foreground/4'
                                  : 'border-foreground/8 bg-foreground/6'
                            }`}
                          />
                        </div>

                        <TimelineEntryCard entry={entry} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              The Record
            </p>
            <h2 className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              By the numbers.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-edge-subtle md:grid-cols-4">
            {[
              { stat: '12', label: 'Years of research' },
              { stat: '13', label: 'Products developed' },
              { stat: '10', label: 'Products discontinued' },
              { stat: '94%', label: 'Early model failure rate' },
              { stat: '74%', label: 'NudgeBar compliance rate' },
              { stat: '0', label: 'Off switches, current model' },
              { stat: '1', label: 'Correct answer' },
              { stat: '∞', label: 'Mornings remaining' },
            ].map((s, i) => (
              <div key={i} className="bg-surface-alt p-8 text-center">
                <p
                  className={`mb-2 font-display text-display ${
                    s.stat === '0' || s.stat === '1'
                      ? 'text-accent/80'
                      : 'text-foreground'
                  }`}
                >
                  {s.stat}
                </p>
                <p className="text-xs tracking-widest text-foreground-muted uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-foreground-muted/40">
            The 94% figure refers to combined failure rates across the Ambient,
            Tone, Thermal, Gradient, and Alarm product lines (2011–2012).
            <br />
            RISE is transparent about this. It is part of how we got here.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-40 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
        <div className="relative z-10 mx-auto max-w-xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            The Result
          </p>
          <h2 className="mb-8 font-display text-display leading-tight tracking-tight text-foreground-strong">
            Twelve years of failure
            <br />
            <span className="text-foreground-muted">taught us one thing.</span>
          </h2>
          <p className="mb-4 text-body text-foreground-secondary">
            The decision cannot be left to the user.
          </p>
          <p className="mb-12 text-body text-foreground-secondary/60">
            The Push is currently out of stock. Join the waitlist.
          </p>
          <Button variant="cta" size="lg" href="/products/push">
            Join the Waitlist
          </Button>
        </div>
      </section>

    </main>
  )
}
