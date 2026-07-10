'use client'

/**
 * ClientOnlyComponents — a Client Component that holds all the dynamic
 * imports with `ssr: false`. These cannot live in Server Components.
 *
 * Wrapping them here keeps `page.tsx` as a Server Component while still
 * deferring heavy client-side JS from the initial bundle.
 */

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Review } from '@/types'

const HorizontalExperience = dynamic(
  () => import('@/components/home/horizontal-experience').then((m) => m.HorizontalExperience),
  { ssr: false, loading: () => <div className="h-[300vh] bg-primary" aria-hidden="true" /> }
)

const TestimonialsCarousel = dynamic(
  () =>
    import('@/components/home/testimonials-carousel').then((m) => m.TestimonialsCarousel),
  { ssr: false, loading: () => <div className="h-48 bg-white/50 rounded-[32px] animate-pulse" /> }
)

const GoogleMap = dynamic(
  () => import('@/components/ui/google-map').then((m) => m.GoogleMap),
  { ssr: false, loading: () => <div className="h-80 bg-primary/5 rounded-[28px] animate-pulse" /> }
)

const FAQSection = dynamic(
  () => import('@/components/home/faq-section').then((m) => m.FAQSection),
  { ssr: false, loading: () => null }
)

const FloatingActions = dynamic(
  () => import('@/components/home/floating-actions').then((m) => m.FloatingActions),
  { ssr: false, loading: () => null }
)

// ─── Individual exports ────────────────────────────────────────────────────

export function DeferredHorizontalExperience() {
  return (
    <Suspense fallback={<div className="h-[300vh] bg-primary" aria-hidden="true" />}>
      <HorizontalExperience />
    </Suspense>
  )
}

export function DeferredTestimonialsCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <Suspense
      fallback={<div className="h-48 bg-white/50 rounded-[32px] animate-pulse" />}
    >
      <TestimonialsCarousel reviews={reviews} />
    </Suspense>
  )
}

export function DeferredGoogleMap() {
  return (
    <Suspense fallback={<div className="h-80 bg-primary/5 rounded-[28px]" />}>
      <GoogleMap />
    </Suspense>
  )
}

export function DeferredFAQSection() {
  return (
    <Suspense fallback={null}>
      <FAQSection />
    </Suspense>
  )
}

export function DeferredFloatingActions() {
  return <FloatingActions />
}
