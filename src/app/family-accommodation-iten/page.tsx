import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Family Accommodation in Iten | Cherush Guesthouse',
  description: 'Spacious, secure, and serene family accommodation in Iten, Kenya. Enjoy large suites, self-catering kitchens, fast WiFi, and a beautiful gated garden.',
  path: '/family-accommodation-iten',
  keywords: [
    'family accommodation Iten',
    'family holiday Iten Kenya',
    'spacious guest house Iten',
    'Rift Valley family stay',
  ],
})

const faqs = [
  { question: 'Is the guesthouse compound safe for children?', answer: 'Yes, our compound is fully walled, gated, and professionally guarded 24/7. Children can safely play in the spacious garden.' },
  { question: 'Do the family rooms have cooking facilities?', answer: 'Yes, our family rooms come with fully equipped self-catering kitchens so you can easily prepare meals for your children.' },
  { question: 'What family activities are available in Iten?', answer: 'Families enjoy visiting the Kerio Valley viewpoints, taking nature walks in Singore Forest, and going on day safaris to Rimoi National Reserve to see elephants.' },
  { question: 'Is Iten safe for a family holiday?', answer: 'Iten is renowned for being one of the safest and most welcoming towns in Kenya, with a peaceful, rural highland atmosphere.' }
]

export default async function FamilyAccommodationPage() {
  const rooms = await getRooms()
  // Assuming the largest room is best for families
  const familyRooms = rooms.filter(r => r.beds.toLowerCase().includes('king') || r.beds.toLowerCase().includes('queen')).slice(0, 3)
  const displayRooms = familyRooms.length > 0 ? familyRooms : rooms.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Family Accommodation in Iten', item: '/family-accommodation-iten' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Family Accommodation in Iten"
        subtitle="A secure, spacious, and peaceful retreat in the Kenyan highlands for your family holiday."
        introHeading="Space to Breathe, Play, and Relax."
        introText="Traveling to Iten with family requires a delicate balance: you need the space of a home, the security of a gated compound, and the amenities of a premium hotel. Cherush Guesthouse provides exactly that."
        featuresHeading="Perfect for Families"
        features={[
          'Spacious interconnected or multi-bed suites',
          'Large, secure gated garden for children to play safely',
          'Self-catering kitchens for easy family meal preparation',
          'Reliable fast WiFi for entertainment and staying connected',
          'Quiet residential location away from highway noise'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Our <strong>family accommodation in Iten</strong> is designed to act as your serene basecamp while exploring the Great Rift Valley. We understand that traveling with children means you need flexibility, which is why our self-catering kitchens and spacious living areas are highly valued by parents.</p>
            <p>Spend your mornings visiting the breathtaking viewpoints, your afternoons watching world-class athletes run past, and your evenings relaxing in our secure garden while the sun sets over the highlands.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={displayRooms}
        faqs={faqs}
        targetKeyword="family accommodation in Iten"
        heroImage="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
