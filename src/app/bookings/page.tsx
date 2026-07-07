import { BookingWidget } from '@/components/booking/widget'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRooms } from '@/lib/queries'
import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Book a Room | Reserve Your Stay Online',
  description:
    'Book a room at Cherush Guesthouse in Iten, Kenya. Choose your dates, select a room, and receive confirmation within hours. Secure online booking — no payment until approved. M-Pesa, Visa, Mastercard accepted.',
  path: '/bookings',
  keywords: [
    'book guesthouse Iten',
    'reserve room Iten Kenya',
    'Cherush Guesthouse booking',
    'online booking Iten accommodation',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Book a Room', item: '/bookings' },
])

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const rooms = await getRooms()
  const params = await searchParams

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-20" aria-labelledby="bookings-heading">
        <Container className="space-y-10">
          <h1 id="bookings-heading" className="sr-only">Book a Room at Cherush Guesthouse, Iten</h1>
          <SectionHeading
            eyebrow="Bookings"
            title="Request your stay"
            body="Choose dates, review the estimate, and send a booking request. The team confirms availability before approval."
          />
          <BookingWidget rooms={rooms} initialRoomSlug={params.room} />
          <div className="text-center space-y-2">
            <p className="text-center text-sm text-muted">
              Already have a booking?{' '}
              <Link href="/bookings/track" className="text-accent hover:underline font-medium">
                Track your reservation →
              </Link>
            </p>
            <p className="text-center text-sm text-muted">
              Questions?{' '}
              <Link href="/contact" className="text-accent hover:underline font-medium">
                Contact us directly
              </Link>
              {' '}or see our{' '}
              <Link href="/cancellation-policy" className="text-accent hover:underline font-medium">
                cancellation policy
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
