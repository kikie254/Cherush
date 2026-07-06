'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Booking, BookingStatus, ContentBlock, GalleryItem, PricingRule, Room, SiteSetting } from '@/types'
import { z } from 'zod'

type Result<T = undefined> = T extends undefined
  ? { ok: boolean; error?: string }
  : { ok: boolean; data?: T; error?: string }

async function guardAdmin(): Promise<{ ok: false; error: string } | null> {
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

const roomSchema = z.object({
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(2).max(200),
  short_description: z.string().min(10).max(500),
  description: z.string().min(20),
  price_per_night: z.number().positive(),
  max_guests: z.number().int().positive().max(20),
  size_sqm: z.number().int().positive(),
  beds: z.string().min(1),
  bathrooms: z.number().int().positive(),
  cover_image: z.string().url().or(z.string().startsWith('/')),
  published: z.boolean().optional().default(true),
})

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

export async function deleteRoom(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  if (!id) return { ok: false, error: 'Room ID required.' }

  const supabase = await createClient()
  const { error } = await supabase.from('rooms').delete().eq('id', id)
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

export async function deleteGalleryItem(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('gallery').delete().eq('id', id)
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
// Bookings — Admin approval workflow
// ---------------------------------------------------------------------------

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  if (!id) return { ok: false, error: 'Booking ID required.' }

  const validStatuses: BookingStatus[] = ['pending', 'approved', 'cancelled', 'rejected', 'completed']
  if (!validStatuses.includes(status)) {
    return { ok: false, error: 'Invalid status.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }

  // Send status email (non-fatal)
  try {
    const { data: rows } = await supabase.from('bookings').select('*, rooms(name)').eq('id', id).single()
    if (rows) {
      const { sendStatusEmail } = await import('@/lib/email')
      await sendStatusEmail(rows as Booking, status)
    }
  } catch (e) {
    console.error('[admin.ts] Failed to send status email:', e)
  }

  return { ok: true }
}

export async function deleteBooking(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  if (!id) return { ok: false, error: 'Booking ID required.' }

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Reviews — moderation
// ---------------------------------------------------------------------------

export async function moderateReview(id: string, published: boolean): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('reviews').update({ published }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function deleteReview(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

export async function updateMessageStatus(id: string, status: 'read' | 'unread' | 'replied'): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function deleteMessage(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard

  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
