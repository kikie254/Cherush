'use client'

import { motion } from 'framer-motion'

const data = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 30 },
  { month: 'Mar', value: 60 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 50 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 100 },
]

export function MinimalChart() {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="h-64 flex items-end gap-2 md:gap-4 pt-8">
      {data.map((item, i) => {
        const heightPercentage = (item.value / maxValue) * 100

        return (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-4 group">
            <div className="w-full relative h-full flex items-end justify-center">
              {/* Background track */}
              <div className="absolute inset-x-0 bottom-0 top-0 bg-primary/5 rounded-t-xl" />
              
              {/* Animated bar */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${heightPercentage}%` }}
                transition={{ duration: 1, delay: i * 0.1, type: 'spring', bounce: 0.2 }}
                className="w-full bg-accent rounded-t-xl relative z-10 transition-colors group-hover:bg-primary"
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-muted font-medium">
              {item.month}
            </span>
          </div>
        )
      })}
    </div>
  )
}
