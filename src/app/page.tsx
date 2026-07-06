import { Hero } from '@/components/home/hero'
import { RoomEditorial } from '@/components/home/room-editorial'
import { HorizontalExperience } from '@/components/home/horizontal-experience'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TrustBadges } from '@/components/home/trust-badges'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { LocalPartners } from '@/components/home/local-partners'
import { DistanceCalculator } from '@/components/ui/distance-calculator'
import { FAQSection } from '@/components/home/faq-section'
import { FloatingActions } from '@/components/home/floating-actions'
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel'
import { getReviews, getRooms } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getLodgingBusinessSchema, getFAQSchema, getReviewSchema } from '@/lib/seo'
import { faqs } from '@/lib/queries'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cherush Guesthouse | Affordable Luxury Accommodation in Kenya',
  description:
    'Experience comfort, hospitality and affordable luxury at Cherush Guesthouse. Book rooms online, explore amenities and enjoy exceptional service in Iten, Kenya.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://cherushguesthouse.com',
  },
}

export const revalidate = 3600 // Cache for 1 hour

export default async function HomePage() {
  const [rooms, reviews] = await Promise.all([getRooms(), getReviews()])

  return (
    <>
      {/* ── JSON-LD Structured Data ────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }}
      />
      {reviews.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getReviewSchema(reviews)) }}
        />
      )}

      <Hero image={images.hero} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Rooms */}
      <section className="py-32 relative bg-background" aria-labelledby="rooms-heading">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="The Residences"
            title="Spaces designed for recovery and ease"
            body="Choose from flexible layouts for solo stays, couples, families, or longer residential visits in Iten. Each space offers uncompromising comfort, distinct design, and absolute privacy."
            id="rooms-heading"
          />
          <div className="mt-20 flex flex-col gap-10">
            {rooms.map((room, index) => (
              <RoomEditorial key={room.id} room={room} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      <LocalPartners />

      <HorizontalExperience />

      {/* Distance Calculator */}
      <section className="py-32 bg-background border-y border-primary/5" aria-labelledby="proximity-heading">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Prime Proximity"
            title="Local travel and running trails distance guide"
            body="Cherush Stay is located in a quiet residential pocket of Iten. Calculate distances and transit times to popular athletic and scenic hubs."
            id="proximity-heading"
          />
          <div className="mt-12">
            <DistanceCalculator />
          </div>
        </Container>
      </section>

      {/* Guest Reviews — now with carousel */}
      <section className="py-32 bg-white relative overflow-hidden" aria-labelledby="reviews-heading">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading
                eyebrow="Guest reflections"
                title="A calm, practical base in Iten"
                body="Hear from athletes, remote workers, and families who have made Cherush their temporary home in the highlands."
                id="reviews-heading"
              />
              <div className="mt-16">
                <TestimonialsCarousel reviews={reviews} />
              </div>
            </div>
            <div className="relative h-[80vh] w-full rounded-[24px] overflow-hidden">
              <Image
                src={images.garden}
                alt="Cherush garden view"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-32 bg-primary text-white" aria-labelledby="cta-heading">
        <Container className="text-center flex flex-col items-center">
          <SectionHeading
            eyebrow="Your Journey Begins"
            title="Ready to experience Iten?"
            body="Secure your dates for an upcoming training block, remote work stay, or family retreat."
            center
            className="text-white [&_h2]:text-white [&_p]:text-white/80"
            id="cta-heading"
          />
          <div className="mt-16">
            <Button href="/bookings" variant="premium" className="scale-110">
              Reserve Your Stay
            </Button>
          </div>
        </Container>
      </section>

      {/* Floating CTA & WhatsApp */}
      <FloatingActions />
    </>
  )
}
