'use client'

import { Link } from '@/components/link'
import { usePathname } from 'next/navigation'

const IR_NAV = [
  { label: 'IR Hub', href: '/investors' },
  { label: 'Vision 2045', href: '/investors/vision' },
  { label: 'CEO Letter', href: '/investors/shareholder-letter' },
  { label: 'Annual Report', href: '/investors/annual-report' },
  { label: 'Meeting Minutes', href: '/investors/meeting-minutes' },
  { label: 'Financials', href: '/investors/financials' },
  { label: 'Press', href: '/investors/press' },
]

type Props = {
  children: React.ReactNode
}

export default function InvestorLayout({ children }: Props) {
  const pathname = usePathname()

  return (
    <div className="bg-page">
      <div className="sticky top-16 z-40 border-b border-edge-subtle bg-page/95 px-6 backdrop-blur-xl">
        <div className="scrollbar-none mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto py-3">
          {IR_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                pathname === item.href
                  ? 'border-b border-accent/60 pb-0.5 text-foreground'
                  : 'border-b border-transparent pb-0.5 text-foreground-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-b border-accent/10 bg-accent/5 px-6 py-2 text-center text-[10px] text-foreground-muted">
        For informational purposes only. Forward-looking statements involve risks and uncertainties. Past Push Mode compliance rates do not guarantee future compliance rates.
      </div>

      {children}
    </div>
  )
}

export function IRMetricCard({
  stat,
  label,
  note,
}: {
  stat: string
  label: string
  note?: string
}) {
  return (
    <div className="rounded-sm border border-edge-subtle bg-surface-alt p-8">
      <p className="font-display text-[clamp(2rem,4vw,3rem)] tracking-tight text-foreground">
        {stat}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-foreground-muted">
        {label}
      </p>
      {note && (
        <p className="mt-2 text-[10px] leading-relaxed text-foreground-muted">
          {note}
        </p>
      )}
    </div>
  )
}
