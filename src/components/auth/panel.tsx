'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/account'

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')

    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()

      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
        })
        if (error) throw error
        setMessage('Check your email for a confirmation link before signing in.')
        setLoading(false)
        return
      }

      window.location.href = next
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setMessage(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setMessage('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
        },
      })
      if (error) throw error
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed.'
      setMessage(msg)
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="mb-6 flex gap-3">
        <Button type="button" variant={mode === 'signin' ? 'primary' : 'secondary'} onClick={() => setMode('signin')}>Sign in</Button>
        <Button type="button" variant={mode === 'signup' ? 'primary' : 'secondary'} onClick={() => setMode('signup')}>Sign up</Button>
      </div>
      <form action={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <input name="password" type="password" placeholder="Password" required className="w-full rounded-2xl border border-black/10 px-4 py-3" />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? 'Please wait…' : 'Continue'}
          </Button>
          <Button type="button" variant="secondary" onClick={handleGoogle} disabled={loading}>
            Continue with Google
          </Button>
        </div>
      </form>
      {message ? <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p> : null}
    </div>
  )
}
