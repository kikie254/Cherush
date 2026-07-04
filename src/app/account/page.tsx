import { SignOutButton } from '@/components/auth/signout'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { getBookings } from '@/lib/queries'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function AccountPage() {
  const bookings = await getBookings()

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Account" title="Guest booking history" body="Connect Supabase to display real user-specific stays. Seed data shown below." />
          <SignOutButton />
        </div>
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-[28px] bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-3xl text-[var(--color-primary)]">{booking.booking_code}</h2>
                <span className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">{booking.status}</span>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-[var(--color-muted)] md:grid-cols-4">
                <p>Room: {booking.rooms?.name || 'Selected room'}</p>
                <p>Check in: {formatDate(booking.check_in)}</p>
                <p>Check out: {formatDate(booking.check_out)}</p>
                <p>Total: {formatCurrency(booking.total_amount)}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
