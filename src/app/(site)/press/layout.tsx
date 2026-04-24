import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Press',
  description:
    'Official press releases from RISE Technologies, Inc.',
  path: '/press',
})

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
