import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autonomous Navigation Disclosure',
  description:
    "RISE Autonomous Navigation Disclosure. Version 4.2. Covers the Push's solo return commute, third-party encounters, traffic interactions, and elevator use.",
}

export default function AutonomousNavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
