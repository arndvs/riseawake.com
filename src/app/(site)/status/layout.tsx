import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'System Status — Push Mode & Platform Services',
  description:
    'Real-time status for Push Mode, Self-Making Mechanism, Solo Return Commute, RISE Index, and all platform services.',
  path: '/status',
})

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
