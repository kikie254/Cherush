import type { Metadata } from 'next'
import { siteConfig } from './constants'
import { absoluteUrl } from './utils'

interface MetadataProps {
  title: string
  description?: string
  path: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
}

export function getMetadata({
  title,
  description = siteConfig.description,
  path,
  noindex = false,
  ogImage = '/hero.svg',
  ogType = 'website'
}: MetadataProps): Metadata {
  const url = absoluteUrl(path)
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    description,
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
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
    },
  }
}

// ---------------------------------------------------------------------------
// Advanced JSON-LD Structured Data Generators (Phase 6)
// ---------------------------------------------------------------------------

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('#organization'),
    'name': siteConfig.name,
    'url': absoluteUrl('/'),
    'logo': absoluteUrl('/logo.png'),
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'Swahili']
      }
    ],
    'sameAs': [
      siteConfig.social.instagram,
      siteConfig.social.whatsapp
    ]
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('#website'),
    'url': absoluteUrl('/'),
    'name': siteConfig.name,
    'description': siteConfig.description,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': absoluteUrl('/rooms?search={search_term_string}'),
      'query-input': 'required name=search_term_string'
    }
  }
}

export function getLodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'Hotel', 'LocalBusiness'],
    '@id': absoluteUrl('#lodging'),
    'name': 'Cherush Guest House',
    'description': siteConfig.description,
    'url': absoluteUrl('/'),
    'email': siteConfig.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Iten-Kabarnet Road',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo Marakwet County',
      'addressCountry': 'KE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': siteConfig.coordinates.lat,
      'longitude': siteConfig.coordinates.lng
    },
    'priceRange': '$$',
    'image': absoluteUrl('/hero.svg'),
    'amenityFeature': [
      { '@type': 'LocationFeatureSpecification', 'name': 'Parking', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'WiFi', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Restaurant', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Conference', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Family Rooms', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Breakfast', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Garden', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Laundry', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Hot Shower', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Security', 'value': true }
    ]
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
        'text': faq.answer
      }
    }))
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
      'item': absoluteUrl(item.item)
    }))
  }
}

export function getReviewSchema(reviews: { guest_name: string; rating: number; quote: string }[]) {
  if (!reviews || reviews.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': reviews[0].rating.toString(),
      'bestRating': '5'
    },
    'author': {
      '@type': 'Person',
      'name': reviews[0].guest_name
    },
    'reviewBody': reviews[0].quote
  }
}

export function getOfferSchema(rooms: { name: string; price_per_night: number; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    'name': 'Accommodation Offerings',
    'itemListElement': rooms.map((room) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Room',
        'name': room.name,
        'url': absoluteUrl(`/rooms/${room.slug}`)
      },
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': room.price_per_night,
        'priceCurrency': 'KES',
        'unitText': 'NIGHT'
      }
    }))
  }
}

export function getSpeakableSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    'cssSelector': ['h1', '.prose p:first-of-type']
  }
}

export function getTouristAttractionSchema(name: string, description: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    'name': name,
    'description': description,
    'image': image,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo Marakwet County',
      'addressCountry': 'KE'
    }
  }
}
