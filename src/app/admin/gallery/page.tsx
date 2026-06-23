import { getGallery } from '@/lib/queries'
import { AdminGalleryClient } from '@/components/admin/gallery-manager'

export default async function GalleryAdminPage() {
  const gallery = await getGallery()
  return <AdminGalleryClient gallery={gallery} />
}
