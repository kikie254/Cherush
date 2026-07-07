import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Top Accommodation in Iten | Places to Stay Near Kamariny',
  description: 'Searching for accommodation in Iten? Book your stay at Cherush Guesthouse for premium rooms, fast WiFi, self-catering, and unparalleled security.',
  path: '/accommodation-in-iten',
  keywords: [
    'accommodation in Iten',
    'places to stay in Iten',
    'Iten accommodation Kenya',
    'lodging Iten',
    'where to stay Iten Kenya',
  ],
})

const faqs = [
  { question: 'What makes Cherush different from other accommodation in Iten?', answer: 'We offer a hybrid between a luxury hotel and a private residential home. You get the amenities of a premium hotel (WiFi, hot water, security) with the privacy of a walled garden and self-catering kitchens.' },
  { question: 'Do you cater to non-athletes?', answer: 'Yes! While Iten is famous for athletes, many of our guests are tourists exploring the Rift Valley, remote workers, and local business travelers.' },
  { question: 'How close are you to the main viewpoints?', answer: 'We are situated a short walking distance from the most spectacular Kerio Valley viewpoints, making it easy to enjoy the famous Iten sunsets.' },
  { question: 'Can I book accommodation in Iten directly online?', answer: 'Yes, you can secure your room instantly through our secure online booking portal.' }
]

export default async function AccommodationInItenPage() {
  const rooms = await getRooms()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Accommodation in Iten', item: '/accommodation-in-iten' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Premier Accommodation in Iten"
        subtitle="Your serene, secure, and fully equipped home base in the athletic capital of the world."
        introHeading="Find Your Perfect Basecamp"
        introText="Choosing the right accommodation in Iten is the most critical decision for your trip. The quality of your rest dictates the quality of your training or vacation."
        featuresHeading="Our Core Amenities"
        features={[
          'Fiber-optic high-speed internet (Ideal for digital nomads)',
          '24/7 reliable hot showers (Essential in the highlands)',
          'Secure gated compound with professional security personnel',
          'Self-catering kitchenettes in all rooms',
          'Spacious, quiet gardens for stretching and relaxation'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>We built Cherush Guesthouse to solve the biggest problem visitors face when looking for <strong>accommodation in Iten</strong>: finding a place that combines local authenticity with uncompromising modern standards.</p>
            <p>You no longer have to choose between a basic hostel and an overpriced, impersonal resort. Our boutique guesthouse provides exactly what you need to thrive at 2,400 meters altitude.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={rooms.slice(0, 3)}
        faqs={faqs}
        targetKeyword="accommodation in Iten"
        heroImage="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
