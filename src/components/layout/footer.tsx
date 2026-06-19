import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { navLinks, siteConfig } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-14">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl text-[var(--color-primary)]">{siteConfig.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-muted)]">{siteConfig.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Navigate</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Stay connected</h4>
          <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <p>{siteConfig.location}</p>
            <Link href="/auth">Guest account</Link>
            <br />
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
