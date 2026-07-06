/**
 * Supabase Admin (Service Role) Client
 * Uses the SERVICE_ROLE key — bypasses RLS.
 * Only used in server-side Route Handlers and Server Actions that require
 * elevated permissions (e.g. admin operations, server-initiated writes).
 * NEVER expose this client to the browser.
 */
import { createClient as _createClient } from '@supabase/supabase-js'

let _adminClient: ReturnType<typeof _createClient> | null = null

export function createAdminClient() {
  if (_adminClient) return _adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      '[createAdminClient] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  _adminClient = _createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _adminClient
}
