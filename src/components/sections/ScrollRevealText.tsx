'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  style?: React.CSSProperties
  delay?: number
  staggerDelay?: number
  duration?: number
  once?: boolean
}

export default function ScrollRevealText({
  text,
  as: Tag = 'p',
  className = '',
  style,
  delay = 0,
  staggerDelay = 0.035,
  duration = 0.7,
  once = true,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once, margin: '-60px' })

  const words = text.split(' ')

  return (
    <Tag
      // @ts-expect-error ref typing between Element subtypes
      ref={ref}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: '0.28em',
            paddingBottom: '0.05em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration,
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
