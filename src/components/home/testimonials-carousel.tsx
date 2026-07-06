'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from 'lucide-react'
import type { Review } from '@/types'

const STAR_COLORS = ['text-amber-400', 'text-amber-400', 'text-amber-400', 'text-amber-400', 'text-amber-300']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-amber-200'}`}
        />
      ))}
    </div>
  )
}

interface TestimonialsCarouselProps {
  reviews: Review[]
}

export function TestimonialsCarousel({ reviews }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  if (!reviews.length) return null

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1))
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1))
  }

  const review = reviews[current]

  return (
    <div className="relative w-full max-w-3xl mx-auto" aria-label="Guest testimonials carousel" role="region">
      {/* Quote icon background */}
      <div className="absolute -top-8 -left-4 text-[120px] text-premium/10 font-display leading-none select-none pointer-events-none" aria-hidden="true">
        &ldquo;
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_12px_60px_rgba(0,0,0,0.06)] px-10 pt-12 pb-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Stars */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={review.rating} />
              <span className="text-xs text-muted uppercase tracking-widest font-medium">Verified Stay</span>
            </div>

            {/* Quote */}
            <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-primary mb-8">
              {review.quote}
            </blockquote>

            {/* Guest info */}
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-lg select-none">
                {review.guest_name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                  {review.guest_name}
                  <BadgeCheck className="w-4 h-4 text-emerald-500" aria-label="Verified guest" />
                </p>
                {review.origin && (
                  <p className="text-xs text-muted">{review.origin}</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-10 right-10 flex items-center gap-2">
          <button
            onClick={prev}
            className="h-9 w-9 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="h-9 w-9 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Review navigation dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to review ${i + 1}`}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-accent' : 'w-1.5 bg-primary/20'}`}
          />
        ))}
      </div>
    </div>
  )
}
