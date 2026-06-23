'use client'

import { useState, useTransition } from 'react'
import { Save, Check, Plus, X } from 'lucide-react'
import type { ContentBlock } from '@/types'
import { upsertContentBlock } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'

const BLANK: Partial<ContentBlock> = { page: '', slug: '', title: '', body: '' }

export function AdminContentClient({ content: initial }: { content: ContentBlock[] }) {
  const [content, setContent] = useState(initial)
  const [editing, setEditing] = useState<Partial<ContentBlock> & { id?: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!editing) return
    startTransition(async () => {
      const res = await upsertContentBlock(editing)
      if (res.ok) {
        setSaved(true)
        if (editing.id) {
          setContent((prev) => prev.map((c) => c.id === editing.id ? { ...c, ...editing } as ContentBlock : c))
        }
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
      }
    })
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <div className="flex items-start justify-between">
          <SectionHeading eyebrow="Admin" title="Content Blocks" body="Manage rich text content displayed across the site." />
          <button
            onClick={() => setEditing(BLANK)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Block
          </button>
        </div>

        <div className="space-y-4">
          {content.map((block) => (
            <div key={block.id} className="bg-white rounded-2xl border border-primary/5 p-6 space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">{block.page}</span>
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded font-mono">{block.slug}</span>
                  </div>
                  <h4 className="font-display text-lg text-primary">{block.title}</h4>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">{block.body}</p>
                </div>
                <button
                  onClick={() => setEditing({ ...block })}
                  className="ml-4 px-3 py-1.5 text-xs border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
          {content.length === 0 && (
            <p className="text-center text-muted py-8">No content blocks found.</p>
          )}
        </div>
      </div>

      {editing && (
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">{editing.id ? 'Edit Block' : 'New Content Block'}</h3>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-primary/5 rounded-xl"><X className="w-5 h-5 text-muted" /></button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[['page', 'Page (e.g. home, about)'], ['slug', 'Slug (unique key)'], ['title', 'Title']].map(([f, l]) => (
              <label key={f} className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted/70">{l}</span>
                <input
                  value={(editing as any)[f] ?? ''}
                  onChange={(e) => setEditing({ ...editing, [f]: e.target.value })}
                  className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
                />
              </label>
            ))}
          </div>

          <label className="block space-y-2 text-sm">
            <span className="text-xs uppercase tracking-widest text-muted/70">Body</span>
            <textarea
              value={editing.body ?? ''}
              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
              rows={6}
              className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
            />
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isPending}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
            >
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {isPending ? 'Saving…' : 'Save Block'}</>}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 border border-primary/10 rounded-xl text-sm hover:bg-primary/5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
