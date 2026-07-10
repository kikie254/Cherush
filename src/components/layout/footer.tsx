import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { navLinks, siteConfig } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-14" aria-label="Site footer">
      <Container className="grid gap-10 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-[var(--color-primary)] font-semibold">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors"
              aria-label="Cherush Guesthouse on Instagram"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors"
              aria-label="Cherush Guesthouse on Facebook"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors"
              aria-label="Chat with Cherush Guesthouse on WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Navigate */}
        <nav aria-label="Primary navigation">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Accommodation & Experience */}
        <nav aria-label="Accommodation & Experience">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Experience
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/rooms" className="hover:text-[var(--color-primary)] transition-colors">
                Accommodation in Iten
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-[var(--color-primary)] transition-colors">
                Running Camps
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-[var(--color-primary)] transition-colors">
                Local Attractions
              </Link>
            </li>
            <li>
              <Link href="/amenities" className="hover:text-[var(--color-primary)] transition-colors">
                Dining
              </Link>
            </li>
          </ul>
        </nav>

        {/* Trust & Support */}
        <nav aria-label="Support and policies">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Support
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">
                House Rules
              </Link>
            </li>
          </ul>
        </nav>
        {/* Newsletter & Hours */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Stay in Touch
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Get updates on running camps, local events, and exclusive offers from Cherush Guesthouse.
            </p>
            <a
              href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20receive%20updates%20from%20Cherush%20Guesthouse"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm hover:bg-[var(--color-accent)] transition-colors w-full text-center"
            >
              Connect on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Business Hours
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              <li className="flex justify-between border-b border-black/5 pb-2">
                <span>Mon - Fri</span>
                <span>7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-black/5 pb-2">
                <span>Saturday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="mt-16 pt-8 border-t border-black/5 text-center text-sm text-[var(--color-muted)]">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p>
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              {siteConfig.name}
            </Link>
            . All rights reserved. Iten, Kenya.
          </p>
          <address className="not-italic text-xs text-muted flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-primary transition-colors flex items-center gap-1">
              {siteConfig.phone}
            </a>
            <span className="hidden md:inline">·</span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors flex items-center gap-1">
              {siteConfig.email}
            </a>
            <span className="hidden md:inline">·</span>
            <a href={`https://maps.google.com/?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              View on Map
            </a>
          </address>
          <div className="flex gap-4">
            <Link href="/auth" className="hover:text-accent transition-colors text-xs uppercase tracking-widest">Guest Login</Link>
            <Link href="/admin" className="hover:text-accent transition-colors text-xs uppercase tracking-widest">Admin</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
