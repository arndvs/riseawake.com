import { image } from '@/sanity/image'
import { getPostsForFeed } from '@/sanity/queries'
import { Feed } from 'feed'
import assert from 'node:assert'

export async function GET(req: Request) {
  const siteUrl = new URL(req.url).origin

  const feed = new Feed({
    title: 'RISE™ Blog',
    description:
      'Updates, observations, and communications from RISE™ Technologies.',
    author: {
      name: 'RISE™ Technologies',
      email: 'press@riseawake.com',
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const { data: posts } = await getPostsForFeed()

  posts.forEach((post) => {
    try {
      assert(typeof post.title === 'string')
      assert(typeof post.slug === 'string')
      assert(typeof post.excerpt === 'string')
      assert(typeof post.publishedAt === 'string')
    } catch {
      throw new Error(`Post is missing required fields for RSS feed: ${JSON.stringify(post)}`)
    }

    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${siteUrl}/blog/${post.slug}`,
      content: post.excerpt,
      image: post.mainImage
        ? image(post.mainImage)
            .size(1200, 800)
            .format('jpg')
            .url()
            .replaceAll('&', '&amp;')
        : undefined,
      author: post.author?.name ? [{ name: post.author.name }] : [],
      contributor: post.author?.name ? [{ name: post.author.name }] : [],
      date: new Date(post.publishedAt),
    })
  })

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
