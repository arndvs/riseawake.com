import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — RISE™',
  description:
    'RISE™ Privacy Policy. Version 4.2. A comprehensive account of the data RISE™ collects, retains, shares, and acts upon.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
