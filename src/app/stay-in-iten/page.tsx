import { LandingPageTemplate } from '@/components/layout/landing-page-template'
import { getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Stay in Iten | Cherush Guesthouse & Rooms',
    description: 'Planning a stay in Iten, Kenya? Cherush Stay provides premium, self-catering guesthouse accommodations with fiber internet, hot showers, and a peaceful garden.',
    path: '/stay-in-iten',
    ogImage: images.hero
  })
}

export default async function StayInItenPage() {
  const rooms = await getRooms()
  
  const faqs = [
    {
      question: 'Why choose Cherush Stay for my stay in Iten?',
      answer: 'Cherush provides high-end comforts that are rare in local accommodations: high water pressure hot showers, reliable fiber internet with power backup, fully equipped kitchens, and a quiet garden.'
    },
    {
      question: 'Is it easy to get around from the property?',
      answer: 'Yes. We are located near key roads. Taxi transfers, motorcycle (boda-boda) trips, and local shuttle services are easily arranged. Iten town center is only 5 minutes away.'
    },
    {
      question: 'Can you help organize local sightseeing tours?',
      answer: 'Yes! We coordinate trips to nearby attractions like the Kerio Valley View Point, local athletic training routes, paragliding launches, and wildlife day-safaris.'
    }
  ]

  const features = [
    'Clean, modern, and private self-catering rooms',
    'Quiet garden area surrounded by local nature',
    'High-pressure hot showers and high-quality linens',
    'Fiber optic internet with electricity backup battery',
    'Secure gated compound with ample private parking',
    'Attentive hospitality and local travel planning guidance'
  ]

  const introText = 'Planning your stay in Iten, Kenya? Cherush Stay provides the perfect base in the Elgeyo-Marakwet highlands. Combining modern amenities with quiet residential surroundings, we ensure your trip is relaxing, productive, and safe.'

  const mainContent = (
    <div className="space-y-4">
      <p>
        Whether you are a runner setting up a new training camp, a remote worker seeking fresh air and focus, or an explorer eager to see the breathtaking Rift Valley views, Iten offers a unique setting.
      </p>
      <p>
        To truly appreciate the "Home of Champions," you need an accommodation that is peaceful and reliable. Cherush Stay is custom-designed to be that sanctuary, offering self-catering suites that give you total privacy and independence.
      </p>
      <h3 className="font-display text-xl text-primary font-semibold mt-6">Cherush Highlights:</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted">
        <li><strong>Security:</strong> Set in a quiet, gated compound with perimeter security.</li>
        <li><strong>Altitude:</strong> 2,400m above sea level—offering cool air and a beautiful training environment.</li>
        <li><strong>Amenities:</strong> Complete kitchens, dedicated workspaces, and fiber broadband.</li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
    </div>
  )

  return (
    <LandingPageTemplate
      title="Stay in Iten"
      subtitle="Your premium home base for training, remote work, and exploring the Rift Valley."
      introHeading="A modern boutique guesthouse in Iten, Kenya"
      introText={introText}
      featuresHeading="Comfort & Facilities"
      features={features}
      mainContentHtml={mainContent}
      rooms={rooms}
      faqs={faqs}
      targetKeyword="stay in iten"
      heroImage={images.hero}
    />
  )
}
