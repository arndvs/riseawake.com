import { clsx } from 'clsx'

/*
 * v6 gradient — sunrise wash. See working/RISE_BRAND_SYSTEM_v6.md §1.3.
 *
 * Replaces the v5 brand-blue glow. Uses rise-rise → rise-horizon (the v6
 * sunrise pair) and fades to transparent. Decorative only; sits behind page
 * content.
 */
export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
          'bg-linear-to-br from-rise-rise/15 via-rise-horizon/8 to-transparent',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
