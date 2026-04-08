import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — RISE™',
  description:
    'RISE™ Terms of Service. Version 4.2. The foundational agreement governing your use of RISE™ products and services.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
