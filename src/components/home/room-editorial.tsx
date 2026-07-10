'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function RoomEditorial({ room, index }: { room: Room; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax — GPU-only transform (no layout triggers)
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const isEven = index % 2 === 0

  return (
    <div
      ref={containerRef}
      className="group relative grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[80vh] py-20"
    >
      {/* Image pane */}
      <div
        className={`relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-[24px] ${
          !isEven ? 'lg:order-2' : ''
        }`}
      >
        {/* parallax-layer ensures compositor-thread-only animation */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 h-[120%] -top-[10%] parallax-layer"
        >
          <Image
            src={room.cover_image}
            alt={`${room.name} — Cherush Guesthouse, Iten`}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      {/* Text pane */}
      <div className="flex flex-col justify-center space-y-8 lg:sticky lg:top-32 lg:self-start lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-accent" />
            <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
              0{index + 1}
            </span>
          </div>
          <h3 className="font-display text-5xl md:text-6xl text-primary tracking-tight">
            {room.name}
          </h3>

          <div className="mt-6 flex flex-wrap gap-2">
            {room.features.slice(0, 4).map((feature) => (
              <span
                key={feature}
                className="px-4 py-1.5 rounded-full border border-primary/10 text-xs uppercase tracking-widest text-primary"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-8 text-lg leading-relaxed text-muted max-w-lg">{room.description}</p>

          <div className="mt-10 flex items-center justify-between border-t border-primary/10 pt-8 max-w-lg">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted mb-1">From</p>
              <p className="font-display text-3xl text-primary">{formatCurrency(room.price_per_night)}</p>
            </div>
            <div className="flex gap-4">
              <Button href={`/rooms/${room.slug}`} variant="secondary" className="px-6">
                Details
              </Button>
              <Button href={`/bookings?room=${room.slug}`} variant="primary">
                Book
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
