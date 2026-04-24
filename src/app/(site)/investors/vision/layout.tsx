import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vision 2045 — 20-Year Vision',
  description:
    'The Morning After: A 20-Year Vision for Human Potential. RISE strategic vision through 2045.',
}

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
