import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/rooms',
    '/experience',
    '/gallery',
    '/bookings',
    '/about',
    '/contact',
    '/athlete-stay-iten',
    '/monthly-stays-iten',
  ]
  return routes.map((route) => ({ url: absoluteUrl(route), lastModified: new Date() }))
}
