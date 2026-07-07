import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AppProviders } from '@/components/providers/app-providers'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import { Chatbot } from '@/components/ui/chatbot'
import { ServiceWorkerRegistration } from '@/components/providers/sw-registration'
import { absoluteUrl } from '@/lib/utils'
import { siteConfig } from '@/lib/constants'
import './globals.css'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://cherushguesthouse.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Cherush Guesthouse | Affordable Luxury Accommodation in Kenya',
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Experience comfort, hospitality and affordable luxury at Cherush Guesthouse. Book rooms online, explore amenities and enjoy exceptional service in Iten, Kenya.',
  keywords: [
    'guesthouse Iten Kenya',
    'affordable accommodation Iten',
    'Cherush Guesthouse',
    'hotel Iten',
    'Elgeyo-Marakwet accommodation',
    'runner guesthouse Kenya',
    'book room Iten',
    'boutique stay Kenya highlands',
  ],
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Cherush Guesthouse | Affordable Luxury Accommodation in Kenya',
    description:
      'Experience comfort, hospitality and affordable luxury at Cherush Guesthouse. Book rooms online, explore amenities and enjoy exceptional service.',
    url: SITE_URL,
    siteName: siteConfig.name,
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Cherush Guesthouse – Iten, Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cherush Guesthouse | Affordable Luxury Accommodation in Kenya',
    description:
      'Experience comfort, hospitality and affordable luxury at Cherush Guesthouse. Book rooms online and enjoy exceptional service in Iten, Kenya.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
  category: 'travel',
}

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="theme-color" content="#1d2a22" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Website schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              url: SITE_URL,
              name: siteConfig.name,
              description: siteConfig.description,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/rooms?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: siteConfig.name,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  availableLanguage: ['English', 'Swahili'],
                },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Iten-Kabarnet Road',
                addressLocality: 'Iten',
                addressRegion: 'Elgeyo-Marakwet County',
                addressCountry: 'KE',
              },
              sameAs: [siteConfig.social.instagram, siteConfig.social.whatsapp],
            }),
          }}
        />
      </head>
      <body className="font-body min-h-screen bg-background text-text antialiased">
        {/* Skip to content — WCAG 2.4.1 keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-medium focus:text-sm focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AnalyticsProvider />
        <ServiceWorkerRegistration />
        <SmoothScroll>
          <AppProviders>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
            {/* Global floating AI concierge */}
            <Chatbot />
          </AppProviders>
        </SmoothScroll>
      </body>
    </html>
  )
}
