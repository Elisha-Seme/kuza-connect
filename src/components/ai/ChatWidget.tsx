'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatCircleDots, X, PaperPlaneRight } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageRenderer from './MessageRenderer'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What services do you offer?',
  'Tell me about your AI tools',
  'How do you work with governments?',
]

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 2px' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#9ca3af',
            display: 'block',
          }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the **Kuza Assistant**.\n\nAsk me anything about KuzaConnect's services, AI tools, or how we can support your work.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantText }
          return updated
        })
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or email us at **info@kuzaconnect.com**' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white"
          style={{ background: 'var(--kuza-purple-dark)', boxShadow: '0 8px 32px rgba(26,22,48,0.4)' }}
          aria-label="Open Kuza Assistant"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} color="white" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <ChatCircleDots size={22} color="white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden sm:inset-auto sm:bottom-24 sm:right-6 sm:w-95 sm:max-h-150 sm:h-[75vh] sm:rounded-3xl"
            style={{ background: '#f8f7f4', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)', border: '1px solid #ddd8f0' }}
          >

            {/* ── Header ── */}
            <div
              className="shrink-0 flex items-center gap-3 px-5 py-4 relative overflow-hidden"
              style={{ background: 'var(--kuza-purple-dark)' }}
            >
              {/* subtle glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'rgba(239,113,34,0.12)' }} />
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                <ChatCircleDots size={18} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[15px] font-bold leading-none">Kuza Assistant</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>KuzaConnect AI</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3" style={{ background: '#f8f7f4' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Assistant avatar dot */}
                  {msg.role === 'assistant' && (
                    <div
                      className="w-6 h-6 rounded-full shrink-0 mb-0.5 flex items-center justify-center"
                      style={{ background: 'var(--kuza-purple-dark)' }}
                    >
                      <ChatCircleDots size={12} color="white" />
                    </div>
                  )}

                  <div
                    className="max-w-[88%]"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #6357a5, #8e82c7)',
                            color: 'white',
                            padding: '10px 14px',
                            borderRadius: '18px 18px 4px 18px',
                            fontSize: '14px',
                            lineHeight: 1.6,
                            boxShadow: '0 2px 8px rgba(99,87,165,0.25)',
                          }
                        : {
                            background: '#fdfcff',
                            padding: '12px 14px',
                            borderRadius: '4px 18px 18px 18px',
                            border: '1px solid #ebe8e2',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                          }
                    }
                  >
                    {msg.content === '' && loading && i === messages.length - 1 ? (
                      <TypingDots />
                    ) : (
                      <MessageRenderer content={msg.content} isUser={msg.role === 'user'} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator as a separate bubble while loading with no content yet */}
              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--kuza-purple-dark)' }}
                  >
                    <ChatCircleDots size={12} color="white" />
                  </div>
                  <div
                    style={{
                      background: '#fdfcff',
                      padding: '10px 14px',
                      borderRadius: '4px 18px 18px 18px',
                      border: '1px solid #ebe8e2',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* Suggestion chips */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 pt-1 pl-8"
                >
                  {SUGGESTIONS.map((s, idx) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.08 }}
                      onClick={() => send(s)}
                      className="text-[12px] px-3.5 py-1.5 rounded-full border font-medium transition-all hover:shadow-sm active:scale-95"
                      style={{ borderColor: 'rgba(99,87,165,0.25)', color: '#6357a5', background: '#fdfcff' }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget
                        el.style.background = '#6357a5'
                        el.style.color = 'white'
                        el.style.borderColor = '#6357a5'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        el.style.background = 'white'
                        el.style.color = '#6357a5'
                        el.style.borderColor = 'rgba(99,87,165,0.25)'
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div
              className="shrink-0 px-4 py-3"
              style={{ background: '#fdfcff', borderTop: '1px solid #ddd8f0' }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl transition-all"
                style={{ background: '#f3f2ef', border: '1.5px solid transparent' }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-[14px] px-4 py-3 focus:outline-none"
                  style={{ color: '#1e1e1e' }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center mr-1.5 transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                  style={{ background: 'var(--kuza-purple)', flexShrink: 0 }}
                  aria-label="Send"
                >
                  <PaperPlaneRight size={15} color="white" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-2.5 font-medium" style={{ color: '#d1d5db' }}>
                Kuza AI may be inaccurate. Verify key information.
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
