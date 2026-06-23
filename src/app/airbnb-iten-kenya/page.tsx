import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate hourly

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Airbnb Iten Kenya | Premium Local Airbnb & Guesthouse',
    description: 'Looking for the best Airbnb in Iten, Kenya? Cherush Stay offers self-catering holiday homes, fast fiber WiFi, secure parking, and premium amenities for runners and families.',
    path: '/airbnb-iten-kenya',
    ogImage: images.hero
  })
}

export default async function AirbnbItenPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'Is Cherush Stay listed on Airbnb?',
      answer: 'Yes, we are listed on Airbnb with Superhost status. However, booking directly on our official website guarantees the lowest rates without additional channel platform fees.'
    },
    {
      question: 'How does this compare to a standard Airbnb in Iten?',
      answer: 'We provide a higher level of consistency and support. Unlike a regular host, we offer backup power for WiFi, dedicated desks, professional housekeeping, and athletic guidance. Our units are fully private and not shared.'
    },
    {
      question: 'Is there secure parking and security?',
      answer: 'Yes, the property is gated with 24/7 security presence and free, secure private parking inside the compound for all guests.'
    }
  ]

  const features = [
    'Superhost level hospitality and local support',
    'Entire private apartment units (not shared rooms)',
    'Fully equipped private kitchens in each suite',
    'Fiber optic WiFi with electricity backup systems',
    'Secured private compound with off-street parking',
    'Washing machine access and recovery services'
  ]

  const introText = 'Cherush Stay Iten stands out as a premium alternative to standard Airbnb listings in Iten, Kenya. We combine the local charm, self-catering flexibility, and privacy of an apartment stay with the professional cleaning, backup utilities, and training-support services of an upscale guesthouse.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        Whether you are visiting Elgeyo-Marakwet county for high-altitude training, remote work, or a family getaway, finding a reliable, quiet place is essential. Standard rentals often suffer from power cuts, slow internet, or lack of cooking facilities.
      </p>
      <p>
        At Cherush, we have custom-built our suites to satisfy high demands. We feature dedicated work desks, high-speed fiber broadband, hot showers with high water pressure, and a quiet garden area for stretching or resting.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Why Guests Prefer Booking Directly with Us:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>No Service Fees:</strong> Save up to 15% compared to booking through third-party platforms like Airbnb.</li>
        <li><strong>Direct Host Communication:</strong> Coordinate early check-in or late check-out directly with our reservation team.</li>
        <li><strong>Flexible Cancellation:</strong> Easily cancel or modify your dates by contacting us directly.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Airbnb Iten Kenya"
      subtitle="The premium standard for self-catering stays and holiday homes in the Home of Champions."
      introHeading="A superior Airbnb alternative in Iten"
      introText={introText}
      featuresHeading="Apartment Amenities"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="airbnb iten kenya"
      heroImage={images.lounge}
    />
  )
}
