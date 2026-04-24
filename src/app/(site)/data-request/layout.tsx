import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Subject Request Process',
  description:
    'RISE respects your right to access your personal data. We have designed a thorough process to ensure your request is handled with the care it deserves.',
}

export default function DataRequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
