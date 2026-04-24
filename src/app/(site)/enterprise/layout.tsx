import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Enterprise — RISE for Organizations',
  description:
    'Push Mode is the structural intervention that makes your employees\u2019 morning decision hold. Corporate pricing and pilot programs.',
  path: '/enterprise',
})

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
