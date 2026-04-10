import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financials & Data',
  description:
    'RISE™ FY2024 key performance indicators — revenue, unit economics, Push Mode compliance, NPS, and geographic expansion.',
}

export default function FinancialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
