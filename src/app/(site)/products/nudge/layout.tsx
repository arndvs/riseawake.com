import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Nudge',
  description:
    'The original RISE™ smart adjustable base. First Generation, 2013–2019. Discontinued.',
}

export default function NudgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
