'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'

async function createSession(idToken: string) {
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
}

export function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/account'

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')

    if (!auth) {
      setMessage('Firebase is not configured. Add environment variables to enable authentication.')
      return
    }

    try {
      let credential
      if (mode === 'signin') {
        credential = await signInWithEmailAndPassword(auth, email, password)
      } else {
        credential = await createUserWithEmailAndPassword(auth, email, password)
      }
      const idToken = await credential.user.getIdToken()
      await createSession(idToken)
      window.location.href = next
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setMessage(msg)
    }
  }

  async function handleGoogle() {
    if (!auth) {
      setMessage('Firebase is not configured. Add environment variables to enable Google sign-in.')
      return
    }
    try {
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(auth, provider)
      const idToken = await credential.user.getIdToken()
      await createSession(idToken)
      window.location.href = next
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed.'
      setMessage(msg)
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
          <Button type="submit">Continue</Button>
          <Button type="button" variant="secondary" onClick={handleGoogle}>Continue with Google</Button>
        </div>
      </form>
      {message ? <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p> : null}
    </div>
  )
}
