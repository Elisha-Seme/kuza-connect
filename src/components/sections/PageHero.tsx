'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollRevealText from './ScrollRevealText'

interface PageHeroProps {
  tag: string
  heading: string
  description: string
  /** Optional extra content below description */
  children?: React.ReactNode
}

export default function PageHero({ tag, heading, description, children }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
      style={{
        background: 'var(--kuza-purple-dark)',
        paddingTop: 'clamp(72px, 10vw, 96px)',
        paddingBottom: 'clamp(72px, 10vw, 96px)',
      }}
    >
      {/* Parallax geometric pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 right-0 opacity-[0.07]"
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
        >
          {[0, 60, 120, 180, 240].map((x) =>
            [0, 60, 120, 180, 240, 300].map((y) => (
              <rect
                key={`${x}-${y}`}
                x={x + 10}
                y={y + 10}
                width={40}
                height={40}
                rx={4}
                fill="white"
              />
            ))
          )}
        </svg>
        {/* Subtle gradient orb */}
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, var(--kuza-orange) 0%, transparent 70%)' }}
        />
      </motion.div>

      <div className="container-xl relative z-10 text-center" style={{ maxWidth: '760px', margin: '0 auto' }}>
        {/* Tag label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="section-label justify-center mb-4"
          style={{ color: 'var(--kuza-orange)' }}
        >
          <span
            className="inline-block w-5 h-px mr-2"
            style={{ background: 'var(--kuza-orange)', verticalAlign: 'middle' }}
          />
          {tag}
        </motion.div>

        {/* Heading — word-by-word reveal */}
        <ScrollRevealText
          text={heading}
          as="h1"
          className="text-h1 text-white mb-5"
          style={{ fontWeight: 700 }}
          delay={0.08}
          staggerDelay={0.06}
          duration={0.65}
        />

        {/* Description — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
          className="text-body-lg"
          style={{ color: 'rgba(255,255,255,0.68)', maxWidth: '600px', margin: '0 auto' }}
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.08)' }}
      />
    </section>
  )
}
