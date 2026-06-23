'use client'

import { useSearchParams } from 'next/navigation'
import { useState, use, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { cancelBookingByCode } from '@/lib/actions/bookings'
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Suspense } from 'react'

function CancelBookingForm() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleCancel = async () => {
    if (!code) return
    setLoading(true)
    setError('')
    try {
      const res = await cancelBookingByCode(code)
      if (res.ok) {
        setSuccess(true)
      } else {
        setError(res.error || 'Failed to cancel reservation.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!code) {
    return (
      <div className="bg-white p-10 md:p-14 shadow-premium rounded-[32px] max-w-xl mx-auto text-center space-y-6">
        <AlertTriangle className="w-16 h-16 text-accent mx-auto" />
        <h2 className="font-display text-3xl text-primary">Invalid Booking Code</h2>
        <p className="text-muted leading-relaxed">
          The booking cancellation link is invalid or missing the confirmation code. Please check your email.
        </p>
        <Button href="/" variant="primary">Return Home</Button>
      </div>
    )
  }

  return (
    <div className="bg-white p-10 md:p-14 shadow-premium rounded-[32px] max-w-xl mx-auto text-center space-y-8">
      {!success ? (
        <>
          <AlertTriangle className="w-16 h-16 text-accent mx-auto animate-bounce" />
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-primary">Cancel Reservation?</h2>
            <p className="text-muted leading-relaxed">
              Are you sure you want to cancel the booking request for code <strong className="text-primary font-semibold">{code}</strong>? This action cannot be undone.
            </p>
          </div>

          {error && (
            <div className="bg-accent/5 text-accent text-sm p-4 rounded-xl border border-accent/10">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              type="button"
              onClick={handleCancel}
              variant="accent"
              disabled={loading}
              className="px-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </span>
              ) : 'Confirm Cancellation'}
            </Button>
            <Button href="/" variant="secondary" disabled={loading}>
              Keep Reservation
            </Button>
          </div>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-primary">Reservation Cancelled</h2>
            <p className="text-muted leading-relaxed">
              Your request for <strong className="text-primary font-semibold">{code}</strong> has been cancelled. A confirmation email has been sent to you.
            </p>
          </div>
          <div className="pt-4">
            <Button href="/" variant="primary">Return Home</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default function CancelBookingPage() {
  return (
    <section className="py-32 bg-background min-h-[70vh] flex items-center">
      <Container>
        <Suspense fallback={
          <div className="text-center p-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-accent" />
            <p className="mt-4 text-muted">Loading cancellation form...</p>
          </div>
        }>
          <CancelBookingForm />
        </Suspense>
      </Container>
    </section>
  )
}
