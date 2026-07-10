'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker for offline support and asset caching.
 * - Only runs in production.
 * - Removes console.debug (no log noise in production).
 * - Deferred via requestIdleCallback so it never competes with page hydration.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    const isClient = typeof window !== 'undefined'
    if (
      !isClient ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    )
      return

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // SW registration failure is non-fatal — site works without it
        })
    }

    // Defer SW registration until the browser is idle so it doesn't
    // compete with initial hydration and LCP image decode
    if (isClient && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(register, { timeout: 4000 })
    } else {
      // Fallback: delay 3s on browsers without rIC support
      setTimeout(register, 3000)
    }
  }, [])

  return null
}
