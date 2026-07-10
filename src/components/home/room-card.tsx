import Image from 'next/image'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-primary/5">
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image 
          src={room.cover_image} 
          alt={room.name} 
          fill 
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          sizes="(min-width: 1024px) 33vw, 100vw" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          {room.beds}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-8 space-y-6">
        <div>
          <h3 className="font-display text-3xl text-primary">{room.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">{room.short_description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {room.features.slice(0, 4).map((feature) => (
              <span key={feature} className="rounded-full bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary uppercase tracking-wider">
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-primary/10 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-muted">From</span>
            <span className="font-display text-2xl font-semibold text-accent">{formatCurrency(room.price_per_night)}</span>
          </div>
          <div className="flex gap-3">
            <Button href={`/rooms/${room.slug}`} variant="secondary" className="px-5">Details</Button>
            <Button href={`/bookings?room=${room.slug}`} variant="primary">Book</Button>
          </div>
        </div>
      </div>
    </article>
  )
}
