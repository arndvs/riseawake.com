import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'RISE Index — Compliance & Lifestyle Scoring',
  description:
    'The RISE Index is a proprietary compliance and lifestyle score. The methodology is not disclosed. Your score exists.',
  path: '/index-score',
})

export default function IndexScoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
