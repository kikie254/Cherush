'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Booking, BookingStatus, ContentBlock, GalleryItem, PricingRule, Room, SiteSetting } from '@/types'

type Result = { ok: boolean; error?: string }

async function guardAdmin(): Promise<Result | null> {
  try {
    await requireAdmin()
    return null
  } catch {
    return { ok: false, error: 'Unauthorized' }
  }
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export async function upsertRoom(data: Partial<Room> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = data.id
    ? await supabase.from('rooms').update(data).eq('id', data.id)
    : await supabase.from('rooms').insert(data)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Pricing rules
// ---------------------------------------------------------------------------

export async function upsertPricingRule(data: Partial<PricingRule> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = data.id
    ? await supabase.from('pricing_rules').update(data).eq('id', data.id)
    : await supabase.from('pricing_rules').insert(data)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

export async function upsertContentBlock(data: Partial<ContentBlock> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = data.id
    ? await supabase.from('content').update(data).eq('id', data.id)
    : await supabase.from('content').insert(data)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export async function upsertGalleryItem(data: Partial<GalleryItem> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = data.id
    ? await supabase.from('gallery').update(data).eq('id', data.id)
    : await supabase.from('gallery').insert(data)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export async function upsertSiteSetting(data: Partial<SiteSetting> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = data.id
    ? await supabase.from('site_settings').update(data).eq('id', data.id)
    : await supabase.from('site_settings').insert(data)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }

  // Send status email
  try {
    const { data: rows } = await supabase.from('bookings').select('*').eq('id', id).single()
    if (rows) {
      const { sendStatusEmail } = await import('@/lib/email')
      await sendStatusEmail(rows as Booking, status)
    }
  } catch (e) {
    console.error('Failed to send status email', e)
  }

  return { ok: true }
}

export async function deleteBooking(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
