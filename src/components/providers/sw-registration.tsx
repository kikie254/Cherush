'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker for offline support and caching.
 * Runs only on client, outside of development mode.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.debug('[SW] Registered successfully', reg.scope)
        })
        .catch((err) => {
          console.warn('[SW] Registration failed', err)
        })
    }
  }, [])

  return null
}
