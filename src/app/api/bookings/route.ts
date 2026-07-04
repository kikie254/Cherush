import { NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validation'
import { getRooms, getPricing } from '@/lib/queries'
import { quoteBooking } from '@/lib/availability'
import { guardRateLimit } from '@/lib/rate-limit'
import { sendBookingEmails } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import type { Booking } from '@/types'

export async function POST(request: Request) {
  const rate = await guardRateLimit('booking')
  if (!rate.success) {
    return NextResponse.json({ error: 'Too many booking attempts. Please try again later.' }, { status: 429 })
  }

  const body = await request.json()
  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please review the booking form fields.' }, { status: 400 })
  }

  const [rooms, pricing] = await Promise.all([getRooms(), getPricing()])
  const room = rooms.find((item) => item.id === parsed.data.roomId)
  if (!room) return NextResponse.json({ error: 'Room not found.' }, { status: 404 })

  const quote = quoteBooking(room, parsed.data.checkIn, parsed.data.checkOut, pricing)
  const booking: Booking = {
    id: crypto.randomUUID(),
    booking_code: `CHR-${Math.floor(1000 + Math.random() * 9000)}`,
    room_id: room.id,
    guest_name: parsed.data.guestName,
    guest_email: parsed.data.guestEmail,
    guest_phone: parsed.data.guestPhone,
    guests_count: parsed.data.guestsCount,
    check_in: parsed.data.checkIn,
    check_out: parsed.data.checkOut,
    total_amount: quote.total,
    status: 'pending',
    special_requests: parsed.data.specialRequests || null,
    created_at: new Date().toISOString(),
    rooms: { name: room.name },
  }

  // Persist to Supabase
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('bookings').insert({
      ...booking,
      rooms: undefined, // joined column — not a physical column
    })
    if (error) console.error('[bookings/route] Supabase insert error:', error.message)
  } catch (err) {
    console.error('[bookings/route] Failed to persist booking:', err)
  }

  await sendBookingEmails(booking, room)
  return NextResponse.json({
    bookingCode: booking.booking_code,
    message: 'Booking request received. We will confirm availability shortly.',
  })
}
