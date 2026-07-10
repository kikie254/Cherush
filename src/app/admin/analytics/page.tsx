import { getBookings, getRooms } from '@/lib/queries'
import { AdminAnalyticsClient } from '@/components/admin/analytics-dashboard'

export const dynamic = 'force-dynamic'

export default async function AnalyticsAdminPage() {
  const [bookings, rooms] = await Promise.all([getBookings(), getRooms()])
  return <AdminAnalyticsClient bookings={bookings} rooms={rooms} />
}
