'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { 
  List, 
  X, 
  CaretDown, 
  Sparkle, 
  ChartBar, 
  BookOpen, 
  ArrowRight, 
  House, 
  Info, 
  Users, 
  Briefcase, 
  Envelope, 
  Wheelchair 
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const mainLinks = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Our Services', href: '/services', icon: Briefcase },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Associates', href: '/associates', icon: Users },
  { label: 'Contact Us', href: '/contact', icon: Envelope },
]

const aiTools = [
  { label: 'Impact Matcher', href: '/impact-matcher', icon: Sparkle, desc: 'Find the right service' },
  { label: 'Capacity Assessment', href: '/capacity-assessment', icon: ChartBar, desc: 'Score your gaps' },
  { label: 'M&E Analyzer', href: '/mne-analyzer', icon: BookOpen, desc: 'Analyze your reports' },
]

const AI_PATHS = ['/impact-matcher', '/capacity-assessment', '/mne-analyzer']

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) {
        setVisible(true)
      } else {
        setVisible(y < lastScrollY.current)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAiActive = AI_PATHS.includes(pathname)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-transform duration-300 ease-in-out"
        style={{
          paddingTop: '14px',
          transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        }}
      >
        <div className="container-xl">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pointer-events-auto">

            {/* Logo pill */}
            <Link
              href="/"
              className="shrink-0 hidden md:flex items-center px-4 py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 28px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid rgba(255,255,255,0.9)',
              }}
            >
              <div className="relative h-8 w-28">
                <Image
                  src="/assets/images/logo.png"
                  alt="KuzaConnect"
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                  style={{ filter: 'none' }}
                  priority
                />
              </div>
            </Link>

            {/* Mobile logo (no pill) */}
            <Link href="/" className="shrink-0 md:hidden">
              <div className="relative h-8 w-28">
                <Image
                  src="/assets/images/logo.png"
                  alt="KuzaConnect"
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  priority
                />
              </div>
            </Link>

            {/* ── NAV PILL ── */}
            <div className="hidden md:flex justify-center">
              <div
                className="flex items-center rounded-full px-2 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.97)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 28px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(255,255,255,0.9)',
                }}
              >

                {/* Nav links */}
                <nav className="flex items-center gap-0.5" aria-label="Main navigation">
                  {mainLinks.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        style={{
                          color: active ? '#ffffff' : '#374151',
                          background: active ? 'var(--kuza-orange)' : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.color = 'var(--kuza-purple-dark)'
                            el.style.background = 'rgba(99,87,165,0.09)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.color = '#374151'
                            el.style.background = 'transparent'
                          }
                        }}
                      >
                        <Icon size={13} />
                        {label}
                      </Link>
                    )
                  })}

                  {/* AI Tools dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                      style={{
                        color: isAiActive ? '#ffffff' : (dropdownOpen ? 'var(--kuza-purple-dark)' : '#374151'),
                        background: isAiActive ? 'var(--kuza-orange)' : (dropdownOpen ? 'rgba(99,87,165,0.09)' : 'transparent'),
                      }}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <Sparkle size={13} />
                      AI Tools
                      <CaretDown
                        size={12}
                        style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="nav-dropdown"
                        >
                          {aiTools.map(({ label, href, icon: Icon, desc }) => (
                            <Link key={href} href={href} className="nav-dropdown-item group">
                              <div className="nav-dropdown-item-icon">
                                <Icon size={15} style={{ color: 'var(--kuza-purple-dark)' }} />
                              </div>
                              <div>
                                <div className="font-semibold text-[13px]" style={{ color: 'var(--kuza-purple-dark)' }}>{label}</div>
                                <div className="text-[11px]" style={{ color: 'var(--kuza-muted)' }}>{desc}</div>
                              </div>
                            </Link>
                          ))}
                          <div
                            className="mt-1 mx-1 p-3 rounded-[10px] flex items-center justify-between"
                            style={{ background: 'rgba(99,87,165,0.05)' }}
                          >
                            <span className="text-[11px] font-medium" style={{ color: 'var(--kuza-muted)' }}>Explore all tools</span>
                            <ArrowRight size={12} style={{ color: 'var(--kuza-purple)' }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>
              </div>
            </div>

            {/* CTA pill */}
            <div
              className="hidden md:flex items-center gap-1.5 rounded-full px-1.5 py-1.5"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 28px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid rgba(255,255,255,0.9)',
              }}
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-a11y'))}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--kuza-orange)', color: 'white' }}
                aria-label="Accessibility tools"
                title="Accessibility"
              >
                <Wheelchair size={15} />
              </button>
              <div className="w-px h-5 mx-0.5" style={{ background: 'rgba(0,0,0,0.12)' }} />
              <Link href="/contact" className="btn-primary text-sm px-5 py-2">
                Work With Us
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden ml-auto p-2 rounded-full text-white hover:bg-white/10 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <List size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{ width: 'min(320px, 85vw)', background: 'var(--kuza-purple-dark)', boxShadow: '-4px 0 40px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className="relative h-7 w-25">
                    <Image src="/assets/images/logo.png" alt="KuzaConnect" fill sizes="112px" className="object-contain object-left" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {mainLinks.map(({ label, href, icon: Icon }, i) => (
                  <motion.div key={href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        color: pathname === href ? 'var(--kuza-orange)' : 'rgba(255,255,255,0.82)',
                        background: pathname === href ? 'rgba(255,255,255,0.1)' : 'transparent',
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={14} />
                        {label}
                      </span>
                      {pathname === href && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--kuza-orange)' }} />}
                    </Link>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="pt-3 mt-3 border-t border-white/10">
                  <p className="text-label px-4 mb-2" style={{ opacity: 0.35 }}>AI Tools</p>
                  {aiTools.map(({ label, href, icon: Icon, desc }, i) => (
                    <motion.div key={href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
                      <Link href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                          <Icon size={13} style={{ color: 'var(--kuza-orange)' }} />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium">{label}</div>
                          <div className="text-[11px] opacity-50">{desc}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="px-4 py-5 border-t border-white/10">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                  Work With Us <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
