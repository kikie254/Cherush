import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact/contact-form'
import { GoogleMap } from '@/components/ui/google-map'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/lib/constants'
import { getMetadata } from '@/lib/seo'

export const metadata: Metadata = getMetadata({
  title: 'Contact',
  description: `Get in touch with Cherush Guesthouse in Iten, Kenya. Call, WhatsApp, or email us for bookings, enquiries and directions. ${siteConfig.phone}`,
  path: '/contact',
})

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    color: 'text-primary',
    bg: 'bg-primary/5',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Open chat',
    href: `https://wa.me/${siteConfig.whatsapp}`,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: 'text-accent',
    bg: 'bg-accent/5',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: siteConfig.address,
    href: `https://maps.google.com/?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`,
    color: 'text-premium',
    bg: 'bg-premium/10',
    external: true,
  },
]

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 7:00 PM' },
]

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-24 bg-primary text-white text-center">
        <Container className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-premium font-medium">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl">We&apos;d love to hear from you</h1>
          <p className="text-white/70 max-w-md mx-auto text-lg leading-relaxed">
            Reach out for bookings, availability questions, or local travel advice.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-16">
          {/* Contact cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map(({ icon: Icon, label, value, href, color, bg, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center gap-3 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className={`h-12 w-12 rounded-full ${bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted font-medium">{label}</p>
                  <p className="mt-1 text-sm font-medium text-primary break-all">{value}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Map + Form grid */}
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Location"
                title="Find us in Iten"
                body="We're on the Iten-Kabarnet Road, a quiet and accessible spot in the heart of the highlands."
              />

              {/* Map */}
              <GoogleMap />

              {/* Hours */}
              <div className="rounded-[20px] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-primary text-sm uppercase tracking-widest">Opening Hours</h3>
                </div>
                <ul className="space-y-2.5">
                  {hours.map(({ day, time }) => (
                    <li key={day} className="flex justify-between text-sm text-muted">
                      <span>{day}</span>
                      <span className="font-medium text-primary">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency */}
              <div className="flex items-start gap-3 rounded-[16px] bg-accent/5 border border-accent/10 px-5 py-4">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-primary">Emergency contact</p>
                  <p className="text-muted mt-0.5">
                    For urgent matters outside office hours, WhatsApp{' '}
                    <Link href={`https://wa.me/${siteConfig.whatsapp}`} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      {siteConfig.phone}
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <SectionHeading
                eyebrow="Write to us"
                title="Send a message"
                body="Fill in the form and we'll get back to you within a few hours."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
