'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  tag: string
  heading: string
  description: string
  /** Optional extra content below description */
  children?: React.ReactNode
}

export default function PageHero({ tag, heading, description, children }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'var(--kuza-purple-dark)',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      {/* Geometric pattern SVG — top right */}
      <svg
        className="absolute top-0 right-0 opacity-[0.07] pointer-events-none"
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        aria-hidden="true"
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

      <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="section-label justify-center mb-4 text-white/50"
          style={{ color: 'var(--kuza-orange)' }}
        >
          <span
            className="inline-block w-5 h-px mr-2"
            style={{ background: 'var(--kuza-orange)', verticalAlign: 'middle' }}
          />
          {tag}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-h1 text-white mb-5"
          style={{ fontWeight: 700 }}
        >
          {heading}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
          className="text-body-lg"
          style={{ color: 'rgba(255,255,255,0.68)', maxWidth: '600px', margin: '0 auto' }}
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34 }}
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
