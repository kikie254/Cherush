import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offline | Cherush Guesthouse',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <section className="py-32 min-h-[60vh] flex items-center" aria-labelledby="offline-heading">
      <Container className="text-center max-w-lg">
        <div className="text-6xl mb-6" aria-hidden="true">📡</div>
        <h1 id="offline-heading" className="font-display text-4xl text-primary mb-4">
          You&apos;re offline
        </h1>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          It looks like you&apos;ve lost your internet connection. Please check your network and try again.
        </p>
        <Button href="/" variant="primary">
          Try again
        </Button>
      </Container>
    </section>
  )
}
