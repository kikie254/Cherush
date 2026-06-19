import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'

// 5-day session
const SESSION_DURATION_MS = 60 * 60 * 24 * 5 * 1000

export async function POST(request: Request) {
  if (!adminAuth) {
    return NextResponse.json({ error: 'Firebase Admin not configured.' }, { status: 503 })
  }

  try {
    const { idToken } = await request.json()
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    })

    const response = NextResponse.json({ ok: true })
    response.cookies.set('__session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION_MS / 1000,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid ID token.' }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set('__session', '', { maxAge: 0, path: '/' })
  return response
}
