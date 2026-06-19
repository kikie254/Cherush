import { z } from 'zod'

export const bookingSchema = z.object({
  roomId: z.string().uuid(),
  checkIn: z.string().min(10),
  checkOut: z.string().min(10),
  guestsCount: z.coerce.number().int().min(1).max(8),
  guestName: z.string().min(2),
  guestEmail: z.email(),
  guestPhone: z.string().min(6),
  specialRequests: z.string().max(1000).optional().or(z.literal(''))
})

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(3),
  message: z.string().min(10)
})
