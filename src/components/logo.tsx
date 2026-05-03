import { clsx } from 'clsx'

/*
 * v6 logo — see working/RISE_BRAND_SYSTEM_v6.md §3.16.
 *
 * Sun-over-pillow mark + RISE wordmark in Fraunces. The mark uses
 * currentColor; the wordmark inherits text color. Two render modes:
 *
 *   variant="nav"  — glyph + wordmark inline at nav scale (default for
 *                     navbar and footer). 28px glyph, 22px Fraunces 400 /
 *                     opsz 36 / SOFT 50.
 *   variant="hero" — paired with surface-2 glyph box at 80px and large
 *                     44px Fraunces 400 / opsz 144 / SOFT 60 wordmark.
 *
 * The mark itself is the verbatim path data from spec §3.16.
 */

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="48" y1="6" x2="48" y2="16" />
      <line x1="20" y1="18" x2="26" y2="24" />
      <line x1="76" y1="18" x2="70" y2="24" />
      <line x1="8" y1="42" x2="16" y2="42" />
      <line x1="88" y1="42" x2="80" y2="42" />
      <path d="M26 56 a22 22 0 0 1 44 0" fill="currentColor" stroke="none" />
      <path d="M6 60 Q48 48 90 60" strokeWidth={4} />
      <path d="M6 76 Q48 70 90 76" strokeWidth={4} opacity={0.55} />
    </svg>
  )
}

type LogoProps = {
  variant?: 'nav' | 'hero'
  className?: string
  showTagline?: boolean
  tagline?: string
}

export function Logo({
  variant = 'nav',
  className,
  showTagline = false,
  tagline = 'est. 2018 · Devon',
}: LogoProps) {
  if (variant === 'hero') {
    return (
      <div
        className={clsx(
          'grid grid-cols-[auto_1fr] items-center gap-5',
          className,
        )}
      >
        <div className="flex size-20 items-center justify-center rounded-2xl border border-hairline bg-surface-2 p-3.5 text-accent-deep">
          <Mark className="size-full" />
        </div>
        <div>
          <div
            className="font-display leading-[0.9] tracking-[-0.04em] text-foreground"
            style={{
              fontSize: '44px',
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144, "SOFT" 60',
            }}
          >
            RISE
          </div>
          {showTagline && (
            <p className="mt-2 text-[12px] tracking-[0.18em] text-muted uppercase">
              {tagline}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <span
      className={clsx('inline-flex items-center gap-2 text-foreground', className)}
    >
      <Mark className="size-7 text-accent-deep" />
      <span
        className="font-display leading-none tracking-[-0.02em]"
        style={{
          fontSize: '22px',
          fontWeight: 400,
          fontVariationSettings: '"opsz" 36, "SOFT" 50',
        }}
      >
        RISE
      </span>
    </span>
  )
}
