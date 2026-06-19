'use server'

import { adminDb } from '@/lib/firebase/admin'
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
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  const { id, ...fields } = data
  if (id) {
    await adminDb.collection('rooms').doc(id).set(fields, { merge: true })
  } else {
    await adminDb.collection('rooms').add(fields)
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Pricing rules
// ---------------------------------------------------------------------------

export async function upsertPricingRule(data: Partial<PricingRule> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  const { id, ...fields } = data
  if (id) {
    await adminDb.collection('pricing_rules').doc(id).set(fields, { merge: true })
  } else {
    await adminDb.collection('pricing_rules').add(fields)
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

export async function upsertContentBlock(data: Partial<ContentBlock> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  const { id, ...fields } = data
  if (id) {
    await adminDb.collection('content').doc(id).set(fields, { merge: true })
  } else {
    await adminDb.collection('content').add(fields)
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export async function upsertGalleryItem(data: Partial<GalleryItem> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  const { id, ...fields } = data
  if (id) {
    await adminDb.collection('gallery').doc(id).set(fields, { merge: true })
  } else {
    await adminDb.collection('gallery').add(fields)
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export async function upsertSiteSetting(data: Partial<SiteSetting> & { id?: string }): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  const { id, ...fields } = data
  if (id) {
    await adminDb.collection('site_settings').doc(id).set(fields, { merge: true })
  } else {
    await adminDb.collection('site_settings').add(fields)
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  await adminDb.collection('bookings').doc(id).update({ status })
  return { ok: true }
}

export async function deleteBooking(id: string): Promise<Result> {
  const guard = await guardAdmin()
  if (guard) return guard
  if (!adminDb) return { ok: false, error: 'Firebase Admin not configured.' }

  await adminDb.collection('bookings').doc(id).delete()
  return { ok: true }
}
