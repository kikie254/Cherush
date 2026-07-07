import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Top Hotels in Iten | Cherush Guesthouse Accommodation',
  description: 'Searching for hotels in Iten? Discover why Cherush Guesthouse is the preferred alternative to traditional hotels, offering superior privacy, WiFi, and comfort.',
  path: '/hotels-in-iten',
  keywords: [
    'hotels in Iten',
    'hotels in Iten Kenya',
    'best hotel Iten',
    'accommodation Iten',
    'where to stay in Iten',
  ],
})

const faqs = [
  { question: 'What is the difference between a hotel and your guesthouse?', answer: 'While hotels in Iten often provide standard rooms and busy lobbies, Cherush Guesthouse offers a more private, residential experience. You get the premium amenities of a hotel (hot showers, WiFi, security, cleaning) but with the addition of self-catering kitchens and a peaceful, private garden.' },
  { question: 'Do you offer room service or dining like a hotel?', answer: 'Yes! We have an on-site restaurant and can provide meals directly to your room upon request. You also have the flexibility to cook for yourself.' },
  { question: 'How do your rates compare to other hotels in Iten?', answer: 'Our rates are highly competitive, especially for long stays. Because we don\'t have the massive overhead of a large resort, we pass the savings directly to our guests while maintaining high standards.' },
  { question: 'Is parking available?', answer: 'Yes, we offer free, highly secure gated parking for all guests, which is not always guaranteed at busy town-center hotels.' }
]

export default async function HotelsInItenPage() {
  const rooms = await getRooms()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Hotels in Iten', item: '/hotels-in-iten' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="The Superior Alternative to Hotels in Iten"
        subtitle="Experience the premium amenities of a luxury hotel combined with the privacy, flexibility, and warmth of a boutique guesthouse."
        introHeading="Rethink Your Stay in the Home of Champions"
        introText="When searching for hotels in Iten, you are likely looking for reliability: hot water, fast internet, security, and a good night's sleep. Cherush Guesthouse delivers all of this, but in a much more personalized and peaceful environment."
        featuresHeading="Why Choose Us Over a Traditional Hotel?"
        features={[
          'Private self-catering kitchens in your room (rare in standard hotels)',
          'A quiet residential location, far from the noise of the main highway',
          'Highly personalized service from our dedicated local team',
          'Significant discounts for weekly and monthly stays',
          'A tranquil private garden exclusive to our guests'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Traditional <strong>hotels in Iten</strong> serve a purpose, but for athletes, remote workers, and families spending more than just a single night in the Rift Valley, a boutique guesthouse is vastly superior.</p>
            <p>At Cherush, you aren't just a room number. We cater to the specific rhythms of your trip. Need breakfast at 5:30 AM before a long run? Done. Need absolute quiet during the day for remote work? We guarantee it.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={rooms.slice(0, 3)}
        faqs={faqs}
        targetKeyword="hotels in Iten"
        heroImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
