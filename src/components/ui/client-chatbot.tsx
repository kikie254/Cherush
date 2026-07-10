'use client'

import dynamic from 'next/dynamic'

/**
 * ClientChatbot — wraps the Chatbot with ssr:false inside a Client Component.
 * layout.tsx is a Server Component and cannot use ssr:false directly.
 */
const ChatbotInner = dynamic(
  () => import('@/components/ui/chatbot').then((m) => m.Chatbot),
  { ssr: false, loading: () => null }
)

export function ClientChatbot() {
  return <ChatbotInner />
}
