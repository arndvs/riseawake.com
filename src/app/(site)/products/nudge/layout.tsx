import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'The Nudge',
  description:
    'The original RISE™ smart adjustable base. First Generation, 2013–2019. Discontinued.',
  path: '/products/nudge',
})

export default function NudgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
