import { getContent } from '@/lib/queries'
import { AdminContentClient } from '@/components/admin/content-editor'

export default async function ContentAdminPage() {
  const content = await getContent()
  return <AdminContentClient content={content} />
}
