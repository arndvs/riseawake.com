import type { MetadataRoute } from 'next'

/**
 * RISE™ Robots Configuration
 *
 * This file governs which routes are accessible to search engine crawlers.
 * RISE™ welcomes all crawlers to index the consumer-facing portions of our site.
 *
 * The /internal/ routes are excluded from indexing. These routes contain
 * an internal document management system that was deployed to production
 * by a junior developer who did not implement authentication middleware.
 * The system remains publicly accessible. Excluding it from robots.txt
 * does not resolve the access issue but does reduce discoverability.
 *
 * The /remote/ route is excluded as it is not intended for public discovery.
 * It is the PM-1 remote interface. One button. No off switch.
 *
 * RISE™ considers this an acceptable interim measure.
 * The IT team has been notified.
 *
 * — RISE™ Web Infrastructure
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/internal/', '/remote/', '/studio/'],
      },
    ],
    sitemap: 'https://riseawake.com/sitemap.xml',
  }
}
