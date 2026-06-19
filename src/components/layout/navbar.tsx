'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, siteConfig } from '@/lib/constants'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl text-[var(--color-primary)]">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/bookings" variant="accent">Book Stay</Button>
        </div>
        <button
          type="button"
          className="inline-flex rounded-full border border-black/10 p-2 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
      {open ? (
        <div className="border-t border-black/5 bg-white md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[var(--color-muted)]" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button href="/bookings" variant="accent">Book Stay</Button>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
