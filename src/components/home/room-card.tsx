import Image from 'next/image'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-[var(--shadow-soft)]">
      <div className="relative h-64">
        <Image src={room.cover_image} alt={room.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <div className="space-y-5 p-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-3xl text-[var(--color-primary)]">{room.name}</h3>
            <span className="text-sm font-semibold text-[var(--color-accent)]">{formatCurrency(room.price_per_night)}/night</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{room.short_description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {room.features.slice(0, 4).map((feature) => (
            <span key={feature} className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs text-[var(--color-primary)]">
              {feature}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <Button href={`/rooms/${room.slug}`}>View Room</Button>
          <Button href={`/bookings?room=${room.slug}`} variant="secondary">Book</Button>
        </div>
      </div>
    </article>
  )
}
