import { clsx } from 'clsx'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 28"
      fill="none"
      className={clsx(className, 'overflow-visible')}
    >
      <rect width="28" height="28" rx="4" className="fill-accent/15" />
      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="27"
        rx="3.5"
        className="stroke-accent/40"
        strokeWidth="0.5"
      />
      <path
        d="M24 24H4"
        className="stroke-foreground/20"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M6.93 12.93l1.41 1.41M21.07 12.93l-1.41 1.41M4 20h2M22 20h2"
        className="stroke-amber-400/50"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M18 20a4 4 0 0 0-8 0"
        className="stroke-amber-500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 4v8M10 8l4-4 4 4"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="36"
        y="20"
        className="fill-foreground font-sans"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0.22em"
      >
        RISE™
      </text>
    </svg>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className}>
      <rect width="28" height="28" rx="4" className="fill-accent/15" />
      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="27"
        rx="3.5"
        className="stroke-accent/40"
        strokeWidth="0.5"
      />
      <path
        d="M24 24H4"
        className="stroke-foreground/20"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M6.93 12.93l1.41 1.41M21.07 12.93l-1.41 1.41M4 20h2M22 20h2"
        className="stroke-amber-400/50"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M18 20a4 4 0 0 0-8 0"
        className="stroke-amber-500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 4v8M10 8l4-4 4 4"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
