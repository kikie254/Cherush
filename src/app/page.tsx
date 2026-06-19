import { Hero } from '@/components/home/hero'
import { RoomCard } from '@/components/home/room-card'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { getContent, getReviews, getRooms, faqs } from '@/lib/queries'
import { images } from '@/lib/site-data'

export default async function HomePage() {
  const [rooms, reviews, content] = await Promise.all([getRooms(), getReviews(), getContent()])
  const experience = content.find((item) => item.page === 'home' && item.slug === 'experience')

  return (
    <>
      <Hero image={images.hero} />
      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading eyebrow="Rooms" title="Stay spaces designed for recovery and ease" body="Choose from flexible layouts for solo stays, couples, families, or longer residential visits in Iten." />
          <div className="grid gap-6 lg:grid-cols-3">
            {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </div>
        </Container>
      </section>
      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <SectionHeading eyebrow="Experience" title={experience?.title || 'The Cherush experience'} body={experience?.body} />
          <div className="rounded-[32px] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-soft)]">
            <p className="text-sm uppercase tracking-[0.3em] text-white/65">At a glance</p>
            <ul className="mt-6 space-y-4 text-base leading-8 text-white/80">
              <li>Peaceful mornings and comfortable evenings</li>
              <li>Fast WiFi and work-friendly setups</li>
              <li>Easy access to viewpoints, tracks, and drives</li>
              <li>Flexible stays from short breaks to long residencies</li>
            </ul>
            <div className="mt-8"><Button href="/experience" variant="secondary">Explore the area</Button></div>
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading eyebrow="Guest reflections" title="A calm, practical, and polished base in Iten" center />
          <div className="grid gap-6 lg:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-[28px] bg-white p-8 shadow-[var(--shadow-soft)]">
                <p className="text-lg leading-8 text-[var(--color-primary)]">“{review.quote}”</p>
                <p className="mt-6 text-sm text-[var(--color-muted)]">{review.guest_name}{review.origin ? ` · ${review.origin}` : ''}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-20">
        <Container className="space-y-10">
          <SectionHeading eyebrow="FAQ" title="Helpful details before you stay" />
          <div className="grid gap-5 lg:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[28px] border border-black/5 bg-[var(--color-background)] p-6">
                <h3 className="text-lg font-semibold text-[var(--color-primary)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
