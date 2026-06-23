import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Guesthouse in Iten | Cherush Boutique Guesthouse',
    description: 'Welcome to Cherush Stay, a modern boutique guesthouse in Iten, Kenya. Offering clean suites, peaceful gardens, high-speed internet, and self-catering facilities.',
    path: '/guesthouse-in-iten',
    ogImage: images.hero
  })
}

export default async function GuesthouseItenPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'Is breakfast or food included at the guesthouse?',
      answer: 'Our suites are built for self-catering, each featuring its own private kitchenette or full kitchen. This gives you total control over your diet and schedule. However, local organic produce markets are just minutes away, and we can arrange a private local chef upon request.'
    },
    {
      question: 'Where is the guesthouse located in Iten?',
      answer: 'We are located in a calm, safe residential pocket, away from the noisy main highway but within walking distance to training tracks like Kamariny Stadium and local cafes.'
    },
    {
      question: 'What is the check-in policy?',
      answer: 'Standard check-in is from 2:00 PM, and check-out is at 10:00 AM. If you are arriving early after a night flight or need a late departure, let us know in advance and we will do our best to accommodate you.'
    }
  ]

  const features = [
    'Private self-catering kitchen facilities',
    'Quiet, lush garden to stretch and recover',
    'Consistent hot showers with good water pressure',
    'Daily or weekly housekeeping service options',
    'Washing machine and laundry line access',
    'Safe and gated residential neighborhood'
  ]

  const introText = 'Cherush Stay is a modern boutique guesthouse in Iten, Kenya, offering a peaceful sanctuary for runners, travelers, and remote workers. Our focus is on cleanliness, comfort, and reliability so you can fully enjoy your stay in the highlands.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        Finding a quality guesthouse in Iten that satisfies international standards can be challenging. Many options lack proper internet connectivity, consistent electricity, or private spaces to rest after a heavy run.
      </p>
      <p>
        At Cherush, we solve these frustrations. We provide backup power for our fiber WiFi, double-filtered water, deep orthopedic mattresses, and high-quality linens. Our garden is surrounded by mature trees, offering a calm microclimate to read, stretch, or work.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Our Accommodations Include:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>Bed Sitter:</strong> Cozy, sunlit suite ideal for solo athletes or couples.</li>
        <li><strong>One Bedroom:</strong> Extra room with a dedicated workspace and full kitchen.</li>
        <li><strong>Extended Stay Suite:</strong> Two-bedroom home with a private patio and laundry support.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Boutique Guesthouse in Iten"
      subtitle="Experience local warmth, comfort, and absolute peace at Cherush Stay."
      introHeading="A quiet refuge in the Home of Champions"
      introText={introText}
      featuresHeading="Guesthouse Comforts"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="guesthouse in iten"
      heroImage={images.garden}
    />
  )
}
