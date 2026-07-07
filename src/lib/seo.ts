import type { Metadata } from 'next'
import { siteConfig } from './constants'
import { absoluteUrl } from './utils'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cherushguesthouse.com'

interface MetadataProps {
  title: string
  description?: string
  path: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  keywords?: string[]
}

/**
 * Returns fully-formed Next.js Metadata for a page.
 * Pass a SHORT page title (e.g. "Contact Us") — the brand suffix is appended automatically.
 * If you need to control the full title exactly, pass it with the brand already included and
 * the function will NOT double-append it.
 */
export function getMetadata({
  title,
  description = siteConfig.description,
  path,
  noindex = false,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  keywords = [],
}: MetadataProps): Metadata {
  const url = absoluteUrl(path)

  // Avoid double-brand: only append if the title doesn't already contain the brand name
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`

  const ogImageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage)

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: siteConfig.name, url: SITE_URL }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_KE',
      type: ogType,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: '@cherushguesthouse',
      site: '@cherushguesthouse',
    },
  }
}

// ---------------------------------------------------------------------------
// Advanced JSON-LD Structured Data Generators
// ---------------------------------------------------------------------------

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': siteConfig.name,
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': absoluteUrl('/logo.png'),
      'width': 200,
      'height': 60,
    },
    'email': siteConfig.email,
    'telephone': siteConfig.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Iten-Kabarnet Road',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo-Marakwet County',
      'postalCode': '30700',
      'addressCountry': 'KE',
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': siteConfig.phone,
        'contactType': 'customer service',
        'contactOption': 'TollFree',
        'areaServed': 'KE',
        'availableLanguage': ['English', 'Swahili'],
      },
    ],
    'sameAs': [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.whatsapp,
    ],
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': siteConfig.name,
    'description': siteConfig.description,
    'inLanguage': 'en-KE',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_URL}/rooms?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getLodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'LocalBusiness'],
    '@id': `${SITE_URL}/#lodging`,
    'name': siteConfig.name,
    'description': siteConfig.description,
    'url': SITE_URL,
    'email': siteConfig.email,
    'telephone': siteConfig.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Iten-Kabarnet Road',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo Marakwet County',
      'postalCode': '30700',
      'addressCountry': 'KE',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': siteConfig.coordinates.lat,
      'longitude': siteConfig.coordinates.lng,
    },
    'hasMap': `https://maps.google.com/?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '07:00',
        'closes': '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '08:00',
        'closes': '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '09:00',
        'closes': '19:00',
      },
    ],
    'priceRange': '$$',
    'currenciesAccepted': 'KES, USD',
    'paymentAccepted': 'Cash, M-Pesa, Visa, Mastercard',
    'image': [absoluteUrl('/og-image.jpg')],
    'logo': absoluteUrl('/logo.png'),
    'amenityFeature': [
      { '@type': 'LocationFeatureSpecification', 'name': 'Free Parking', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Free WiFi', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Restaurant', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Conference Room', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Family Rooms', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Breakfast Available', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Garden', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Laundry Service', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': '24-Hour Hot Water', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': '24-Hour Security', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Self-Catering Kitchen', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Airport Transfer', 'value': true },
    ],
    'checkinTime': 'T14:00',
    'checkoutTime': 'T11:00',
    'petsAllowed': false,
  }
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  }
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': absoluteUrl(item.item),
    })),
  }
}

export function getArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'Cherush Content Team',
  path,
}: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    'headline': title,
    'description': description,
    'image': [image.startsWith('http') ? image : absoluteUrl(image)],
    'datePublished': datePublished,
    'dateModified': dateModified || datePublished,
    'author': [
      {
        '@type': 'Person',
        'name': authorName,
        'url': absoluteUrl('/about'),
      },
    ],
    'publisher': {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': siteConfig.name,
      'logo': {
        '@type': 'ImageObject',
        'url': absoluteUrl('/logo.png'),
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
  }
}

export function getReviewSchema(reviews: { guest_name: string; rating: number; quote: string }[]) {
  if (!reviews || reviews.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'LodgingBusiness',
      '@id': `${SITE_URL}/#lodging`,
      'name': siteConfig.name,
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': reviews[0].rating.toString(),
      'bestRating': '5',
    },
    'author': {
      '@type': 'Person',
      'name': reviews[0].guest_name,
    },
    'reviewBody': reviews[0].quote,
  }
}

export function getOfferSchema(rooms: { name: string; price_per_night: number; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    'name': 'Accommodation Offerings at Cherush Guesthouse',
    'itemListElement': rooms.map((room) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'HotelRoom',
        'name': room.name,
        'url': absoluteUrl(`/rooms/${room.slug}`),
      },
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': room.price_per_night,
        'priceCurrency': 'KES',
        'unitText': 'NIGHT',
      },
    })),
  }
}

export function getTouristAttractionSchema(name: string, description: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    'name': name,
    'description': description,
    'image': image.startsWith('http') ? image : absoluteUrl(image),
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo Marakwet County',
      'addressCountry': 'KE',
    },
  }
}

/** Stub retained for backward-compat with older landing pages. */
export function getSpeakableSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    'cssSelector': ['h1', 'h2', '.speakable'],
  }
}
