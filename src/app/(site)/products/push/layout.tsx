import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Push — Smart Adjustable Base',
  description:
    'Autonomous flat-surface navigation. One button. No off switch. 98% on-time compliance. For People Who Need A Little Push.',
}

export default function PushLayout({ children }: { children: React.ReactNode }) {
  return children
}
