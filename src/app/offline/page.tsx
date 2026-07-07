import { getMetadata } from '@/lib/seo'
import { RetryButton } from './retry-button'

export const metadata = getMetadata({
  title: 'Offline',
  description: 'You appear to be offline. Please check your connection and try again.',
  path: '/offline',
  noindex: true,
})

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6" aria-hidden="true">📡</div>
        <h1 className="font-display text-4xl text-primary font-bold mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-text/70 leading-7 mb-8">
          It looks like you&apos;ve lost your internet connection. Please check your network and try again.
        </p>
        <RetryButton />
      </div>
    </main>
  )
}
