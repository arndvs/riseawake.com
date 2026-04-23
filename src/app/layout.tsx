import { ClerkProvider } from '@clerk/nextjs'
import { EasterEggs } from '@/components/easter-eggs'
import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import { siteUrl } from '@/sanity/env'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s — RISE',
    default: 'RISE — Smart Adjustable Base',
  },
  description:
    'For People Who Need A Little Push. The RISE Smart Adjustable Base.',
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/blog/feed.xml`,
    },
  },
  openGraph: {
    title: 'RISE — Smart Adjustable Base',
    description: 'For People Who Need A Little Push.',
    url: siteUrl,
    siteName: 'RISE',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RISE — Smart Adjustable Base',
    description: 'For People Who Need A Little Push.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`} suppressHydrationWarning>
      <body className="bg-page text-foreground antialiased">
        <ClerkProvider afterSignOutUrl="/studio">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <EasterEggs />
            <SanityLive revalidateSyncTags={revalidateSyncTags} />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
