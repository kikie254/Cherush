import type { Booking, PricingRule, Room } from '@/types'
import { calculateNights } from '@/lib/utils'

export function overlaps(a1: string, b1: string, a2: string, b2: string) {
  return a1 < b2 && a2 < b1
}

export function blockedDatesFromBookings(bookings: Pick<Booking, 'check_in' | 'check_out' | 'status'>[]) {
  const out: string[] = []
  for (const booking of bookings) {
    if (!['pending', 'approved', 'completed'].includes(booking.status)) continue
    const date = new Date(booking.check_in)
    const end = new Date(booking.check_out)
    while (date < end) {
      out.push(date.toISOString().slice(0, 10))
      date.setDate(date.getDate() + 1)
    }
  }
  return out
}

export function quoteBooking(room: Room, checkIn: string, checkOut: string, rules: PricingRule[]) {
  const nights = calculateNights(checkIn, checkOut)
  let nightly = room.price_per_night
  const rule = rules.find(
    (item) => checkIn <= item.end_date && checkOut >= item.start_date && (!item.room_id || item.room_id === room.id)
  )
  if (rule) nightly = Math.round(nightly * rule.multiplier)
  if (room.monthly_rate && nights >= 28) {
    const monthlyRatePerNight = room.monthly_rate / 30
    const total = Math.round(nights * monthlyRatePerNight)
    return { nights, total, nightlyRate: Math.round(monthlyRatePerNight) }
  }
  if (room.weekly_rate && nights >= 7) {
    const weeklyRatePerNight = room.weekly_rate / 7
    const total = Math.round(nights * weeklyRatePerNight)
    return { nights, total, nightlyRate: Math.round(weeklyRatePerNight) }
  }
  return { nights, total: nights * nightly, nightlyRate: nightly }
}

export function canCheckIn(checkIn: string) {
  return new Date(checkIn) >= new Date(new Date().toISOString().slice(0, 10))
}
