import Link from 'next/link'
import { Container } from '@/components/ui/container'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Container className="text-center py-32">
        <p className="font-display text-[120px] md:text-[180px] leading-none text-primary/5 select-none">
          404
        </p>
        <div className="-mt-8 relative z-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-medium">Page not found</p>
          <h1 className="font-display text-4xl md:text-5xl text-primary">
            This room doesn&apos;t exist
          </h1>
          <p className="text-muted max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to Homepage
            </Link>
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-primary/15 text-primary text-sm font-medium hover:bg-primary/5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book a Room
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
