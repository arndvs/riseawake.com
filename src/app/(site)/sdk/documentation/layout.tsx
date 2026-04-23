import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DataKit SDK Documentation',
  description:
    'Documentation for the RISE DataKit SDK. Available without purchase. Usefulness without purchase is limited.',
}

export default function SDKDocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
