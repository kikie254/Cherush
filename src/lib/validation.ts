import { z } from 'zod'

// ── Sanitisation helper ────────────────────────────────────────────────────

function sanitize(value: string): string {
  return value
    .replace(/[<>]/g, '') // strip potential XSS chars
    .trim()
}

// ── Booking ────────────────────────────────────────────────────────────────

export const bookingSchema = z
  .object({
    roomId:          z.string().uuid('Invalid room selection'),
    checkIn:         z.string().min(10, 'Check-in date required'),
    checkOut:        z.string().min(10, 'Check-out date required'),
    guestsCount:     z.coerce.number().int().min(1, 'At least 1 guest').max(12, 'Maximum 12 guests'),
    guestName:       z.string().min(2, 'Name must be at least 2 characters').max(100).transform(sanitize),
    guestEmail:      z.email('Invalid email address').transform((e) => e.toLowerCase().trim()),
    guestPhone:      z.string().min(6, 'Phone number too short').max(20).transform(sanitize),
    specialRequests: z.string().max(1000).optional().or(z.literal('')).transform((v) => sanitize(v ?? '')),
  })
  .refine(
    (data) => {
      const ci = new Date(data.checkIn)
      const co = new Date(data.checkOut)
      const today = new Date(new Date().toISOString().slice(0, 10))
      return ci >= today
    },
    { message: 'Check-in must be today or later', path: ['checkIn'] }
  )
  .refine(
    (data) => new Date(data.checkOut) > new Date(data.checkIn),
    { message: 'Check-out must be after check-in', path: ['checkOut'] }
  )
  .refine(
    (data) => {
      const nights = Math.ceil(
        (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / 86400000
      )
      return nights <= 90
    },
    { message: 'Maximum stay is 90 nights', path: ['checkOut'] }
  )

export type BookingInput = z.infer<typeof bookingSchema>

// ── Contact ────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name:     z.string().min(2, 'Name too short').max(100).transform(sanitize),
  email:    z.email('Invalid email address').transform((e) => e.toLowerCase().trim()),
  subject:  z.string().min(3, 'Subject too short').max(200).transform(sanitize),
  message:  z.string().min(10, 'Message too short').max(3000).transform(sanitize),
  // Honeypot — must be empty
  website:  z.string().max(0, 'Bot detected').optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
