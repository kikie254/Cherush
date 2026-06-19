import { cookies } from 'next/headers'
import { adminAuth } from '@/lib/firebase/admin'

/**
 * Reads the session cookie and verifies the Firebase ID token.
 * Returns the decoded token (with uid, email, etc.) or null.
 */
export async function getUser() {
  if (!adminAuth) return null
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('__session')?.value
  if (!sessionCookie) return null
  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
    return decoded
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const { redirect } = await import('next/navigation')
  const user = await getUser()
  if (!user) redirect('/auth?next=/admin')
  return user
}
