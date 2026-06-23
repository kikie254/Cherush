'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  className
}: {
  eyebrow: string
  title: string
  body?: string
  center?: boolean
  className?: string
}) {
  return (
    <div className={cn(center ? 'mx-auto max-w-3xl text-center flex flex-col items-center' : 'max-w-3xl', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        {!center && <span className="h-px w-8 bg-accent" />}
        <p className="text-xs uppercase tracking-[0.3em] font-medium text-accent">{eyebrow}</p>
        {!center && <span className="h-px w-8 bg-accent" />}
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 font-display text-4xl text-primary md:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h2>
      
      {body && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn("mt-6 text-lg leading-relaxed text-muted", center ? "max-w-xl" : "max-w-2xl")}
        >
          {body}
        </motion.p>
      )}
    </div>
  )
}
