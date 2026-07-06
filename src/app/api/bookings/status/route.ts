import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { guardRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({
  code: z.string().min(3).max(30),
  action: z.enum(['status', 'details']),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const rate = await guardRateLimit(`booking-status:${ip}`)
  if (!rate.success) {
    return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid booking code.' }, { status: 400 })
  }

  const { code } = parsed.data

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_code, status, check_in, check_out, guest_name, rooms(name), total_amount, created_at')
      .eq('booking_code', code.toUpperCase())
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
    }

    return NextResponse.json({ booking: data })
  } catch (err) {
    console.error('[booking-status] Error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
