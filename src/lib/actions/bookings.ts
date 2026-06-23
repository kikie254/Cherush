'use server'

import { adminDb } from '@/lib/firebase/admin'
import nodemailer from 'nodemailer'
import { formatCurrency } from '@/lib/utils'

type Result = { ok: boolean; error?: string }

function getTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const port = Number(process.env.SMTP_PORT || 587)
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
}

export async function cancelBookingByCode(code: string): Promise<Result> {
  if (!code) return { ok: false, error: 'Booking code is required.' }

  try {
    // Find booking with this code
    const snap = await adminDb.collection('bookings').get()
    let bookingDocId = ''
    let bookingData: any = null

    snap.docs.forEach((doc: any) => {
      const data = doc.data()
      if (data.booking_code === code) {
        bookingDocId = doc.id
        bookingData = data
      }
    })

    if (!bookingDocId || !bookingData) {
      return { ok: false, error: 'Booking request not found.' }
    }

    if (bookingData.status === 'cancelled') {
      return { ok: false, error: 'This booking has already been cancelled.' }
    }

    // Update status to cancelled
    await adminDb.collection('bookings').doc(bookingDocId).update({ status: 'cancelled' })

    // Send cancellation emails
    const transport = getTransport()
    if (transport) {
      const from = process.env.SMTP_FROM || 'Cherush Stay Iten <hello@cherushstayiten.com>'
      const admin = process.env.ADMIN_EMAIL || 'hello@cherushstayiten.com'
      const summary = [
        `Booking code: ${bookingData.booking_code}`,
        `Room: ${bookingData.rooms?.name || 'Selected room'}`,
        `Check in: ${bookingData.check_in}`,
        `Check out: ${bookingData.check_out}`,
        `Total: ${formatCurrency(bookingData.total_amount)}`,
        `Status: CANCELLED BY GUEST`
      ].join('\n')

      await Promise.all([
        transport.sendMail({
          from,
          to: bookingData.guest_email,
          subject: `Booking Request Cancelled · ${bookingData.booking_code}`,
          text: `Your reservation request at Cherush has been cancelled.\n\n${summary}`
        }),
        transport.sendMail({
          from,
          to: admin,
          subject: `Booking Request Cancelled by Guest · ${bookingData.booking_code}`,
          text: `A guest has cancelled their booking request.\n\n${summary}\n\nGuest: ${bookingData.guest_name}\nEmail: ${bookingData.guest_email}`
        })
      ])
    }

    return { ok: true }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to cancel booking'
    return { ok: false, error: errorMsg }
  }
}
