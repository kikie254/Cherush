import { getBookings } from '@/lib/queries'
import { buildCsv } from '@/lib/utils'

export async function GET() {
  const bookings = await getBookings()
  const csv = buildCsv(
    bookings.map((booking) => ({
      code: booking.booking_code,
      guest_name: booking.guest_name,
      guest_email: booking.guest_email,
      check_in: booking.check_in,
      check_out: booking.check_out,
      total_amount: booking.total_amount,
      status: booking.status
    }))
  )

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bookings.csv"'
    }
  })
}
