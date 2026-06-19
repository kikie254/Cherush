import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware — Firebase auth uses session cookies set by the /api/auth/session
 * route, so we only need to pass requests through. Route-level protection is
 * handled by requireAdmin() in each Server Component.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
