'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { formatCurrency, cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2 } from 'lucide-react'

type Availability = {
  blockedDates: string[]
  quote?: { total: number; nights: number; nightlyRate: number }
  available: boolean
  reason?: string
}

export function BookingWidget({ rooms, initialRoomSlug }: { rooms: Room[]; initialRoomSlug?: string }) {
  const defaultRoom = rooms.find((room) => room.slug === initialRoomSlug) ?? rooms[0]
  const [roomId, setRoomId] = useState(defaultRoom?.id ?? '')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guestsCount, setGuestsCount] = useState(1)
  const [step, setStep] = useState(1)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const room = useMemo(() => rooms.find((item) => item.id === roomId), [roomId, rooms])

  const { data, isFetching } = useQuery<Availability>({
    queryKey: ['availability', roomId, checkIn, checkOut, guestsCount],
    queryFn: async () => {
      const params = new URLSearchParams({ roomId, guestsCount: String(guestsCount) })
      if (checkIn) params.set('checkIn', checkIn)
      if (checkOut) params.set('checkOut', checkOut)
      const response = await fetch(`/api/availability?${params.toString()}`)
      return response.json() as Promise<Availability>
    }
  })

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage('')
    const payload = {
      roomId,
      checkIn,
      checkOut,
      guestsCount,
      guestName: String(formData.get('guestName') || ''),
      guestEmail: String(formData.get('guestEmail') || ''),
      guestPhone: String(formData.get('guestPhone') || ''),
      specialRequests: String(formData.get('specialRequests') || '')
    }
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = (await response.json()) as { bookingCode?: string; message?: string; error?: string }
      
      if (result.error) {
        setMessage(result.error)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const InputLabel = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <label className="block space-y-3">
      <span className="text-xs uppercase tracking-widest text-muted/70 font-medium">{title}</span>
      {children}
    </label>
  )

  const InputClass = "w-full rounded-none border-b border-primary/20 bg-transparent px-0 py-3 text-lg text-primary outline-none transition-colors focus:border-accent placeholder:text-muted/30"

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 md:p-14 shadow-premium rounded-[32px] relative overflow-hidden"
            >
              <div className="flex gap-4 mb-12">
                {[1, 2].map(num => (
                  <div key={num} className="flex-1 h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: step >= num ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ))}
              </div>

              <form action={handleSubmit} className="space-y-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <h2 className="font-display text-4xl text-primary tracking-tight">Your stay details</h2>
                      <div className="grid gap-8 md:grid-cols-2">
                        <InputLabel title="Room">
                          <select value={roomId} onChange={(e) => setRoomId(e.target.value)} className={InputClass}>
                            {rooms.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                          </select>
                        </InputLabel>
                        <InputLabel title="Guests">
                          <input type="number" min={1} max={8} value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))} className={InputClass} />
                        </InputLabel>
                        <InputLabel title="Check-in">
                          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={InputClass} />
                        </InputLabel>
                        <InputLabel title="Check-out">
                          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={InputClass} />
                        </InputLabel>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <Button type="button" onClick={() => setStep(2)} variant="primary" disabled={!checkIn || !checkOut || !data?.available}>
                          Continue to Details
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setStep(1)} className="text-muted hover:text-primary transition-colors text-sm uppercase tracking-widest">
                          ← Back
                        </button>
                        <h2 className="font-display text-4xl text-primary tracking-tight">Guest information</h2>
                      </div>
                      
                      <div className="grid gap-8 md:grid-cols-2">
                        <InputLabel title="Full Name">
                          <input name="guestName" required placeholder="Jane Doe" className={InputClass} />
                        </InputLabel>
                        <InputLabel title="Email Address">
                          <input name="guestEmail" required type="email" placeholder="jane@example.com" className={InputClass} />
                        </InputLabel>
                        <div className="md:col-span-2">
                          <InputLabel title="Phone Number">
                            <input name="guestPhone" required placeholder="+254 700 000 000" className={InputClass} />
                          </InputLabel>
                        </div>
                        <div className="md:col-span-2">
                          <InputLabel title="Special Requests">
                            <textarea name="specialRequests" rows={3} placeholder="Dietary requirements, arrival time, etc." className={InputClass} />
                          </InputLabel>
                        </div>
                      </div>
                      <div className="pt-4 flex items-center justify-between">
                        {message ? <p className="text-accent text-sm">{message}</p> : <div/>}
                        <Button type="submit" variant="accent" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" /> Processing
                            </span>
                          ) : 'Submit Request'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary p-10 md:p-16 rounded-[32px] text-white text-center flex flex-col items-center justify-center min-h-[500px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-premium rounded-full flex items-center justify-center mb-8 text-primary"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h2 className="font-display text-4xl md:text-5xl mb-6">Request Received</h2>
              <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed mb-10">
                Thank you for choosing Cherush. Our team will review your request and confirm availability shortly.
              </p>
              <Button href="/" variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-primary">
                Return Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="sticky top-32 rounded-[32px] bg-primary p-10 text-white shadow-premium">
        <p className="text-xs uppercase tracking-[0.3em] text-premium font-medium">Your Stay</p>
        <h3 className="mt-6 font-display text-4xl leading-tight">{room?.name ?? 'Select a room'}</h3>
        
        <div className="mt-12 space-y-6 text-sm text-white/80 border-t border-white/10 pt-8 relative">
          {isFetching && (
            <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm flex items-center justify-center z-10">
              <Loader2 className="w-6 h-6 animate-spin text-premium" />
            </div>
          )}
          
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <span className="uppercase tracking-widest text-xs">Nightly Rate</span>
            <span className="font-display text-xl">{room ? formatCurrency(room.price_per_night) : '-'}</span>
          </div>
          
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <span className="uppercase tracking-widest text-xs">Dates</span>
            <span className="text-right">
              {checkIn && checkOut ? (
                <>
                  <span className="block">{new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="block text-premium">to {new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </>
              ) : '-'}
            </span>
          </div>

          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <span className="uppercase tracking-widest text-xs">Status</span>
            <span className={cn(
              "font-medium",
              data?.available === false ? "text-accent" : "text-emerald-400"
            )}>
              {!checkIn || !checkOut ? 'Select dates' : data?.available === false ? data.reason || 'Unavailable' : 'Available'}
            </span>
          </div>

          <div className="flex justify-between items-end pt-4">
            <span className="uppercase tracking-widest text-xs font-semibold">Total Estimate</span>
            <span className="font-display text-3xl text-premium">
              {data?.quote ? formatCurrency(data.quote.total) : '-'}
            </span>
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs">No payment required until confirmed</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs">Guaranteed secure booking process</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs">Direct communication with host</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
