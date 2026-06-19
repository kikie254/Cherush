'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

type Availability = {
  blockedDates: string[]
  quote?: { total: number; nights: number; nightlyRate: number }
  available: boolean
  reason?: string
}

export function BookingWidget({ rooms, initialRoomSlug }: { rooms: Room[]; initialRoomSlug?: string }) {
  const defaultRoom = rooms.find((room) => room.slug === initialRoomSlug) ?? rooms[0]
  const [roomId, setRoomId] = useState(defaultRoom?.id ?? '')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guestsCount, setGuestsCount] = useState(1)
  const [message, setMessage] = useState('')
  const room = useMemo(() => rooms.find((item) => item.id === roomId), [roomId, rooms])

  const { data } = useQuery<Availability>({
    queryKey: ['availability', roomId, checkIn, checkOut, guestsCount],
    queryFn: async () => {
      const params = new URLSearchParams({ roomId, guestsCount: String(guestsCount) })
      if (checkIn) params.set('checkIn', checkIn)
      if (checkOut) params.set('checkOut', checkOut)
      const response = await fetch(`/api/availability?${params.toString()}`)
      return response.json() as Promise<Availability>
    }
  })

  async function handleSubmit(formData: FormData) {
    setMessage('')
    const payload = {
      roomId,
      checkIn,
      checkOut,
      guestsCount,
      guestName: String(formData.get('guestName') || ''),
      guestEmail: String(formData.get('guestEmail') || ''),
      guestPhone: String(formData.get('guestPhone') || ''),
      specialRequests: String(formData.get('specialRequests') || '')
    }
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = (await response.json()) as { bookingCode?: string; message?: string; error?: string }
    setMessage(result.message || result.error || (result.bookingCode ? `Booking request received: ${result.bookingCode}` : 'Completed'))
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <form action={handleSubmit} className="space-y-5 rounded-[32px] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-[var(--color-muted)]">
            Room
            <select value={roomId} onChange={(event) => setRoomId(event.target.value)} className="w-full rounded-2xl border border-black/10 px-4 py-3">
              {rooms.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-[var(--color-muted)]">
            Guests
            <input type="number" min={1} max={8} value={guestsCount} onChange={(event) => setGuestsCount(Number(event.target.value))} className="w-full rounded-2xl border border-black/10 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm text-[var(--color-muted)]">
            Check in
            <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full rounded-2xl border border-black/10 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm text-[var(--color-muted)]">
            Check out
            <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="w-full rounded-2xl border border-black/10 px-4 py-3" />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="guestName" required placeholder="Guest name" className="rounded-2xl border border-black/10 px-4 py-3" />
          <input name="guestEmail" required type="email" placeholder="Guest email" className="rounded-2xl border border-black/10 px-4 py-3" />
          <input name="guestPhone" required placeholder="Phone" className="rounded-2xl border border-black/10 px-4 py-3 md:col-span-2" />
        </div>
        <textarea name="specialRequests" rows={5} placeholder="Special requests" className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <div className="flex items-center gap-4">
          <Button type="submit" variant="accent">Request booking</Button>
          {message ? <p className="text-sm text-[var(--color-muted)]">{message}</p> : null}
        </div>
      </form>
      <aside className="rounded-[32px] bg-[var(--color-primary)] p-6 text-white shadow-[var(--shadow-soft)] md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Quote</p>
        <h3 className="mt-4 font-display text-4xl">{room?.name ?? 'Room selected'}</h3>
        <p className="mt-4 text-sm leading-7 text-white/75">Pricing updates automatically when you choose dates. Requests are reviewed before approval.</p>
        <div className="mt-8 space-y-3 text-sm text-white/80">
          <p>Nightly from: {room ? formatCurrency(room.price_per_night) : '-'}</p>
          {data?.quote ? <p>Nights: {data.quote.nights}</p> : null}
          {data?.quote ? <p>Total estimate: {formatCurrency(data.quote.total)}</p> : null}
          <p>Status: {data?.available === false ? data.reason || 'Unavailable' : 'Likely available'}</p>
        </div>
      </aside>
    </div>
  )
}
