import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cherush Guesthouse',
    short_name: 'Cherush',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f7f4',
    theme_color: '#1d2a22',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['travel', 'lifestyle', 'business'],
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x800',
        type: 'image/png',
        label: 'Cherush Guesthouse – Desktop View',
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '390x844',
        type: 'image/png',
        label: 'Cherush Guesthouse – Mobile View',
      },
    ],
  }
}
