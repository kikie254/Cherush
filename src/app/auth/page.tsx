import { Suspense } from 'react'
import { AuthPanel } from '@/components/auth/panel'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Cherush Guesthouse',
  description: 'Sign in to manage your bookings and account at Cherush Guesthouse in Iten, Kenya.',
  robots: { index: false, follow: false },
}

export default function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  return (
    <section className="py-20" aria-labelledby="auth-heading">
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="Guest account"
          title="Sign in to manage stays"
          body="Sign in with your email and password or Google account to manage your bookings and account."
          id="auth-heading"
        />
        <Suspense fallback={<div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)] animate-pulse h-80" aria-busy="true" aria-label="Loading authentication form" />}>
          <AuthPanel />
        </Suspense>
      </Container>
    </section>
  )
}
