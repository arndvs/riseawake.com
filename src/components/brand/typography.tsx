/**
 * RISE v6 typography components — spec §2.
 *
 * Each role is backed by a `.t-*` component class defined in
 * src/styles/tailwind.css. The class encodes size, weight, line-height,
 * tracking, and the per-role font-variation-settings triple
 * (opsz / wght / SOFT) for Fraunces, plus a child `<em>` rule with the
 * role-specific italic axes (see spec §2 italic emphasis table).
 *
 * Italic <em> is per-role, NOT global — SOFT and opsz vary by display size.
 *
 * Use `<em>` (not <i>) inside display roles for accent. Body roles
 * (Lede / Body / Caption) intentionally have no italic em rule —
 * italics on body copy violates the brand voice.
 *
 * Slice A3 (PR stacks on A2). Consumers of the legacy
 * `src/components/text.tsx` (Heading / Subheading / Lead) are migrated
 * in Slice A5 / B1, after which text.tsx is deleted.
 */
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type AsProp<E extends ElementType> = { as?: E }
type PolymorphicProps<E extends ElementType, Extra = unknown> = AsProp<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof AsProp<E> | keyof Extra> &
  Extra

// ── Display roles ──────────────────────────────────────────────────────────

export function Hero<E extends ElementType = 'h1'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h1') as ElementType
  return <Element className={cn('t-hero', className)} {...props} />
}

export function Display<E extends ElementType = 'h1'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h1') as ElementType
  return <Element className={cn('t-display', className)} {...props} />
}

export function Section<E extends ElementType = 'h2'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h2') as ElementType
  return <Element className={cn('t-section', className)} {...props} />
}

export function H1<E extends ElementType = 'h1'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h1') as ElementType
  return <Element className={cn('t-h1', className)} {...props} />
}

export function H2<E extends ElementType = 'h2'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h2') as ElementType
  return <Element className={cn('t-h2', className)} {...props} />
}

export function Subsection<E extends ElementType = 'h3'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'h3') as ElementType
  return <Element className={cn('t-subsection', className)} {...props} />
}

export function SectionNum({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn('t-section-num', className)} {...props} />
}

export function StatNum<E extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'div') as ElementType
  return <Element className={cn('t-stat-num', className)} {...props} />
}

// ── Body roles ─────────────────────────────────────────────────────────────

export function Lede<E extends ElementType = 'p'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'p') as ElementType
  return <Element className={cn('t-lede', className)} {...props} />
}

export function Body<E extends ElementType = 'p'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'p') as ElementType
  return <Element className={cn('t-body', className)} {...props} />
}

export function Caption<E extends ElementType = 'span'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'span') as ElementType
  return <Element className={cn('t-caption', className)} {...props} />
}

export function Eyebrow<E extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'div') as ElementType
  return <Element className={cn('t-eyebrow', className)} {...props} />
}

export function StatCap<E extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Element = (as ?? 'div') as ElementType
  return <Element className={cn('t-stat-cap', className)} {...props} />
}

export function MonoTag({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn('t-mono-tag', className)} {...props} />
}
