import Link from 'next/link'

const items = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/guests', label: 'Guests' },
  { href: '/admin/rooms', label: 'Rooms' },
  { href: '/admin/pricing', label: 'Pricing' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' }
]

export function AdminSidebar() {
  return (
    <aside className="rounded-[28px] bg-white p-6 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-3xl text-[var(--color-primary)]">Admin</h2>
      <nav className="mt-6 flex flex-col gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm text-[var(--color-muted)] transition hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
