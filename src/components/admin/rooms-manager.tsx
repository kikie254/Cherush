'use client'

import { useState, useTransition } from 'react'
import { Plus, Save, X, Edit2, Home } from 'lucide-react'
import type { Room } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { upsertRoom } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'
import Image from 'next/image'

const BLANK_ROOM: Partial<Room> = {
  name: '', slug: '', short_description: '', description: '',
  price_per_night: 1000, weekly_rate: null, monthly_rate: null,
  cover_image: '/lounge.svg', gallery: [], max_guests: 2,
  size_sqm: 30, beds: '', bathrooms: 1, features: [], published: true
}

export function AdminRoomsClient({ rooms: initial }: { rooms: Room[] }) {
  const [rooms, setRooms] = useState(initial)
  const [editing, setEditing] = useState<Partial<Room> & { id?: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState('')

  const handleSave = () => {
    if (!editing) return
    startTransition(async () => {
      const res = await upsertRoom(editing)
      if (res.ok) {
        setFeedback('Room saved successfully.')
        setEditing(null)
        // Refresh by optimistic update (slug-based)
        if (editing.id) {
          setRooms((prev) => prev.map((r) => r.id === editing.id ? { ...r, ...editing } as Room : r))
        }
        setTimeout(() => setFeedback(''), 3000)
      } else {
        setFeedback(res.error ?? 'Failed to save.')
      }
    })
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50">
        <div className="flex items-start justify-between mb-8">
          <SectionHeading eyebrow="Admin" title="Rooms" body={undefined} />
          <button
            onClick={() => setEditing(BLANK_ROOM)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>

        {feedback && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">{feedback}</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl border border-primary/5 overflow-hidden shadow-sm group">
              <div className="relative h-48 w-full">
                <Image src={room.cover_image} alt={room.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
                <div className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${room.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  {room.published ? 'Published' : 'Hidden'}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-display text-xl text-primary font-medium">{room.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{room.short_description}</p>
                <div className="grid grid-cols-3 gap-2 pt-2 text-xs text-center">
                  <div className="bg-primary/5 rounded-lg p-2">
                    <p className="text-muted">Night</p>
                    <p className="font-semibold text-primary">{formatCurrency(room.price_per_night)}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-2">
                    <p className="text-muted">Week</p>
                    <p className="font-semibold text-primary">{room.weekly_rate ? formatCurrency(room.weekly_rate) : '—'}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-2">
                    <p className="text-muted">Month</p>
                    <p className="font-semibold text-primary">{room.monthly_rate ? formatCurrency(room.monthly_rate) : '—'}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-primary/5">
                  <span className="text-xs text-muted">{room.max_guests} guests · {room.size_sqm}m²</span>
                  <button
                    onClick={() => setEditing({ ...room })}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors py-1 px-2 rounded-lg hover:bg-primary/5"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Panel */}
      {editing && (
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">{editing.id ? 'Edit Room' : 'Add New Room'}</h3>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            {[
              ['name', 'Room Name', 'text'],
              ['slug', 'URL Slug', 'text'],
              ['short_description', 'Short Description', 'text'],
              ['beds', 'Bed Configuration', 'text'],
            ].map(([field, label, type]) => (
              <label key={field} className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted/70">{label}</span>
                <input
                  type={type}
                  value={(editing as any)[field] ?? ''}
                  onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                  className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
                />
              </label>
            ))}

            {[
              ['price_per_night', 'Nightly Rate (KES)', 'number'],
              ['weekly_rate', 'Weekly Rate (KES)', 'number'],
              ['monthly_rate', 'Monthly Rate (KES)', 'number'],
              ['max_guests', 'Max Guests', 'number'],
              ['size_sqm', 'Size (sqm)', 'number'],
              ['bathrooms', 'Bathrooms', 'number'],
            ].map(([field, label, type]) => (
              <label key={field} className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted/70">{label}</span>
                <input
                  type={type}
                  value={(editing as any)[field] ?? ''}
                  onChange={(e) => setEditing({ ...editing, [field]: e.target.value === '' ? null : Number(e.target.value) })}
                  className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
                />
              </label>
            ))}

            <div className="md:col-span-2 space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Description</span>
              <textarea
                value={editing.description ?? ''}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.published ?? true}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-primary">Published (visible to guests)</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isPending ? 'Saving…' : 'Save Room'}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 border border-primary/10 rounded-xl text-sm hover:bg-primary/5 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
