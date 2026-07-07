import { LightboxGrid } from '@/components/gallery/lightbox-grid'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getGallery } from '@/lib/queries'
import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Photo Gallery | Rooms, Garden & Iten Views',
  description:
    'Explore the Cherush Guesthouse photo gallery — comfortable rooms, morning garden views, workspaces, and the stunning Iten highland landscape. See what awaits you in Kenya.',
  path: '/gallery',
  keywords: [
    'Cherush Guesthouse photos',
    'Iten guesthouse gallery',
    'accommodation photos Iten Kenya',
    'Cherush rooms gallery',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Gallery', item: '/gallery' },
])

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-20" aria-labelledby="gallery-heading">
        <Container className="space-y-10">
          <h1 id="gallery-heading" className="sr-only">
            Cherush Guesthouse Photo Gallery — Rooms, Garden &amp; Iten Views
          </h1>
          <SectionHeading
            eyebrow="Gallery"
            title="A visual sense of rooms, mornings, and the wider Iten mood"
            body="Browse living spaces, work corners, gardens, and moments that frame the stay experience at Cherush Guesthouse."
          />
          <LightboxGrid items={items} />

          <div className="text-center pt-4">
            <Link
              href="/bookings"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Book Your Stay
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
