import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Budget Accommodation in Iten | Affordable Guest House',
  description: 'Looking for budget accommodation in Iten without sacrificing quality? Cherush Guesthouse offers affordable rooms with hot showers, WiFi, and self-catering kitchens.',
  path: '/budget-accommodation-iten',
  keywords: [
    'budget accommodation Iten',
    'cheap hotels Iten Kenya',
    'affordable guest house Iten',
    'hostels in Iten',
    'backpackers Iten',
  ],
})

const faqs = [
  { question: 'Is budget accommodation safe in Iten?', answer: 'Yes. At Cherush Guesthouse, even our most affordable rooms are located within our highly secure, walled, and professionally guarded compound.' },
  { question: 'Do budget rooms have hot showers?', answer: 'Absolutely. We believe hot showers are a necessity, not a luxury. All our rooms, regardless of price, feature reliable 24/7 hot water.' },
  { question: 'How can I save money on food during my stay?', answer: 'The best way to save money is to use the self-catering kitchens included with our rooms. You can buy fresh, extremely affordable local produce from the Iten market.' },
  { question: 'Are there hidden fees?', answer: 'No. Our pricing is totally transparent. The rate you see is the rate you pay, and it includes WiFi, water, and parking.' }
]

export default async function BudgetAccommodationPage() {
  const rooms = await getRooms()
  // Sort by price ascending to show budget rooms first
  const budgetRooms = [...rooms].sort((a, b) => a.price_per_night - b.price_per_night).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Budget Accommodation Iten', item: '/budget-accommodation-iten' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Budget Accommodation in Iten"
        subtitle="High-quality, secure, and comfortable rooms designed for athletes and travelers on a strict budget."
        introHeading="Affordable Excellence in the Home of Champions"
        introText="Finding budget accommodation in Iten usually means compromising on security, internet, or hot water. At Cherush Guesthouse, we refuse to compromise on the essentials."
        featuresHeading="Premium Features at Budget Rates"
        features={[
          'Highly competitive nightly and monthly rates',
          'No extra charge for high-speed fiber WiFi',
          'Save money on restaurants using our self-catering kitchens',
          'Guaranteed hot showers included in all room rates',
          'Same premium security and compound access as luxury suites'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Our <strong>budget accommodation in Iten</strong> is specifically designed for development athletes, backpackers, and students who need their funds to stretch for a long training camp or extensive travel itinerary.</p>
            <p>We provide the fundamental necessities for a successful stay—security, cleanliness, connectivity, and recovery infrastructure—at a price point that makes long-term stays in the Rift Valley highly accessible.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={budgetRooms}
        faqs={faqs}
        targetKeyword="budget accommodation Iten"
        heroImage="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
