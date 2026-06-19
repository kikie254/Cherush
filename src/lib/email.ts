import nodemailer from 'nodemailer'
import type { Booking, Room } from '@/types'
import { formatCurrency } from '@/lib/utils'

function getTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const port = Number(process.env.SMTP_PORT || 587)
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
}

export async function sendBookingEmails(booking: Booking, room?: Room) {
  const transport = getTransport()
  if (!transport) return
  const from = process.env.SMTP_FROM || 'Cherush Stay Iten <hello@cherushstayiten.com>'
  const admin = process.env.ADMIN_EMAIL || 'hello@cherushstayiten.com'
  const summary = [
    `Booking code: ${booking.booking_code}`,
    `Room: ${room?.name || booking.rooms?.name || 'Selected room'}`,
    `Check in: ${booking.check_in}`,
    `Check out: ${booking.check_out}`,
    `Guests: ${booking.guests_count}`,
    `Total: ${formatCurrency(booking.total_amount)}`
  ].join('\n')

  await Promise.all([
    transport.sendMail({
      from,
      to: booking.guest_email,
      subject: `Booking received · ${booking.booking_code}`,
      text: `Thank you for your reservation request.\n\n${summary}\n\nOur team will confirm availability shortly.`
    }),
    transport.sendMail({
      from,
      to: admin,
      subject: `New booking request · ${booking.booking_code}`,
      text: `${summary}\n\nGuest: ${booking.guest_name}\nEmail: ${booking.guest_email}\nPhone: ${booking.guest_phone || 'N/A'}\nRequests: ${booking.special_requests || 'None'}`
    })
  ])
}

export async function sendContactEmail(payload: { name: string; email: string; subject: string; message: string }) {
  const transport = getTransport()
  if (!transport) return
  const from = process.env.SMTP_FROM || 'Cherush Stay Iten <hello@cherushstayiten.com>'
  const admin = process.env.ADMIN_EMAIL || 'hello@cherushstayiten.com'
  await transport.sendMail({
    from,
    to: admin,
    replyTo: payload.email,
    subject: `Contact enquiry · ${payload.subject}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
  })
}
