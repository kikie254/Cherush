'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { trackChatbotOpen, trackChatbotQuestion, trackWhatsAppClick } from '@/lib/analytics'

type Message = { id: number; role: 'assistant' | 'user'; text: string }

// ────────────────────────────────────────────────────────────────────────────
// Knowledge base — answers 20+ categories without any API key
// ────────────────────────────────────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/price|cost|rate|how much|tariff|fee|kes|kes?\s*\d/i],
    answer:
      '🏷️ **Room rates:**\n• Bed Sitter — **KES 1,000/night** (KES 6,000/week · KES 22,000/month)\n• One Bedroom — **KES 1,500/night** (KES 9,000/week · KES 32,000/month)\n• Extended Stay (2-BR) — **KES 2,500/night** (KES 15,000/week · KES 50,000/month)\n\nAll prices are in Kenyan Shillings. Longer stays get automatic discounts.',
  },
  {
    patterns: [/availab|book|reserv|check[\s-]?in|check[\s-]?out|dates?/i],
    answer:
      '📅 To check availability and book:\n1. Use our [Bookings page](/bookings) to select dates\n2. Or WhatsApp us directly — fastest response\n3. Or use the booking bar at the bottom of this page\n\nNo payment is required until we confirm your request.',
  },
  {
    patterns: [/wifi|wi-fi|internet|network|connection|fibre|fiber/i],
    answer:
      '📶 Yes! We offer **high-speed fibre WiFi** in all rooms — consistently reliable for remote work, Zoom calls, and streaming.',
  },
  {
    patterns: [/breakfast|meal|food|eat|kitchen|cook|dining/i],
    answer:
      '🍳 **Kitchen / dining:**\n• All rooms have a fully equipped kitchen or kitchenette\n• You can self-cater with ease\n• Nearby local cafés and eateries within a short walk\n• We can recommend the best spots for breakfast in Iten!',
  },
  {
    patterns: [/park|car|vehicle|motor|drive|parking/i],
    answer: '🅿️ Yes — **free, secure off-street parking** is available for all guests.',
  },
  {
    patterns: [/direction|location|where|map|find|address|get there|navigate|gps|coordinate/i],
    answer:
      `📍 **We are on the Iten-Kabarnet Road**, Iten, Elgeyo-Marakwet County, Kenya.\n\nCoordinates: ${siteConfig.coordinates.lat}, ${siteConfig.coordinates.lng}\n\n[View on Google Maps](https://maps.google.com/?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}) · [Get Directions](https://www.google.com/maps/dir/?api=1&destination=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng})`,
  },
  {
    patterns: [/check[\s-]?in time|arrival|when can i check in|from when/i],
    answer: '🕑 **Check-in:** from **2:00 PM**\n\nEarly check-in can often be arranged (subject to availability) — just let us know in advance via WhatsApp.',
  },
  {
    patterns: [/check[\s-]?out|departure|when.*leave|when.*go|until when/i],
    answer: '🕐 **Check-out:** by **11:00 AM**\n\nLate check-out is sometimes possible — please ask the host the evening before.',
  },
  {
    patterns: [/contact|phone|call|whatsapp|email|reach|message|talk/i],
    answer: `📞 **Contact us:**\n• **Phone / WhatsApp:** ${siteConfig.phone}\n• **Email:** ${siteConfig.email}\n\nOr click the green WhatsApp button on this page for an instant chat!`,
  },
  {
    patterns: [/amenity|amenities|facility|facilities|feature|include|offer|provide/i],
    answer:
      '✨ **What\'s included:**\n• High-speed fibre WiFi\n• Full kitchen or kitchenette\n• Hot water shower\n• Free secure parking\n• Private workspace / desk\n• Cosy lounge area\n• Clean, well-maintained rooms\n• Quiet residential location',
  },
  {
    patterns: [/runner|athlete|training|marathon|track|run|sport|altitude|altitude training|kamariny/i],
    answer:
      '🏃 **Athlete stays:** Absolutely! We are **athlete-friendly** and host many runners training at altitude in Iten.\n\n• Close to Kamariny Stadium\n• Access to highland training routes\n• Quiet property ideal for recovery\n• Early morning starts fully supported\n• Long-stay discounts for training camps',
  },
  {
    patterns: [/pet|dog|cat|animal/i],
    answer: '🐾 We do not currently accommodate pets. Contact us directly if you have a special situation to discuss.',
  },
  {
    patterns: [/cancel|refund|policy|change.*booking|modify/i],
    answer: '🔄 **Cancellation & modification:**\n• No payment is required until booking is confirmed\n• Cancellations before confirmation are free\n• After confirmation, please contact us as early as possible\n• Modifications subject to availability — WhatsApp us for fastest help',
  },
  {
    patterns: [/house rule|rules?|policy|noise|quiet|guest|visitor/i],
    answer:
      '📋 **House rules:**\n• No smoking inside rooms\n• Visitors must be registered\n• Quiet hours after 10 PM\n• Respect common areas\n• Report maintenance issues promptly\n• Checkout by 11:00 AM',
  },
  {
    patterns: [/attraction|nearby|visit|tourist|sight|place|activity|excursion|what.*do/i],
    answer:
      '🗺️ **Nearby attractions:**\n• **Iten Viewpoint** — breathtaking valley sunrise views\n• **Kamariny Stadium** — legendary athletics track\n• **Kerio Valley** — scenic highland drives\n• **Cheploch Gorge** — stunning day-trip destination\n• **Local markets** — fresh produce and local culture\n• **Training trails** — multiple routes for runners & hikers',
  },
  {
    patterns: [/laundry|wash|cloth|iron/i],
    answer: '👕 Laundry support is available for guests on extended stays. Please ask the host for arrangements.',
  },
  {
    patterns: [/family|children|kids|child|baby|cot|crib/i],
    answer: '👨‍👩‍👧 Yes! We welcome families. Our One Bedroom and Extended Stay units are great for families. Let us know if you need a cot or any child-friendly arrangements.',
  },
  {
    patterns: [/group|team|camp|corporate|retreat|conference/i],
    answer: '👥 We accommodate **group stays and training camps**. The Extended Stay unit fits groups, and we can arrange multiple rooms. Contact us for group rates.',
  },
  {
    patterns: [/remote|work|laptop|workspace|desk|productive|co.?work/i],
    answer: '💻 **Remote work friendly:**\n• Dedicated workspace/desk in all units\n• High-speed fibre WiFi\n• Quiet residential environment\n• Reliable power supply\n• Weekly/monthly rates for longer work stays',
  },
  {
    patterns: [/hello|hi|hey|howdy|good\s*(morning|afternoon|evening)|hujambo|habari/i],
    answer:
      `👋 Hello! Welcome to **Cherush Guesthouse** in Iten, Kenya!\n\nI'm your AI concierge. Ask me about:\n• 🏷️ Room prices & rates\n• 📅 Availability & bookings\n• 📍 Location & directions\n• ✨ Amenities & facilities\n• 🏃 Athlete & group stays\n• 📋 House rules & policies`,
  },
  {
    patterns: [/thank|thanks|thx|asante|sawa/i],
    answer: '😊 You\'re welcome! Feel free to ask anything else, or **WhatsApp us** for the fastest response. We look forward to hosting you!',
  },
]

function getAnswer(question: string): string {
  for (const entry of KB) {
    if (entry.patterns.some((p) => p.test(question))) return entry.answer
  }
  return `I'm not sure about that, but our team will happily assist!\n\n📞 **Phone/WhatsApp:** ${siteConfig.phone}\n📧 **Email:** ${siteConfig.email}\n\nOr visit our [Contact page](/contact) for all options.`
}

const INITIAL: Message = {
  id:   0,
  role: 'assistant',
  text: `👋 Hi! I'm the **Cherush AI Concierge**.\n\nAsk me anything about rooms, prices, availability, directions, amenities, or your stay in Iten!`,
}

const QUICK_Qs = [
  'What are the room rates?',
  'Is WiFi available?',
  'How do I get there?',
  'What time is check-in?',
]

export function Chatbot() {
  const [open,    setOpen]    = useState(false)
  const [msgs,    setMsgs]    = useState<Message[]>([INITIAL])
  const [input,   setInput]   = useState('')
  const [typing,  setTyping]  = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300) }, [open])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  function handleOpen() { setOpen(true); trackChatbotOpen() }

  function sendMsg(text: string) {
    if (!text.trim()) return
    setMsgs((p) => [...p, { id: Date.now(), role: 'user', text: text.trim() }])
    setInput('')
    setTyping(true)
    trackChatbotQuestion(text.trim())
    setTimeout(() => {
      setMsgs((p) => [...p, { id: Date.now() + 1, role: 'assistant', text: getAnswer(text) }])
      setTyping(false)
    }, 700 + Math.random() * 500)
  }

  function renderText(text: string) {
    return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i}>{part.slice(2, -2)}</strong>
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (m) return <a key={i} href={m[2]} target={m[2].startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="underline text-premium">{m[1]}</a>
      if (part === '\n') return <br key={i} />
      return <span key={i}>{part}</span>
    })
  }

  return (
    <>
      {/* Toggle */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        style={{ height: 52, width: 52, bottom: '5.5rem' }}
        className="fixed right-6 z-50 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={open ? 'Close AI concierge' : 'Open AI concierge'}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="c" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
            : <motion.div key="o" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Bot className="w-5 h-5" /></motion.div>
          }
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" aria-label="Online" />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            style={{ maxHeight: '70vh', bottom: '10rem' }}
            role="dialog"
            aria-label="Cherush AI Concierge chat"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-premium/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-premium" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Cherush Concierge</p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
                    Online · Instant replies
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors p-1 rounded" aria-label="Minimise chat">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f8f7f4]" role="log" aria-live="polite" aria-label="Chat messages">
              {msgs.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0" aria-hidden="true">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-white text-primary shadow-sm rounded-bl-md'}`}>
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-label="Concierge is typing">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0"><Bot className="w-3 h-3 text-primary" /></div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-2 w-2 rounded-full bg-primary/30"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions (first message only) */}
            {msgs.length <= 1 && (
              <div className="px-4 pb-3 flex gap-2 flex-wrap bg-[#f8f7f4]">
                {QUICK_Qs.map((q) => (
                  <button key={q} onClick={() => sendMsg(q)}
                    className="text-xs bg-white border border-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp fallback */}
            <div className="px-4 pb-3 bg-[#f8f7f4]">
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('chatbot')}
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white text-xs font-medium py-2 rounded-xl hover:bg-emerald-600 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                Chat directly on WhatsApp
              </a>
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-black/5 bg-white flex items-center gap-3 shrink-0">
              <input ref={inputRef} type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input) } }}
                placeholder="Ask anything about your stay…"
                className="flex-1 text-sm text-primary placeholder:text-muted/50 outline-none bg-transparent"
                aria-label="Type your question"
              />
              <button onClick={() => sendMsg(input)} disabled={!input.trim() || typing}
                className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Send message">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
