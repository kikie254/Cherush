import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function Hero({ image }: { image: string }) {
  return (
    <section className="relative min-h-[86vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="Cherush Stay Iten hero" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>
      <Container className="relative flex min-h-[86vh] items-end py-16">
        <div className="max-w-4xl text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-white/75">Cherush Stay Iten • Train. Explore. Unwind.</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">Train. Recover. Belong.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Premium boutique hospitality in Kenya&apos;s home of champions for runners, families, explorers, and remote workers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/bookings" variant="accent">Book Stay</Button>
            <Button href="/experience" variant="secondary">Explore Iten</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
