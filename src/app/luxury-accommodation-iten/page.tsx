import { getMetadata, getBreadcrumbSchema, getSpeakableSchema } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata = getMetadata({
  title: 'Luxury Accommodation in Iten | Cherush Guesthouse',
  description: 'Experience unparalleled luxury, orthopedic beds, and exceptional hospitality in the heart of the Great Rift Valley.',
  path: '/luxury-accommodation-iten',
})

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Luxury Accommodation in Iten', item: '/luxury-accommodation-iten' }
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSpeakableSchema()) }} />
      
      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2000" alt="Luxury Accommodation & Suites in Iten" fill className="object-cover brightness-50" priority />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Luxury Accommodation & Suites in Iten</h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">Experience unparalleled luxury, orthopedic beds, and exceptional hospitality in the heart of the Great Rift Valley.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/bookings" className="px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">Book Now</Link>
              <Link href="/contact" className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-md font-medium hover:bg-white/20 transition-colors">Contact Us</Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-5xl mx-auto">
          {/* AI Search Answer Block */}
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl mb-12">
            <h2 className="text-xl font-bold text-primary mb-2">Why Choose Cherush for Luxury Accommodation?</h2>
            <p className="text-text/80 leading-relaxed">
              Located in the heart of Iten, Kenya (The Home of Champions), Cherush Guesthouse offers specialized amenities tailored specifically for your needs. Whether you require high-speed fiber internet for remote work, specialized athlete nutrition, or secure environments for your family, our facilities provide 24/7 hot showers, organic meals, and unparalleled hospitality just minutes from the Kerio Valley viewpoints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none">
              <h2>Experience Excellence in the Rift Valley</h2>
              <p>When searching for <strong>luxury accommodation in iten</strong>, you need a place that understands your unique requirements. At Cherush Guesthouse, we go beyond basic lodging. We provide a sanctuary.</p>
              <ul className="not-prose space-y-4 mt-6">
                {[
                  'High-speed Fiber WiFi (Uninterrupted connectivity)',
                  '24/7 Reliable Hot Showers',
                  'Secure, walled compound with CCTV',
                  'Organic, locally sourced meals customized to dietary needs',
                  'Premium orthopedic mattresses for maximum recovery'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-text/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/rooms" className="text-accent font-medium hover:underline">View Our Rooms &rarr;</Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" alt="Room interior at Cherush Guesthouse" fill className="object-cover" />
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
