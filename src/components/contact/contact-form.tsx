'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setStatus('')
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
    const data = (await response.json()) as { message?: string; error?: string }
    setStatus(data.message || data.error || 'Completed')
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[28px] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className="rounded-2xl border border-black/10 px-4 py-3 outline-none" />
        <input name="email" required type="email" placeholder="Email" className="rounded-2xl border border-black/10 px-4 py-3 outline-none" />
      </div>
      <input name="subject" required placeholder="Subject" className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" />
      <textarea name="message" required rows={6} placeholder="Message" className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" />
      <div className="flex items-center gap-4">
        <Button type="submit" variant="accent" disabled={loading}>{loading ? 'Sending...' : 'Send message'}</Button>
        {status ? <p className="text-sm text-[var(--color-muted)]">{status}</p> : null}
      </div>
    </form>
  )
}
