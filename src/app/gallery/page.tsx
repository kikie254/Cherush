import { LightboxGrid } from '@/components/gallery/lightbox-grid'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getGallery } from '@/lib/queries'

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <SectionHeading eyebrow="Gallery" title="A visual sense of rooms, mornings, and the wider Iten mood" body="Browse living spaces, work corners, gardens, and moments that frame the stay experience." />
        <LightboxGrid items={items} />
      </Container>
    </section>
  )
}
