import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/auth/session
 * Sign in with email + password via Supabase Auth.
 * Body: { email: string; password: string }
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Sign-in failed.' }, { status: 500 })
  }
}

/**
 * DELETE /api/auth/session
 * Signs out the current user.
 */
export async function DELETE() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.json({ ok: true })
}
