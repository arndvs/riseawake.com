import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

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
  title: {
    template: '%s — RISE™',
    default: 'RISE™ — Smart Adjustable Base',
  },
  description:
    'For People Who Need A Little Push. The RISE™ Smart Adjustable Base.',
  openGraph: {
    title: 'RISE™ — Smart Adjustable Base',
    description: 'For People Who Need A Little Push.',
    url: 'https://riseco.online',
    siteName: 'RISE™',
    type: 'website',
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
      className={`${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RISE™ Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className="bg-page text-foreground antialiased">
        {children}
        <SanityLive revalidateSyncTags={revalidateSyncTags} />
      </body>
    </html>
  )
}
