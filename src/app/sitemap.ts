import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/utils'

const PAGES: { route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { route: '/',                    priority: 1.0, changeFrequency: 'weekly'  },
  { route: '/rooms',               priority: 0.9, changeFrequency: 'weekly'  },
  { route: '/bookings',            priority: 0.9, changeFrequency: 'daily'   },
  { route: '/bookings/track',      priority: 0.6, changeFrequency: 'monthly' },
  { route: '/contact',             priority: 0.8, changeFrequency: 'monthly' },
  { route: '/gallery',             priority: 0.7, changeFrequency: 'monthly' },
  { route: '/experience',          priority: 0.7, changeFrequency: 'monthly' },
  { route: '/about',               priority: 0.6, changeFrequency: 'monthly' },
  { route: '/athlete-stay-iten',   priority: 0.6, changeFrequency: 'monthly' },
  { route: '/monthly-stays-iten',  priority: 0.6, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PAGES.map(({ route, priority, changeFrequency }) => ({
    url: absoluteUrl(route),
    lastModified,
    priority,
    changeFrequency,
  }))
}

