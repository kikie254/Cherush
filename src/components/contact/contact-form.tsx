'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { trackContactFormSubmit } from '@/lib/analytics'

const InputClass =
  'w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-muted/50'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    setErrorMsg('')

    // Honeypot check — if website field is filled, silently succeed (it's a bot)
    const honeypot = formData.get('website') as string
    if (honeypot) {
      setStatus('success')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    (formData.get('name') as string).trim(),
          email:   (formData.get('email') as string).trim(),
          subject: (formData.get('subject') as string).trim(),
          message: (formData.get('message') as string).trim(),
        }),
      })

      if (response.ok) {
        setStatus('success')
        trackContactFormSubmit()
      } else {
        const data = (await response.json()) as { error?: string }
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] bg-white p-10 shadow-soft text-center">
        <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="font-display text-2xl text-primary">Message sent!</h3>
        <p className="text-muted text-sm max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you within a few hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-[28px] bg-white p-8 shadow-soft"
      noValidate
    >
      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-muted mb-1.5">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Jane Doe"
            className={InputClass}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-muted mb-1.5">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={InputClass}
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-medium text-muted mb-1.5">
          Subject <span className="text-accent">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          minLength={3}
          maxLength={200}
          placeholder="Room availability, long stay enquiry…"
          className={InputClass}
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-medium text-muted mb-1.5">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="Tell us about your stay plans, questions, or anything else…"
          className={InputClass}
          aria-required="true"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3" role="alert">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600">{errorMsg}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          We reply within a few hours during business hours.
        </p>
        <Button type="submit" variant="accent" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </span>
          ) : (
            'Send Message'
          )}
        </Button>
      </div>
    </form>
  )
}
