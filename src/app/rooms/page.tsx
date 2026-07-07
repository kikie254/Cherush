import { RoomCard } from '@/components/home/room-card'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRooms } from '@/lib/queries'
import { getMetadata, getBreadcrumbSchema, getOfferSchema } from '@/lib/seo'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Rooms & Accommodation | Book Your Stay',
  description:
    'Browse all rooms at Cherush Guesthouse in Iten, Kenya. From budget-friendly singles to spacious family suites — each room features fast WiFi, hot showers, and self-catering kitchens. Book online.',
  path: '/rooms',
  keywords: [
    'rooms Iten Kenya',
    'accommodation Iten',
    'book room Iten',
    'guesthouse rooms Kenya',
    'athlete rooms Iten',
    'family rooms Iten',
    'budget rooms Iten Kenya',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Rooms', item: '/rooms' },
])

export default async function RoomsPage() {
  const rooms = await getRooms()
  const offerSchema = getOfferSchema(rooms)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <section className="py-20" aria-labelledby="rooms-heading">
        <Container className="space-y-10">
          <h1 id="rooms-heading" className="sr-only">
            Rooms &amp; Accommodation at Cherush Guesthouse, Iten
          </h1>
          <SectionHeading
            eyebrow="Rooms"
            title="Choose the stay style that fits your trip"
            body="From efficient short stays to spacious long-stay layouts, each room at Cherush Guesthouse is designed around comfort, routine, and flexibility."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </div>

          <div className="text-center pt-6 space-y-2">
            <p className="text-text/70 text-sm">Need help choosing the right room?</p>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
