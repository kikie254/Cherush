import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { Check, MapPin, Calendar, Clock, Star } from 'lucide-react'
import type { Room } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { DistanceCalculator } from '@/components/ui/distance-calculator'

interface LandingPageProps {
  title: string
  subtitle: string
  introHeading: string
  introText: string
  featuresHeading: string
  features: string[]
  mainContentHtml: React.ReactNode
  rooms: Room[]
  faqs: { question: string; answer: string }[]
  targetKeyword: string
  heroImage: string
}

export function LandingPageTemplate({
  title,
  subtitle,
  introHeading,
  introText,
  featuresHeading,
  features,
  mainContentHtml,
  rooms,
  faqs,
  targetKeyword,
  heroImage
}: LandingPageProps) {
  return (
    <>
      {/* Dynamic SEO Headings & Hero */}
      <header className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={heroImage}
            alt={`${title} - ${targetKeyword}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary mix-blend-multiply" />
        </div>
        <Container className="relative z-10 space-y-6 max-w-4xl text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-premium font-semibold">
            Premium Accommodation in Iten, Kenya
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button href="/bookings" variant="premium" className="scale-105 shadow-lg">
              Check Rates & Availability
            </Button>
            <Button href="/contact" variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-primary">
              Ask Our Team
            </Button>
          </div>
        </Container>
      </header>

      {/* Trust & Accreditations Bar */}
      <section className="border-b border-primary/10 bg-white py-8">
        <Container className="flex flex-wrap justify-around items-center gap-6 text-sm text-muted font-medium">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-premium fill-premium" />
            <span>4.9/5 Guest Rating</span>
          </div>
          <div className="h-4 w-px bg-primary/10 hidden md:block" />
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>High-Speed Fiber WiFi (Backup Power)</span>
          </div>
          <div className="h-4 w-px bg-primary/10 hidden md:block" />
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Walking distance to Kamariny Stadium</span>
          </div>
        </Container>
      </section>

      {/* Intro Editorial */}
      <section className="py-20 bg-background">
        <Container className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Welcome to Cherush Stay</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary tracking-tight">{introHeading}</h2>
            <p className="text-lg leading-relaxed text-muted">{introText}</p>
            <div className="prose prose-slate max-w-none text-muted leading-relaxed">
              {mainContentHtml}
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-[32px] p-8 md:p-10 border border-primary/10 space-y-8">
            <h3 className="font-display text-2xl text-primary tracking-tight">{featuresHeading}</h3>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Interactive Distance Calculator (Local SEO) */}
      <section className="py-20 bg-white border-y border-primary/5">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Local Proximity"
            title="Convenience for training and transit"
            body={`We are situated in a calm residential zone of Iten. See how close Cherush is to track and road routes.`}
          />
          <DistanceCalculator />
        </Container>
      </section>

      {/* Available Rooms Section (Direct Conversion Grid) */}
      <section className="py-20 bg-background">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Select Your Space"
            title="Ready-to-book accommodation options"
            body="Flexible rooms designed for short-term tourism, active training blocks, or long stays with custom discounts."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <article key={room.id} className="bg-white rounded-[24px] overflow-hidden shadow-premium border border-primary/5 flex flex-col h-full">
                <div className="relative h-60 w-full">
                  <Image
                    src={room.cover_image}
                    alt={`${room.name} room at Cherush Stay Iten`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {room.beds}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-display text-2xl text-primary mb-2">{room.name}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{room.short_description}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 3).map((feat, i) => (
                        <span key={i} className="text-[11px] bg-primary/5 px-2.5 py-1 rounded text-primary font-medium">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-primary/10 pt-6 flex items-center justify-between">
                    <div>
                      <span className="block text-xs uppercase text-muted tracking-wider">From</span>
                      <span className="font-display text-2xl text-accent font-semibold">{formatCurrency(room.price_per_night)}</span>
                      <span className="text-muted text-xs">/ night</span>
                    </div>
                    <Button href={`/bookings?room=${room.slug}`} variant="primary">
                      Reserve
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Target Page FAQs */}
      <section className="py-20 bg-white">
        <Container className="max-w-4xl space-y-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            body={`Answers to queries regarding ${targetKeyword} and staying at Cherush Stay.`}
            center
          />
          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border-b border-primary/10 pb-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-display text-xl text-primary font-medium tracking-tight">
                    {faq.question}
                  </h3>
                  <span className="transition-transform group-open:rotate-180 bg-primary/5 rounded-full p-2">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-muted leading-relaxed pl-2 border-l-2 border-accent">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
