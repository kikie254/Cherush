'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'premium'
  children: React.ReactNode
  magnetic?: boolean
}

const variants = {
  primary: 'bg-primary text-white border border-transparent',
  secondary: 'bg-transparent text-primary border border-primary/20 hover:border-primary/40',
  accent: 'bg-accent text-white border border-transparent',
  premium: 'bg-premium text-white border border-transparent'
}

export function Button({ href, variant = 'primary', className, children, magnetic = true, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const classes = cn(
    'relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500 overflow-hidden group',
    variants[variant],
    className
  )

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      {/* Hover Background Sweep */}
      <div className={cn(
        "absolute inset-0 z-0 scale-y-0 rounded-full transition-transform duration-500 origin-bottom group-hover:scale-y-100",
        variant === 'primary' ? "bg-black" : variant === 'secondary' ? "bg-primary/5" : variant === 'premium' ? "bg-black/10" : "bg-black/10"
      )} />
    </>
  )

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const shouldReduceMotion = useReducedMotion()
    
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
        className="inline-block"
      >
        {children}
      </motion.div>
    )
  }

  if (href) {
    return (
      <Wrapper>
        <Link href={href} className={classes}>
          {innerContent}
        </Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <button className={classes} {...props}>
        {innerContent}
      </button>
    </Wrapper>
  )
}
