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

  const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/bookings/cancel?code=${booking.booking_code}`

  await Promise.all([
    transport.sendMail({
      from,
      to: booking.guest_email,
      subject: `Booking received · ${booking.booking_code}`,
      text: `Thank you for your reservation request.\n\n${summary}\n\nOur team will confirm availability shortly.\n\nIf you need to cancel this request, you can do so here: ${cancelUrl}`
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

export async function sendStatusEmail(booking: Booking, status: string) {
  const transport = getTransport()
  if (!transport) return
  const from = process.env.SMTP_FROM || 'Cherush Stay Iten <hello@cherushstayiten.com>'
  
  let subject = `Booking Update · ${booking.booking_code}`
  let text = `Your booking request status has been updated to: ${status.toUpperCase()}\n\n`
  
  if (status === 'approved') {
    subject = `Booking Confirmed · ${booking.booking_code}`
    text = `Great news! Your booking request for Cherush Stay Iten has been confirmed.\n\n`
    text += `Booking Code: ${booking.booking_code}\nCheck-in: ${booking.check_in}\nCheck-out: ${booking.check_out}\n\n`
    text += `We look forward to hosting you.`
  } else if (status === 'rejected') {
    subject = `Booking Declined · ${booking.booking_code}`
    text = `Unfortunately, we are unable to accommodate your booking request at this time.\n\n`
    text += `Please contact us if you would like to look at alternative dates.`
  }

  await transport.sendMail({
    from,
    to: booking.guest_email,
    subject,
    text
  })
}
