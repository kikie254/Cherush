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
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const headline = "Stay where mornings begin differently.".split(" ")

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-primary flex items-end">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src={image} 
            alt="Cherush Stay Iten hero" 
            fill 
            priority 
            className="object-cover object-center" 
            sizes="100vw"
            quality={100}
          />
        </motion.div>
        {/* Soft dark cinematic layer */}
        <div className="absolute inset-0 bg-black/40 backdrop-contrast-[1.1] backdrop-saturate-[1.2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      </motion.div>

      <Container className="relative z-10 w-full pb-20 pt-32">
        <div className="max-w-4xl text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.4em] text-white/70 font-medium"
          >
            Cherush Stay Iten
          </motion.p>
          
          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight flex flex-wrap gap-x-3 md:gap-x-4">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.7 + i * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="block origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/80 font-light"
          >
            Boutique stays in Iten designed for athletes, explorers and peaceful escapes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap gap-5"
          >
            <Button href="/bookings" variant="premium">Book Stay</Button>
            <Button href="/experience" variant="secondary" className="border-white/30 text-white hover:bg-white hover:text-primary">Explore Iten</Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
