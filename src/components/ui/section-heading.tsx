import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false
}: {
  eyebrow: string
  title: string
  body?: string
  center?: boolean
}) {
  return (
    <div className={cn(center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent)]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-[var(--color-primary)] md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{body}</p> : null}
    </div>
  )
}
