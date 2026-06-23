'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, Users, Home, Settings, Image as ImageIcon, FileText, BarChart3, CreditCard } from 'lucide-react'

const items = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/guests', label: 'Guests', icon: Users },
  { href: '/admin/rooms', label: 'Rooms', icon: Home },
  { href: '/admin/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-32 rounded-[32px] bg-white/40 backdrop-blur-3xl p-8 shadow-premium border border-white/50">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="font-display text-xl text-premium">C</span>
        </div>
        <h2 className="font-display text-3xl text-primary tracking-tight">Admin</h2>
      </div>
      
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 overflow-hidden ${
                isActive ? 'text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white shadow-soft rounded-2xl border border-primary/5"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-4">
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-accent' : 'group-hover:scale-110'}`} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
