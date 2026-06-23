'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, MessageSquareCode } from 'lucide-react'
import { siteConfig } from '@/lib/constants'

export function FloatingActions() {
  const [showBar, setShowBar] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar after scrolling down 400px
      if (window.scrollY > 400) {
        setShowBar(true)
      } else {
        setShowBar(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRedirect = () => {
    const params = new URLSearchParams()
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('guests', String(guests))
    window.location.href = `/bookings?${params.toString()}`
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=Hello,%20I'm%20interested%20in%20booking%20a%20stay%20at%20Cherush%20Stay%20Iten!`

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping group-hover:animate-none" />
        <MessageSquareCode className="w-6 h-6" />
      </a>

      {/* Sticky / Animated Booking Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-white/10 px-6 py-4 shadow-premium text-white flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto md:rounded-t-[24px] md:bottom-0"
          >
            <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-premium shrink-0" />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-white/10 text-white border-0 rounded px-2.5 py-1 text-xs outline-none focus:bg-white/20 placeholder:text-white/40"
                    placeholder="Check-in"
                  />
                  <span className="text-white/50 text-xs self-center">to</span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-white/10 text-white border-0 rounded px-2.5 py-1 text-xs outline-none focus:bg-white/20 placeholder:text-white/40"
                    placeholder="Check-out"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-premium shrink-0" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-white/10 text-white border-0 rounded px-2.5 py-1 text-xs outline-none focus:bg-white/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="text-primary">
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleRedirect}
              className="w-full md:w-auto bg-premium text-primary font-display font-medium px-6 py-2.5 rounded-xl text-sm hover:bg-white hover:text-primary transition-all duration-300 shrink-0"
            >
              Check Availability
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
