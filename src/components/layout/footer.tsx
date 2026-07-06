import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { navLinks, siteConfig } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-14">
      <Container className="grid gap-10 md:grid-cols-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h3 className="font-display text-2xl text-[var(--color-primary)]">{siteConfig.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-muted)]">{siteConfig.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Navigate</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-primary)] transition-colors">{item.label}</Link>
              </li>
            ))}
            <li><Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog & Guides</Link></li>
            <li><Link href="/about-iten" className="hover:text-[var(--color-primary)] transition-colors">About Iten</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Discover</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li><Link href="/family-accommodation-iten" className="hover:text-[var(--color-primary)] transition-colors">Family Accommodation</Link></li>
            <li><Link href="/business-accommodation-iten" className="hover:text-[var(--color-primary)] transition-colors">Business Accommodation</Link></li>
            <li><Link href="/athlete-accommodation" className="hover:text-[var(--color-primary)] transition-colors">Athlete Accommodation</Link></li>
            <li><Link href="/budget-accommodation-iten" className="hover:text-[var(--color-primary)] transition-colors">Budget Accommodation</Link></li>
            <li><Link href="/long-stay-accommodation" className="hover:text-[var(--color-primary)] transition-colors">Long Stays</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Legal & Trust</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li><Link href="/about-the-owners" className="hover:text-[var(--color-primary)] transition-colors">About The Founders</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
            <li><Link href="/cancellation-policy" className="hover:text-[var(--color-primary)] transition-colors">Cancellation Policy</Link></li>
            <li><Link href="/house-rules" className="hover:text-[var(--color-primary)] transition-colors">House Rules</Link></li>
          </ul>
        </div>
      </Container>
      <div className="mt-12 pt-8 border-t border-black/5 text-center text-sm text-[var(--color-muted)]">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/auth" className="hover:text-accent transition-colors">Guest Login</Link>
            <Link href="/admin" className="hover:text-accent transition-colors">Admin</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
