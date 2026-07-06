import { NextResponse, type NextRequest } from 'next/server'
import { bookingSchema } from '@/lib/validation'
import { getRooms, getPricing } from '@/lib/queries'
import { quoteBooking, overlaps, blockedDatesFromBookings } from '@/lib/availability'
import { guardRateLimit } from '@/lib/rate-limit'
import { sendBookingEmails } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import type { Booking } from '@/types'

function generateBookingCode(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-4)
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `CHR-${ts}${rand}`
}

export async function POST(request: NextRequest) {
  // 1. Rate limit per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const rate = await guardRateLimit(`booking:${ip}`)
  if (!rate.success) {
    return NextResponse.json(
      { error: 'Too many booking attempts. Please try again later.' },
      { status: 429 }
    )
  }

  // 2. Parse body safely
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // 3. Validate + sanitise with Zod
  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Please review the booking form fields.'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  const { roomId, checkIn, checkOut, guestsCount, guestName, guestEmail, guestPhone, specialRequests } = parsed.data

  // 4. Fetch room + pricing (fallback to seed data if Supabase unavailable)
  const [rooms, pricing] = await Promise.all([getRooms(), getPricing()])
  const room = rooms.find((r) => r.id === roomId)
  if (!room) {
    return NextResponse.json({ error: 'Room not found.' }, { status: 404 })
  }
  if (guestsCount > room.max_guests) {
    return NextResponse.json(
      { error: `This room accommodates a maximum of ${room.max_guests} guests.` },
      { status: 400 }
    )
  }

  // 5. Double-booking check
  try {
    const supabase = await createClient()
    const { data: existing } = await supabase
      .from('bookings')
      .select('check_in, check_out, status')
      .eq('room_id', roomId)
      .in('status', ['pending', 'approved'])

    if (existing) {
      const isConflict = existing.some((b) =>
        overlaps(checkIn, checkOut, b.check_in as string, b.check_out as string)
      )
      if (isConflict) {
        return NextResponse.json(
          { error: 'These dates are not available. Please select different dates.' },
          { status: 409 }
        )
      }
    }
  } catch (err) {
    console.error('[bookings/route] Double-booking check failed:', err)
    // Non-fatal: proceed optimistically; DB constraint will catch it
  }

  // 6. Calculate pricing
  const quote = quoteBooking(room, checkIn, checkOut, pricing)

  // 7. Build booking record
  const bookingCode = generateBookingCode()
  const booking: Booking = {
    id:               crypto.randomUUID(),
    booking_code:     bookingCode,
    room_id:          room.id,
    guest_name:       guestName,
    guest_email:      guestEmail,
    guest_phone:      guestPhone ?? null,
    guests_count:     guestsCount,
    check_in:         checkIn,
    check_out:        checkOut,
    total_amount:     quote.total,
    status:           'pending',
    special_requests: specialRequests || null,
    created_at:       new Date().toISOString(),
    rooms:            { name: room.name },
  }

  // 8. Persist to Supabase
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('bookings').insert({
      id:               booking.id,
      booking_code:     booking.booking_code,
      room_id:          booking.room_id,
      guest_name:       booking.guest_name,
      guest_email:      booking.guest_email,
      guest_phone:      booking.guest_phone,
      guests_count:     booking.guests_count,
      check_in:         booking.check_in,
      check_out:        booking.check_out,
      total_amount:     booking.total_amount,
      status:           booking.status,
      special_requests: booking.special_requests,
    })
    if (error) {
      console.error('[bookings/route] Supabase insert error:', error.message)
      // If it's a double-booking constraint violation, return user-friendly message
      if (error.code === '23P01' || error.message.includes('no_double_booking')) {
        return NextResponse.json(
          { error: 'These dates are no longer available. Please select different dates.' },
          { status: 409 }
        )
      }
    }
  } catch (err) {
    console.error('[bookings/route] Failed to persist booking:', err)
    return NextResponse.json(
      { error: 'Failed to save booking. Please try again.' },
      { status: 500 }
    )
  }

  // 9. Send confirmation emails (non-fatal)
  try {
    await sendBookingEmails(booking, room)
  } catch (err) {
    console.error('[bookings/route] Failed to send confirmation email:', err)
  }

  return NextResponse.json({
    bookingCode: booking.booking_code,
    nights:      quote.nights,
    total:       quote.total,
    message:     'Booking request received. We will confirm availability shortly.',
  })
}
