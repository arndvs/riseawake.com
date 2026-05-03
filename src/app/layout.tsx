import { EasterEggs } from '@/components/easter-eggs'
import { siteUrl } from '@/sanity/env'
import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Fraunces, Inter } from 'next/font/google'
import { cn } from "@/lib/utils";

/*
 * v6 typography — see working/RISE_BRAND_SYSTEM_v6.md §1.5 + §2.
 *
 * Fraunces (display) loads the full variable axes (opsz 9..144, wght 300..700,
 * SOFT 0..100, WONK 0..1) so headlines can drive opsz/SOFT/WONK via
 * font-variation-settings. Inter (body) loads weights 300..700 in roman + italic.
 *
 * --font-display and --font-body are the canonical CSS names (referenced from
 * @theme in src/styles/tailwind.css). --font-sans / --font-heading aliases are
 * kept while v3-corporate components still reference them; they're cleaned up
 * in Slice Z1.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--next-font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--next-font-body',
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
    <html
      lang="en"
      className={cn(fraunces.variable, inter.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <EasterEggs />
          <SanityLive revalidateSyncTags={revalidateSyncTags} />
        </ThemeProvider>
      </body>
    </html>
  )
}
