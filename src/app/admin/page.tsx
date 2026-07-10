import { StatsGrid } from '@/components/admin/stats'
import { SectionHeading } from '@/components/ui/section-heading'
import { getAdminData } from '@/lib/queries'
import { QuickActions } from '@/components/admin/quick-actions'
import { MinimalChart } from '@/components/admin/minimal-chart'
import { formatCurrency } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const data = await getAdminData()

  // Get recent guests from approved bookings
  const recentGuests = data.bookings
    .filter(b => ['approved', 'completed'].includes(b.status))
    .slice(0, 5)

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
        <SectionHeading 
          eyebrow="Admin Dashboard" 
          title="Overview" 
          body="Daily operations, revenue tracking, and occupancy metrics at a glance." 
        />
        <div className="mt-12">
          <StatsGrid stats={data.stats} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
            <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Revenue Trajectory</h3>
            <MinimalChart />
          </div>

          <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
            <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Recent Guests</h3>
            <div className="space-y-4">
              {recentGuests.map((guest) => (
                <div key={guest.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-primary/5 shadow-sm">
                  <div>
                    <p className="font-medium text-primary">{guest.guest_name}</p>
                    <p className="text-xs text-muted">{guest.guest_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">{guest.rooms?.name || 'Room'}</p>
                    <p className="text-xs text-muted">{guest.check_in} - {guest.check_out}</p>
                  </div>
                </div>
              ))}
              {recentGuests.length === 0 && <p className="text-sm text-muted">No recent guests.</p>}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
            <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Quick Actions</h3>
            <QuickActions />
          </div>

          <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
            <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Recent Inquiries</h3>
            <div className="space-y-4">
              {data.stats.latestInquiries?.map((inquiry: any) => (
                <div key={inquiry.id} className="p-4 bg-white rounded-2xl border border-primary/5 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-primary text-sm">{inquiry.name}</p>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${inquiry.status === 'unread' ? 'bg-accent/10 text-accent font-bold' : 'bg-primary/5 text-muted'}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted line-clamp-2">{inquiry.message}</p>
                </div>
              ))}
              {(!data.stats.latestInquiries || data.stats.latestInquiries.length === 0) && (
                <p className="text-sm text-muted">No recent inquiries.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
