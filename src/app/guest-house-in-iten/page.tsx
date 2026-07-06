import { getMetadata, getBreadcrumbSchema, getLodgingBusinessSchema } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Top Rated Guest House in Iten | Cherush Guesthouse',
  description: 'Looking for a guest house in Iten? Cherush Guesthouse offers premium amenities, hot showers, high-speed WiFi, and stunning views of the Rift Valley. Book your stay today!',
  path: '/guest-house-in-iten',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Guest House in Iten', item: '/guest-house-in-iten' }
])

const lodgingSchema = getLodgingBusinessSchema()

export default function GuestHouseInItenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, lodgingSchema]) }}
      />
      <article className="min-h-screen bg-background text-text selection:bg-accent/20">
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
            alt="Beautiful guest house accommodation in Iten"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Finding the Perfect Guest House in Iten
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
              Your home away from home in the athletic capital of the world.
            </p>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none">
            
            <h2 className="text-3xl mt-12 mb-6">Welcome to Cherush Guesthouse</h2>
            <p>
              When traveling to the high-altitude training capital of the world, finding the right <strong>guest house in Iten</strong> is crucial. Whether you are an elite athlete arriving for rigorous altitude training, a tourist exploring the majestic Great Rift Valley, or a business traveler seeking tranquility, Cherush Guesthouse stands out as the premier accommodation choice in Elgeyo Marakwet County.
            </p>

            <p>
              Our guest house was designed with one primary goal: to provide an oasis of comfort, security, and luxury without losing the authentic Kenyan charm that makes Iten so special.
            </p>

            <h3 className="text-2xl mt-12 mb-4">Why Choose Our Guest House in Iten?</h3>
            <p>
              Not all accommodations are created equal. In Iten, athletes and tourists have specific needs—from dietary requirements and fast internet connectivity to reliable hot showers after a long, dusty run. Here is why Cherush Guesthouse is rated as a top choice:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                <h4 className="font-display text-xl text-primary mb-3 font-semibold">Reliable High-Speed WiFi</h4>
                <p className="text-text/70 text-sm">Stay connected with the world. Our fiber-optic internet ensures you can stream, work remotely, or video call family without interruption.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                <h4 className="font-display text-xl text-primary mb-3 font-semibold">24/7 Hot Showers</h4>
                <p className="text-text/70 text-sm">After a grueling morning run in the cold Iten air, step into a steaming hot shower powered by reliable water heating systems.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                <h4 className="font-display text-xl text-primary mb-3 font-semibold">Nutritious Dining</h4>
                <p className="text-text/70 text-sm">Our on-site restaurant serves meals tailored for athletes and travelers, featuring organic local ingredients, fresh vegetables, and balanced macros.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
                <h4 className="font-display text-xl text-primary mb-3 font-semibold">Unmatched Security</h4>
                <p className="text-text/70 text-sm">Sleep peacefully knowing our compound is fully secured, walled, and monitored 24/7 by trained personnel.</p>
              </div>
            </div>

            <h2 className="text-3xl mt-12 mb-6">Designed for Comfort and Recovery</h2>
            <p>
              At Cherush Guesthouse, we understand that recovery is just as important as the activity itself. Our rooms feature premium orthopedic mattresses designed to provide optimal spinal support and deep sleep. The quiet, serene environment allows you to relax away from the noise of the main highway, yet we remain conveniently close to Iten's center and the famous running routes.
            </p>

            <p>
              We offer a variety of room configurations to suit your needs, from single private rooms ideal for focused athletes, to spacious family suites for vacationing groups. Every room is meticulously cleaned daily and features modern en-suite bathrooms.
            </p>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 my-12 text-center">
              <h4 className="text-2xl font-display text-primary mb-4">Ready to Experience Iten?</h4>
              <p className="mb-6">
                Don't settle for less during your stay in the Home of Champions. Check our availability and secure your room at the finest guest house in Iten today.
              </p>
              <Link 
                href="/rooms" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                View Rooms & Pricing
              </Link>
            </div>

            <h3 className="text-2xl mt-12 mb-4">What Our Guests Say</h3>
            <blockquote className="border-l-4 border-accent pl-6 italic text-text/80 my-8">
              "The best guest house in Iten by far. The staff went above and beyond to make my altitude training camp successful. The food was incredible, the WiFi never dropped, and the hot showers were exactly what I needed after 30km runs." 
              <span className="block mt-2 font-semibold not-italic text-primary">— Sarah J., Professional Marathoner</span>
            </blockquote>

            <h2 className="text-3xl mt-12 mb-6">Book Your Stay Today</h2>
            <p>
              Finding quality accommodation in Iten during the peak training seasons (January to March, and June to August) can be challenging as athletes from Europe and America flood the town. We highly recommend booking your stay at Cherush Guesthouse well in advance to guarantee your spot in the ultimate guest house in Iten.
            </p>
            <p>
              We look forward to welcoming you to the Home of Champions!
            </p>
          </div>
        </section>
      </article>
    </>
  )
}
