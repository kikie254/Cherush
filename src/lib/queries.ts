import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Booking, ContentBlock, GalleryItem, PricingRule, Review, Room, SiteSetting } from '@/types'
import { attractions, faqs, seedContent, seedGallery, seedPricing, seedReviews, seedRooms, seedSettings } from '@/lib/site-data'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type OrderOpts = { column: string; ascending: boolean }

async function supabaseSelect<T>(
  table: string,
  opts?: { order?: OrderOpts; filter?: Record<string, unknown> }
): Promise<T[] | null> {
  try {
    const supabase = await createClient()
    let query = supabase.from(table).select('*')
    if (opts?.filter) {
      for (const [key, value] of Object.entries(opts.filter)) {
        query = query.eq(key, value)
      }
    }
    if (opts?.order) {
      query = query.order(opts.order.column, { ascending: opts.order.ascending })
    }
    const { data, error } = await query
    if (error) {
      console.error(`[queries] Supabase error fetching ${table}:`, error.message)
      return null
    }
    return (data as T[]) ?? null
  } catch (err) {
    console.error(`[queries] Failed to fetch ${table}:`, err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export const getRooms = cache(async (): Promise<Room[]> => {
  const rows = await supabaseSelect<Room>('rooms', {
    filter: { published: true },
    order: { column: 'price_per_night', ascending: true },
  })
  return rows && rows.length > 0 ? rows : seedRooms
})

export const getAllRooms = cache(async (): Promise<Room[]> => {
  const rows = await supabaseSelect<Room>('rooms', {
    order: { column: 'price_per_night', ascending: true },
  })
  return rows && rows.length > 0 ? rows : seedRooms
})

// ---------------------------------------------------------------------------
// Reviews — public (published only) vs admin (all)
// ---------------------------------------------------------------------------

export const getReviews = cache(async (): Promise<Review[]> => {
  const rows = await supabaseSelect<Review>('reviews', {
    filter: { published: true },
    order: { column: 'created_at', ascending: false },
  })
  return rows && rows.length > 0 ? rows : seedReviews
})

export const getAdminReviews = cache(async (): Promise<Review[]> => {
  const rows = await supabaseSelect<Review>('reviews', {
    order: { column: 'created_at', ascending: false },
  })
  return rows && rows.length > 0 ? rows : seedReviews
})

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  const rows = await supabaseSelect<GalleryItem>('gallery', {
    order: { column: 'sort_order', ascending: true },
  })
  return rows && rows.length > 0 ? rows : seedGallery
})

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

export const getContent = cache(async (): Promise<ContentBlock[]> => {
  const rows = await supabaseSelect<ContentBlock>('content')
  return rows && rows.length > 0 ? rows : seedContent
})

// ---------------------------------------------------------------------------
// Pricing rules
// ---------------------------------------------------------------------------

export const getPricing = cache(async (): Promise<PricingRule[]> => {
  const rows = await supabaseSelect<PricingRule>('pricing_rules', {
    order: { column: 'start_date', ascending: true },
  })
  return rows && rows.length > 0 ? rows : seedPricing
})

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export const getSettings = cache(async (): Promise<SiteSetting[]> => {
  const rows = await supabaseSelect<SiteSetting>('site_settings')
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
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(name)')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[queries] Supabase error fetching bookings:', error.message)
      return mockBookings
    }
    return data && data.length > 0 ? (data as Booking[]) : mockBookings
  } catch {
    return mockBookings
  }
})

// ---------------------------------------------------------------------------
// Contact messages (admin only)
// ---------------------------------------------------------------------------

type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export const getContactMessages = cache(async (): Promise<ContactMessage[]> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[queries] Supabase error fetching contact_messages:', error.message)
      return []
    }
    return (data ?? []) as ContactMessage[]
  } catch {
    return []
  }
})

// ---------------------------------------------------------------------------
// Admin dashboard aggregate
// ---------------------------------------------------------------------------

export const getAdminData = cache(async () => {
  const [rooms, bookings, gallery, content, pricing, settings] = await Promise.all([
    getAllRooms(),
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
  const pending  = bookings.filter((b) => b.status === 'pending').length
  const occupancyRate = rooms.length ? Math.round((upcoming / rooms.length) * 100) : 0

  return { rooms, bookings, gallery, content, pricing, settings, stats: { revenue, upcoming, pending, occupancyRate } }
})

export { faqs, attractions }

