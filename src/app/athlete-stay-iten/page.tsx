import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Athlete Accommodation Iten | High Altitude Training Stay',
    description: 'Elevate your training at Cherush Stay, the premier athlete accommodation in Iten, Kenya. Enjoy private kitchens, fast WiFi, hot showers, and recovery gardens near Kamariny.',
    path: '/athlete-stay-iten',
    ogImage: images.hero
  })
}

export default async function AthleteStayPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'How does Cherush Stay support high-altitude runners?',
      answer: 'We provide private kitchens so you can control your macronutrients and meals. We also feature high-pressure hot water showers for recovery, high-speed WiFi to analyze runs, and laundry access for training gear.'
    },
    {
      question: 'Where can I run? Are there trails nearby?',
      answer: 'Absolutely. Cherush is situated near the major training routes of Iten. Dirt paths start right outside our gate, and Singore Forest and Kamariny Stadium are just minutes away.'
    },
    {
      question: 'Can you help arrange pacers, physios, or local coaches?',
      answer: 'Yes! We have deep connections in the local running community and can connect you with local pacers, professional physiotherapists, and coaching experts to maximize your training block.'
    }
  ]

  const features = [
    'Private self-catering kitchens for personalized diets',
    'Walking distance to Kamariny Stadium and running trails',
    'Heavy-duty laundry support for running gear',
    'Orthopedic beds and quiet rooms for optimal recovery',
    'Fiber optic WiFi to sync training logs and work remotely',
    'Safe compound to store bikes and athletic equipment'
  ]

  const introText = 'Cherush Stay is custom-built to be the ultimate athlete accommodation in Iten, Kenya. Set at 2,400 meters of altitude, we provide a peaceful, clean, and reliable environment for marathon runners, track athletes, coaches, and cycling teams looking to train, recover, and repeat.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        High-altitude training requires discipline, hard work, and—most importantly—proper recovery. Many athletes traveling to Iten struggle with loud accommodations, poor water pressure, and unreliable internet.
      </p>
      <p>
        At Cherush, we understand that sleep and nutrition are as important as the mileage. That is why we provide a quiet setting with private kitchen facilities, deep orthopedic mattresses, double-filtered drinking water, and high-pressure hot water.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Training Grounds & Facilities Near Cherush:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>Kamariny Stadium:</strong> 2.1 km away (dirt track for speedwork and intervals).</li>
        <li><strong>Singore Forest:</strong> 6.2 km away (high-altitude forest trails for soft surface runs).</li>
        <li><strong>Kerio View Road:</strong> 2.5 km away (rolling asphalt road for hill sessions).</li>
        <li><strong>Local Physios:</strong> Elite massage therapists are available for in-house sessions.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Athlete Accommodation in Iten"
      subtitle="Optimize your high-altitude training block with comfortable, self-catering rooms."
      introHeading="Recover and perform at 2,400m altitude"
      introText={introText}
      featuresHeading="Athlete-Focused Amenities"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="athlete accommodation iten"
      heroImage={images.trail}
    />
  )
}
