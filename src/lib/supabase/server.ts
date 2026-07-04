import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase server client that reads/writes cookies via next/headers.
 * Use in Server Components, Route Handlers, and Server Actions.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // In Server Components cookies are read-only — ignore the error.
          }
        },
      },
    }
  )
}

/**
 * Convenience: Returns the authenticated Supabase user from the session,
 * or null if the user is not signed in.
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Guards a route: redirects to /auth if not signed in.
 */
export async function requireAdmin() {
  const { redirect } = await import('next/navigation')
  const user = await getUser()
  if (!user) redirect('/auth?next=/admin')
  return user
}
