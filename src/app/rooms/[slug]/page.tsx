import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { getRooms } from '@/lib/queries'
import { formatCurrency } from '@/lib/utils'

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rooms = await getRooms()
  const room = rooms.find((item) => item.slug === slug)
  if (!room) notFound()

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="relative h-[26rem] overflow-hidden rounded-[32px]">
              <Image src={room.cover_image} alt={room.name} fill className="object-cover" sizes="100vw" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {room.gallery.map((image, index) => (
                <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-[24px]">
                  <Image src={image} alt={`${room.name} ${index + 1}`} fill className="object-cover" sizes="50vw" />
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent)]">{room.max_guests} guests · {room.size_sqm} sqm</p>
            <h1 className="mt-4 font-display text-5xl text-[var(--color-primary)]">{room.name}</h1>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{room.description}</p>
            <div className="mt-8 space-y-3 text-sm text-[var(--color-primary)]">
              <p>Nightly: {formatCurrency(room.price_per_night)}</p>
              {room.weekly_rate ? <p>Weekly: {formatCurrency(room.weekly_rate)}</p> : null}
              {room.monthly_rate ? <p>Monthly: {formatCurrency(room.monthly_rate)}</p> : null}
              <p>Beds: {room.beds}</p>
              <p>Bathrooms: {room.bathrooms}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {room.features.map((feature) => (
                <span key={feature} className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs text-[var(--color-primary)]">{feature}</span>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button href={`/bookings?room=${room.slug}`} variant="accent">Book this room</Button>
              <Button href="/contact" variant="secondary">Ask a question</Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
