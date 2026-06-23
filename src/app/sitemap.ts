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
    '/airbnb-iten-kenya',
    '/guesthouse-in-iten',
    '/accommodation-in-iten',
    '/athlete-stay-iten',
    '/monthly-stays-iten',
    '/stay-in-iten',
  ]
  return routes.map((route) => ({ url: absoluteUrl(route), lastModified: new Date() }))
}
