import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Guest Reviews | Cherush Guesthouse',
  description:
    'Read what our guests have to say about their stay at Cherush Guesthouse in Iten, Kenya.',
  path: '/reviews',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Reviews', item: '/reviews' },
])

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-20" aria-labelledby="reviews-heading">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Guest Reviews"
            body="Discover why athletes and travelers choose Cherush Guesthouse."
            center={true}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                name: 'Sarah M.',
                role: 'Marathon Runner',
                content: 'Cherush was the perfect base for my high-altitude training block. The compound is quiet, the WiFi is fast, and the hot showers after a long run are a lifesaver.',
                rating: 5,
              },
              {
                name: 'David T.',
                role: 'Digital Nomad',
                content: 'I needed a quiet place to work while exploring the Rift Valley. Cherush provided exactly that. The internet never dropped, and the staff were incredibly welcoming.',
                rating: 5,
              },
              {
                name: 'The Johnson Family',
                role: 'Tourists',
                content: 'We felt so safe and taken care of during our family trip. The rooms are spacious and clean, and the location is ideal for visiting the local attractions.',
                rating: 5,
              },
              {
                name: 'Kipchoge L.',
                role: 'Athlete',
                content: 'Great environment for focus. Away from the noise but close enough to the stadium and trails. Will definitely return.',
                rating: 5,
              },
            ].map((review, i) => (
              <div key={i} className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
                <div className="flex text-accent mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted mb-6 italic">"{review.content}"</p>
                <div>
                  <p className="font-bold text-primary">{review.name}</p>
                  <p className="text-sm text-muted">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 px-8 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Contact Us to Leave a Review
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
