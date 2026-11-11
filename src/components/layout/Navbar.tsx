'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  List,
  X,

  Sparkle,
  ChartBar,
  BookOpen,
  ArrowRight,
  House,
  Info,
  Users,
  Briefcase,
  Envelope,
  Wheelchair,
  Megaphone,
  Moon,
  Sun,
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const mainLinks = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Our Services', href: '/services', icon: Briefcase },
  { label: 'AI Solutions', href: '/ai-solutions', icon: Sparkle },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Associates', href: '/associates', icon: Users },
  { label: 'Careers', href: '/careers', icon: Megaphone },
  { label: 'Contact Us', href: '/contact', icon: Envelope },
]

const aiTools = [
  { label: 'Impact Matcher', href: '/impact-matcher', icon: Sparkle, desc: 'Find the right service' },
  { label: 'Capacity Assessment', href: '/capacity-assessment', icon: ChartBar, desc: 'Score your gaps' },
  { label: 'M&E Analyzer', href: '/mne-analyzer', icon: BookOpen, desc: 'Analyze your reports' },
]

const pillStyle = {
  background: 'rgba(255,255,255,0.97)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: '0 4px 28px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
  border: '1px solid rgba(255,255,255,0.9)',
}

const toggleTheme = () => window.dispatchEvent(new CustomEvent('toggle-theme'))
const toggleA11y = () => window.dispatchEvent(new CustomEvent('toggle-a11y'))


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [dark, setDark] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Theme is only ever changed by the visitor; AccessibilityWidget owns the
  // state and announces it here so the toggle shows the right icon.
  useEffect(() => {
    const onTheme = (e: Event) => setDark((e as CustomEvent<boolean>).detail)
    window.addEventListener('kuza-theme', onTheme)
    return () => window.removeEventListener('kuza-theme', onTheme)
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

  const themeLabel = dark ? 'Switch to light mode' : 'Switch to dark mode'
  const ThemeIcon = dark ? Sun : Moon

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

          {/* ── DESKTOP BAR (xl and up: the full link row needs ~1100px) ── */}
          <div className="hidden xl:grid grid-cols-[auto_1fr_auto] items-center gap-3 pointer-events-auto">

            {/* Logo pill */}
            <Link
              href="/"
              className="shrink-0 flex items-center px-5 py-1 rounded-full"
              style={pillStyle}
              aria-label="Kuza Connect home"
            >
              <Logo surface="light" height={40} priority />
            </Link>

            {/* ── NAV PILL ── */}
            <div className="flex justify-center">
              <div className="flex items-center rounded-full px-2 py-1.5" style={pillStyle}>

                {/* Nav links */}
                <nav className="flex items-center gap-0.5" aria-label="Main navigation">
                  {mainLinks.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200"
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

                </nav>
              </div>
            </div>

            {/* CTA pill */}
            <div className="flex items-center gap-1.5 rounded-full px-1.5 py-1.5" style={pillStyle}>
              <button
                onClick={toggleA11y}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--kuza-orange)', color: 'white' }}
                aria-label="Accessibility tools"
                title="Accessibility"
              >
                <Wheelchair size={15} />
              </button>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(99,87,165,0.1)', color: 'var(--kuza-purple-dark)' }}
                aria-label={themeLabel}
                aria-pressed={dark}
                title={themeLabel}
              >
                <ThemeIcon size={15} />
              </button>
              <div className="w-px h-5 mx-0.5" style={{ background: 'rgba(0,0,0,0.12)' }} />
              <Link href="/contact" className="btn-primary text-sm px-5 py-2 whitespace-nowrap">
                Work With Us
              </Link>
            </div>
          </div>

          {/* ── COMPACT BAR (phones, tablets, small laptops) ── */}
          <div
            className="xl:hidden flex items-center justify-between rounded-full pl-5 pr-1.5 py-1.5 pointer-events-auto"
            style={pillStyle}
          >
            <Link href="/" className="shrink-0 flex items-center" aria-label="Kuza Connect home">
              <Logo surface="light" height={40} priority />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-full flex items-center justify-center transition"
                style={{ background: 'rgba(99,87,165,0.1)', color: 'var(--kuza-purple-dark)' }}
                aria-label={themeLabel}
                aria-pressed={dark}
              >
                <ThemeIcon size={18} />
              </button>
              <button
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition"
                style={{ background: 'var(--kuza-purple-dark)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <List size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
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
              className="fixed inset-0 z-40 xl:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 xl:hidden flex flex-col"
              style={{ width: 'min(320px, 85vw)', background: 'var(--kuza-purple-dark)', boxShadow: '-4px 0 40px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center justify-between pl-5 pr-3 py-3 border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Kuza Connect home">
                  <Logo surface="dark" height={40} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
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

              {/* extra bottom padding keeps these clear of the chat button */}
              <div className="px-4 pt-5 pb-24 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 h-11 rounded-xl text-[13px] font-medium transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
                    aria-pressed={dark}
                  >
                    <ThemeIcon size={15} />
                    {dark ? 'Light mode' : 'Dark mode'}
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); toggleA11y() }}
                    className="flex items-center justify-center gap-2 h-11 rounded-xl text-[13px] font-medium transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
                  >
                    <Wheelchair size={15} />
                    Accessibility
                  </button>
                </div>
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
