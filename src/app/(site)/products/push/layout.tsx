import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'The Push — Smart Adjustable Base',
  description:
    'Autonomous flat-surface navigation. One button. No off switch. 98% on-time compliance. For People Who Need A Little Push.',
  path: '/products/push',
})

export default function PushLayout({ children }: { children: React.ReactNode }) {
  return children
}
