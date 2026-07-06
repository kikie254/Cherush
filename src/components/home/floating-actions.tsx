'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, MessageSquareCode, X } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { trackWhatsAppClick } from '@/lib/analytics'

const WHATSAPP_MESSAGE = encodeURIComponent(
  `Hello Cherush Guesthouse,\n\nI would like to book a room.\n\nCheck-in: \nCheck-out: \nGuests: \n\nPlease assist me.\n\nThank you.`
)

export function FloatingActions() {
  const [showBar, setShowBar] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [pulsing, setPulsing] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Stop pulsing after 6 s to reduce distraction
    const t = setTimeout(() => setPulsing(false), 6000)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(t)
    }
  }, [])

  const handleRedirect = () => {
    const params = new URLSearchParams()
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('guests', String(guests))
    window.location.href = `/bookings?${params.toString()}`
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${WHATSAPP_MESSAGE}`

  return (
    <>
      {/* ── Floating WhatsApp Button ─────────────────────────────────────── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse ring */}
        {pulsing && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping" />
        )}
        {/* Tooltip */}
        <span className="absolute right-full mr-3 hidden group-hover:flex items-center whitespace-nowrap bg-primary text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
          Chat on WhatsApp
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-primary" />
        </span>
        <MessageSquareCode className="w-6 h-6 relative z-10" />
      </a>

      {/* ── Sticky Booking Bar ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-white/10 px-6 py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.2)] text-white"
            role="region"
            aria-label="Quick booking bar"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Inputs */}
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                {/* Check-in / Check-out */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-premium shrink-0" aria-hidden="true" />
                  <div className="flex gap-2">
                    <label className="sr-only" htmlFor="bar-checkin">Check-in date</label>
                    <input
                      id="bar-checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-white/10 text-white border border-white/20 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:bg-white/20 focus:border-premium transition-colors"
                    />
                    <span className="text-white/50 text-xs self-center" aria-hidden="true">→</span>
                    <label className="sr-only" htmlFor="bar-checkout">Check-out date</label>
                    <input
                      id="bar-checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-white/10 text-white border border-white/20 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:bg-white/20 focus:border-premium transition-colors"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-premium shrink-0" aria-hidden="true" />
                  <label className="sr-only" htmlFor="bar-guests">Number of guests</label>
                  <select
                    id="bar-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:bg-white/20 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="text-primary bg-white">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleRedirect}
                className="w-full md:w-auto bg-premium text-primary font-display font-semibold px-7 py-2.5 rounded-xl text-sm hover:bg-white hover:text-primary transition-all duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-premium focus:ring-offset-2 focus:ring-offset-primary"
              >
                Check Availability
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
