import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { guardRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({
  email: z.email('Please enter a valid email address'),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const rate = await guardRateLimit(`forgot-password:${ip}`)
  if (!rate.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { email } = parsed.data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cherushguesthouse.com'

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/reset-password`,
    })

    if (error) {
      console.error('[forgot-password] Supabase error:', error.message)
    }
  } catch (err) {
    console.error('[forgot-password] Unexpected error:', err)
  }

  // Always return success to prevent email enumeration attacks
  return NextResponse.json({
    message: 'If an account exists for this email, a password reset link has been sent.',
  })
}
