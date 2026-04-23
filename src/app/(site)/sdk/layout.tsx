import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DataKit SDK',
  description:
    'The professional toolkit for accessing RISE Standard Metric data. Three tiers available.',
}

export default function SDKLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
