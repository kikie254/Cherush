'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Plus, Users, Settings } from 'lucide-react'
import Link from 'next/link'

const actions = [
  { label: 'New Booking', icon: Plus, color: 'bg-primary text-white', href: '/admin/bookings' },
  { label: 'Manage Guests', icon: Users, color: 'bg-white text-primary border border-primary/10', href: '/admin/guests' },
  { label: 'System Settings', icon: Settings, color: 'bg-white text-primary border border-primary/10', href: '/admin/settings' },
  { label: 'Export Data', icon: ArrowUpRight, color: 'bg-white text-primary border border-primary/10', href: '/admin/analytics' },
]

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4">
      {actions.map((action, i) => (
        <Link key={action.label} href={action.href} className="block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer ${action.color}`}
          >
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{action.label}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

