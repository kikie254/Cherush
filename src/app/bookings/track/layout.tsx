import { getMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Track Your Booking',
  description: 'Check the status of your Cherush Guesthouse reservation using your booking reference code.',
  path: '/bookings/track',
  noindex: true,
})

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
