'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatCircleDots, X, PaperPlaneRight, CircleNotch } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What services do you offer?',
  'Do you work in Francophone Africa?',
  'How does your capacity building work?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the Kuza Assistant. Ask me anything about KuzaConnect's services, approach, or how we can support your work.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or email us at info@kuzaconnect.com' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white"
          style={{ background: 'var(--kuza-purple-dark)', boxShadow: '0 8px 32px rgba(26,22,48,0.4)' }}
          aria-label="Open Kuza Assistant"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} color="white" />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
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
            style={{ border: '1px solid #e4e0d8', background: 'white', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 shrink-0 relative overflow-hidden" style={{ background: 'var(--kuza-purple-dark)' }}>
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <ChatCircleDots size={18} style={{ color: 'white' }} />
              </div>
              <div className="flex-1">
                <p className="text-white text-[15px] font-bold">Kuza Assistant</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>KuzaConnect AI</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: '#fcfcfc' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${msg.role === 'user'
                        ? 'bg-[#6357a5] text-white rounded-[1.25rem_1.25rem_0.25rem_1.25rem]'
                        : 'bg-white text-[#1e1e1e] border border-[#e4e0d8] rounded-[1.25rem_1.25rem_1.25rem_0.25rem]'
                      }`}
                  >
                    {msg.content || (loading && i === messages.length - 1 ? (
                      <CircleNotch size={16} className="animate-spin opacity-40" />
                    ) : '')}
                  </div>
                </motion.div>
              ))}

              {/* Suggestion tags */}
              {messages.length === 1 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, idx) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      onClick={() => send(s)}
                      className="text-[13px] px-4 py-2 rounded-full border transition-all hover:border-[#6357a5] hover:bg-[#6357a5] hover:text-white"
                      style={{ borderColor: '#6357a5', color: '#6357a5' }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} className="h-2" />
            </div>

            {/* Form */}
            <div className="p-4 bg-white border-t" style={{ borderColor: '#e4e0d8' }}>
              <div className="flex items-center gap-2 bg-[#f8f7f4] rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-[#6357a5]/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-[14px] px-3.5 py-2 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ background: 'var(--kuza-purple)' }}
                >
                  <PaperPlaneRight size={16} color="white" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 font-medium opacity-20">Kuza AI may provide inaccurate info. Verify key facts.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
