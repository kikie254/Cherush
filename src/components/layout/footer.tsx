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
            Navigate
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guest-house-in-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Guest House in Iten
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">
                Blog &amp; Guides
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/travel-guide-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Iten Travel Guide
              </Link>
            </li>
          </ul>
        </nav>

        {/* Accommodation Types */}
        <nav aria-label="Accommodation types">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Discover
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/guest-house-in-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Guest House in Iten
              </Link>
            </li>
            <li>
              <Link href="/accommodation-in-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Accommodation in Iten
              </Link>
            </li>
            <li>
              <Link href="/hotels-in-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Hotels in Iten
              </Link>
            </li>
            <li>
              <Link href="/athlete-accommodation" className="hover:text-[var(--color-primary)] transition-colors">
                Athlete Accommodation
              </Link>
            </li>
            <li>
              <Link href="/family-accommodation-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Family Accommodation
              </Link>
            </li>
            <li>
              <Link href="/budget-accommodation-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Budget Accommodation
              </Link>
            </li>
            <li>
              <Link href="/long-stay-accommodation" className="hover:text-[var(--color-primary)] transition-colors">
                Long Stays
              </Link>
            </li>
            <li>
              <Link href="/conference-venue-iten" className="hover:text-[var(--color-primary)] transition-colors">
                Conference Venue
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal & Trust */}
        <nav aria-label="Legal and trust pages">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Legal &amp; Trust
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/about-the-owners" className="hover:text-[var(--color-primary)] transition-colors">
                About The Founders
              </Link>
            </li>
            <li>
              <Link href="/mission-and-values" className="hover:text-[var(--color-primary)] transition-colors">
                Mission &amp; Values
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[var(--color-primary)] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-[var(--color-primary)] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="hover:text-[var(--color-primary)] transition-colors">
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link href="/house-rules" className="hover:text-[var(--color-primary)] transition-colors">
                House Rules
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <div className="mt-12 pt-8 border-t border-black/5 text-center text-sm text-[var(--color-muted)]">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="hover:text-primary transition-colors">
              {siteConfig.name}
            </Link>
            . All rights reserved. Iten, Kenya.
          </p>
          <address className="not-italic text-xs text-muted">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-primary transition-colors">
              {siteConfig.phone}
            </a>
            {' · '}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
              {siteConfig.email}
            </a>
          </address>
          <div className="flex gap-4">
            <Link href="/auth" className="hover:text-accent transition-colors">Guest Login</Link>
            <Link href="/admin" className="hover:text-accent transition-colors">Admin</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
