import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const base = clsx(
  'inline-flex items-center justify-center font-medium uppercase whitespace-nowrap',
  'transition-all duration-200',
  'data-disabled:opacity-40 data-disabled:pointer-events-none',
)

const variants = {
  primary: clsx(
    'rounded-full bg-brand text-brand-on',
    'data-hover:bg-brand-hover',
  ),
  cta: clsx(
    'rounded-full bg-cta text-cta-on',
    'data-hover:bg-cta-hover',
  ),
  outline: clsx(
    'rounded-full ring-1 ring-edge-strong text-foreground',
    'data-hover:bg-foreground/5',
  ),
  ghost: clsx(
    'rounded-full text-foreground-secondary',
    'data-hover:text-foreground data-hover:bg-foreground/5',
  ),
}

const sizes = {
  sm: 'px-5 py-2.5 text-xs tracking-[0.14em]',
  md: 'px-8 py-3.5 text-xs tracking-[0.14em]',
  lg: 'px-10 py-4 text-xs tracking-[0.16em]',
}

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
