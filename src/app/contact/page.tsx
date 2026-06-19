import Link from 'next/link'
import { ContactForm } from '@/components/contact/contact-form'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { siteConfig } from '@/lib/constants'

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading eyebrow="Contact" title="Reach out about availability, long stays, or local plans" body="Use the contact form or message directly through the details below." />
          <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)] text-sm leading-8 text-[var(--color-muted)]">
            <p>Email: <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link></p>
            <p>Phone: <Link href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</Link></p>
            <p>Address: {siteConfig.address}</p>
            <p>WhatsApp: <Link href={`https://wa.me/${siteConfig.whatsapp}`}>Open chat</Link></p>
            <p>Map: <Link href={`https://maps.google.com/?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`}>View location</Link></p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  )
}
