import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getContent } from '@/lib/queries'

export default async function AboutPage() {
  const content = await getContent()
  const story = content.find((item) => item.page === 'about' && item.slug === 'story')

  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading eyebrow="About" title={story?.title || 'A thoughtful place to stay'} body={story?.body} />
        <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="text-base leading-8 text-[var(--color-muted)]">
            The property brings together hospitality, practical routines, and a calm design language. Guests can settle in for training blocks, focused work weeks, family breaks, or exploratory stays around the Elgeyo-Marakwet landscape.
          </p>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
            The current build is ready to run with seed content and can be connected to Supabase, email, analytics, and WhatsApp details through environment variables and future CMS data.
          </p>
        </div>
      </Container>
    </section>
  )
}
