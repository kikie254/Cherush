import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/utils'
import { getBlogPosts } from '@/lib/blog-data'
import { getRooms } from '@/lib/queries'

const STATIC_PAGES: { route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { route: '/', priority: 1.0, changeFrequency: 'daily' },
  { route: '/rooms', priority: 0.9, changeFrequency: 'weekly' },
  { route: '/bookings', priority: 0.9, changeFrequency: 'daily' },
  { route: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/gallery', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/experience', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { route: '/blog', priority: 0.9, changeFrequency: 'daily' },
  
  // SEO Base Pages
  { route: '/about-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/guest-house-in-iten', priority: 0.9, changeFrequency: 'monthly' },
  
  // Phase 3 Landing Pages
  { route: '/family-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/business-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/conference-venue-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/budget-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/luxury-accommodation-iten', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/long-stay-accommodation', priority: 0.9, changeFrequency: 'monthly' },
  { route: '/athlete-accommodation', priority: 0.9, changeFrequency: 'monthly' },
  
  // Phase 5 E-E-A-T Pages
  { route: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
  { route: '/terms-and-conditions', priority: 0.5, changeFrequency: 'yearly' },
  { route: '/cancellation-policy', priority: 0.6, changeFrequency: 'yearly' },
  { route: '/house-rules', priority: 0.6, changeFrequency: 'yearly' },
  { route: '/about-the-owners', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/company-history', priority: 0.7, changeFrequency: 'yearly' },
  { route: '/mission-and-values', priority: 0.7, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  
  const staticSitemap: MetadataRoute.Sitemap = STATIC_PAGES.map(({ route, priority, changeFrequency }) => ({
    url: absoluteUrl(route),
    lastModified,
    priority,
    changeFrequency,
  }))

  const blogPosts = await getBlogPosts()
  const dynamicBlogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.datePublished),
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  const rooms = await getRooms()
  const dynamicRoomSitemap: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: absoluteUrl(`/rooms/${room.slug}`),
    lastModified, // Or specific room update date if available
    priority: 0.9,
    changeFrequency: 'weekly',
  }))

  return [...staticSitemap, ...dynamicBlogSitemap, ...dynamicRoomSitemap]
}
