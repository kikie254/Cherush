import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { attractions } from '@/lib/queries'
import { localSpots } from '@/lib/site-data'
import { siteConfig } from '@/lib/constants'

export default function ExperiencePage() {
  const mapUrl = `https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`

  return (
    <section className="py-20">
      <Container className="space-y-12">
        <SectionHeading eyebrow="Experience Iten" title="A base for training, scenery, and unhurried local rhythms" body="Iten offers cool mornings, iconic running culture, panoramic valley roads, and easy day-trip moments that balance activity with recovery." />
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
            <iframe title="Cherush Stay map" src={mapUrl.replace('maps?q', 'maps?output=embed&q')} className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="rounded-[32px] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Local ideas</p>
            <div className="mt-6 space-y-5">
              {localSpots.map((spot) => (
                <div key={spot.name}>
                  <h3 className="text-xl font-medium">{spot.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/75">{spot.description}</p>
                  <Link href={spot.url} className="mt-2 inline-block text-sm text-[var(--color-premium)]">Open map</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
