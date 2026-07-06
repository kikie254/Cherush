import { NextResponse, type NextRequest } from 'next/server'
import { contactSchema } from '@/lib/validation'
import { guardRateLimit } from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // 1. Rate limit per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const rate = await guardRateLimit(`contact:${ip}`)
  if (!rate.success) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait a few minutes and try again.' },
      { status: 429 }
    )
  }

  // 2. Parse body safely
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // 3. Validate + sanitise (honeypot checked client-side, but also reject server-side)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Please complete all required fields.'
    return NextResponse.json({ error: firstError }, { status: 400 })
  }

  // 4. Honeypot field — silently accept but don't process
  if ((body as Record<string, unknown>)['website']) {
    return NextResponse.json({ message: 'Message received. We will get back to you soon.' })
  }

  const { name, email, subject, message } = parsed.data

  // 5. Persist to Supabase contact_messages table
  try {
    const supabase = await createClient()
    await supabase.from('contact_messages').insert({ name, email, subject, message })
  } catch (err) {
    console.error('[contact/route] Failed to persist message:', err)
    // Non-fatal — still send email
  }

  // 6. Send email notification
  try {
    await sendContactEmail({ name, email, subject, message })
  } catch (err) {
    console.error('[contact/route] Failed to send email:', err)
    // Don't fail the request if email fails — message is already saved
  }

  return NextResponse.json({ message: 'Message received. We will get back to you soon.' })
}
