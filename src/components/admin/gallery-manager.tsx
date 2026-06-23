'use client'

import { useState, useTransition } from 'react'
import { Plus, Save, X, Check, Star, StarOff, Trash2 } from 'lucide-react'
import type { GalleryItem } from '@/types'
import { upsertGalleryItem } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'
import Image from 'next/image'

const BLANK: Partial<GalleryItem> = {
  title: '', media_type: 'image', media_url: '', thumbnail_url: null,
  category: 'Rooms', featured: false, sort_order: 99
}

export function AdminGalleryClient({ gallery: initial }: { gallery: GalleryItem[] }) {
  const [gallery, setGallery] = useState(initial)
  const [editing, setEditing] = useState<Partial<GalleryItem> & { id?: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!editing) return
    startTransition(async () => {
      const res = await upsertGalleryItem(editing)
      if (res.ok) {
        setSaved(true)
        if (editing.id) {
          setGallery((prev) => prev.map((g) => g.id === editing.id ? { ...g, ...editing } as GalleryItem : g))
        }
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
      }
    })
  }

  const categories = [...new Set(gallery.map((g) => g.category))]

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <div className="flex items-start justify-between">
          <SectionHeading eyebrow="Admin" title="Gallery" body="Manage images and media displayed across the site." />
          <button
            onClick={() => setEditing(BLANK)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-primary/5 aspect-square">
              <Image
                src={item.media_url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.featured ? 'bg-premium text-primary' : 'bg-white/20 text-white'}`}>
                    {item.featured ? '★ Featured' : item.category}
                  </span>
                  <button
                    onClick={() => setEditing({ ...item })}
                    className="text-white text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <p className="col-span-4 text-center text-muted py-12">No gallery items found.</p>
          )}
        </div>
      </div>

      {editing && (
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">{editing.id ? 'Edit Gallery Item' : 'New Gallery Item'}</h3>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-primary/5 rounded-xl"><X className="w-5 h-5 text-muted" /></button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[['title', 'Title'], ['media_url', 'Media URL'], ['category', 'Category']].map(([f, l]) => (
              <label key={f} className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted/70">{l}</span>
                <input
                  value={(editing as any)[f] ?? ''}
                  onChange={(e) => setEditing({ ...editing, [f]: e.target.value })}
                  className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
                />
              </label>
            ))}
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Sort Order</span>
              <input
                type="number"
                value={editing.sort_order ?? 99}
                onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.featured ?? false}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              />
              <span className="text-sm text-primary">Featured on homepage</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isPending}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
            >
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {isPending ? 'Saving…' : 'Save Item'}</>}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 border border-primary/10 rounded-xl text-sm hover:bg-primary/5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
