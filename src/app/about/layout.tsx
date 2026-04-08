import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Twelve years. One conclusion. The full history of RISE™ Technologies.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
