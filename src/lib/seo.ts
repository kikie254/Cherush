import type { Metadata } from 'next'
import { siteConfig } from './constants'
import { absoluteUrl } from './utils'

interface MetadataProps {
  title: string
  description?: string
  path: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article'
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
// JSON-LD Structured Data Generators
// ---------------------------------------------------------------------------

export function getLodgingBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': absoluteUrl('#lodging'),
    'name': siteConfig.name,
    'description': siteConfig.description,
    'url': absoluteUrl('/'),
    'telephone': siteConfig.phone,
    'email': siteConfig.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Iten-Kabarnet Road',
      'addressLocality': 'Iten',
      'addressRegion': 'Elgeyo-Marakwet County',
      'addressCountry': 'KE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': siteConfig.coordinates.lat,
      'longitude': siteConfig.coordinates.lng
    },
    'priceRange': 'KES 1,000 - 2,500',
    'image': absoluteUrl('/hero.svg'),
    'amenityFeature': [
      { '@type': 'LocationFeatureSpecification', 'name': 'Kitchenette', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'High-speed Fiber WiFi', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Hot shower', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Private Workspace', 'value': true },
      { '@type': 'LocationFeatureSpecification', 'name': 'Secure parking', 'value': true }
    ],
    'starRating': {
      '@type': 'Rating',
      'ratingValue': '4.9',
      'bestRating': '5'
    }
  }
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': '5',
      'bestRating': '5'
    },
    'author': {
      '@type': 'Person',
      'name': reviews[0]?.guest_name || 'Guest'
    },
    'reviewBody': reviews[0]?.quote || 'Highly recommended!'
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
        '@type': 'Accommodation',
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
