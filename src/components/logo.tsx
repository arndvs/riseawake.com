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
        d="M8 20H20M8 20V14M20 20V14"
        className="stroke-foreground/20"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M11 14H17"
        className="stroke-foreground/15"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 14V8M14 8L11 11M14 8L17 11"
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
        d="M8 20H20M8 20V14M20 20V14"
        className="stroke-foreground/20"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M11 14H17"
        className="stroke-foreground/15"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 14V8M14 8L11 11M14 8L17 11"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
