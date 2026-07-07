import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Long Stay Accommodation in Iten | Digital Nomads & Training Camps',
  description: 'Planning a long stay in Iten? We offer discounted monthly rates, reliable fast WiFi for remote work, and fully equipped self-catering kitchens.',
  path: '/long-stay-accommodation',
  keywords: [
    'long stay accommodation Iten',
    'monthly rent Iten Kenya',
    'remote work Iten',
    'digital nomad Kenya',
    'long term guest house Iten',
  ],
})

const faqs = [
  { question: 'Do you offer discounts for monthly stays?', answer: 'Yes! We offer substantial discounts for guests staying 4 weeks or longer. Our long-stay rates are designed to be highly competitive for athletes and remote workers on extended trips.' },
  { question: 'Is the WiFi fast enough for video calls?', answer: 'Absolutely. We invest in high-speed fiber internet and backup power solutions, making Cherush Guesthouse one of the best locations for remote workers and digital nomads in Iten.' },
  { question: 'Are cleaning and laundry included in long stays?', answer: 'Room cleaning is included. We also offer affordable on-site laundry services, which is essential when you are training multiple times a day.' },
  { question: 'How do I pay for a long stay?', answer: 'We accept M-Pesa, cash, and major credit cards. For long stays, we typically arrange a monthly billing cycle.' }
]

export default async function LongStayAccommodationPage() {
  const rooms = await getRooms()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Long Stay Accommodation', item: '/long-stay-accommodation' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Long Stay Accommodation in Iten"
        subtitle="Settle in for an extended training camp or remote work retreat with our discounted monthly rates, fast WiFi, and dedicated workspaces."
        introHeading="Your Long-Term Basecamp in the Highlands"
        introText="Whether you are an athlete embedding yourself in the local running culture for three months, or a digital nomad seeking a serene, high-altitude working environment, our long stay options provide the perfect balance of affordability and premium comfort."
        featuresHeading="Designed for Extended Stays"
        features={[
          'Significant discounts for weekly and monthly bookings',
          'Enterprise-grade fiber WiFi for reliable remote work',
          'Fully equipped self-catering kitchens to manage daily meals',
          'Regular house-keeping and affordable laundry services',
          'Dedicated quiet workspaces within the rooms'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Booking <strong>long stay accommodation in Iten</strong> shouldn't mean sacrificing comfort for affordability. At Cherush Guesthouse, we recognize that guests staying for weeks or months have entirely different requirements than weekend tourists.</p>
            <p>You need a routine. You need reliable internet that doesn't drop during Zoom calls, you need to be able to cook your own meals, and you need a quiet environment that respects your rest schedule. We provide the infrastructure; you bring the focus.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={rooms.slice(0, 3)}
        faqs={faqs}
        targetKeyword="long stay accommodation Iten"
        heroImage="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
