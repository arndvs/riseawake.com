import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

/*
 * v6 button — see working/RISE_BRAND_SYSTEM_v6.md §3.1.
 *
 * Pill radius, body font, 14px / 500 / 0.01em tracking. Hover lifts -1px and
 * any direct-child SVG nudges +2px on the x-axis ("right-arrow" affordance).
 *
 * Variants:
 *   primary  — ink bg, dawn fg; hover ink-soft + shadow-sm. Dark inverts.
 *   accent   — sunrise bg, ink fg; hover accent-deep + dawn fg.
 *   ghost    — transparent, foreground text, hairline border; hover surface-2.
 *   link     — bottom-rule only; no translate on hover.
 *
 * Deprecated v5 aliases retained until Slice B1 rewrites every call site:
 *   cta      → accent
 *   outline  → ghost
 */
const base = clsx(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap',
  'font-sans font-medium tracking-[0.01em]',
  'transition-all duration-200 ease-out',
  'data-disabled:opacity-40 data-disabled:pointer-events-none',
  '[&>svg]:transition-transform [&>svg]:duration-200',
)

const lift = 'hover:-translate-y-px hover:[&>svg]:translate-x-0.5'

const variants = {
  primary: clsx(
    'rounded-full bg-rise-ink text-rise-dawn shadow-xs',
    'hover:bg-rise-ink-soft hover:shadow-sm',
    'dark:bg-rise-dawn dark:text-rise-ink dark:hover:bg-white',
    lift,
  ),
  accent: clsx(
    'rounded-full bg-rise-rise text-rise-ink shadow-xs',
    'hover:bg-rise-horizon hover:text-rise-dawn hover:shadow-sm',
    lift,
  ),
  ghost: clsx(
    'rounded-full bg-transparent text-foreground border border-hairline',
    'hover:border-foreground hover:bg-surface-2',
    lift,
  ),
  link: clsx(
    'rounded-none bg-transparent text-foreground',
    'border-b border-hairline px-0',
    'hover:border-foreground',
  ),
  // — Deprecated aliases (v5 call sites) — remove in B1.
  cta: clsx(
    'rounded-full bg-rise-rise text-rise-ink shadow-xs',
    'hover:bg-rise-horizon hover:text-rise-dawn hover:shadow-sm',
    lift,
  ),
  outline: clsx(
    'rounded-full bg-transparent text-foreground border border-hairline',
    'hover:border-foreground hover:bg-surface-2',
    lift,
  ),
} as const

const sizes = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-[14px]',
  lg: 'px-8 py-3.5 text-[15px]',
  icon: 'size-12 p-0',
} as const

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  className = clsx(base, variants[variant], sizes[size], className)

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
