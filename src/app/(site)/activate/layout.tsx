import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activate Your Push',
  description:
    'Device activation for the RISE Push. 12 stages. 45–90 minutes. Everything the bed needs to know.',
}

export default function ActivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
