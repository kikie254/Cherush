'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

const experiences = [
  {
    title: 'Wake Up',
    desc: 'Cool morning air, valley views, and a quiet start to the day.',
    img: '/sunrise.svg'
  },
  {
    title: 'Train',
    desc: 'Access to famous red dirt trails and the Kamariny track.',
    img: '/trail.svg'
  },
  {
    title: 'Explore',
    desc: 'Discover the Great Rift Valley edges and local rhythm.',
    img: '/safari.svg'
  },
  {
    title: 'Relax',
    desc: 'Return to warm lounges, hot showers, and recovery spaces.',
    img: '/lounge.svg'
  },
  {
    title: 'Stay',
    desc: 'A polished base that feels like a private luxury residence.',
    img: '/desk.svg'
  }
]

export function HorizontalExperience() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // We have 5 items. The total width to translate is roughly -100% + 100vw.
  // We'll translate based on scroll progress.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <Container className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-white"
          >
            <span className="h-px w-8 bg-premium" />
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-premium">The Rhythm</p>
          </motion.div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl text-white tracking-tight">The Cherush Experience</h2>
        </Container>

        <motion.div style={{ x }} className="flex pl-4 md:pl-[max(2rem,calc((100vw-80rem)/2))] gap-8 md:gap-16 pb-20">
          {experiences.map((exp, i) => (
            <div key={exp.title} className="relative flex-shrink-0 w-[85vw] md:w-[600px] group">
              <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden rounded-[24px]">
                <Image 
                  src={exp.img} 
                  alt={exp.title} 
                  fill 
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
                  sizes="(min-width: 768px) 600px, 85vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-4 overflow-hidden">
                  <span className="text-sm font-medium tracking-[0.2em] text-premium">0{i + 1}</span>
                  <span className="h-px w-12 bg-premium/50" />
                </div>
                <h3 className="font-display text-4xl md:text-5xl mb-4">{exp.title}</h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-sm">{exp.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
