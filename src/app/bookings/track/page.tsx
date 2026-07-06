'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

type BookingData = {
  booking_code: string
  status: string
  check_in: string
  check_out: string
  guest_name: string
  total_amount: number
  rooms?: { name: string }
  created_at: string
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
  }
  return map[status] ?? 'bg-gray-100 text-gray-700 border-gray-200'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    pending: '⏳ Pending Review',
    approved: '✓ Confirmed',
    cancelled: '✗ Cancelled',
    rejected: '✗ Unavailable',
    completed: '✓ Completed',
  }
  return map[status] ?? status
}

function BookingTracker() {
  const searchParams = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code') ?? '')
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function lookup(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    setError('')
    setBooking(null)

    try {
      const res = await fetch('/api/bookings/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase(), action: 'status' }),
      })
      const data = await res.json() as { booking?: BookingData; error?: string }
      if (!res.ok || data.error) {
        setError(data.error ?? 'Booking not found. Check your reference code.')
      } else {
        setBooking(data.booking ?? null)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Search form */}
      <form onSubmit={lookup} className="bg-white rounded-[32px] p-8 shadow-[var(--shadow-soft)] space-y-4">
        <div>
          <label htmlFor="booking-code" className="text-sm font-medium text-primary mb-2 block">
            Booking Reference Code
          </label>
          <div className="flex gap-3">
            <input
              id="booking-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. CHR-ABC123"
              required
              className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm font-mono uppercase tracking-wider focus:outline-none focus:border-accent transition-colors"
              aria-label="Enter your booking reference code"
              autoComplete="off"
              spellCheck={false}
            />
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? 'Searching…' : 'Track'}
            </Button>
          </div>
        </div>

        {error && (
          <div role="alert" className="rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        )}
      </form>

      {/* Result */}
      {booking && (
        <div className="bg-white rounded-[32px] p-8 shadow-[var(--shadow-soft)] space-y-6" role="region" aria-label="Booking details">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-1">Booking Reference</p>
              <p className="font-mono text-2xl font-bold text-primary">{booking.booking_code}</p>
            </div>
            <span className={`inline-block text-sm font-medium px-4 py-2 rounded-full border ${statusColor(booking.status)}`}>
              {statusLabel(booking.status)}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ['Room', booking.rooms?.name ?? '—'],
              ['Guest', booking.guest_name],
              ['Check-in', booking.check_in],
              ['Check-out', booking.check_out],
              ['Total', `KES ${booking.total_amount.toLocaleString()}`],
              ['Booked on', new Date(booking.created_at).toLocaleDateString('en-KE')],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted text-xs uppercase tracking-wider">{label}</dt>
                <dd className="text-primary font-medium mt-0.5">{value}</dd>
              </div>
            ))}
          </dl>

          {booking.status === 'pending' && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-700">
              <strong>Your booking is under review.</strong> We typically confirm within a few hours. You will receive an email when your booking is approved.
            </div>
          )}

          {booking.status === 'approved' && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm text-emerald-700">
              <strong>Your booking is confirmed!</strong> Check-in from 2:00 PM · Check-out by 11:00 AM. We look forward to welcoming you.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function BookingStatusPage() {
  return (
    <section className="py-20" aria-labelledby="track-heading">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Your stay"
          title="Track your booking"
          body="Enter your booking reference code to see the current status of your reservation."
          id="track-heading"
          className="mb-10"
        />
        <Suspense fallback={<div className="rounded-[32px] bg-white p-8 animate-pulse h-48" />}>
          <BookingTracker />
        </Suspense>
      </Container>
    </section>
  )
}
