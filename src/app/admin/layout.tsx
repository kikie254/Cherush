import { AdminSidebar } from '@/components/admin/sidebar'
import { Container } from '@/components/ui/container'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
        <AdminSidebar />
        <div>{children}</div>
      </Container>
    </section>
  )
}
