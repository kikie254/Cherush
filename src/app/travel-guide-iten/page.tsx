import { getMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { MapPin, Thermometer, Car, Utensils, Activity, Calendar } from 'lucide-react'

export const metadata = getMetadata({
  title: 'Complete Iten Travel Guide 2026 | Tips, Weather & Attractions',
  description: 'The ultimate travel guide to Iten, Kenya. Best time to visit, top attractions, running routes, transport, restaurants, and where to stay in the Home of Champions.',
  path: '/travel-guide-iten',
  keywords: [
    'Iten travel guide',
    'visiting Iten Kenya',
    'what to do in Iten',
    'Iten attractions',
    'best time to visit Iten',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Iten Travel Guide', item: '/travel-guide-iten' },
])

const faqs = [
  { question: 'When is the best time to visit Iten?', answer: 'The dry seasons (January–March and June–October) are ideal. January to March coincides with peak athlete training camps, creating an electric atmosphere on the trails and at the track.' },
  { question: 'How do I get to Iten?', answer: 'Fly into Eldoret International Airport (EDL) and take a 1-hour taxi or shared matatu to Iten. Nairobi connections via road take approximately 5–6 hours through the Rift Valley.' },
  { question: 'Is Iten safe for tourists?', answer: 'Yes. Iten is one of the safest towns in Kenya. The tight-knit, sports-focused community creates a respectful and welcoming environment for visitors of all backgrounds.' },
  { question: 'What currency is used?', answer: 'The Kenyan Shilling (KES). M-Pesa mobile money is widely accepted. ATMs are available in Eldoret (45 min away). Bring some cash for local markets and matatu fares.' },
  { question: 'Do I need a visa to visit Kenya?', answer: 'Most nationalities can obtain an eTA (Electronic Travel Authorization) online at https://www.etakenya.go.ke/ before arriving. This costs approximately USD 30 and is processed within 72 hours.' },
]

const faqSchema = getFAQSchema(faqs)

export default function TravelGuideItenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Panoramic view of the Rift Valley near Iten Kenya"
            fill
            className="object-cover brightness-[0.45]"
            priority
          />
          <Container className="relative z-10 text-center max-w-4xl mt-16">
            <span className="text-xs uppercase tracking-[0.3em] text-premium font-semibold mb-4 block">Elgeyo Marakwet County, Kenya</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Complete Iten Travel Guide
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
              Everything you need to know before visiting the Home of Champions — from transport and climate to running routes and where to sleep.
            </p>
          </Container>
        </section>

        <section className="py-20">
          <Container className="max-w-4xl">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none">

              <h2>What Is Iten?</h2>
              <p>
                Iten is a small highland town perched at <strong>2,400 metres (7,874 feet)</strong> above sea level on the edge of the Great Rift Valley in Elgeyo Marakwet County, Kenya. It has produced more Olympic and World Champion long-distance runners per capita than anywhere else on Earth — earning the global nickname, the <em>"Home of Champions."</em>
              </p>
              <p>
                Athletes from over 50 countries travel to Iten annually to train at altitude alongside Kenyan champions. But Iten is much more than athletics. The town is surrounded by spectacular highland scenery, the vast Kerio Valley, the Singore Forest, and offers access to some of Kenya's most dramatic landscapes.
              </p>

            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-12">
              {[
                { icon: Thermometer, label: 'Altitude', value: '2,400m / 7,874ft' },
                { icon: Thermometer, label: 'Temperature', value: '10–26°C Year Round' },
                { icon: Car, label: 'From Eldoret', value: '~45 Minutes by Car' },
                { icon: Calendar, label: 'Best Season', value: 'Jan–Mar & Jun–Oct' },
                { icon: Activity, label: 'Famous For', value: 'World Champion Runners' },
                { icon: MapPin, label: 'County', value: 'Elgeyo Marakwet' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-primary/5 shadow-sm text-center">
                  <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">{label}</p>
                  <p className="font-display text-primary font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent max-w-none">

              <h2>Getting to Iten</h2>
              <h3>By Air</h3>
              <p>
                The nearest airport is <strong>Eldoret International Airport (IATA: EDL)</strong>, served by Kenya Airways and Jambojet from Nairobi (45 minutes). From Eldoret, taxis take 45–60 minutes to reach Iten. Cherush Guesthouse can arrange a direct airport transfer for guests — simply contact us in advance.
              </p>
              <h3>By Road from Nairobi</h3>
              <p>
                The drive from Nairobi to Iten takes approximately 5–6 hours via the A104 highway. The journey through the Great Rift Valley Escarpment is spectacular and a destination in itself. Comfortable intercity buses (e.g., Easy Coach) depart Nairobi and connect via Eldoret.
              </p>

              <h2>Top Attractions in Iten</h2>
              <h3>1. Kerio Valley Escarpment Viewpoints</h3>
              <p>
                The most breathtaking free experience in Iten. Stand at the edge of the 1,000-metre escarpment and look down into the Kerio Valley below. The viewpoints are accessible from the main Iten-Kabarnet road and are especially stunning at sunrise and sunset. Paragliders launch from these cliffs on weekends.
              </p>
              <h3>2. Kamariny Stadium & Training Trails</h3>
              <p>
                Even if you are not an athlete, watching morning training sessions is a remarkable experience. Hundreds of elite runners take to the red dirt roads from 6:00 AM onwards. The famous "Sunday Run" fartlek on the Kamariny road draws hundreds of athletes weekly — visitors are welcome to watch and even join the slower groups.
              </p>
              <h3>3. High Altitude Centre & Running Camps</h3>
              <p>
                Visit the globally recognized High Altitude Training Centre, founded by world champion Lornah Kiplagat. It has hosted Olympians from across the world and is a symbol of Iten's impact on global endurance sport.
              </p>
              <h3>4. Rimoi National Reserve (Day Trip)</h3>
              <p>
                Approximately 45 minutes from Iten, Rimoi National Reserve sits at the bottom of the Kerio Valley. It hosts large herds of elephants, and the drive down the escarpment road is thrilling. Arrange a guide in Iten before descending.
              </p>
              <h3>5. Singore Forest</h3>
              <p>
                A short drive from the town centre, Singore Forest offers peaceful nature walks, birdwatching, and cool, shaded trails. Perfect for recovery days between hard workouts.
              </p>

              <h2>Where to Eat in Iten</h2>
              <ul>
                <li><strong>Kerio View Hotel:</strong> The most established restaurant in Iten, with panoramic Rift Valley views and a good international menu. Popular with visiting athletes and tourists.</li>
                <li><strong>Local Kibandas (food stalls):</strong> For an authentic experience, eat where the champions eat. Local stalls serve Ugali (maize meal), Sukuma Wiki (collard greens), Nyama Choma (roasted meat), and the famous Mursik fermented milk at very affordable prices.</li>
                <li><strong>Cherush Guesthouse Restaurant:</strong> On-site meals available for our guests, featuring locally sourced ingredients and customized athlete meal plans.</li>
              </ul>

              <h2>Where to Stay in Iten</h2>
              <p>
                Accommodation in Iten ranges from basic hostels to boutique guesthouses. For those prioritizing reliability, security, and premium amenities, <Link href="/guest-house-in-iten">Cherush Guesthouse</Link> is widely regarded as the top choice. We offer:
              </p>
              <ul>
                <li>High-speed fiber WiFi with backup power</li>
                <li>24/7 hot showers</li>
                <li>Self-catering kitchens for dietary precision</li>
                <li>Secure, gated compound</li>
                <li>Tailored options for <Link href="/athlete-accommodation">athletes</Link>, <Link href="/family-accommodation-iten">families</Link>, and <Link href="/long-stay-accommodation">long stays</Link></li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="mt-16 space-y-6">
              <h2 className="font-display text-3xl text-primary font-semibold">Frequently Asked Questions</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-primary/5 shadow-sm">
                  <h3 className="font-display text-lg text-primary font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-primary rounded-3xl p-10 text-white text-center">
              <h2 className="font-display text-3xl font-bold mb-4">Ready to Experience Iten?</h2>
              <p className="text-white/80 mb-8">Secure your accommodation at Cherush Guesthouse and make your Iten trip unforgettable.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/rooms" className="inline-flex h-12 items-center justify-center rounded-lg bg-white text-primary px-8 text-sm font-semibold hover:bg-white/90 transition-colors">
                  View Rooms
                </Link>
                <Link href="/bookings" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 text-white px-8 text-sm font-semibold hover:bg-white/10 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  )
}
