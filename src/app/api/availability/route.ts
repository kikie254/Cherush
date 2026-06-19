import { NextResponse } from 'next/server'
import { canCheckIn, quoteBooking } from '@/lib/availability'
import { getBookings, getPricing, getRooms } from '@/lib/queries'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get('roomId')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guestsCount = Number(searchParams.get('guestsCount') || 1)

  const [rooms, pricing, bookings] = await Promise.all([getRooms(), getPricing(), getBookings()])
  const room = rooms.find((item) => item.id === roomId)
  if (!room) return NextResponse.json({ available: false, blockedDates: [], reason: 'Room not found' }, { status: 404 })
  if (guestsCount > room.max_guests) {
    return NextResponse.json({ available: false, blockedDates: [], reason: 'Guest count exceeds room capacity' })
  }
  if (checkIn && !canCheckIn(checkIn)) {
    return NextResponse.json({ available: false, blockedDates: [], reason: 'Check-in must be today or later' })
  }

  const roomBookings = bookings.filter((booking) => booking.room_id === room.id)
  const quote = checkIn && checkOut ? quoteBooking(room, checkIn, checkOut, pricing) : undefined

  return NextResponse.json({
    available: true,
    blockedDates: roomBookings.map((booking) => booking.check_in),
    quote
  })
}
