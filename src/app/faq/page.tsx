import { getMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about staying at Cherush Guesthouse in Iten, Kenya — check-in times, payment methods, cancellations, WiFi, meals, and more.',
  path: '/faq',
  keywords: [
    'Cherush Guesthouse FAQ',
    'Iten guesthouse questions',
    'check in Iten hotel',
    'cancellation policy guesthouse Kenya',
  ],
})

const faqs = [
  {
    question: 'What time is check-in and check-out?',
    answer: 'Check-in is from 2:00 PM. Check-out is before 11:00 AM. Early check-in or late check-out can be arranged subject to availability — please contact us in advance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, Visa, Mastercard, and cash (KES). Payment is confirmed after your booking is approved. We do not require payment upfront during the request stage.',
  },
  {
    question: 'Is breakfast included in the room rate?',
    answer: 'Breakfast is available on request at an additional cost. All rooms include self-catering kitchen access so you can prepare your own meals.',
  },
  {
    question: 'Is there WiFi at Cherush Guesthouse?',
    answer: 'Yes — we provide high-speed fibre optic WiFi throughout the property. It is fast enough for remote work, video calls, and uploading training data.',
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes. Cancellations made at least 48 hours before check-in are free of charge. See our full cancellation policy for details.',
  },
  {
    question: 'Is the guesthouse suitable for athletes?',
    answer: 'Absolutely. Cherush Guesthouse is custom-built for athletes visiting Iten for training. We offer hot showers, laundry facilities, self-catering kitchens, and we are within walking distance of major running trails and Kamariny Stadium.',
  },
  {
    question: 'Do you offer long-stay discounts?',
    answer: 'Yes — weekly stays receive approximately 15% off the nightly rate, and monthly stays receive up to 30–40% off. Discounts are calculated automatically in the booking widget.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes. We have a secure gated compound with free parking for all guests.',
  },
  {
    question: 'Are children and families welcome?',
    answer: 'Yes — we have spacious family rooms and a safe, quiet compound that is ideal for families. Children of all ages are welcome.',
  },
  {
    question: 'How far is Cherush Guesthouse from Kamariny Stadium?',
    answer: 'Cherush Guesthouse is approximately 2.1 km from Kamariny Stadium — a short run or drive. The famous Iten running trails begin right at our gate.',
  },
]

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'FAQ', item: '/faq' },
])

const faqSchema = getFAQSchema(faqs)

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <main className="min-h-screen bg-background pt-32 pb-20">
        <Container>
          <SectionHeading
            eyebrow="Need Help?"
            title="Frequently Asked Questions"
            body="Everything you need to know about staying at Cherush Guesthouse in Iten, Kenya."
          />
          <h1 className="sr-only">Cherush Guesthouse — Frequently Asked Questions</h1>

          <div className="mt-16 space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-primary/5"
              >
                <h2 className="font-semibold text-lg text-primary mb-3">{faq.question}</h2>
                <p className="text-text/75 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-4">
            <p className="text-text/70">Still have questions? We&apos;re happy to help.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Contact Us
              </Link>
              <Link
                href="/cancellation-policy"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Cancellation Policy
              </Link>
              <Link
                href="/house-rules"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                House Rules
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
