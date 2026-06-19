export type BookingStatus = 'pending' | 'approved' | 'cancelled' | 'rejected' | 'completed'

export type Room = {
  id: string
  slug: string
  name: string
  short_description: string
  description: string
  price_per_night: number
  weekly_rate: number | null
  monthly_rate: number | null
  cover_image: string
  gallery: string[]
  max_guests: number
  size_sqm: number
  beds: string
  bathrooms: number
  features: string[]
  published: boolean
}

export type Review = {
  id: string
  guest_name: string
  origin: string | null
  rating: number
  quote: string
  published: boolean
}

export type GalleryItem = {
  id: string
  title: string
  media_type: 'image' | 'video'
  media_url: string
  thumbnail_url: string | null
  category: string
  featured: boolean
  sort_order: number
}

export type Booking = {
  id: string
  booking_code: string
  room_id: string
  guest_name: string
  guest_email: string
  guest_phone: string | null
  guests_count: number
  check_in: string
  check_out: string
  total_amount: number
  status: BookingStatus
  special_requests: string | null
  created_at: string
  rooms?: { name?: string | null } | null
}

export type PricingRule = {
  id: string
  name: string
  room_id: string | null
  start_date: string
  end_date: string
  multiplier: number
  min_nights: number | null
}

export type ContentBlock = {
  id: string
  page: string
  slug: string
  title: string
  body: string
}

export type SiteSetting = {
  id: string
  key: string
  value: string
  description: string | null
}

export type Attraction = {
  name: string
  category: string
  description: string
  latitude: number
  longitude: number
}
