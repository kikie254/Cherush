import { getPricing, getRooms } from '@/lib/queries'
import { AdminPricingClient } from '@/components/admin/pricing-manager'

export default async function PricingAdminPage() {
  const [pricingRules, rooms] = await Promise.all([getPricing(), getRooms()])
  return <AdminPricingClient pricingRules={pricingRules} rooms={rooms} />
}
