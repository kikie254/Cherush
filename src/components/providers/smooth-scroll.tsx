'use client'

import { useEffect } from 'react'

/**
 * SmoothScroll — Lenis-powered smooth scrolling.
 *
 * Performance notes:
 * - Skipped entirely when prefers-reduced-motion is set (accessibility + performance).
 * - Skipped on touch-only devices where native momentum scroll is already smooth.
 * - RAF loop uses cancelAnimationFrame for clean teardown.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion preference — do not apply JS scroll at all
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let rafId: number
    let lenis: import('lenis').default | null = null

    // Dynamic import so Lenis is not in the initial parse path
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        infinite: false,
        // Sync with framer-motion useScroll which reads native scrollY
        syncTouch: false,
      })

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
