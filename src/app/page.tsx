import { Hero } from '@/components/home/hero'
import { RoomEditorial } from '@/components/home/room-editorial'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TrustBadges } from '@/components/home/trust-badges'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { LocalPartners } from '@/components/home/local-partners'
import { GalleryPreview } from '@/components/home/gallery-preview'
import {
  DeferredHorizontalExperience,
  DeferredTestimonialsCarousel,
  DeferredGoogleMap,
  DeferredFAQSection,
  DeferredFloatingActions,
} from '@/components/home/deferred-components'
import { getReviews, getRooms, getGallery, faqs } from '@/lib/queries'
import { images } from '@/lib/site-data'
import { getMetadata, getLodgingBusinessSchema, getFAQSchema, getReviewSchema } from '@/lib/seo'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Cherush Guesthouse | Affordable Accommodation in Iten, Kenya',
  description:
    'Cherush Guesthouse offers comfortable, affordable rooms in Iten, Kenya — the Home of Champions. Book online for athlete stays, family visits, remote work, and tourism in the Great Rift Valley.',
  path: '/',
  keywords: [
    'guesthouse Iten Kenya',
    'affordable accommodation Iten',
    'Cherush Guesthouse',
    'hotel in Iten',
    'places to stay Iten',
    'athlete accommodation Iten',
    'family guesthouse Iten Kenya',
    'budget accommodation Iten',
    'Home of Champions accommodation',
    'Elgeyo Marakwet guesthouse',
  ],
})

export const revalidate = 3600

export default async function HomePage() {
  const [rooms, reviews, gallery] = await Promise.all([getRooms(), getReviews(), getGallery()])

  return (
    <>
      {/* ── JSON-LD Structured Data ─────────────────────────────────────── */}
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

      {/* ── Hero (LCP element — SSR, priority image) ────────────────────── */}
      <Hero image={images.hero} />

      {/* ── Trust Badges (above-fold, SSR, no client JS) ────────────────── */}
      <TrustBadges />

      {/* ── Why Choose Us (SSR, text-only) ──────────────────────────────── */}
      <WhyChooseUs />

      {/* ── Rooms editorial (SSR — first image eager, rest lazy) ────────── */}
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

      {/* ── Local Partners (SSR, text-only) ─────────────────────────────── */}
      <LocalPartners />

      {/* ── Horizontal Experience (below-fold, client-only, deferred) ───── */}
      <DeferredHorizontalExperience />

      {/* ── Gallery Preview (cv-auto defers rendering near viewport) ────── */}
      <section className="py-32 bg-white cv-auto" aria-labelledby="gallery-heading">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Aesthetic"
            title="A visual sense of Cherush"
            body="Explore the quiet corners, bright mornings, and premium finishes that make every stay memorable."
            id="gallery-heading"
          />
          <div className="mt-12">
            <GalleryPreview items={gallery} />
          </div>
        </Container>
      </section>

      {/* ── Location Map (iframe, deferred) ─────────────────────────────── */}
      <section
        className="py-32 bg-background border-y border-primary/5 cv-auto"
        aria-labelledby="location-heading"
      >
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Prime Location"
            title="Find us in the Home of Champions"
            body="Located just minutes away from famous running trails and Iten town center. Explore the area effortlessly."
            id="location-heading"
          />
          <div className="mt-12">
            <DeferredGoogleMap />
          </div>
        </Container>
      </section>

      {/* ── Guest Reviews (dynamic carousel, cv-auto) ────────────────────── */}
      <section
        className="py-32 bg-white relative overflow-hidden cv-auto"
        aria-labelledby="reviews-heading"
      >
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
                <DeferredTestimonialsCarousel reviews={reviews} />
              </div>
            </div>
            {/* Explicit h-[80vh] prevents CLS — container dimensions are known */}
            <div className="relative h-[80vh] w-full rounded-[24px] overflow-hidden">
              <Image
                src={images.garden}
                alt="Cherush Guesthouse garden — Iten, Kenya"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQs (deferred, cv-auto) ─────────────────────────────────────── */}
      <DeferredFAQSection />

      {/* ── Final CTA (SSR — text only) ──────────────────────────────────── */}
      <section className="py-32 bg-primary text-white" aria-labelledby="cta-heading">
        <Container className="text-center flex flex-col items-center">
          <SectionHeading
            eyebrow="Your Journey Begins"
            title="Ready to experience Iten?"
            body="Secure your dates for an upcoming training block, remote work stay, or family retreat at Cherush Guesthouse."
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

      {/* ── Floating CTA & WhatsApp (deferred, fully client-only) ───────── */}
      <DeferredFloatingActions />
    </>
  )
}
