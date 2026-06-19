'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/button'

export function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/account'

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    const supabase = createClient()

    if (!supabase) {
      setMessage('Supabase is not configured. Add environment variables to enable authentication.')
      return
    }

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setMessage(error?.message || 'Signed in successfully.')
      if (!error) window.location.href = next
      return
    }

    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
    setMessage(error?.message || 'Account created. Check your email if confirmation is enabled.')
  }

  async function handleGoogle() {
    const supabase = createClient()
    if (!supabase) {
      setMessage('Supabase is not configured. Add environment variables to enable Google sign-in.')
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` } })
    if (error) setMessage(error.message)
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
          <Button type="submit">Continue</Button>
          <Button type="button" variant="secondary" onClick={handleGoogle}>Continue with Google</Button>
        </div>
      </form>
      {message ? <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p> : null}
    </div>
  )
}
