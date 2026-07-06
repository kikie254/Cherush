'use client'

import { Inter, Cormorant_Garamond } from 'next/font/google'
import Link from 'next/link'
import '@/app/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-background text-text min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-md mx-auto">
          <p className="font-display text-[120px] leading-none text-primary/5 select-none mb-4">
            500
          </p>
          <h1 className="font-display text-4xl text-primary mb-4">Internal Server Error</h1>
          <p className="text-text/70 mb-8">
            Something went wrong on our end. We're actively looking into it. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md border border-primary/20 bg-transparent px-8 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
