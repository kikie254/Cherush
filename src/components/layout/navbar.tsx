'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, navLinks } from '@/lib/constants'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      >
        <motion.div
          layout
          className={`flex items-center justify-between overflow-hidden rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
              ? 'w-full max-w-4xl bg-white/5 backdrop-blur-[24px] border border-white/10 shadow-[var(--shadow-premium)] h-16' 
              : 'w-full max-w-7xl bg-transparent border-transparent h-20'
          }`}
        >
          <div className="flex h-full w-full items-center justify-between px-6 md:px-10">
            <Link href="/" className="relative z-50 font-display text-xl tracking-wide text-white mix-blend-difference hover:opacity-80 transition-opacity">
              {siteConfig.name}
            </Link>

            <nav className="hidden items-center gap-10 md:flex mix-blend-difference text-white">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button href="/bookings" variant="premium" className="scale-90 origin-right">Book Stay</Button>
            </div>

            <button
              type="button"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[4px] md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} 
                className={`h-px w-6 transition-colors duration-300 ${open ? 'bg-primary' : 'bg-white mix-blend-difference'}`}
              />
              <motion.span 
                animate={open ? { opacity: 0 } : { opacity: 1 }} 
                className={`h-px w-6 transition-colors duration-300 ${open ? 'bg-primary' : 'bg-white mix-blend-difference'}`}
              />
              <motion.span 
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} 
                className={`h-px w-6 transition-colors duration-300 ${open ? 'bg-primary' : 'bg-white mix-blend-difference'}`}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-8"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")' }} />
            
            <nav className="flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={item.href} 
                    className="font-display text-5xl tracking-tight text-primary hover:text-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 pt-8 border-t border-primary/10"
              >
                <Button href="/bookings" variant="primary" className="w-full text-lg py-6" onClick={() => setOpen(false)}>
                  Book Your Stay
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
