import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RISE Internal Document System',
  description: 'Authorized personnel only.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
