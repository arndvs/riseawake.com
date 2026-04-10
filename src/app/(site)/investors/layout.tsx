import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investor Relations',
  description:
    'RISE™ investor relations — financial results, annual reports, shareholder communications, and corporate governance.',
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
