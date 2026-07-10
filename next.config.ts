import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com",
      "frame-src 'self' https://maps.google.com https://www.google.com https://www.openstreetmap.org",
      "media-src 'self' blob:",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // Package import optimisation — tree-shakes icon and animation libraries
  // per-page instead of bundling the entire library.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@tanstack/react-query'],
  },

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800, // 7 days
  },

  // Compression
  compress: true,

  // Power-up: enable React strict mode
  reactStrictMode: true,

  // Disable X-Powered-By header
  poweredByHeader: false,


  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Cache static assets aggressively
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Consolidate SEO duplicate pages
      { source: '/hotels-in-iten', destination: '/rooms', permanent: true },
      { source: '/luxury-accommodation-iten', destination: '/rooms', permanent: true },
      { source: '/guest-house-in-iten', destination: '/', permanent: true },
      { source: '/long-stay-accommodation', destination: '/rooms', permanent: true },
      { source: '/monthly-stays-iten', destination: '/rooms', permanent: true },
      { source: '/family-accommodation-iten', destination: '/rooms', permanent: true },
      
      // Consolidate 'About' related pages
      { source: '/company-history', destination: '/about', permanent: true },
      { source: '/mission-and-values', destination: '/about', permanent: true },
      { source: '/sustainability', destination: '/about', permanent: true },
      { source: '/team', destination: '/about', permanent: true },
      { source: '/community', destination: '/about', permanent: true },
      
      // Consolidate 'Experience / Attractions' pages
      { source: '/athletic-recovery-center', destination: '/experience', permanent: true },
      { source: '/local-attractions', destination: '/experience', permanent: true },
      { source: '/running-camps-iten', destination: '/experience', permanent: true },
      
      // Consolidate 'Amenities / Dining' pages
      { source: '/conference-venue-iten', destination: '/amenities', permanent: true },
      
      // Consolidate 'Reviews' pages
      { source: '/guest-stories', destination: '/reviews', permanent: true },
      { source: '/leave-review', destination: '/reviews', permanent: true },
      
      // Consolidate 'Blog / Guide' pages
      { source: '/travel-guide-iten', destination: '/blog', permanent: true },
      
      // Consolidate 'FAQ / Policies' pages
      { source: '/accessibility', destination: '/faq', permanent: true },
      { source: '/cancellation-policy', destination: '/faq', permanent: true },
      { source: '/house-rules', destination: '/faq', permanent: true },
      
      // Media to gallery
      { source: '/media', destination: '/gallery', permanent: true },
    ]
  },

}

export default nextConfig
