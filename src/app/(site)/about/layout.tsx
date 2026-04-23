import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Our Story',
  description:
    'Twelve years. One conclusion. The full history of RISE Technologies.',
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
