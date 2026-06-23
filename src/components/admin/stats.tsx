'use client'

import { formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const AnimatedCounter = ({ value, isCurrency = false }: { value: number | string, isCurrency?: boolean }) => {
  const [count, setCount] = useState(0)
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value

  useEffect(() => {
    let startTime: number
    const duration = 1500
    
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = (time - startTime) / duration
      
      if (progress < 1) {
        setCount(numericValue * Math.pow(progress, 3)) // easeOut cubic
        requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }
    
    requestAnimationFrame(animate)
  }, [numericValue])

  if (typeof value === 'string' && value.includes('%')) {
    return <>{Math.round(count)}%</>
  }
  
  if (isCurrency) {
    return <>{formatCurrency(count)}</>
  }

  return <>{Math.round(count)}</>
}

export function StatsGrid({
  stats
}: {
  stats: { revenue: number; upcoming: number; pending: number; occupancyRate: number }
}) {
  const cards = [
    { label: 'Revenue', value: stats.revenue, isCurrency: true },
    { label: 'Upcoming stays', value: stats.upcoming },
    { label: 'Pending approvals', value: stats.pending },
    { label: 'Occupancy', value: `${stats.occupancyRate}%` }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div 
          key={card.label} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] bg-white p-8 shadow-premium border border-primary/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-150" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-muted relative z-10">{card.label}</p>
          <p className="mt-6 font-display text-5xl text-primary relative z-10">
            <AnimatedCounter value={card.value} isCurrency={card.isCurrency} />
          </p>
        </motion.div>
      ))}
    </div>
  )
}
