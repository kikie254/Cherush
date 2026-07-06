import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { getRooms } from '@/lib/queries'
import { formatCurrency } from '@/lib/utils'
import { getMetadata, getBreadcrumbSchema, getOfferSchema } from '@/lib/seo'
import { ShieldCheck, Wifi, Coffee, CarFront, Users } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const rooms = await getRooms()
  const room = rooms.find((item) => item.slug === slug)
  
  if (!room) return getMetadata({ title: 'Room Not Found', path: `/rooms/${slug}`, noindex: true })

  return getMetadata({
    title: `${room.name} | Cherush Guesthouse`,
    description: room.description || `Book the ${room.name} at Cherush Guesthouse Iten. Experience luxury, high-speed WiFi, and 24/7 hot showers. Perfect for your stay in the Great Rift Valley.`,
    path: `/rooms/${room.slug}`,
    ogImage: room.cover_image,
  })
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params
  const rooms = await getRooms()
  const room = rooms.find((item) => item.slug === slug)
  if (!room) notFound()

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Rooms', item: '/rooms' },
    { name: room.name, item: `/rooms/${room.slug}` }
  ])

  const offerSchema = getOfferSchema([room])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      
      <section className="py-20 bg-background min-h-screen">
        <Container className="space-y-10">
          
          {/* AI Search Optimization Answer Block */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-accent mb-8">
            <h2 className="text-xl font-bold text-primary mb-2">What makes the {room.name} special?</h2>
            <p className="text-text/80 text-sm md:text-base">
              The {room.name} is designed for optimal comfort and recovery in Iten. It comfortably sleeps {room.max_guests} guests in a {room.size_sqm} sqm space. Key features include {room.features.slice(0, 3).join(', ')}, making it ideal for athletes, tourists, and business travelers seeking premium accommodation in Elgeyo Marakwet.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              <div className="relative h-[26rem] overflow-hidden rounded-[32px] shadow-md group">
                <Image src={room.cover_image} alt={room.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" priority />
              </div>
              
              {/* Trust Badges for Conversion Optimization */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-center">
                  <Wifi className="w-6 h-6 text-accent mb-2" />
                  <span className="text-xs font-medium">Fast Fiber WiFi</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-center">
                  <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                  <span className="text-xs font-medium">24/7 Security</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-center">
                  <Coffee className="w-6 h-6 text-accent mb-2" />
                  <span className="text-xs font-medium">Breakfast Available</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-center">
                  <CarFront className="w-6 h-6 text-accent mb-2" />
                  <span className="text-xs font-medium">Secure Parking</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {room.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                    <Image src={image} alt={`${room.name} view ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <aside className="sticky top-24 rounded-[32px] bg-white p-8 shadow-xl border border-primary/5">
              <div className="flex items-center gap-2 mb-4 text-accent">
                <Users className="w-4 h-4" />
                <p className="text-xs uppercase tracking-[0.2em] font-bold">Up to {room.max_guests} guests · {room.size_sqm} sqm</p>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl text-primary font-bold">{room.name}</h1>
              
              {/* Trust badge */}
              <div className="flex items-center gap-2 mt-4 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                <ShieldCheck className="w-4 h-4" /> Recommended by Elite Athletes
              </div>

              <p className="mt-6 text-base leading-relaxed text-text/70">{room.description}</p>
              
              <div className="mt-8 pt-6 border-t border-primary/10 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-text/60">Nightly Rate</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(room.price_per_night)}</span>
                </div>
                {room.weekly_rate && (
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-text/60">Weekly Rate (Save 15%)</span>
                    <span className="text-lg font-bold text-primary">{formatCurrency(room.weekly_rate)}</span>
                  </div>
                )}
                {room.monthly_rate && (
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-text/60">Monthly Rate (Save 30%)</span>
                    <span className="text-lg font-bold text-primary">{formatCurrency(room.monthly_rate)}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-primary/10">
                <h3 className="font-medium text-primary mb-4 text-sm uppercase tracking-wider">Premium Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-background border border-primary/10 px-4 py-2 text-xs font-medium text-primary/80">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conversion Optimization: Check-in & Policies */}
              <div className="mt-8 pt-6 border-t border-primary/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Check-in</span>
                  <span className="font-medium text-primary">From 2:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Check-out</span>
                  <span className="font-medium text-primary">Before 11:00 AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Payment</span>
                  <span className="font-medium text-primary">M-Pesa, Visa, Mastercard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Cancellation</span>
                  <span className="font-medium text-accent">Free up to 48h before</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <Button href={`/bookings?room=${room.slug}`} variant="accent" className="w-full h-14 text-lg font-bold shadow-lg shadow-accent/20">
                  Book this room securely
                </Button>
                <Button href="/contact" variant="secondary" className="w-full h-12">
                  Contact Us
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
