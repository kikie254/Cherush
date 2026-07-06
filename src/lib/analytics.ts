/**
 * Enhanced analytics tracking for Cherush Guesthouse.
 * All functions are no-ops if GA is not configured — safe to call everywhere.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function isGA(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && !!GA_ID
}

export function trackPageView(url: string) {
  if (!isGA()) return
  window.gtag!('config', GA_ID!, { page_path: url })
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!isGA()) return
  window.gtag!('event', action, { ...params, send_to: GA_ID })
}

// ── Booking funnel ─────────────────────────────────────────────────────────

export function trackRoomSearch(roomName: string, checkIn: string, checkOut: string) {
  trackEvent('search', { search_term: roomName, check_in: checkIn, check_out: checkOut })
}

export function trackBookingStarted(roomName: string) {
  trackEvent('begin_checkout', { room_name: roomName })
}

export function trackReservationAttempt(roomName: string) {
  trackEvent('reservation_attempt', { room_name: roomName })
}

export function trackBookingSubmitted(roomName: string, totalAmount: number) {
  trackEvent('booking_submitted', { room_name: roomName, value: totalAmount, currency: 'KES' })
}

export function trackBookingConfirmed(bookingCode: string, totalAmount: number) {
  trackEvent('purchase', { transaction_id: bookingCode, value: totalAmount, currency: 'KES' })
}

// ── CTA conversions ────────────────────────────────────────────────────────

export function trackWhatsAppClick(source: 'floating_button' | 'contact_page' | 'booking_bar' | 'chatbot') {
  trackEvent('whatsapp_click', { source })
}

export function trackPhoneClick(source = 'contact_page') {
  trackEvent('phone_click', { source })
}

export function trackMapClick() {
  trackEvent('map_click')
}

export function trackContactFormSubmit() {
  trackEvent('contact_form_submit')
}

// ── Engagement ─────────────────────────────────────────────────────────────

export function trackGalleryOpen() {
  trackEvent('gallery_open')
}

export function trackGalleryView() {
  trackEvent('gallery_view')
}

export function trackRoomView(roomName: string) {
  trackEvent('room_view', { room_name: roomName })
}

export function trackChatbotOpen() {
  trackEvent('chatbot_open')
}

export function trackChatbotQuestion(question: string) {
  trackEvent('chatbot_question', { question: question.slice(0, 100) })
}

// ── Scroll depth ───────────────────────────────────────────────────────────

const SCROLL_MILESTONES = [25, 50, 75, 90]
const firedMilestones = new Set<number>()

export function initScrollTracking() {
  if (typeof window === 'undefined') return

  function handleScroll() {
    const scrollPct = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    )
    for (const milestone of SCROLL_MILESTONES) {
      if (scrollPct >= milestone && !firedMilestones.has(milestone)) {
        firedMilestones.add(milestone)
        trackEvent('scroll_depth', { percent: milestone })
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

// ── Time on page ────────────────────────────────────────────────────────────

let pageStartTime = 0

export function initTimeTracking() {
  if (typeof window === 'undefined') return
  pageStartTime = Date.now()

  const handleUnload = () => {
    const seconds = Math.round((Date.now() - pageStartTime) / 1000)
    if (seconds > 5) {
      trackEvent('time_on_page', { seconds, page: window.location.pathname })
    }
  }

  window.addEventListener('beforeunload', handleUnload)
  return () => window.removeEventListener('beforeunload', handleUnload)
}

// ── CTA Conversions ─────────────────────────────────────────────────────────

export function trackCtaConversion(
  ctaName: string,
  location: string = 'unknown'
) {
  trackEvent('cta_conversion', { cta_name: ctaName, location })
}

export function trackAvailabilityCheck(roomId: string, checkIn: string, checkOut: string) {
  trackEvent('availability_check', {
    room_id: roomId,
    check_in: checkIn,
    check_out: checkOut,
  })
}

export function trackFormStart(formName: string) {
  trackEvent('form_start', { form_name: formName })
}

export function trackFormAbandonment(formName: string, lastField: string) {
  trackEvent('form_abandonment', { form_name: formName, last_field: lastField })
}

