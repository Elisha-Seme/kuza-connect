'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowCounterClockwise, TextT, TextUnderline, TextAlignJustify, TextAa,
  Moon, CircleHalf, SelectionInverse, Palette,
  Cursor, BookOpen, Pause, Wheelchair,
} from '@phosphor-icons/react'

// ─── Types ────────────────────────────────────────────────────────────────────
type TextSize = 100 | 110 | 125 | 150

interface A11yState {
  textSize: TextSize
  dyslexiaFont: boolean
  highlightLinks: boolean
  lineHeight: boolean
  letterSpacing: boolean
  darkMode: boolean
  highContrast: boolean
  invertColors: boolean
  grayscale: boolean
  bigCursor: boolean
  readingMask: boolean
  stopMotion: boolean
}

const DEFAULT: A11yState = {
  textSize: 100,
  dyslexiaFont: false,
  highlightLinks: false,
  lineHeight: false,
  letterSpacing: false,
  darkMode: false,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  bigCursor: false,
  readingMask: false,
  stopMotion: false,
}

const STORAGE_KEY = 'kuza-a11y'

// ─── Big cursor SVG (48×48) ───────────────────────────────────────────────────
const BIG_CURSOR_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 32 32'%3E%3Cpath d='M6 2 L6 26 L11 21 L16 31 L20 29 L15 19 L22 19 Z' fill='%23000' stroke='%23fff' stroke-width='1.5'/%3E%3C/svg%3E\"), auto"

// ─── Global CSS injected once ──────────────────────────────────────────────
const A11Y_CSS = `
  /* Dyslexia font */
  .a11y-dyslexia body, .a11y-dyslexia p, .a11y-dyslexia h1, .a11y-dyslexia h2,
  .a11y-dyslexia h3, .a11y-dyslexia h4, .a11y-dyslexia h5, .a11y-dyslexia h6,
  .a11y-dyslexia span, .a11y-dyslexia a, .a11y-dyslexia button, .a11y-dyslexia li,
  .a11y-dyslexia td, .a11y-dyslexia th, .a11y-dyslexia label, .a11y-dyslexia input,
  .a11y-dyslexia textarea {
    font-family: 'OpenDyslexic', Arial, sans-serif !important;
    letter-spacing: 0.05em;
  }

  /* Highlight links */
  .a11y-highlight-links a {
    background-color: #ffff00 !important;
    color: #000 !important;
    text-decoration: underline !important;
    padding: 0 3px !important;
    border-radius: 2px !important;
  }

  /* Line height */
  .a11y-line-height p, .a11y-line-height li, .a11y-line-height span,
  .a11y-line-height td, .a11y-line-height h1, .a11y-line-height h2,
  .a11y-line-height h3, .a11y-line-height h4, .a11y-line-height label {
    line-height: 2.2 !important;
  }

  /* Letter spacing */
  .a11y-letter-spacing p, .a11y-letter-spacing li, .a11y-letter-spacing span,
  .a11y-letter-spacing a, .a11y-letter-spacing button, .a11y-letter-spacing label,
  .a11y-letter-spacing h1, .a11y-letter-spacing h2, .a11y-letter-spacing h3 {
    letter-spacing: 0.14em !important;
    word-spacing: 0.18em !important;
  }

  /* Stop motion */
  .a11y-stop-motion *, .a11y-stop-motion *::before, .a11y-stop-motion *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* Big cursor */
  .a11y-big-cursor, .a11y-big-cursor * {
    cursor: ${BIG_CURSOR_URL} !important;
  }

  /* Reading mask overlay parts */
  #a11y-mask-top, #a11y-mask-bottom {
    position: fixed;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99990;
    pointer-events: none;
  }
`

// ─── Helper: inject CSS once ───────────────────────────────────────────────
function ensureStyles() {
  if (document.getElementById('a11y-styles')) return
  const s = document.createElement('style')
  s.id = 'a11y-styles'
  s.textContent = A11Y_CSS
  document.head.appendChild(s)
}

// ─── Helper: load OpenDyslexic font ───────────────────────────────────────
function loadDyslexicFont() {
  if (document.getElementById('a11y-dyslexic-font')) return
  const link = document.createElement('link')
  link.id = 'a11y-dyslexic-font'
  link.rel = 'stylesheet'
  link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
  document.head.appendChild(link)
}

// ─── Sub-component: toggle button ────────────────────────────────────────
function ToolBtn({
  icon: Icon, label, active, onClick,
}: { icon: React.ElementType; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all duration-150"
      style={{
        background: active ? 'var(--kuza-orange)' : 'white',
        borderColor: active ? 'var(--kuza-orange)' : '#e5e0d8',
        color: active ? 'white' : '#374151',
        boxShadow: active ? '0 2px 8px rgba(239,113,34,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
      }}
      aria-pressed={active}
      title={label}
    >
      <Icon size={20} />
      <span className="text-[12px] leading-tight text-center">{label}</span>
    </button>
  )
}

// ─── Main widget ──────────────────────────────────────────────────────────
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<A11yState>(DEFAULT)
  const maskTopRef = useRef<HTMLDivElement | null>(null)
  const maskBotRef = useRef<HTMLDivElement | null>(null)
  const MASK_HEIGHT = 80 // px of visible band

  // Load persisted state + listen for navbar trigger
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setState(JSON.parse(saved))
    } catch { }
    ensureStyles()

    const handler = () => setOpen(prev => !prev)
    window.addEventListener('toggle-a11y', handler)
    return () => window.removeEventListener('toggle-a11y', handler)
  }, [])

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const set = useCallback(<K extends keyof A11yState>(key: K, value: A11yState[K]) => {
    setState(prev => ({ ...prev, [key]: value }))
  }, [])

  const toggle = useCallback((key: keyof A11yState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const reset = useCallback(() => {
    setState(DEFAULT)
  }, [])

  // ── Text size ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.style.fontSize = `${state.textSize}%`
  }, [state.textSize])

  // ── Class-based features ───────────────────────────────────────────────
  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('a11y-dyslexia', state.dyslexiaFont)
    html.classList.toggle('a11y-highlight-links', state.highlightLinks)
    html.classList.toggle('a11y-line-height', state.lineHeight)
    html.classList.toggle('a11y-letter-spacing', state.letterSpacing)
    html.classList.toggle('a11y-stop-motion', state.stopMotion)
    html.classList.toggle('a11y-big-cursor', state.bigCursor)

    if (state.dyslexiaFont) loadDyslexicFont()
  }, [
    state.dyslexiaFont, state.highlightLinks, state.lineHeight,
    state.letterSpacing, state.stopMotion, state.bigCursor,
  ])

  // ── Visual filters (composed) ──────────────────────────────────────────
  useEffect(() => {
    const filters: string[] = []
    if (state.darkMode) filters.push('invert(1) hue-rotate(180deg)')
    if (state.highContrast) filters.push('contrast(160%)')
    if (state.invertColors && !state.darkMode) filters.push('invert(1)')
    if (state.grayscale) filters.push('grayscale(1)')
    document.documentElement.style.filter = filters.join(' ')

    // Images / videos counter-invert in dark mode so photos stay natural
    let imgStyle = document.getElementById('a11y-img-fix') as HTMLStyleElement | null
    if (state.darkMode) {
      if (!imgStyle) {
        imgStyle = document.createElement('style')
        imgStyle.id = 'a11y-img-fix'
        document.head.appendChild(imgStyle)
      }
      imgStyle.textContent = `
        html img, html video, html iframe, html canvas, html svg image {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      `
    } else {
      imgStyle?.remove()
    }
  }, [state.darkMode, state.highContrast, state.invertColors, state.grayscale])

  // ── Reading mask ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!state.readingMask) {
      maskTopRef.current?.remove()
      maskBotRef.current?.remove()
      maskTopRef.current = null
      maskBotRef.current = null
      document.removeEventListener('mousemove', handleMaskMove)
      return
    }

    // Create mask elements
    const top = document.createElement('div')
    top.id = 'a11y-mask-top'
    const bot = document.createElement('div')
    bot.id = 'a11y-mask-bottom'
    document.body.appendChild(top)
    document.body.appendChild(bot)
    maskTopRef.current = top
    maskBotRef.current = bot

    document.addEventListener('mousemove', handleMaskMove, { passive: true })
    return () => {
      top.remove()
      bot.remove()
      document.removeEventListener('mousemove', handleMaskMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.readingMask])

  function handleMaskMove(e: MouseEvent) {
    const y = e.clientY
    const vh = window.innerHeight
    if (maskTopRef.current) {
      maskTopRef.current.style.top = '0'
      maskTopRef.current.style.height = `${Math.max(0, y - MASK_HEIGHT)}px`
    }
    if (maskBotRef.current) {
      maskBotRef.current.style.top = `${y + MASK_HEIGHT}px`
      maskBotRef.current.style.height = `${Math.max(0, vh - y - MASK_HEIGHT)}px`
    }
  }

  // ── Reset all ──────────────────────────────────────────────────────────
  useEffect(() => {
    // Clean up if all are default
    if (JSON.stringify(state) === JSON.stringify(DEFAULT)) {
      document.documentElement.style.fontSize = ''
      document.documentElement.style.filter = ''
    }
  }, [state])

  const TEXT_SIZES: TextSize[] = [100, 110, 125, 150]

  return (
    <>
      {/* Panel — triggered from Navbar via 'toggle-a11y' event */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="a11y-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[60] md:hidden"
              style={{ background: 'rgba(0,0,0,0.4)' }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="a11y-panel"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 z-[61] flex flex-col overflow-hidden"
              style={{
                width: 'min(320px, 90vw)',
                background: '#f5f0e8',
                boxShadow: '4px 0 40px rgba(0,0,0,0.18)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 shrink-0"
                style={{ background: 'var(--kuza-orange)' }}
              >
                <div className="flex items-center gap-2">
                  <Wheelchair size={20} color="white" />
                  <span className="font-bold text-white text-[15px] tracking-wide">Accessibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="text-white/90 text-[13px] font-medium underline underline-offset-2 hover:text-white transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white/90 hover:text-white transition"
                    aria-label="Close accessibility panel"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">

                {/* TEXT SIZE */}
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#9ca3af' }}>
                    Text Size
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TEXT_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => set('textSize', size)}
                        className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                        style={{
                          background: state.textSize === size ? 'var(--kuza-orange)' : 'white',
                          color: state.textSize === size ? 'white' : '#374151',
                          border: `1px solid ${state.textSize === size ? 'var(--kuza-orange)' : '#e5e0d8'}`,
                          boxShadow: state.textSize === size ? '0 2px 8px rgba(239,113,34,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
                        }}
                      >
                        {size}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* READABILITY */}
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#9ca3af' }}>
                    Readability
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToolBtn icon={TextT} label="Dyslexia Font" active={state.dyslexiaFont} onClick={() => toggle('dyslexiaFont')} />
                    <ToolBtn icon={TextUnderline} label="Highlight Links" active={state.highlightLinks} onClick={() => toggle('highlightLinks')} />
                    <ToolBtn icon={TextAlignJustify} label="Line Height" active={state.lineHeight} onClick={() => toggle('lineHeight')} />
                    <ToolBtn icon={TextAa} label="Letter Spacing" active={state.letterSpacing} onClick={() => toggle('letterSpacing')} />
                  </div>
                </div>

                {/* VISUALS */}
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#9ca3af' }}>
                    Visuals
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToolBtn icon={Moon} label="Dark Mode" active={state.darkMode} onClick={() => toggle('darkMode')} />
                    <ToolBtn icon={CircleHalf} label="High Contrast" active={state.highContrast} onClick={() => toggle('highContrast')} />
                    <ToolBtn icon={SelectionInverse} label="Invert Colors" active={state.invertColors} onClick={() => toggle('invertColors')} />
                    <ToolBtn icon={Palette} label="Grayscale" active={state.grayscale} onClick={() => toggle('grayscale')} />
                  </div>
                </div>

                {/* FOCUS & NAVIGATION */}
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#9ca3af' }}>
                    Focus & Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <ToolBtn icon={Cursor} label="Big Cursor" active={state.bigCursor} onClick={() => toggle('bigCursor')} />
                    <ToolBtn icon={BookOpen} label="Reading Mask" active={state.readingMask} onClick={() => toggle('readingMask')} />
                    <ToolBtn icon={Pause} label="Stop Motion" active={state.stopMotion} onClick={() => toggle('stopMotion')} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 text-center text-[12px] shrink-0 border-t"
                style={{ color: '#9ca3af', borderColor: '#e5e0d8' }}
              >
                Accessibility tools for all users
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
