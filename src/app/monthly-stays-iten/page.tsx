import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Monthly Stays in Iten | Long Term Rentals & Guesthouse',
    description: 'Planning an extended training block or work stay? Cherush Stay offers premium monthly stays in Iten, Kenya, with steep discounts, workspaces, and fast WiFi.',
    path: '/monthly-stays-iten',
    ogImage: images.hero
  })
}

export default async function MonthlyStaysPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'Do you offer discounts for monthly or long-term stays?',
      answer: 'Yes! We apply significant discounts for stays longer than a week, and up to 40% discount for monthly reservations. The pricing is automatically computed in our booking widget.'
    },
    {
      question: 'What is included in the monthly rate?',
      answer: 'The rate includes high-speed fiber internet, water, garbage collection, secure gated parking, and regular housekeeping. Gas/electricity is included up to reasonable consumption limits.'
    },
    {
      question: 'Is there a security deposit required for monthly stays?',
      answer: 'For bookings under 3 months, no security deposit is required. We require full prepayment of the monthly rate or a verified booking confirmation.'
    }
  ]

  const features = [
    'Up to 40% discount applied automatically for monthly stays',
    'Fully private units with private bathrooms and kitchens',
    'Dedicated workspace setup with backup power for router',
    'Self-service washing machine and sunny laundry line',
    'Filtered drinking water system installed in the property',
    'Gated compound with 24/7 security presence'
  ]

  const introText = 'Cherush Stay is the premier destination for long-term visits and monthly stays in Iten, Kenya. Ideal for professional athletes on extended training blocks, digital nomads, and researchers seeking a comfortable, reliable, and cost-effective home base.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        If you are planning to spend several weeks or months in Iten, standard hotel rooms are too restrictive, and traditional rentals require long leases, furniture, utility hookups, and agent fees.
      </p>
      <p>
        Cherush Stay bridges this gap by offering fully-furnished, serviced apartments on a flexible month-to-month basis. We take care of the WiFi, gas, housekeeping, security, and repairs so you can focus entirely on your goals.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Extended Stay Room Rates & Space Details:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>Bed Sitter (Studio):</strong> 34 sqm size. Ideal for solo athletes. Monthly rate: KES 22,000.</li>
        <li><strong>One Bedroom Suite:</strong> 56 sqm size. Separate lounge & work desk. Monthly rate: KES 32,000.</li>
        <li><strong>Extended Stay (Two Bedroom):</strong> 72 sqm size. Private patio & yard. Monthly rate: KES 50,000.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Monthly Stays in Iten"
      subtitle="Save up to 40% with fully furnished, serviced apartments for extended training and remote work."
      introHeading="A seamless long-term stay in the highlands"
      introText={introText}
      featuresHeading="Long-Stay Convenience"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="monthly stays iten"
      heroImage={images.workspace}
    />
  )
}
