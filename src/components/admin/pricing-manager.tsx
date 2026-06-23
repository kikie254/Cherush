'use client'

import { useState, useTransition } from 'react'
import { Plus, Save, X, Edit2, Trash2, Check } from 'lucide-react'
import type { PricingRule, Room } from '@/types'
import { upsertPricingRule } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'

const BLANK: Partial<PricingRule> = {
  name: '', room_id: null, start_date: '', end_date: '', multiplier: 1.2, min_nights: null
}

export function AdminPricingClient({ pricingRules: initial, rooms }: { pricingRules: PricingRule[], rooms: Room[] }) {
  const [rules, setRules] = useState(initial)
  const [editing, setEditing] = useState<Partial<PricingRule> & { id?: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!editing) return
    startTransition(async () => {
      const res = await upsertPricingRule(editing)
      if (res.ok) {
        setSaved(true)
        if (editing.id) {
          setRules((prev) => prev.map((r) => r.id === editing.id ? { ...r, ...editing } as PricingRule : r))
        }
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
      }
    })
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <div className="flex items-start justify-between">
          <SectionHeading eyebrow="Admin" title="Pricing Rules" body="Manage seasonal rates, holiday multipliers, and length-of-stay discounts." />
          <button
            onClick={() => setEditing(BLANK)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((rule) => {
            const roomName = rule.room_id ? rooms.find(r => r.id === rule.room_id)?.name || 'Unknown Room' : 'All Rooms'
            return (
              <div key={rule.id} className="bg-white rounded-2xl border border-primary/5 p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-display text-lg text-primary">{rule.name}</h4>
                  <button onClick={() => setEditing({ ...rule })} className="text-muted hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1 text-sm text-muted">
                  <p>Applies to: <span className="text-primary font-medium">{roomName}</span></p>
                  <p>Dates: {rule.start_date} to {rule.end_date}</p>
                  <p>Multiplier: <span className={`font-semibold ${rule.multiplier > 1 ? 'text-amber-600' : 'text-emerald-600'}`}>{rule.multiplier}x</span></p>
                  {rule.min_nights && <p>Min Nights: {rule.min_nights}</p>}
                </div>
              </div>
            )
          })}
          {rules.length === 0 && (
            <p className="col-span-3 text-center text-muted py-12">No pricing rules configured.</p>
          )}
        </div>
      </div>

      {editing && (
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-primary">{editing.id ? 'Edit Rule' : 'New Pricing Rule'}</h3>
            <button onClick={() => setEditing(null)} className="p-2 hover:bg-primary/5 rounded-xl"><X className="w-5 h-5 text-muted" /></button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Rule Name</span>
              <input
                value={editing.name ?? ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. Peak Season (Marathon)"
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Applies To</span>
              <select
                value={editing.room_id ?? ''}
                onChange={(e) => setEditing({ ...editing, room_id: e.target.value === '' ? null : e.target.value })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent bg-white"
              >
                <option value="">All Rooms</option>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Start Date</span>
              <input
                type="date"
                value={editing.start_date ?? ''}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">End Date</span>
              <input
                type="date"
                value={editing.end_date ?? ''}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Multiplier (e.g. 1.2 = 20% increase)</span>
              <input
                type="number"
                step="0.01"
                value={editing.multiplier ?? 1}
                onChange={(e) => setEditing({ ...editing, multiplier: Number(e.target.value) })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted/70">Minimum Nights (Optional)</span>
              <input
                type="number"
                value={editing.min_nights ?? ''}
                onChange={(e) => setEditing({ ...editing, min_nights: e.target.value === '' ? null : Number(e.target.value) })}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 focus:outline-none focus:border-accent"
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isPending}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
            >
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {isPending ? 'Saving…' : 'Save Rule'}</>}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 border border-primary/10 rounded-xl text-sm hover:bg-primary/5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
