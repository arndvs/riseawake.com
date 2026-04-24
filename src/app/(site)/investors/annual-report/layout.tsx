import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FY2024 Annual Report',
  description:
    'RISE Technologies FY2024 Annual Report — financial highlights, business overview, market opportunity, risk factors, and leadership.',
}

export default function AnnualReportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
