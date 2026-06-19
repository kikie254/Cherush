'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser'

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={async () => {
        const supabase = createClient()
        await supabase?.auth.signOut()
        window.location.href = '/'
      }}
    >
      Sign out
    </Button>
  )
}
