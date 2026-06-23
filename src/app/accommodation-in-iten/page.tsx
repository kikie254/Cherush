import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Accommodation in Iten | Cherush Stay Boutique Lodging',
    description: 'Looking for accommodation in Iten, Kenya? Cherush Stay provides premium rooms, self-catering kitchens, fast WiFi, and a peaceful garden. Book directly for best rates.',
    path: '/accommodation-in-iten',
    ogImage: images.hero
  })
}

export default async function AccommodationItenPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'What types of accommodations do you offer?',
      answer: 'We offer three flexible configurations: a cozy Bed Sitter (34 sqm), a spacious One Bedroom suite (56 sqm) with a dedicated workspace, and a Two Bedroom Extended Stay suite (72 sqm) with a private patio.'
    },
    {
      question: 'Is the internet reliable for video calling and remote work?',
      answer: 'Yes, we provide dedicated high-speed fiber broadband (up to 50 Mbps) with automatic backup power in case of power cuts, making Cherush one of the best accommodations in Iten for digital nomads.'
    },
    {
      question: 'How far is the accommodation from local running trails?',
      answer: 'We are situated right on the edge of the running paths. You can start your morning runs straight from our gate without needing to commute.'
    }
  ]

  const features = [
    'Three distinct room configurations to suit your needs',
    'Private kitchens equipped with stoves, fridges, and cookware',
    'Dedicated workspaces with ergonomic chairs and lighting',
    'Reliable hot water showers and premium linens',
    'Gated compound with perimeter wall and secure parking',
    'Veranda and garden spaces for relaxation'
  ]

  const introText = 'Cherush Stay offers high-end, comfortable accommodation in Iten, Elgeyo-Marakwet, Kenya. Tailored for those who appreciate design, cleanliness, and functionality, our property provides a home away from home with everything you need to relax or stay productive.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        Finding the right accommodation in Iten can make or break your trip. Runners training at high altitude need proper rest and nutrition, which is why having a clean, quiet space with a private kitchen is crucial.
      </p>
      <p>
        Families and travelers visiting the scenic Kerio Valley require hot water, stable internet, and a safe play area. Cherush Stay combines these features into a single, cohesive experience.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Our Location Highlights:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>Altitude:</strong> 2,400 meters above sea level—ideal for aerobic conditioning.</li>
        <li><strong>Views:</strong> Within walking distance to dramatic viewpoints of the Kerio Valley.</li>
        <li><strong>Access:</strong> Easily accessible by road from Eldoret (approx. 40 minutes driving time).</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Accommodation in Iten"
      subtitle="The premier choice for athletes, remote workers, and families visiting the high-altitude capital."
      introHeading="A premium stay in Elgeyo-Marakwet"
      introText={introText}
      featuresHeading="Property Highlights"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="accommodation in iten"
      heroImage={images.workspace}
    />
  )
}
