'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { GalleryItem } from '@/types'

export function LightboxGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group relative h-72 overflow-hidden rounded-[24px] text-left"
            onClick={() => setActive(item)}
          >
            <Image src={item.media_url} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-white/75">{item.category}</p>
              <p className="mt-2 text-xl font-medium">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
      {active ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
          <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-[28px] bg-black">
            <Image src={active.media_url} alt={active.title} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      ) : null}
    </>
  )
}
