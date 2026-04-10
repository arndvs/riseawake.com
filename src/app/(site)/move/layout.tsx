import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RISE™ Move',
  description:
    'Next-generation vertical navigation. Stairs. Both directions. In development.',
}

export default function MoveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
