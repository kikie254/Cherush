'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to an error tracking service in production
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Container className="text-center py-32 max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-accent" />
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-3">
          Something went wrong
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">
          Unexpected error
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          We apologise for the inconvenience. Our team has been notified. Please try again or contact us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-primary/15 text-primary text-sm font-medium hover:bg-primary/5 transition-colors duration-300"
          >
            Go home
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-8 text-left rounded-xl bg-red-50 border border-red-100 p-4">
            <summary className="text-xs font-mono text-red-600 cursor-pointer">Error details (dev only)</summary>
            <pre className="mt-2 text-xs text-red-700 overflow-auto whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}
      </Container>
    </main>
  )
}
