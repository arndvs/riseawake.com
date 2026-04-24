import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Legal Documents',
  description:
    'RISE™ legal documents. Terms of Service, Privacy Policy, Push Mode EULA, and more.',
}

export default function LegalRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
