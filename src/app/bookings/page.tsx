import { BookingWidget } from '@/components/booking/widget'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRooms } from '@/lib/queries'

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const rooms = await getRooms()
  const params = await searchParams

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <SectionHeading eyebrow="Bookings" title="Request your stay" body="Choose dates, review the estimate, and send a booking request. The team confirms availability before approval." />
        <BookingWidget rooms={rooms} initialRoomSlug={params.room} />
      </Container>
    </section>
  )
}
