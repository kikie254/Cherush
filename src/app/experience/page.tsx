import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { attractions } from '@/lib/queries'
import { localSpots } from '@/lib/site-data'
import { siteConfig } from '@/lib/constants'
import { getMetadata, getBreadcrumbSchema, getTouristAttractionSchema, getLodgingBusinessSchema } from '@/lib/seo'

export const metadata = getMetadata({
  title: 'Experience Iten | Running Trails, Culture & Local Attractions',
  description:
    'Discover the best of Iten, Kenya — iconic running trails, panoramic Rift Valley views, Kalenjin culture, and local attractions. Cherush Guesthouse is your perfect base.',
  path: '/experience',
  keywords: [
    'things to do Iten Kenya',
    'Iten running trails',
    'Kerio Valley views',
    'Kamariny Stadium',
    'Iten attractions',
    'Singore Forest',
    'what to do in Iten',
    'Iten travel guide',
  ],
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Experience Iten', item: '/experience' },
])

export default function ExperiencePage() {
  const mapUrl = `https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }}
      />
      <section className="py-20" aria-labelledby="experience-heading">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Experience Iten"
            title="A base for training, scenery, and unhurried local rhythms"
            body="Iten offers cool mornings, iconic running culture, panoramic valley roads, and easy day-trip moments that balance activity with recovery."
            id="experience-heading"
          />

          {/* Hidden H1 for SEO — SectionHeading renders an h2 */}
          <h1 className="sr-only">Experience Iten, Kenya — Things to Do &amp; Local Attractions</h1>

          <div className="grid gap-6 lg:grid-cols-2">
            {attractions.map((spot) => (
              <article key={spot.name} className="rounded-[28px] bg-white p-6 shadow-[var(--shadow-soft)]">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">{spot.category}</p>
                <h2 className="mt-3 font-display text-3xl text-[var(--color-primary)]">{spot.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{spot.description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[32px] bg-white shadow-[var(--shadow-soft)]">
              <iframe
                title="Cherush Guesthouse location map — Iten, Kenya"
                src={mapUrl.replace('maps?q', 'maps?output=embed&q')}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-[32px] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Local ideas</p>
              <div className="mt-6 space-y-5">
                {localSpots.map((spot) => (
                  <div key={spot.name}>
                    <h3 className="text-xl font-medium">{spot.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/75">{spot.description}</p>
                    <Link href={spot.url} className="mt-2 inline-block text-sm text-[var(--color-premium)]">
                      Open map
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Internal linking CTA */}
          <div className="text-center pt-8">
            <p className="text-text/70 mb-4">Ready to explore Iten from a comfortable base?</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/rooms"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                View Our Rooms
              </Link>
              <Link
                href="/about-iten"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                About Iten
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
