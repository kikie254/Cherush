import { getMetadata, getBreadcrumbSchema, getLodgingBusinessSchema, getFAQSchema } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { CheckCircle2, MapPin, Navigation, Calendar, Cloud, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/constants'

export const metadata = getMetadata({
  title: 'Best Guest House in Iten | Accommodation Near Kamariny Stadium',
  description: 'Looking for a guest house in Iten? Cherush Guesthouse offers premium accommodation, fast WiFi, hot showers, and a calm environment for athletes, tourists, and families.',
  path: '/guest-house-in-iten',
  keywords: [
    'guest house Iten',
    'guest house in Iten',
    'accommodation in Iten',
    'places to stay in Iten',
    'hotels in Iten',
    'budget accommodation Iten',
    'athlete accommodation Iten',
    'Cherush Guesthouse',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Guest House in Iten', item: '/guest-house-in-iten' }
])

const faqs = [
  {
    question: 'Why is Iten famous for running?',
    answer: 'Iten is known as the "Home of Champions" due to its high altitude (2,400m), ideal climate, and endless dirt trails which create the perfect environment for endurance training. It has produced numerous Olympic and World Champion long-distance runners.'
  },
  {
    question: 'How far is the guest house from Kamariny Stadium?',
    answer: 'Cherush Guesthouse is located just a short distance from Kamariny Stadium, making it incredibly convenient for athletes looking to do track workouts early in the morning.'
  },
  {
    question: 'Do you offer airport transfers to Iten?',
    answer: 'Yes, we can arrange reliable taxi transfers from Eldoret International Airport directly to our guest house in Iten. The drive takes approximately 1 hour and features stunning views of the Rift Valley.'
  },
  {
    question: 'Is WiFi reliable for remote work?',
    answer: 'Absolutely. We provide high-speed fiber optic WiFi with backup power systems. Many digital nomads and remote workers choose our guest house in Iten specifically for our reliable internet.'
  },
  {
    question: 'Are there self-catering options?',
    answer: 'Yes, our rooms feature self-catering kitchenettes equipped with essential cooking gear, allowing you to prepare meals according to your strict dietary or training requirements.'
  }
]

const faqSchema = getFAQSchema(faqs)
const lodgingSchema = getLodgingBusinessSchema()

export default function GuestHouseInItenPage() {
  const mapUrl = `https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="min-h-screen bg-background text-text selection:bg-accent/20">
        
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/og-image.jpg"
            alt="Premium guest house accommodation in Iten, Kenya"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-40" />
          <Container className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
            <span className="text-xs uppercase tracking-[0.3em] text-premium font-semibold mb-4 block">
              Premium Accommodation in Kenya
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Best Guest House in Iten
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-10">
              Your serene home away from home in the athletic capital of the world. Tailored for athletes, families, and remote workers.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="/rooms" variant="premium" className="scale-105">
                View Accommodation
              </Button>
              <Button href="/contact" variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </Container>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <Container className="max-w-4xl">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none">
              <h2 className="text-3xl md:text-4xl">Discover the Ideal Guest House in Iten</h2>
              <p>
                When traveling to the high-altitude training capital of the world, finding the perfect <strong>guest house in Iten</strong> is crucial for your success and comfort. Whether you are an elite athlete arriving for rigorous altitude training, a tourist exploring the majestic Great Rift Valley, or a business professional seeking tranquility, Cherush Guesthouse stands out as the premier accommodation choice in Elgeyo Marakwet County.
              </p>
              <p>
                Our guest house was designed with one primary goal: to provide an oasis of comfort, security, and modern luxury without losing the authentic Kenyan charm that makes Iten so special. Unlike large impersonal hotels or basic hostels, we bridge the gap by offering premium amenities with a deeply personalized touch.
              </p>

              <h3>Why Choose Cherush Over Other Accommodation in Iten?</h3>
              <p>
                Not all places to stay in Iten are created equal. Athletes and tourists have highly specific needs—from specialized dietary requirements and unbreakable internet connectivity to reliable hot showers after a long, dusty run along the Kerio Valley escarpment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {[
                { title: 'High-Speed Fiber WiFi', desc: 'Stay connected with the world. Our fiber-optic internet ensures you can stream, work remotely, and upload training data without interruption.' },
                { title: '24/7 Hot Showers', desc: 'After a grueling morning run in the cold Iten air, step into a steaming hot shower powered by reliable water heating systems.' },
                { title: 'Self-Catering Kitchens', desc: 'Maintain strict diets. Our rooms feature equipped kitchenettes allowing you to prepare meals exactly as your regimen demands.' },
                { title: 'Unmatched Security', desc: 'Sleep peacefully knowing our compound is fully secured, gated, walled, and monitored 24/7 by trained personnel.' }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-6 rounded-2xl border border-primary/5 flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-xl text-primary font-semibold mb-2">{feature.title}</h4>
                    <p className="text-text/70 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Local Area Information (Crucial for Local SEO) */}
        <section className="py-20 bg-background border-y border-primary/5">
          <Container className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">Location & Logistics</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary">Everything you need, right nearby</h2>
              <p className="text-lg text-text/80 leading-relaxed">
                Location is everything when choosing accommodation in Iten. Cherush Guesthouse is strategically situated to offer a quiet resting environment while remaining minutes away from vital infrastructure.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <Activity className="w-6 h-6 text-primary shrink-0 bg-primary/10 p-1 rounded-full" />
                  <div>
                    <strong className="block text-primary">Nearby Running Camps & Stadiums</strong>
                    <span className="text-sm text-text/70">Minutes away from Kamariny Stadium and the famous red dirt trails used by world record holders. Elite running camps are right in our neighborhood.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-primary shrink-0 bg-primary/10 p-1 rounded-full" />
                  <div>
                    <strong className="block text-primary">Local Attractions & Viewing Points</strong>
                    <span className="text-sm text-text/70">A short walk brings you to the spectacular Kerio Valley viewpoints, ideal for evening walks and photography.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Navigation className="w-6 h-6 text-primary shrink-0 bg-primary/10 p-1 rounded-full" />
                  <div>
                    <strong className="block text-primary">Supermarkets & Healthcare</strong>
                    <span className="text-sm text-text/70">Major supermarkets and the Iten County Referral Hospital are accessible within a 5-minute drive, ensuring you have everything required for a long stay.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Cloud className="w-6 h-6 text-primary shrink-0 bg-primary/10 p-1 rounded-full" />
                  <div>
                    <strong className="block text-primary">Weather & Climate</strong>
                    <span className="text-sm text-text/70">Sitting at 2,400m altitude, expect cool mornings (10-12°C) and warm, sunny afternoons (22-25°C). Ideal for active days and restful nights.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Interactive Map Wrapper */}
            <div className="h-[600px] bg-white rounded-3xl p-4 shadow-premium border border-primary/5">
              <iframe
                title="Cherush Guesthouse Map Location in Iten"
                src={mapUrl.replace('maps?q', 'maps?output=embed&q')}
                className="w-full h-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>

        {/* Accommodation Options */}
        <section className="py-20 bg-white">
          <Container className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="font-display text-3xl md:text-4xl text-primary">Tailored Room Options</h2>
            <p className="text-lg text-text/80">
              We offer multiple layouts to suit solo travelers, couples, and teams. From budget-friendly single rooms to expansive family suites, our guest house in Iten has the perfect space for you.
            </p>
            <div className="pt-8">
              <Button href="/rooms" variant="accent" className="scale-105 px-8">
                Explore All Rooms
              </Button>
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-background border-t border-primary/5">
          <Container className="max-w-4xl space-y-12">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-text/70">Common questions about staying at our guest house in Iten.</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-primary/5">
                  <h3 className="font-display text-xl text-primary font-semibold mb-3">{faq.question}</h3>
                  <p className="text-text/75 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-8 flex gap-4 justify-center flex-wrap">
              <Link href="/faq" className="text-sm font-medium text-accent hover:underline">
                View All FAQs →
              </Link>
              <Link href="/contact" className="text-sm font-medium text-accent hover:underline">
                Contact the Team →
              </Link>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center">
          <Container className="max-w-3xl space-y-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Secure Your Stay in Iten Today</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Finding quality accommodation in Iten during the peak training seasons can be highly competitive. We recommend booking your stay at Cherush Guesthouse well in advance to guarantee your spot in the ultimate guest house in Iten.
            </p>
            <div className="pt-8">
              <Button href="/bookings" variant="premium" className="scale-110 shadow-xl">
                Book Your Stay Now
              </Button>
            </div>
          </Container>
        </section>
      </article>
    </>
  )
}
