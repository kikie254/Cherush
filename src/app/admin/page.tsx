import { StatsGrid } from '@/components/admin/stats'
import { SectionHeading } from '@/components/ui/section-heading'
import { getAdminData } from '@/lib/queries'
import { QuickActions } from '@/components/admin/quick-actions'
import { MinimalChart } from '@/components/admin/minimal-chart'

export default async function AdminPage() {
  const data = await getAdminData()

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
        <SectionHeading 
          eyebrow="Admin Dashboard" 
          title="Overview" 
          body="Seed admin dashboard showing revenue, approvals, occupancy, and sample operational data." 
        />
        <div className="mt-12">
          <StatsGrid stats={data.stats} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
          <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Revenue Trajectory</h3>
          <MinimalChart />
        </div>
        
        <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
          <h3 className="font-display text-2xl text-primary mb-8 tracking-tight">Quick Actions</h3>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
