'use client'

import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setMessage('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        setMessage(error.message)
      } else {
        setDone(true)
        setTimeout(() => router.push('/account'), 3000)
      }
    } catch {
      setMessage('Something went wrong. Please try again or request a new reset link.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-[32px] bg-emerald-50 border border-emerald-200 p-8 text-center">
        <p className="text-3xl mb-3">✓</p>
        <p className="text-emerald-700 font-medium">Password updated successfully!</p>
        <p className="text-emerald-600 text-sm mt-2">Redirecting to your account…</p>
      </div>
    )
  }

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-2xl text-primary mb-6">Set new password</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="reset-password" className="text-sm text-muted mb-1 block">
            New password
          </label>
          <input
            id="reset-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="confirm-reset-password" className="text-sm text-muted mb-1 block">
            Confirm password
          </label>
          <input
            id="confirm-reset-password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter new password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            aria-required="true"
          />
        </div>
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? 'Updating…' : 'Update Password'}
        </Button>
        {message && (
          <div role="alert" className="rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4 text-sm text-rose-700">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <section className="py-20" aria-labelledby="reset-heading">
      <Container className="max-w-lg">
        <SectionHeading
          eyebrow="Account security"
          title="Reset your password"
          body="Enter a new password for your Cherush Guesthouse account."
          id="reset-heading"
          className="mb-10"
        />
        <Suspense fallback={<div className="rounded-[32px] bg-white p-8 animate-pulse h-64" />}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </section>
  )
}
