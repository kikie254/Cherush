import { cache } from 'react'
import type { Booking, ContentBlock, GalleryItem, PricingRule, Review, Room, SiteSetting } from '@/types'
import { attractions, faqs, seedContent, seedGallery, seedPricing, seedReviews, seedRooms, seedSettings } from '@/lib/site-data'

const mockBookings: Booking[] = [
  {
    id: 'b1',
    booking_code: 'CHR-1001',
    room_id: seedRooms[0].id,
    guest_name: 'Sample Guest',
    guest_email: 'guest@example.com',
    guest_phone: '+254700000000',
    guests_count: 2,
    check_in: '2026-07-10',
    check_out: '2026-07-14',
    total_amount: 38000,
    status: 'approved',
    special_requests: 'Late arrival',
    created_at: '2026-06-01T10:00:00.000Z',
    rooms: { name: seedRooms[0].name }
  }
]

export const getRooms = cache(async (): Promise<Room[]> => seedRooms)
export const getReviews = cache(async (): Promise<Review[]> => seedReviews)
export const getGallery = cache(async (): Promise<GalleryItem[]> => seedGallery)
export const getContent = cache(async (): Promise<ContentBlock[]> => seedContent)
export const getPricing = cache(async (): Promise<PricingRule[]> => seedPricing)
export const getSettings = cache(async (): Promise<SiteSetting[]> => seedSettings)
export const getBookings = cache(async (): Promise<Booking[]> => mockBookings)

export const getAdminData = cache(async () => {
  const rooms = await getRooms()
  const bookings = await getBookings()
  const gallery = await getGallery()
  const content = await getContent()
  const pricing = await getPricing()
  const settings = await getSettings()
  const revenue = bookings
    .filter((booking) => ['approved', 'completed'].includes(booking.status))
    .reduce((sum, booking) => sum + booking.total_amount, 0)
  const upcoming = bookings.filter((booking) => booking.status === 'approved').length
  const pending = bookings.filter((booking) => booking.status === 'pending').length
  const occupancyRate = rooms.length ? Math.round((upcoming / rooms.length) * 100) : 0

  return {
    rooms,
    bookings,
    gallery,
    content,
    pricing,
    settings,
    stats: {
      revenue,
      upcoming,
      pending,
      occupancyRate
    }
  }
})

export { faqs, attractions }
