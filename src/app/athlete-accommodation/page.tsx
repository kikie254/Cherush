import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Elite Athlete Accommodation in Iten, Kenya | Cherush',
  description: 'Specialized athlete accommodation in Iten (2400m altitude). Close to Kamariny track, featuring fast WiFi, hot showers, and kitchens for strict diets.',
  path: '/athlete-accommodation',
  keywords: [
    'athlete accommodation Iten',
    'runner accommodation Iten Kenya',
    'altitude training camp Iten',
    'running camps in Iten',
    'hotels near Kamariny stadium',
  ],
})

const faqs = [
  { question: 'How close is the accommodation to the running trails?', answer: 'Cherush Guesthouse is situated mere minutes away from the famous red dirt trails of Iten. You can literally step out of our gate and begin your morning run immediately.' },
  { question: 'Are there facilities for ice baths or recovery?', answer: 'We offer 24/7 hot and cold showers, and our spacious bathrooms can accommodate portable ice baths if you bring them. Our serene garden provides the perfect space for stretching, yoga, and foam rolling.' },
  { question: 'Can I cook my own meals for my specific diet?', answer: 'Yes, every room features a self-catering kitchenette. We understand elite athletes require precise macros, so you have full control over your nutrition.' },
  { question: 'Is the compound secure for my expensive gear?', answer: 'Absolutely. We have a fully walled compound, a secure gate, and 24-hour personnel. Your running watches, laptops, and gear are completely safe.' }
]

export default async function AthleteAccommodationPage() {
  const rooms = await getRooms()
  const athleteRooms = rooms.slice(0, 3) // Typically singles or specific athlete-friendly rooms

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Athlete Accommodation', item: '/athlete-accommodation' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Athlete Accommodation in Iten"
        subtitle="The definitive basecamp for altitude training in the Home of Champions. Designed around the rigorous routines of elite and amateur runners."
        introHeading="Train, Recover, Repeat."
        introText="When you travel to Iten for altitude training, your accommodation is your sanctuary. It's where the actual physiological adaptations happen. Cherush Guesthouse eliminates all friction from your training camp."
        featuresHeading="Built for Runners"
        features={[
          'Immediate access to world-famous red dirt running trails',
          'Fast fiber WiFi to upload Strava data and work remotely',
          'Self-catering kitchens to manage exact dietary requirements',
          'Premium orthopedic mattresses for deep recovery sleep',
          'Guaranteed 24/7 hot showers after cold morning runs'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Our <strong>athlete accommodation in Iten</strong> has hosted marathoners, track athletes, and trail runners from across the globe. We understand the rhythm of a training camp: early bedtimes, 6:00 AM wake-ups, double days, and the need for absolute quiet in between sessions.</p>
            <p>Located just off the main road, we avoid the dust and noise of the highway while keeping you within walking distance of Kamariny Stadium and local supermarkets. Focus entirely on your mileage; we handle the comfort.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={athleteRooms}
        faqs={faqs}
        targetKeyword="athlete accommodation in Iten"
        heroImage="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
