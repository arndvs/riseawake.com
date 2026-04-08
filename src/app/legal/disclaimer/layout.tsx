import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'General Disclaimer — RISE™',
  description:
    'RISE™ General Disclaimer. Version 4.2. Limitations of liability covering physical harm scenarios, the liability cap calculation, and the RISE™ Index.',
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
