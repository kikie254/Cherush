import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getUser() {
  const supabase = await createClient()
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}

export async function requireAdmin() {
  const user = await getUser()
  if (!user) redirect('/auth?next=/admin')
  return user
}
