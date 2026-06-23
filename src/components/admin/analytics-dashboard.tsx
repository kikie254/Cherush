'use client'

import { useMemo } from 'react'
import type { Booking, Room } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/section-heading'
import { TrendingUp, Users, Calendar, DollarSign, BarChart2, ArrowRight } from 'lucide-react'

function MonthlyRevenueChart({ bookings }: { bookings: Booking[] }) {
  const months = useMemo(() => {
    const map = new Map<string, number>()
    for (const b of bookings) {
      if (!['approved', 'completed'].includes(b.status)) continue
      const month = b.created_at.slice(0, 7)
      map.set(month, (map.get(month) ?? 0) + b.total_amount)
    }
    const sorted = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-6)
    return sorted
  }, [bookings])

  const max = Math.max(...months.map(([, v]) => v), 1)

  return (
    <div className="space-y-3">
      {months.length === 0 ? (
        <p className="text-muted text-sm text-center py-8">No revenue data yet.</p>
      ) : months.map(([month, amount]) => (
        <div key={month} className="flex items-center gap-3">
          <span className="text-xs text-muted w-16 shrink-0">{month.slice(5)} {month.slice(2, 4)}</span>
          <div className="flex-1 h-8 bg-primary/5 rounded-lg overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-premium rounded-lg transition-all duration-700"
              style={{ width: `${(amount / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-primary w-24 text-right">{formatCurrency(amount)}</span>
        </div>
      ))}
    </div>
  )
}

export function AdminAnalyticsClient({ bookings, rooms }: { bookings: Booking[]; rooms: Room[] }) {
  const stats = useMemo(() => {
    const approved = bookings.filter((b) => ['approved', 'completed'].includes(b.status))
    const revenue = approved.reduce((s, b) => s + b.total_amount, 0)
    const avgStay = approved.length > 0
      ? approved.reduce((s, b) => {
          const ci = new Date(b.check_in).getTime()
          const co = new Date(b.check_out).getTime()
          return s + Math.max(1, Math.round((co - ci) / 86400000))
        }, 0) / approved.length
      : 0
    const conversionRate = bookings.length > 0
      ? Math.round((approved.length / bookings.length) * 100)
      : 0

    const roomRevenue = new Map<string, number>()
    for (const b of approved) {
      const name = b.rooms?.name ?? b.room_id
      roomRevenue.set(name!, (roomRevenue.get(name!) ?? 0) + b.total_amount)
    }

    return { revenue, avgStay, conversionRate, roomRevenue }
  }, [bookings])

  // Funnel stages
  const funnel = [
    { stage: 'Booking Requests', value: bookings.length, color: 'bg-primary' },
    { stage: 'Pending Review', value: bookings.filter((b) => b.status === 'pending').length, color: 'bg-amber-400' },
    { stage: 'Approved Stays', value: bookings.filter((b) => b.status === 'approved').length, color: 'bg-emerald-500' },
    { stage: 'Completed', value: bookings.filter((b) => b.status === 'completed').length, color: 'bg-blue-500' },
  ]
  const maxFunnel = Math.max(...funnel.map((f) => f.value), 1)

  return (
    <div className="space-y-8 pb-20">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(stats.revenue), icon: DollarSign },
          { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp },
          { label: 'Avg. Stay Length', value: `${stats.avgStay.toFixed(1)} nights`, icon: Calendar },
          { label: 'Total Guests', value: new Set(bookings.map((b) => b.guest_email)).size, icon: Users },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-muted/70">{kpi.label}</p>
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <p className="font-display text-3xl text-primary">{kpi.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-accent" />
            <h3 className="font-display text-2xl text-primary tracking-tight">Monthly Revenue</h3>
          </div>
          <MonthlyRevenueChart bookings={bookings} />
        </div>

        {/* Booking Funnel */}
        <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-accent" />
            <h3 className="font-display text-2xl text-primary tracking-tight">Conversion Funnel</h3>
          </div>
          <div className="space-y-4">
            {funnel.map((f, i) => (
              <div key={f.stage}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">{f.stage}</span>
                  <span className="font-semibold text-primary">{f.value}</span>
                </div>
                <div className="h-10 bg-primary/5 rounded-xl overflow-hidden">
                  <div
                    className={`h-full ${f.color} rounded-xl transition-all duration-700 flex items-center justify-end pr-3`}
                    style={{ width: `${Math.max(5, (f.value / maxFunnel) * 100)}%` }}
                  >
                    {f.value > 0 && (
                      <span className="text-white text-xs font-semibold">
                        {bookings.length > 0 ? `${Math.round((f.value / bookings.length) * 100)}%` : '—'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Room */}
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <h3 className="font-display text-2xl text-primary tracking-tight">Revenue by Room</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[...stats.roomRevenue.entries()].map(([name, revenue]) => (
            <div key={name} className="bg-white rounded-2xl p-6 border border-primary/5 shadow-sm">
              <p className="text-muted text-sm mb-2">{name}</p>
              <p className="font-display text-2xl text-primary">{formatCurrency(revenue)}</p>
            </div>
          ))}
          {stats.roomRevenue.size === 0 && (
            <p className="col-span-3 text-center text-muted py-8">No revenue by room data yet.</p>
          )}
        </div>
      </div>

      {/* GA4 Script Note */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-700">
          ✓ Google Analytics 4 is configured ({process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}). Track funnel events via GA4 Explore reports.
        </div>
      )}
    </div>
  )
}
