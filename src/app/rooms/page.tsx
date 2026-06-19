import { RoomCard } from '@/components/home/room-card'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getRooms } from '@/lib/queries'

export default async function RoomsPage() {
  const rooms = await getRooms()

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <SectionHeading eyebrow="Rooms" title="Choose the stay style that fits your trip" body="From efficient short stays to spacious long-stay layouts, each room is designed around comfort, routine, and flexibility." />
        <div className="grid gap-6 lg:grid-cols-3">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </Container>
    </section>
  )
}
