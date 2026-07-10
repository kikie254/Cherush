'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

export function Hero({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // GPU-only transform — translateY on compositor thread, no layout triggered
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0])

  const headline = 'Wake up where champions begin.'.split(' ')

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-primary flex items-end"
      aria-label="Hero — Cherush Guesthouse"
    >
      {/* Parallax container — own GPU layer */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 parallax-layer"
        aria-hidden="true"
      >
        {/* Subtle zoom-in on mount — scale from 1.05 to 1 */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt="Cherush Guesthouse — Iten, Kenya at sunrise"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </motion.div>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      </motion.div>

      <Container className="relative z-10 w-full pb-20 pt-32">
        <div className="max-w-4xl text-white">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.4em] text-white/70 font-medium"
          >
            Cherush Stay Iten
          </motion.p>

          {/* Headline — word-by-word reveal */}
          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight flex flex-wrap gap-x-3 md:gap-x-4">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/80 font-light"
          >
            Premium boutique stays in Iten for athletes, remote workers, and quiet escapes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap gap-5"
          >
            <Button href="/bookings" variant="premium">
              Book Your Stay
            </Button>
            <Button
              href="/rooms"
              variant="secondary"
              className="border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Explore Rooms
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </Container>
    </section>
  )
}
