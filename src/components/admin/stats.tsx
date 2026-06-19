import { formatCurrency } from '@/lib/utils'

export function StatsGrid({
  stats
}: {
  stats: { revenue: number; upcoming: number; pending: number; occupancyRate: number }
}) {
  const cards = [
    { label: 'Revenue', value: formatCurrency(stats.revenue) },
    { label: 'Upcoming stays', value: String(stats.upcoming) },
    { label: 'Pending approvals', value: String(stats.pending) },
    { label: 'Occupancy', value: `${stats.occupancyRate}%` }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[28px] bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm text-[var(--color-muted)]">{card.label}</p>
          <p className="mt-3 font-display text-4xl text-[var(--color-primary)]">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
