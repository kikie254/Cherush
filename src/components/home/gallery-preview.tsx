'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { GalleryItem } from '@/types'

export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  // Only take first 6 images for preview
  const previewItems = items.slice(0, 6)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {previewItems.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-sm hover:shadow-premium transition-all duration-300"
        >
          <Image
            src={item.media_url}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(min-width: 768px) 33vw, 50vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <span className="text-xs uppercase tracking-widest text-premium font-medium">{item.category}</span>
            <span className="text-white font-display text-xl mt-1">{item.title}</span>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="col-span-2 md:col-span-3 mt-4 text-center"
      >
        <Link 
          href="/gallery" 
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors"
        >
          View Full Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
