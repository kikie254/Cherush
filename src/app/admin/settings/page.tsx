import { getSettings } from '@/lib/queries'
import { AdminSettingsClient } from '@/components/admin/settings-form'

export default async function SettingsAdminPage() {
  const settings = await getSettings()
  return <AdminSettingsClient settings={settings} />
}
