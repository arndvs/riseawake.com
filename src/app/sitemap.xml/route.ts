import { client } from '@/sanity/client'
import { siteUrl } from '@/sanity/env'
import { defineQuery } from 'next-sanity'

const SITEMAP_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  "slug": slug.current,
  publishedAt,
}`)

const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/products/push', priority: '0.8', changefreq: 'monthly' },
    { path: '/products/nudge', priority: '0.6', changefreq: 'yearly' },
    { path: '/move', priority: '0.7', changefreq: 'monthly' },
    { path: '/activate', priority: '0.6', changefreq: 'yearly' },
    { path: '/help', priority: '0.6', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/sdk', priority: '0.6', changefreq: 'monthly' },
    { path: '/sdk/documentation', priority: '0.5', changefreq: 'monthly' },
    { path: '/press', priority: '0.5', changefreq: 'monthly' },
    { path: '/press/rise-move-announcement', priority: '0.4', changefreq: 'yearly' },
    { path: '/data-request', priority: '0.3', changefreq: 'yearly' },
    { path: '/investors', priority: '0.5', changefreq: 'monthly' },
    { path: '/investors/vision', priority: '0.4', changefreq: 'yearly' },
    { path: '/investors/shareholder-letter', priority: '0.4', changefreq: 'yearly' },
    { path: '/investors/annual-report', priority: '0.4', changefreq: 'yearly' },
    { path: '/investors/meeting-minutes', priority: '0.3', changefreq: 'yearly' },
    { path: '/investors/financials', priority: '0.4', changefreq: 'monthly' },
    { path: '/investors/press', priority: '0.4', changefreq: 'monthly' },
    { path: '/legal', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/push-mode-eula', priority: '0.2', changefreq: 'yearly' },
    { path: '/legal/sleep-data-policy', priority: '0.2', changefreq: 'yearly' },
    { path: '/legal/autonomous-navigation', priority: '0.2', changefreq: 'yearly' },
    { path: '/legal/disclaimer', priority: '0.2', changefreq: 'yearly' },
    { path: '/sitemap', priority: '0.1', changefreq: 'monthly' },
]

export async function GET() {
    const posts = await client.fetch(SITEMAP_POSTS_QUERY)

    const staticEntries = staticRoutes.map(
        (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )

    const blogEntries = posts.map(
        (post: { slug: string; publishedAt: string | null }) => `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>${post.publishedAt ? `\n    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join('\n')}
</urlset>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
    })
}
