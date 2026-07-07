import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/utils'
import { getBlogPosts } from '@/lib/blog-data'
import { getRooms } from '@/lib/queries'

/**
 * Static pages ordered by priority.
 * Only public, indexable pages are listed here.
 * Admin, auth, account, and utility pages are excluded.
 */
const STATIC_PAGES: {
  route: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']
}[] = [
  // Core pages
  { route: '/', priority: 1.0, changeFrequency: 'daily' },
  { route: '/rooms', priority: 0.95, changeFrequency: 'weekly' },
  { route: '/bookings', priority: 0.95, changeFrequency: 'weekly' },
  { route: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/gallery', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/experience', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/blog', priority: 0.9, changeFrequency: 'daily' },

  // Local SEO landing pages
  { route: '/about-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/guest-house-in-iten', priority: 0.95, changeFrequency: 'monthly' },
  { route: '/travel-guide-iten', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/local-attractions', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/running-camps-iten', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/hotels-in-iten', priority: 0.95, changeFrequency: 'monthly' },
  { route: '/accommodation-in-iten', priority: 0.95, changeFrequency: 'monthly' },

  // Accommodation type landing pages
  { route: '/family-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/business-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/conference-venue-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/budget-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/luxury-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/best-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/long-stay-accommodation', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/monthly-stays-iten', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/athlete-accommodation', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/athlete-stay-iten', priority: 0.85, changeFrequency: 'monthly' },

  // E-E-A-T / trust pages
  { route: '/about-the-owners', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/company-history', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/mission-and-values', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/sustainability', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/team', priority: 0.65, changeFrequency: 'yearly' },

  // Policy pages (low priority, infrequent change)
  { route: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
  { route: '/terms-and-conditions', priority: 0.4, changeFrequency: 'yearly' },
  { route: '/cancellation-policy', priority: 0.6, changeFrequency: 'yearly' },
  { route: '/house-rules', priority: 0.6, changeFrequency: 'yearly' },

  // Community / social proof
  { route: '/guest-stories', priority: 0.7, changeFrequency: 'weekly' },
  { route: '/community', priority: 0.65, changeFrequency: 'monthly' },
  { route: '/media', priority: 0.6, changeFrequency: 'monthly' },
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
