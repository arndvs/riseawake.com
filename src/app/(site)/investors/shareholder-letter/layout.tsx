import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CEO Shareholder Letter — FY2024',
  description:
    'Annual letter to shareholders from Dr. Eleanor Voss, Founder & CEO of RISE Technologies.',
}

export default function ShareholderLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
