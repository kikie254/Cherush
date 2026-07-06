import { BookingWidget } from '@/components/booking/widget'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRooms } from '@/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Room | Cherush Guesthouse Iten',
  description: 'Reserve your stay at Cherush Guesthouse in Iten, Kenya. Choose your dates, select a room, and receive confirmation within hours. No payment until approved.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cherushguesthouse.com'}/bookings`,
  },
}

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const rooms = await getRooms()
  const params = await searchParams

  return (
    <section className="py-20" aria-labelledby="bookings-heading">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Bookings"
          title="Request your stay"
          body="Choose dates, review the estimate, and send a booking request. The team confirms availability before approval."
          id="bookings-heading"
        />
        <BookingWidget rooms={rooms} initialRoomSlug={params.room} />
        <p className="text-center text-sm text-muted">
          Already have a booking?{' '}
          <a href="/bookings/track" className="text-accent hover:underline font-medium">
            Track your reservation →
          </a>
        </p>
      </Container>
    </section>
  )
}

