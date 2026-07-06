import { requireAdmin } from '@/lib/auth'
import { getContactMessages } from '@/lib/queries'
import { MessagesCenter } from '@/components/admin/messages-center'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message Center | Admin',
  robots: { index: false, follow: false },
}

export default async function AdminMessagesPage() {
  await requireAdmin()

  const messages = await getContactMessages()

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
        <SectionHeading
          eyebrow="Admin"
          title="Message Center"
          body="View and manage all contact enquiries submitted via the website."
        />
      </div>
      <MessagesCenter messages={messages} />
    </div>
  )
}

