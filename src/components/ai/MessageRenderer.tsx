'use client'

import React from 'react'

/* ─── inline parser ─────────────────────────────────────────────────────── */
function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // match **bold**, *italic*, `code`
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let cursor = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) nodes.push(text.slice(cursor, m.index))

    if (m[2]) {
      nodes.push(
        <strong key={m.index} style={{ fontWeight: 700, color: '#1a1630' }}>
          {m[2]}
        </strong>
      )
    } else if (m[3]) {
      nodes.push(
        <em key={m.index} style={{ fontStyle: 'italic', color: '#6b7280' }}>
          {m[3]}
        </em>
      )
    } else if (m[4]) {
      nodes.push(
        <code
          key={m.index}
          style={{
            background: 'rgba(99,87,165,0.09)',
            color: '#6357a5',
            padding: '1px 6px',
            borderRadius: '4px',
            fontSize: '0.82em',
            fontFamily: 'monospace',
          }}
        >
          {m[4]}
        </code>
      )
    }
    cursor = m.index + m[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

/* ─── block renderer ────────────────────────────────────────────────────── */
export default function MessageRenderer({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <span className="text-[14px] leading-relaxed">{content}</span>
  }

  const lines = content.split('\n')
  const blocks: React.ReactNode[] = []
  let bullets: string[] = []
  let numbered: string[] = []
  let key = 0

  const flushBullets = () => {
    if (!bullets.length) return
    blocks.push(
      <ul key={key++} style={{ margin: '6px 0', paddingLeft: 0, listStyle: 'none' }}>
        {bullets.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--kuza-orange)',
                flexShrink: 0,
                marginTop: '7px',
              }}
            />
            <span style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#374151' }}>
              {parseInline(item)}
            </span>
          </li>
        ))}
      </ul>
    )
    bullets = []
  }

  const flushNumbered = () => {
    if (!numbered.length) return
    blocks.push(
      <ol key={key++} style={{ margin: '6px 0', paddingLeft: 0, listStyle: 'none' }}>
        {numbered.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginBottom: '6px' }}>
            <span
              style={{
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(99,87,165,0.12)',
                color: '#6357a5',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '3px',
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#374151' }}>
              {parseInline(item)}
            </span>
          </li>
        ))}
      </ol>
    )
    numbered = []
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const t = raw.trim()

    if (!t) { flushBullets(); flushNumbered(); continue }

    // h2
    if (t.startsWith('## ')) {
      flushBullets(); flushNumbered()
      blocks.push(
        <p key={key++} style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--kuza-orange)',
          margin: '12px 0 4px',
        }}>
          {t.slice(3)}
        </p>
      )
      continue
    }

    // h3
    if (t.startsWith('### ')) {
      flushBullets(); flushNumbered()
      blocks.push(
        <p key={key++} style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#1a1630',
          margin: '10px 0 3px',
        }}>
          {parseInline(t.slice(4))}
        </p>
      )
      continue
    }

    // bullet
    if (t.startsWith('- ') || t.startsWith('* ')) {
      flushNumbered()
      bullets.push(t.slice(2))
      continue
    }

    // numbered
    const numMatch = t.match(/^(\d+)\.\s+(.+)/)
    if (numMatch) {
      flushBullets()
      numbered.push(numMatch[2])
      continue
    }

    // divider
    if (t === '---') {
      flushBullets(); flushNumbered()
      blocks.push(<hr key={key++} style={{ border: 'none', borderTop: '1px solid #e4e0d8', margin: '8px 0' }} />)
      continue
    }

    // paragraph
    flushBullets(); flushNumbered()
    blocks.push(
      <p key={key++} style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#374151', margin: '0 0 6px' }}>
        {parseInline(t)}
      </p>
    )
  }

  flushBullets()
  flushNumbered()

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>{blocks}</div>
}
