import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Coverage',
  description:
    'Selected media coverage of RISE from FY2024 — what they are saying about Push Mode.',
}

export default function InvestorPressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
