import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'RISE™ Move',
  description:
    'Next-generation vertical navigation. Stairs. Both directions. In development.',
  path: '/move',
})

export default function MoveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
