import nodemailer from 'nodemailer'
import type { Booking, Room } from '@/types'
import { formatCurrency } from '@/lib/utils'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cherushguesthouse.com'
const FROM     = process.env.SMTP_FROM || 'Cherush Guesthouse <bookings@cherushguesthouse.com>'
const ADMIN    = process.env.ADMIN_EMAIL || 'bookings@cherushguesthouse.com'

function getTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const port = Number(process.env.SMTP_PORT || 587)
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
}

// ---------------------------------------------------------------------------
// HTML email helpers
// ---------------------------------------------------------------------------

function htmlWrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:32px 16px;">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
      <!-- Header -->
      <tr><td style="background:#1d2a22;padding:32px 40px;">
        <h1 style="margin:0;color:#c9a96e;font-size:24px;font-weight:600;letter-spacing:-0.5px;">Cherush Guesthouse</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Iten, Elgeyo-Marakwet County, Kenya</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="padding:40px;">${body}</td></tr>
      <!-- Footer -->
      <tr><td style="background:#f8f7f4;padding:24px 40px;border-top:1px solid #e8e8e8;">
        <p style="margin:0;color:#5d675f;font-size:12px;">© ${new Date().getFullYear()} Cherush Guesthouse · Iten, Kenya</p>
        <p style="margin:4px 0 0;color:#5d675f;font-size:12px;">
          <a href="${SITE_URL}" style="color:#b85c38;">Visit website</a> · 
          <a href="mailto:bookings@cherushguesthouse.com" style="color:#b85c38;">Contact us</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

function bookingSummaryHtml(booking: Booking, roomName: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <table width="100%" cellpadding="6" cellspacing="0">
          ${[
            ['Booking Code',  `<strong style="font-family:monospace;color:#b85c38;">${booking.booking_code}</strong>`],
            ['Room',          roomName],
            ['Check-in',      booking.check_in],
            ['Check-out',     booking.check_out],
            ['Guests',        String(booking.guests_count)],
            ['Total',         `<strong>${formatCurrency(booking.total_amount)}</strong>`],
            ['Status',        '<span style="color:#1d2a22;font-weight:600;">Pending Confirmation</span>'],
          ].map(([label, value]) => `
            <tr>
              <td style="color:#5d675f;font-size:13px;width:40%;">${label}</td>
              <td style="color:#1d2a22;font-size:13px;">${value}</td>
            </tr>
          `).join('')}
        </table>
      </td></tr>
    </table>`
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function sendBookingEmails(booking: Booking, room?: Room) {
  const transport = getTransport()
  if (!transport) return

  const roomName = room?.name || booking.rooms?.name || 'Selected Room'
  const cancelUrl = `${SITE_URL}/bookings/cancel?code=${booking.booking_code}`
  const summaryHtml = bookingSummaryHtml(booking, roomName)

  // Guest confirmation
  const guestHtml = htmlWrap(
    `Booking Request Received · ${booking.booking_code}`,
    `<h2 style="margin:0 0 8px;color:#1d2a22;font-size:20px;">Request received</h2>
     <p style="color:#5d675f;font-size:14px;margin:0 0 24px;line-height:1.6;">
       Thank you for choosing Cherush Guesthouse, <strong>${booking.guest_name}</strong>. 
       Your booking request has been received and our team will confirm availability within a few hours.
     </p>
     ${summaryHtml}
     ${booking.special_requests ? `<p style="color:#5d675f;font-size:13px;"><strong>Special requests:</strong> ${booking.special_requests}</p>` : ''}
     <p style="color:#5d675f;font-size:13px;margin-top:24px;">
       Need to cancel? <a href="${cancelUrl}" style="color:#b85c38;">Click here</a> to cancel this request.
     </p>`
  )

  // Admin notification
  const adminHtml = htmlWrap(
    `New Booking · ${booking.booking_code}`,
    `<h2 style="margin:0 0 8px;color:#1d2a22;font-size:20px;">New booking request</h2>
     ${summaryHtml}
     <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom:16px;">
       <tr><td style="color:#5d675f;font-size:13px;width:40%;">Guest</td>
           <td style="color:#1d2a22;font-size:13px;">${booking.guest_name}</td></tr>
       <tr><td style="color:#5d675f;font-size:13px;">Email</td>
           <td style="color:#1d2a22;font-size:13px;"><a href="mailto:${booking.guest_email}">${booking.guest_email}</a></td></tr>
       <tr><td style="color:#5d675f;font-size:13px;">Phone</td>
           <td style="color:#1d2a22;font-size:13px;">${booking.guest_phone || 'Not provided'}</td></tr>
       ${booking.special_requests ? `<tr><td style="color:#5d675f;font-size:13px;">Requests</td>
           <td style="color:#1d2a22;font-size:13px;">${booking.special_requests}</td></tr>` : ''}
     </table>
     <a href="${SITE_URL}/admin/bookings" style="display:inline-block;background:#1d2a22;color:#ffffff;padding:12px 24px;border-radius:8px;font-size:13px;text-decoration:none;">
       Review in Admin Dashboard
     </a>`
  )

  await Promise.allSettled([
    transport.sendMail({
      from: FROM,
      to: booking.guest_email,
      subject: `Booking Request Received · ${booking.booking_code}`,
      html: guestHtml,
      text: `Thank you ${booking.guest_name}. Booking code: ${booking.booking_code}. Room: ${roomName}. Check-in: ${booking.check_in}. Check-out: ${booking.check_out}. Total: ${formatCurrency(booking.total_amount)}.`,
    }),
    transport.sendMail({
      from: FROM,
      to: ADMIN,
      subject: `New Booking Request · ${booking.booking_code}`,
      html: adminHtml,
      text: `New booking from ${booking.guest_name} (${booking.guest_email}). Code: ${booking.booking_code}.`,
    }),
  ])
}

export async function sendContactEmail(payload: {
  name: string; email: string; subject: string; message: string
}) {
  const transport = getTransport()
  if (!transport) return

  const html = htmlWrap(
    `Contact Enquiry · ${payload.subject}`,
    `<h2 style="margin:0 0 8px;color:#1d2a22;font-size:20px;">New contact message</h2>
     <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom:16px;">
       <tr><td style="color:#5d675f;font-size:13px;width:30%;">Name</td>
           <td style="color:#1d2a22;font-size:13px;">${payload.name}</td></tr>
       <tr><td style="color:#5d675f;font-size:13px;">Email</td>
           <td style="color:#1d2a22;font-size:13px;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
       <tr><td style="color:#5d675f;font-size:13px;">Subject</td>
           <td style="color:#1d2a22;font-size:13px;">${payload.subject}</td></tr>
     </table>
     <div style="background:#f8f7f4;border-radius:12px;padding:20px 24px;">
       <p style="margin:0;color:#1d2a22;font-size:14px;line-height:1.7;">${payload.message.replace(/\n/g, '<br>')}</p>
     </div>`
  )

  await transport.sendMail({
    from: FROM,
    to:      ADMIN,
    replyTo: payload.email,
    subject: `Contact enquiry · ${payload.subject}`,
    html,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  })
}

export async function sendStatusEmail(booking: Booking, status: string) {
  const transport = getTransport()
  if (!transport) return

  const isApproved = status === 'approved'
  const isRejected = status === 'rejected'

  const subject = isApproved
    ? `Booking Confirmed ✓ · ${booking.booking_code}`
    : isRejected
    ? `Booking Update · ${booking.booking_code}`
    : `Booking Status Update · ${booking.booking_code}`

  const bodyContent = isApproved
    ? `<h2 style="margin:0 0 8px;color:#1d2a22;">Your booking is confirmed! 🎉</h2>
       <p style="color:#5d675f;font-size:14px;line-height:1.6;margin:0 0 24px;">
         Great news, <strong>${booking.guest_name}</strong>! Your stay at Cherush Guesthouse has been confirmed.
       </p>
       ${bookingSummaryHtml(booking, booking.rooms?.name || 'Your room')}
       <p style="color:#5d675f;font-size:13px;">Check-in from 2:00 PM · Check-out by 11:00 AM</p>`
    : isRejected
    ? `<h2 style="margin:0 0 8px;color:#1d2a22;">Booking update</h2>
       <p style="color:#5d675f;font-size:14px;line-height:1.6;margin:0 0 24px;">
         Unfortunately we are unable to accommodate your request for booking <strong>${booking.booking_code}</strong> at this time.
         Please contact us to explore alternative dates.
       </p>
       <a href="${SITE_URL}/bookings" style="display:inline-block;background:#1d2a22;color:#ffffff;padding:12px 24px;border-radius:8px;font-size:13px;text-decoration:none;">
         View other dates
       </a>`
    : `<h2 style="margin:0 0 8px;color:#1d2a22;">Booking status updated</h2>
       <p style="color:#5d675f;font-size:14px;">Your booking <strong>${booking.booking_code}</strong> status: <strong>${status.toUpperCase()}</strong></p>`

  await transport.sendMail({
    from: FROM,
    to:      booking.guest_email,
    subject,
    html:    htmlWrap(subject, bodyContent),
    text:    `Booking ${booking.booking_code} status updated to ${status.toUpperCase()}.`,
  })
}
