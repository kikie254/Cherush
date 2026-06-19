import { NextResponse } from 'next/server'

/**
 * Firebase handles OAuth redirects client-side via signInWithPopup / signInWithRedirect.
 * This route is kept as a no-op redirect for backwards-compatibility with any
 * bookmarked /auth/callback links.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const next = url.searchParams.get('next') || '/account'
  return NextResponse.redirect(new URL(next, url.origin))
}
