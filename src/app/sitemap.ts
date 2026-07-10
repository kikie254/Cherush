import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/utils'
import { getBlogPosts } from '@/lib/blog-data'
import { getRooms } from '@/lib/queries'

/**
 * Static pages ordered by priority.
 * Only REAL public pages are listed here — routes that resolve to a page.tsx file
 * or are canonical destinations. Redirect-only routes are excluded.
 * Admin, auth, account, and utility pages are also excluded.
 */
const STATIC_PAGES: {
  route: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']
}[] = [
  // Core pages (all have page.tsx files)
  { route: '/', priority: 1.0, changeFrequency: 'daily' },
  { route: '/rooms', priority: 0.95, changeFrequency: 'weekly' },
  { route: '/gallery', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/experience', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/amenities', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/reviews', priority: 0.75, changeFrequency: 'weekly' },
  { route: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { route: '/faq', priority: 0.8, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticSitemap: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ route, priority, changeFrequency }) => ({
      url: absoluteUrl(route),
      lastModified,
      priority,
      changeFrequency,
    })
  )

  // Dynamic blog posts
  let dynamicBlogSitemap: MetadataRoute.Sitemap = []
  try {
    const blogPosts = await getBlogPosts()
    dynamicBlogSitemap = blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.datePublished),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    }))
  } catch {
    // Graceful degradation — blog posts not critical for sitemap generation
  }

  // Dynamic room pages
  let dynamicRoomSitemap: MetadataRoute.Sitemap = []
  try {
    const rooms = await getRooms()
    dynamicRoomSitemap = rooms.map((room) => ({
      url: absoluteUrl(`/rooms/${room.slug}`),
      lastModified,
      priority: 0.95,
      changeFrequency: 'weekly' as const,
    }))
  } catch {
    // Graceful degradation
  }

  return [...staticSitemap, ...dynamicBlogSitemap, ...dynamicRoomSitemap]
}
