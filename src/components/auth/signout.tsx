'use client'

import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase/client'
import { signOut } from 'firebase/auth'

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={async () => {
        if (auth) await signOut(auth)
        // Clear the server-side session cookie
        await fetch('/api/auth/session', { method: 'DELETE' })
        window.location.href = '/'
      }}
    >
      Sign out
    </Button>
  )
}
