import { getBookings, getRooms } from '@/lib/queries'
import { AdminBookingsClient } from '@/components/admin/bookings-table'

export default async function BookingsAdminPage() {
  const [bookings, rooms] = await Promise.all([getBookings(), getRooms()])
  return <AdminBookingsClient bookings={bookings} rooms={rooms} />
}
