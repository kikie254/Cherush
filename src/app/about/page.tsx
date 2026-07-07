import { getMetadata, getBreadcrumbSchema, getLodgingBusinessSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getContent } from '@/lib/queries'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'About Cherush Guesthouse',
  description:
    'Learn about Cherush Guesthouse in Iten, Kenya — our story, our values, and our commitment to delivering warm Kenyan hospitality for athletes, families, and travellers.',
  path: '/about',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'About', item: '/about' },
])

export default async function AboutPage() {
  const content = await getContent()
  const story = content.find((item) => item.page === 'about' && item.slug === 'story')

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
      <section className="py-20" aria-labelledby="about-heading">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-3">About Us</p>
            <h1 id="about-heading" className="font-display text-4xl md:text-5xl text-primary font-bold leading-tight">
              {story?.title || 'A thoughtful place to stay in Iten'}
            </h1>
            {story?.body && (
              <p className="mt-6 text-base leading-8 text-muted">{story.body}</p>
            )}
          </div>
          <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)] space-y-6">
            <p className="text-base leading-8 text-[var(--color-muted)]">
              Cherush Guesthouse brings together hospitality, practical routines, and a calm design language in the heart of Iten, Kenya — the Home of Champions. Whether you are an elite marathon runner on a training block, a remote professional needing reliable WiFi, or a family exploring the Great Rift Valley, Cherush is your home away from home.
            </p>
            <p className="text-base leading-8 text-[var(--color-muted)]">
              We offer a range of comfortable, fully-furnished rooms with hot showers, fast fibre WiFi, and self-catering kitchens. Our compound is quiet, secure, and set within walking distance of Iten&apos;s famous running trails and Kamariny Stadium.
            </p>
            <div className="pt-4 flex gap-4 flex-wrap">
              <Link
                href="/rooms"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                View Our Rooms
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
