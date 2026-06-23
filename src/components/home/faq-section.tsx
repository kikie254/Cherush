'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs as defaultFaqs } from '@/lib/site-data'

interface FaqItem {
  question: string
  answer: string
}

export function FAQSection({ items = defaultFaqs }: { items?: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-32 bg-primary/5">
      <Container className="max-w-4xl space-y-12">
        <SectionHeading
          eyebrow="Common Inquiries"
          title="Frequently Asked Questions"
          body="Everything you need to know about our rooms, location, facilities, and high altitude support."
          center
        />
        
        <div className="mt-12 space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 font-display text-lg md:text-xl text-primary font-medium tracking-tight hover:text-accent transition-colors"
                >
                  <span>{item.question}</span>
                  <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 text-accent">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 text-muted leading-relaxed border-t border-primary/5 text-sm md:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
