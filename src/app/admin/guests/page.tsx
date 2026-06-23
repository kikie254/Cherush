import { getBookings } from '@/lib/queries'
import { AdminGuestsClient } from '@/components/admin/guests-table'

export default async function GuestsAdminPage() {
  const bookings = await getBookings()
  return <AdminGuestsClient bookings={bookings} />
}
