import { cache } from 'react'
import { adminDb } from '@/lib/firebase/admin'
import type { Booking, ContentBlock, GalleryItem, PricingRule, Review, Room, SiteSetting } from '@/types'
import { attractions, faqs, seedContent, seedGallery, seedPricing, seedReviews, seedRooms, seedSettings } from '@/lib/site-data'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function firestoreCollection<T>(collection: string): Promise<T[] | null> {
  if (!adminDb) return null
  const snap = await adminDb.collection(collection).get()
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export const getRooms = cache(async (): Promise<Room[]> => {
  const rows = await firestoreCollection<Room>('rooms')
  return rows && rows.length > 0 ? rows : seedRooms
})

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export const getReviews = cache(async (): Promise<Review[]> => {
  const rows = await firestoreCollection<Review>('reviews')
  return rows && rows.length > 0 ? rows : seedReviews
})

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  const rows = await firestoreCollection<GalleryItem>('gallery')
  return rows && rows.length > 0 ? rows : seedGallery
})

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

export const getContent = cache(async (): Promise<ContentBlock[]> => {
  const rows = await firestoreCollection<ContentBlock>('content')
  return rows && rows.length > 0 ? rows : seedContent
})

// ---------------------------------------------------------------------------
// Pricing rules
// ---------------------------------------------------------------------------

export const getPricing = cache(async (): Promise<PricingRule[]> => {
  const rows = await firestoreCollection<PricingRule>('pricing_rules')
  return rows && rows.length > 0 ? rows : seedPricing
})

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export const getSettings = cache(async (): Promise<SiteSetting[]> => {
  const rows = await firestoreCollection<SiteSetting>('site_settings')
  return rows && rows.length > 0 ? rows : seedSettings
})

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

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
    total_amount: 4000,
    status: 'approved',
    special_requests: 'Late arrival',
    created_at: '2026-06-01T10:00:00.000Z',
    rooms: { name: seedRooms[0].name },
  },
]

export const getBookings = cache(async (): Promise<Booking[]> => {
  const rows = await firestoreCollection<Booking>('bookings')
  return rows && rows.length > 0 ? rows : mockBookings
})

// ---------------------------------------------------------------------------
// Admin dashboard aggregate
// ---------------------------------------------------------------------------

export const getAdminData = cache(async () => {
  const [rooms, bookings, gallery, content, pricing, settings] = await Promise.all([
    getRooms(),
    getBookings(),
    getGallery(),
    getContent(),
    getPricing(),
    getSettings(),
  ])

  const revenue = bookings
    .filter((b) => ['approved', 'completed'].includes(b.status))
    .reduce((sum, b) => sum + b.total_amount, 0)
  const upcoming = bookings.filter((b) => b.status === 'approved').length
  const pending = bookings.filter((b) => b.status === 'pending').length
  const occupancyRate = rooms.length ? Math.round((upcoming / rooms.length) * 100) : 0

  return { rooms, bookings, gallery, content, pricing, settings, stats: { revenue, upcoming, pending, occupancyRate } }
})

export { faqs, attractions }
