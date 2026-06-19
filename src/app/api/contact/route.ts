import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation'
import { guardRateLimit } from '@/lib/rate-limit'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: Request) {
  const rate = await guardRateLimit('contact')
  if (!rate.success) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })
  }

  const body = await request.json()
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please complete all contact form fields.' }, { status: 400 })
  }

  await sendContactEmail(parsed.data)
  return NextResponse.json({ message: 'Message received. We will get back to you soon.' })
}
