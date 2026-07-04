import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /auth/callback
 * Supabase redirects here after OAuth (Google, etc.) or magic-link sign-in.
 * It exchanges the `code` query param for a session and redirects the user.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something went wrong, send them back to sign-in with an error flag
  return NextResponse.redirect(`${origin}/auth?error=callback_failed`)
}
