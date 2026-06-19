import { Suspense } from 'react'
import { AuthPanel } from '@/components/auth/panel'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export default function AuthPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading eyebrow="Guest account" title="Sign in to manage stays" body="Enable Supabase credentials to activate full email/password and Google authentication." />
        <Suspense fallback={<div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">Loading...</div>}>
          <AuthPanel />
        </Suspense>
      </Container>
    </section>
  )
}
