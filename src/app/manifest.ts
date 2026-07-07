import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f7f4',
    theme_color: '#1d2a22',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-KE',
    categories: ['travel', 'lifestyle', 'business'],
    icons: [
      // Fallback to favicon.ico if PNG icons don't exist yet
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
