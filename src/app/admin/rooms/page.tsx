import { getRooms } from '@/lib/queries'
import { AdminRoomsClient } from '@/components/admin/rooms-manager'

export default async function RoomsAdminPage() {
  const rooms = await getRooms()
  return <AdminRoomsClient rooms={rooms} />
}
