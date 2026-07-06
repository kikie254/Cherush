'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { trackPageView, initScrollTracking, initTimeTracking, GA_ID } from '@/lib/analytics'

function AnalyticsTracker() {
  const pathname  = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
  }, [pathname, searchParams])

  // Init scroll depth + time-on-page tracking once
  useEffect(() => {
    const cleanupScroll = initScrollTracking()
    const cleanupTime   = initTimeTracking()
    return () => {
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [])

  return null
}

export function AnalyticsProvider() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=Strict;Secure'
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  )
}
