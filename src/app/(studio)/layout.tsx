import ConvexClientProvider from '@/components/convex-client-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RISE Render',
  description: 'Internal production environment.',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/studio">
      <ConvexClientProvider>
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
