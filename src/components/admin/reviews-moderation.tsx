'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Trash2, Star, Eye, EyeOff } from 'lucide-react'
import { moderateReview, deleteReview } from '@/lib/actions/admin'
import type { Review } from '@/types'

export function ReviewsModeration({ reviews: initial }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initial)
  const [filter, setFilter] = useState<'all' | 'pending' | 'published'>('all')
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<Record<string, string>>({})

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.published
    if (filter === 'published') return r.published
    return true
  })

  function setMsg(id: string, msg: string) {
    setFeedback((prev) => ({ ...prev, [id]: msg }))
    setTimeout(() => setFeedback((prev) => { const n = { ...prev }; delete n[id]; return n }), 2000)
  }

  function handleModerate(id: string, published: boolean) {
    startTransition(async () => {
      const res = await moderateReview(id, published)
      if (res.ok) {
        setReviews((prev) => prev.map((r) => r.id === id ? { ...r, published } : r))
        setMsg(id, published ? '✓ Published' : '✓ Hidden')
      } else {
        setMsg(id, `Error: ${res.error}`)
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this review permanently?')) return
    startTransition(async () => {
      const res = await deleteReview(id)
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id))
      }
    })
  }

  const pending = reviews.filter((r) => !r.published).length
  const published = reviews.filter((r) => r.published).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: reviews.length },
          { label: 'Published', value: published, color: 'text-emerald-600' },
          { label: 'Pending Review', value: pending, color: 'text-amber-600', highlight: pending > 0 },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 ${s.highlight ? 'bg-amber-50 border border-amber-200' : 'bg-white/40 border border-white/50'} shadow-sm`}>
            <p className="text-xs uppercase tracking-widest text-muted/70">{s.label}</p>
            <p className={`font-display text-3xl mt-1 ${s.color ?? 'text-primary'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'published'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${
              filter === f ? 'bg-primary text-white' : 'bg-white/50 text-primary hover:bg-primary/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <p className="text-muted text-sm py-8 text-center">No reviews in this category.</p>
          ) : filtered.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`bg-white rounded-[20px] p-6 shadow-sm border ${review.published ? 'border-emerald-100' : 'border-amber-100'} space-y-3`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-primary text-sm">{review.guest_name}</span>
                    {review.origin && <span className="text-muted text-xs">· {review.origin}</span>}
                    <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? 'text-premium fill-premium' : 'text-muted/30'}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{review.quote}</p>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  {feedback[review.id] ? (
                    <span className="text-xs text-emerald-600 font-medium px-2 py-1">{feedback[review.id]}</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleModerate(review.id, !review.published)}
                        disabled={isPending}
                        title={review.published ? 'Hide review' : 'Publish review'}
                        className={`p-2 rounded-lg transition-colors ${
                          review.published
                            ? 'hover:bg-amber-50 text-muted hover:text-amber-600'
                            : 'hover:bg-emerald-50 text-muted hover:text-emerald-600'
                        }`}
                        aria-label={review.published ? 'Hide this review' : 'Publish this review'}
                      >
                        {review.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={isPending}
                        title="Delete review"
                        className="p-2 rounded-lg hover:bg-rose-50 text-muted hover:text-rose-600 transition-colors"
                        aria-label={`Delete review from ${review.guest_name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${review.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {review.published ? 'Published' : 'Hidden'}
                </span>
                <span className="text-xs text-muted">
                  {new Date(review.created_at).toLocaleDateString('en-KE')}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
