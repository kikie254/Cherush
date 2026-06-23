'use client'

import { useState, useTransition, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Trash2, Download, ChevronDown, Search, Eye } from 'lucide-react'
import type { Booking, Room, BookingStatus } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { updateBookingStatus, deleteBooking } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'

function statusColor(status: BookingStatus) {
  return {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-rose-100 text-rose-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  }[status] ?? 'bg-gray-100 text-gray-600'
}

function exportCSV(bookings: Booking[]) {
  const headers = ['Code', 'Guest', 'Email', 'Phone', 'Room', 'Check-in', 'Check-out', 'Guests', 'Total', 'Status', 'Created']
  const rows = bookings.map((b) => [
    b.booking_code, b.guest_name, b.guest_email, b.guest_phone ?? '',
    b.rooms?.name ?? '', b.check_in, b.check_out, b.guests_count,
    b.total_amount, b.status, b.created_at
  ])
  const csv = [headers, ...rows].map((r) => r.map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminBookingsClient({ bookings: initial, rooms }: { bookings: Booking[]; rooms: Room[] }) {
  const [bookings, setBookings] = useState(initial)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<Record<string, string>>({})

  const filtered = bookings.filter((b) => {
    const matchSearch = search === '' ||
      b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      b.booking_code.toLowerCase().includes(search.toLowerCase()) ||
      (b.guest_email ?? '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleStatus = useCallback((id: string, status: BookingStatus) => {
    startTransition(async () => {
      const res = await updateBookingStatus(id, status)
      if (res.ok) {
        setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
        if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null)
        setFeedback((prev) => ({ ...prev, [id]: '✓ Updated' }))
        setTimeout(() => setFeedback((prev) => { const n = { ...prev }; delete n[id]; return n }), 2000)
      }
    })
  }, [selected])

  const handleDelete = useCallback((id: string) => {
    if (!confirm('Delete this booking permanently?')) return
    startTransition(async () => {
      const res = await deleteBooking(id)
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id))
        if (selected?.id === id) setSelected(null)
      }
    })
  }, [selected])

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    revenue: bookings.filter((b) => ['approved', 'completed'].includes(b.status)).reduce((s, b) => s + b.total_amount, 0)
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total },
          { label: 'Pending Review', value: stats.pending, highlight: true },
          { label: 'Confirmed', value: stats.approved },
          { label: 'Revenue', value: formatCurrency(stats.revenue) }
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-6 ${s.highlight && stats.pending > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-white/40 backdrop-blur-sm border border-white/50'} shadow-sm`}>
            <p className="text-xs uppercase tracking-widest text-muted/70">{s.label}</p>
            <p className={`font-display text-3xl mt-2 ${s.highlight && stats.pending > 0 ? 'text-amber-700' : 'text-primary'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SectionHeading eyebrow="Admin" title="Bookings" body={null} />
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guest or code…"
                className="pl-9 pr-4 py-2 text-sm border border-primary/10 rounded-xl bg-white focus:outline-none focus:border-accent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-sm border border-primary/10 rounded-xl bg-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => exportCSV(bookings)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-primary/10 text-left">
                {['Code', 'Guest', 'Room', 'Check-in → Check-out', 'Total', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="py-3 px-3 text-xs uppercase tracking-widest text-muted/70 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-muted">No bookings found.</td></tr>
              ) : filtered.map((booking) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-primary/5 hover:bg-primary/5 transition-colors group"
                >
                  <td className="py-3 px-3 font-mono text-xs text-primary font-semibold">{booking.booking_code}</td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-primary">{booking.guest_name}</p>
                    <p className="text-muted text-xs">{booking.guest_email}</p>
                  </td>
                  <td className="py-3 px-3 text-muted">{booking.rooms?.name ?? '—'}</td>
                  <td className="py-3 px-3 text-muted text-xs">
                    {booking.check_in} → {booking.check_out}
                  </td>
                  <td className="py-3 px-3 font-semibold text-primary">{formatCurrency(booking.total_amount)}</td>
                  <td className="py-3 px-3">
                    {feedback[booking.id] ? (
                      <span className="text-emerald-600 text-xs font-medium">{feedback[booking.id]}</span>
                    ) : (
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${statusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelected(booking)} title="View" className="p-1.5 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatus(booking.id, 'approved')} title="Approve" className="p-1.5 rounded-lg hover:bg-emerald-50 text-muted hover:text-emerald-600 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleStatus(booking.id, 'rejected')} title="Reject" className="p-1.5 rounded-lg hover:bg-rose-50 text-muted hover:text-rose-600 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(booking.id)} title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-premium max-w-lg w-full space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest mb-1">Booking Detail</p>
                  <h3 className="font-display text-3xl text-primary">{selected.booking_code}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-primary/5 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-muted" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                {[
                  ['Guest', selected.guest_name],
                  ['Email', selected.guest_email],
                  ['Phone', selected.guest_phone ?? '—'],
                  ['Room', selected.rooms?.name ?? '—'],
                  ['Check-in', selected.check_in],
                  ['Check-out', selected.check_out],
                  ['Guests', String(selected.guests_count)],
                  ['Total', formatCurrency(selected.total_amount)],
                  ['Status', selected.status],
                  ['Requests', selected.special_requests ?? 'None'],
                  ['Created', new Date(selected.created_at).toLocaleString()],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start border-b border-primary/5 pb-3">
                    <span className="text-muted text-xs uppercase tracking-wider">{k}</span>
                    <span className={`text-primary font-medium text-right max-w-[60%] ${k === 'Status' ? statusColor(selected.status as BookingStatus) + ' px-2.5 py-0.5 rounded-full text-xs' : ''}`}>{v}</span>
                  </div>
                ))}
              </div>

              {selected.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleStatus(selected.id, 'approved')}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(selected.id, 'rejected')}
                    className="flex-1 bg-rose-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-rose-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
