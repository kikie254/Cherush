import { getMetadata, getBreadcrumbSchema, getFAQSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { LocalKnowledgeBase } from '@/components/seo/local-knowledge-base'
import { getRooms } from '@/lib/queries'

export const metadata = getMetadata({
  title: 'Conference Venue in Iten | Corporate Retreats & Meetings',
  description: 'Looking for a conference venue in Iten? Cherush Guesthouse offers a quiet, secure environment with fast WiFi for corporate retreats, NGO meetings, and athletic seminars.',
  path: '/conference-venue-iten',
  keywords: [
    'conference venue Iten',
    'meeting rooms Iten',
    'corporate retreat Kenya',
    'NGO meeting space Iten',
    'team building Iten',
  ],
})

const faqs = [
  { question: 'Do you have dedicated meeting spaces?', answer: 'Yes, we have spaces that can be configured for board meetings, athletic team briefings, and small corporate retreats.' },
  { question: 'Is the internet reliable enough for video conferencing?', answer: 'Absolutely. We utilize high-speed fiber internet with backup power, making us one of the most reliable venues in Elgeyo Marakwet for Zoom and virtual conferences.' },
  { question: 'Can you provide catering for our meeting?', answer: 'Yes. We offer on-site catering tailored to your group, from tea and snacks during breaks to full buffet lunches and dinners.' },
  { question: 'Can you accommodate my whole team overnight?', answer: 'Depending on the size of your team, we can block out multiple rooms or the entire guesthouse for your exclusive use. Please contact us well in advance for group bookings.' }
]

export default async function ConferenceVenuePage() {
  const rooms = await getRooms()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Conference Venue in Iten', item: '/conference-venue-iten' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />

      <LandingPageTemplate
        title="Conference Venue & Corporate Retreats in Iten"
        subtitle="Host your next strategic planning session, athletic seminar, or NGO meeting in the quiet, high-altitude serenity of Iten."
        introHeading="A Quiet Space to Strategize and Focus"
        introText="Escape the distractions of the city. Cherush Guesthouse provides a peaceful, professional environment equipped with modern amenities to ensure your team's retreat is highly productive."
        featuresHeading="Venue Capabilities"
        features={[
          'Enterprise-grade fiber WiFi capable of handling heavy video conferencing',
          'Backup power systems ensuring zero interruptions to your meetings',
          'On-site catering with customized menus for your team',
          'Secure, private compound ideal for confidential strategic sessions',
          'Comfortable overnight accommodation for your entire executive team'
        ]}
        mainContentHtml={
          <div className="space-y-6">
            <p>Finding a reliable <strong>conference venue in Iten</strong> is essential for NGOs, athletic brands holding training camps, and corporate teams seeking a unique retreat location in the Rift Valley.</p>
            <p>Our venue blends professional infrastructure with the calming, focused atmosphere that Iten is famous for. When the meetings are over, your team can bond over walks to the Kerio Valley viewpoints or team-building runs on the highland trails.</p>
            <LocalKnowledgeBase />
          </div>
        }
        rooms={rooms.slice(0, 3)}
        faqs={faqs}
        targetKeyword="conference venue Iten"
        heroImage="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=2000"
      />
    </>
  )
}
