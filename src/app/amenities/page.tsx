import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Dining & Amenities | Cherush Guesthouse',
  description:
    'Discover the dining options and premium amenities available at Cherush Guesthouse in Iten, Kenya.',
  path: '/amenities',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Dining & Amenities', item: '/amenities' },
])

export default function AmenitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-20" aria-labelledby="amenities-heading">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Premium Services"
            title="Dining & Amenities"
            body="Everything you need for a comfortable stay in Iten."
            center={true}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Dining</h3>
              <p className="text-muted leading-relaxed">
                Enjoy nutritious, locally-sourced meals prepared by our experienced chefs. Whether you need an athlete-focused diet for your marathon training or simply want to experience authentic Kenyan cuisine, our dining services cater to your specific needs.
              </p>
            </div>
            <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">High-Speed WiFi</h3>
              <p className="text-muted leading-relaxed">
                Stay connected with reliable, fast fiber-optic internet available throughout the compound. Perfect for remote workers and staying in touch with family.
              </p>
            </div>
            <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Fitness & Recovery</h3>
              <p className="text-muted leading-relaxed">
                Our property is designed with athletes in mind. Relax in our quiet gardens after a long run, and enjoy hot showers and comfortable beds designed for optimal recovery.
              </p>
            </div>
            <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Transport Services</h3>
              <p className="text-muted leading-relaxed">
                We offer airport transfers from Eldoret International Airport and local transport options to make your journey as seamless as possible.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/rooms"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              View Rooms
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
