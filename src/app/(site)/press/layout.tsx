import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Official press releases from RISE™ Technologies, Inc.',
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
