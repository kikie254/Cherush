import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  variant?: 'primary' | 'secondary' | 'accent'
  children: React.ReactNode
}

const variants = {
  primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
  secondary: 'bg-white text-[var(--color-primary)] border border-[var(--color-primary)]/15 hover:bg-[var(--color-background)]',
  accent: 'bg-[var(--color-accent)] text-white hover:opacity-90'
}

export function Button({ href, variant = 'primary', className, children, ...props }: Props) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition',
    variants[variant],
    className
  )

  if (href) return <Link href={href} className={classes}>{children}</Link>
  return <button className={classes} {...props}>{children}</button>
}
