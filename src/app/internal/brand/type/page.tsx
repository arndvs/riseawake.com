import {
  Body,
  Caption,
  Display,
  Eyebrow,
  H1,
  H2,
  Hero,
  Lede,
  MonoTag,
  Section,
  SectionNum,
  StatCap,
  StatNum,
  Subsection,
} from '@/components/brand/typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Type · RISE Brand',
  description:
    'Internal showcase of v6 typography roles backed by Fraunces variable axes (opsz / SOFT / WONK).',
  robots: { index: false, follow: false },
}

/**
 * Internal showcase for spec §2 typography. Renders every v6 role with a
 * sample italic <em> so the per-role variation settings can be visually
 * verified against the spec table. Used as the QA target for Slice A3.
 */
export default function BrandTypePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 space-y-16">
      <header className="space-y-6">
        <Eyebrow>RISE · Brand · Type</Eyebrow>
        <Display>
          Italics are <em>brand voice</em>.
        </Display>
        <Lede>
          Every display role drives Fraunces with role-specific{' '}
          <code>font-variation-settings</code>: opsz, weight, SOFT, WONK. Italic{' '}
          <em>em</em> spans intensify SOFT and switch color to{' '}
          <code>--accent-deep</code>. See spec §2.
        </Lede>
      </header>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>Hero · 144 / 50 → em 80 / 1</Eyebrow>
        <Hero>
          The morning <em>chooses</em> you.
        </Hero>
      </section>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>Display · 144 / 60 → em 100 / 1</Eyebrow>
        <Display>
          Sleep is the <em>foundation</em>.
        </Display>
      </section>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>Section · 72 / 40 → em 80 / 1</Eyebrow>
        <Section>
          Built for <em>quiet ambition</em>.
        </Section>
      </section>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>H1 · 96 / 50 → em 100 / 1</Eyebrow>
        <H1>
          A single <em>arc</em> through the day.
        </H1>
      </section>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>H2 · 72 / 50 → em 100 / 1</Eyebrow>
        <H2>
          The shape of <em>tomorrow morning</em>.
        </H2>
      </section>

      <section className="space-y-6 border-t border-hairline pt-12">
        <Eyebrow>Subsection · 36 / 40 → em 100 / 1</Eyebrow>
        <Subsection>
          On <em>rhythm</em>, not routine.
        </Subsection>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Section number · 12 / 100 / WONK 1</Eyebrow>
        <div className="flex items-baseline gap-4">
          <SectionNum>§ 02</SectionNum>
          <H2>Atmosphere</H2>
        </div>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Lede · body 19 / 300 / 1.5</Eyebrow>
        <Lede>
          The lede sets atmosphere. Three lines or fewer. It hands the reader to
          the body without raising its voice.
        </Lede>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Body · 15 / 400 / 1.65</Eyebrow>
        <Body>
          Body copy carries the argument. It is calm, precise, and unhurried —
          the visual equivalent of someone who has slept well. Italics live in
          the display layer; body text never leans.
        </Body>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Caption · 13 / 400 / muted</Eyebrow>
        <Caption>Captions sit beneath images, charts, and stats.</Caption>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Stat · num 144 / 50 → em 100 / 1, cap 0.22em</Eyebrow>
        <div className="flex items-baseline gap-6">
          <StatNum>
            42<em>%</em>
          </StatNum>
          <StatCap>Avg. cortisol drop · day 30</StatCap>
        </div>
      </section>

      <section className="space-y-3 border-t border-hairline pt-12">
        <Eyebrow>Mono tag · 11 / 500 / 0.04em</Eyebrow>
        <MonoTag>v6.0 · spec §2</MonoTag>
      </section>
    </main>
  )
}
