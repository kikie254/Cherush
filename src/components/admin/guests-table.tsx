'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Mail, Phone, Calendar } from 'lucide-react'
import type { Booking } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/section-heading'

type Guest = {
  name: string
  email: string
  phone: string | null
  bookings: Booking[]
  totalSpent: number
  lastStay: string
}

function deriveGuests(bookings: Booking[]): Guest[] {
  const map = new Map<string, Guest>()
  for (const b of bookings) {
    const key = b.guest_email.toLowerCase()
    if (!map.has(key)) {
      map.set(key, { name: b.guest_name, email: b.guest_email, phone: b.guest_phone, bookings: [], totalSpent: 0, lastStay: b.check_in })
    }
    const g = map.get(key)!
    g.bookings.push(b)
    if (['approved', 'completed'].includes(b.status)) g.totalSpent += b.total_amount
    if (b.check_in > g.lastStay) g.lastStay = b.check_in
  }
  return [...map.values()].sort((a, b) => b.totalSpent - a.totalSpent)
}

function exportGuestsCSV(guests: Guest[]) {
  const headers = ['Name', 'Email', 'Phone', 'Total Stays', 'Total Spent', 'Last Stay']
  const rows = guests.map((g) => [g.name, g.email, g.phone ?? '', g.bookings.length, g.totalSpent, g.lastStay])
  const csv = [headers, ...rows].map((r) => r.map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `guests-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminGuestsClient({ bookings }: { bookings: Booking[] }) {
  const guests = useMemo(() => deriveGuests(bookings), [bookings])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Guest | null>(null)

  const filtered = guests.filter((g) =>
    search === '' ||
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Guests', value: guests.length },
          { label: 'Repeat Guests', value: guests.filter((g) => g.bookings.length > 1).length },
          { label: 'Total Revenue', value: formatCurrency(guests.reduce((s, g) => s + g.totalSpent, 0)) },
        ].map((s) => (
          <div key={s.label} className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-muted/70">{s.label}</p>
            <p className="font-display text-3xl mt-2 text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SectionHeading eyebrow="Admin" title="Guests" body={undefined} />
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guest…"
                className="pl-9 pr-4 py-2 text-sm border border-primary/10 rounded-xl bg-white focus:outline-none focus:border-accent"
              />
            </div>
            <button
              onClick={() => exportGuestsCSV(guests)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <p className="col-span-3 text-center text-muted py-12">No guests found.</p>
          ) : filtered.map((guest) => (
            <button
              key={guest.email}
              onClick={() => setSelected(selected?.email === guest.email ? null : guest)}
              className={`text-left p-6 rounded-2xl border transition-all duration-200 ${selected?.email === guest.email ? 'border-accent bg-accent/5' : 'border-primary/10 bg-white hover:border-primary/20 hover:shadow-sm'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-display text-lg">
                  {guest.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs bg-primary/5 text-primary px-2.5 py-1 rounded-full">
                  {guest.bookings.length} {guest.bookings.length === 1 ? 'stay' : 'stays'}
                </span>
              </div>
              <p className="font-display text-lg text-primary font-medium tracking-tight">{guest.name}</p>
              <p className="text-muted text-xs mt-1 truncate">{guest.email}</p>
              <div className="mt-4 pt-4 border-t border-primary/5 flex justify-between text-xs text-muted">
                <span>Spent: <strong className="text-primary">{formatCurrency(guest.totalSpent)}</strong></span>
                <span>Last: {guest.lastStay}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Guest Profile</p>
              <h3 className="font-display text-3xl text-primary">{selected.name}</h3>
            </div>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`} className="p-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="p-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          <div className="space-y-3">
            {selected.bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-primary/5 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="font-mono text-xs text-muted">{b.booking_code}</span>
                  <span className="text-primary">{b.check_in} → {b.check_out}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-primary">{formatCurrency(b.total_amount)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
