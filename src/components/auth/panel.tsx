'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

// ─── Forgot Password ─────────────────────────────────────────────────────────

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json()) as { message?: string; error?: string }
      if (data.error) {
        setMessage(data.error)
      } else {
        setSent(true)
        setMessage(data.message ?? 'Reset link sent!')
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {sent ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-5">
          <p className="text-emerald-700 text-sm">{message}</p>
          <p className="text-emerald-600 text-xs mt-2">Check your spam folder if you don't see it.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="forgot-email" className="text-sm text-muted mb-1 block">Email address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
              aria-label="Email address for password reset"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </Button>
          {message && !sent && <p className="text-sm text-rose-600 mt-2">{message}</p>}
        </form>
      )}
    </div>
  )
}

// ─── Reset Password ───────────────────────────────────────────────────────────

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

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
        setTimeout(() => router.push('/account'), 2500)
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-5">
        <p className="text-emerald-700 text-sm font-medium">✓ Password updated successfully</p>
        <p className="text-emerald-600 text-xs mt-1">Redirecting to your account…</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="new-password" className="text-sm text-muted mb-1 block">New password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          minLength={8}
          className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
          aria-label="New password"
          autoComplete="new-password"
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="text-sm text-muted mb-1 block">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter new password"
          required
          minLength={8}
          className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent"
          aria-label="Confirm new password"
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Updating…' : 'Update Password'}
      </Button>
      {message && <p className="text-sm text-rose-600 mt-2">{message}</p>}
    </form>
  )
}

// ─── Main Auth Panel ──────────────────────────────────────────────────────────

function AuthPanelInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = searchParams.get('next') || '/account'
  const mode = searchParams.get('mode') || 'signin'
  const error = searchParams.get('error')

  const [activeMode, setActiveMode] = useState<'signin' | 'signup' | 'forgot'>(
    mode === 'forgot' ? 'forgot' : mode === 'signup' ? 'signup' : 'signin'
  )
  const [message, setMessage] = useState(
    error === 'callback_failed' ? 'Sign-in failed. Please try again.' : ''
  )
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')

    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()

      if (activeMode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        router.push(next)
        router.refresh()
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
        })
        if (signUpError) throw signUpError
        setMessage('✓ Check your email for a confirmation link before signing in.')
      }
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
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
      })
      if (oauthError) throw oauthError
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed.'
      setMessage(msg)
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'signin' as const, label: 'Sign In' },
    { id: 'signup' as const, label: 'Create Account' },
  ]

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8" role="region" aria-label="Authentication panel">
      {/* Tab navigation */}
      {activeMode !== 'forgot' && (
        <div className="mb-6 flex gap-1 bg-primary/5 rounded-2xl p-1" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeMode === tab.id}
              onClick={() => { setActiveMode(tab.id); setMessage('') }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                activeMode === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Forgot password mode */}
      {activeMode === 'forgot' ? (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl text-primary">Reset your password</h2>
            <p className="text-sm text-muted mt-1">We'll send a reset link to your email address.</p>
          </div>
          <ForgotPasswordForm />
          <button
            onClick={() => { setActiveMode('signin'); setMessage('') }}
            className="text-sm text-muted hover:text-accent transition-colors focus:outline-none focus-visible:underline"
            aria-label="Back to sign in"
          >
            ← Back to sign in
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <form
            id={`auth-form-${activeMode}`}
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label={activeMode === 'signin' ? 'Sign in form' : 'Create account form'}
            noValidate
          >
            <div>
              <label htmlFor="auth-email" className="text-sm text-muted mb-1 block">
                Email address
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="text-sm text-muted mb-1 block">
                Password
              </label>
              <input
                id="auth-password"
                name="password"
                type="password"
                placeholder={activeMode === 'signup' ? 'Min. 8 characters' : 'Your password'}
                required
                minLength={activeMode === 'signup' ? 8 : 6}
                autoComplete={activeMode === 'signup' ? 'new-password' : 'current-password'}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                aria-required="true"
              />
            </div>

            {activeMode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setActiveMode('forgot'); setMessage('') }}
                  className="text-xs text-muted hover:text-accent transition-colors focus:outline-none focus-visible:underline"
                  aria-label="Forgot your password?"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? 'Please wait…' : activeMode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleGoogle}
                disabled={loading}
                aria-label="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>
          </form>

          {message && (
            <div
              role="alert"
              className={`rounded-2xl px-5 py-4 text-sm ${
                message.startsWith('✓')
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function AuthPanel() {
  return (
    <Suspense fallback={<div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)] animate-pulse h-64" />}>
      <AuthPanelInner />
    </Suspense>
  )
}
