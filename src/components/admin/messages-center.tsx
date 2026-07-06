'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Trash2, CheckCheck, Eye, ExternalLink } from 'lucide-react'
import { updateMessageStatus, deleteMessage } from '@/lib/actions/admin'

type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    unread: 'bg-blue-100 text-blue-700 border-blue-200',
    read: 'bg-gray-100 text-gray-600 border-gray-200',
    replied: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

export function MessagesCenter({ messages: initial }: { messages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initial)
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<Record<string, string>>({})

  const filtered = messages.filter((m) => filter === 'all' || m.status === filter)

  const unread = messages.filter((m) => m.status === 'unread').length

  function setMsg(id: string, msg: string) {
    setFeedback((prev) => ({ ...prev, [id]: msg }))
    setTimeout(() => setFeedback((prev) => { const n = { ...prev }; delete n[id]; return n }), 2000)
  }

  function handleStatus(id: string, status: ContactMessage['status']) {
    startTransition(async () => {
      const res = await updateMessageStatus(id, status)
      if (res.ok) {
        setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
        if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null)
        setMsg(id, '✓ Updated')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this message permanently?')) return
    startTransition(async () => {
      const res = await deleteMessage(id)
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        if (selected?.id === id) setSelected(null)
      }
    })
  }

  function handleOpen(msg: ContactMessage) {
    setSelected(msg)
    if (msg.status === 'unread') handleStatus(msg.id, 'read')
  }

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-6 pb-20">
      {/* Left: list */}
      <div className="space-y-4">
        {/* Stats + filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {unread > 0 && (
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              {unread} unread
            </span>
          )}
          {(['all', 'unread', 'read', 'replied'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-sm capitalize transition-all ${
                filter === f ? 'bg-primary text-white' : 'bg-white/50 text-primary hover:bg-primary/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {filtered.length === 0 ? (
            <p className="text-center text-muted py-16 text-sm">No messages in this category.</p>
          ) : filtered.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`bg-white rounded-[20px] p-5 shadow-sm border cursor-pointer transition-all group ${
                selected?.id === msg.id
                  ? 'border-accent/40 shadow-md'
                  : msg.status === 'unread'
                  ? 'border-blue-200 hover:border-blue-300'
                  : 'border-primary/5 hover:border-primary/20'
              }`}
              onClick={() => handleOpen(msg)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-primary text-sm truncate">{msg.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(msg.status)}`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted truncate">{msg.subject}</p>
                  <p className="text-xs text-muted/60 mt-1 truncate">{msg.message.slice(0, 80)}…</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {feedback[msg.id] ? (
                    <span className="text-xs text-emerald-600 px-2 py-1">{feedback[msg.id]}</span>
                  ) : (
                    <>
                      {msg.status !== 'replied' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatus(msg.id, 'replied') }}
                          title="Mark as replied"
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-muted hover:text-emerald-600 transition-colors"
                          aria-label={`Mark message from ${msg.name} as replied`}
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }}
                        title="Delete"
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-muted hover:text-rose-600 transition-colors"
                        aria-label={`Delete message from ${msg.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted/50 mt-2">
                {new Date(msg.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Right: detail panel */}
      <div className="lg:sticky lg:top-32">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-[32px] p-8 shadow-premium border border-primary/5 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest mb-1">Message Detail</p>
                  <h3 className="font-display text-2xl text-primary">{selected.name}</h3>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="text-sm text-accent hover:underline flex items-center gap-1 mt-1"
                    aria-label={`Reply to ${selected.name} via email`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selected.email}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusBadge(selected.status)}`}>
                  {selected.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-2">Subject</p>
                <p className="text-primary font-medium text-sm">{selected.subject}</p>
              </div>

              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-2">Message</p>
                <div className="bg-primary/3 rounded-2xl p-5">
                  <p className="text-primary text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>

              <p className="text-xs text-muted">
                Received: {new Date(selected.created_at).toLocaleString('en-KE')}
              </p>

              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors text-center"
                  onClick={() => handleStatus(selected.id, 'replied')}
                >
                  Reply via Email
                </a>
                {selected.status !== 'replied' && (
                  <button
                    onClick={() => handleStatus(selected.id, 'replied')}
                    className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                    disabled={isPending}
                    aria-label="Mark as replied"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/40 rounded-[32px] p-10 border border-white/50 text-center text-muted"
            >
              <Mail className="w-10 h-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p className="text-sm">Select a message to view details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
