import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RISE Render',
  description: 'Internal production environment.',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
