import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'RISE customer support. FAQ, warranty details, and contact form.',
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
