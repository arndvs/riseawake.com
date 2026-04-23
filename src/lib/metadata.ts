import type { Metadata } from 'next'
import { siteUrl } from '@/sanity/env'

type MetadataInput = {
    title: string
    description: string
    path?: string
    openGraph?: Partial<NonNullable<Metadata['openGraph']>>
    robots?: Metadata['robots']
    noIndex?: boolean
}

export function createMetadata({ title, description, path, openGraph, robots, noIndex }: MetadataInput): Metadata {
    const url = path ? new URL(path, siteUrl).toString() : siteUrl

    return {
        title,
        description,
        alternates: {
            canonical: url,
            types: {
                'application/rss+xml': `${siteUrl}/blog/feed.xml`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'RISE™',
            locale: 'en_US',
            type: 'website',
            ...openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : robots ?? {
                  index: true,
                  follow: true,
                  'max-image-preview': 'large',
                  'max-snippet': -1,
              },
    }
}
