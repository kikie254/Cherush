'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import type { GalleryItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function LightboxGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))]
  const filteredItems =
    selectedCategory === 'All' ? items : items.filter((i) => i.category === selectedCategory)

  // Keyboard: Escape closes lightbox, arrow keys navigate
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') {
        setActive((current) => {
          if (!current) return null
          const idx = filteredItems.findIndex((i) => i.id === current.id)
          return filteredItems[(idx + 1) % filteredItems.length] ?? null
        })
      }
      if (e.key === 'ArrowLeft') {
        setActive((current) => {
          if (!current) return null
          const idx = filteredItems.findIndex((i) => i.id === current.id)
          return filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length] ?? null
        })
      }
    }

    document.addEventListener('keydown', handler)
    // Lock body scroll while lightbox is open (prevents CLS from scrollbar reflow)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [active, close, filteredItems])

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center" role="group" aria-label="Filter gallery by category">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-primary/5 text-primary hover:bg-primary/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              key={item.id}
              type="button"
              aria-label={`Open ${item.title} in lightbox`}
              className="group relative w-full overflow-hidden rounded-[24px] text-left break-inside-avoid shadow-[var(--shadow-soft)] aspect-[4/5] sm:aspect-auto sm:min-h-[250px]"
              onClick={() => setActive(item)}
            >
              <Image
                src={item.media_url}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs uppercase tracking-[0.25em] text-premium font-medium">
                  {item.category}
                </p>
                <p className="mt-2 text-xl font-display leading-tight">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox dialog — WCAG 2.1 compliant modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${active.title}`}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image — stop click propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-[20px] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.media_url}
                alt={active.title}
                fill
                className="object-contain"
                sizes="(min-width: 1280px) 80vw, 100vw"
                priority
              />
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-display text-xl">{active.title}</p>
                {active.category && (
                  <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                    {active.category}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest hidden md:block">
              ← → Navigate · Esc Close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
