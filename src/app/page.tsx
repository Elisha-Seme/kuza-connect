'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Globe, Users, BookOpen, ChartBar,
  CheckCircle, TrendUp, Shield, CaretDown
} from '@phosphor-icons/react'
import FadeIn from '@/components/sections/FadeIn'
import ScrollRevealText from '@/components/sections/ScrollRevealText'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const services = [
  {
    num: '01', icon: BookOpen, title: 'Foundation Learning',
    desc: 'Building literacy and numeracy at scale for early-grade learners across the Global South.',
  },
  {
    num: '02', icon: Users, title: 'Teacher Development',
    desc: 'Strengthening teaching capacity through evidence-based professional development.',
  },
  {
    num: '03', icon: Globe, title: 'Curriculum Development',
    desc: 'Designing contextually relevant, standards-aligned curricula for diverse learning contexts.',
  },
  {
    num: '04', icon: ChartBar, title: 'M&E Systems',
    desc: 'Accountability systems and monitoring frameworks that drive measurable, sustainable impact.',
  },
]

const stats = [
  { value: 20, suffix: '+', label: 'Countries' },
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Years' },
  { value: 100, suffix: '+', label: 'Associates' },
]

const testimonials = [
  {
    quote: 'KuzaConnect brought rigour and cultural understanding in equal measure. They understood our context from day one.',
    name: 'Dr. Grace Muthoni',
    role: 'Director of Education',
    org: 'Ministry of Education, Kenya',
  },
  {
    quote: 'The capacity assessment tool gave us insights we did not know we were missing. It transformed how we approach our programmes.',
    name: 'Peter Njoroge',
    role: 'Programme Lead',
    org: 'Kenya Education Fund',
  },
  {
    quote: 'Exceptional delivery and genuine partnership. They worked themselves into our team and left lasting capacity behind.',
    name: 'Wanjiru Kamau',
    role: 'Country Director',
    org: 'Concern Worldwide Kenya',
  },
]

const aiTools = [
  {
    title: 'Impact Matcher',
    desc: 'Answer 4 questions and get a tailored KuzaConnect service recommendation instantly.',
    href: '/impact-matcher',
    gradient: 'var(--kuza-purple-dark)',
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
  },
  {
    title: 'Capacity Assessment',
    desc: 'AI-guided diagnostic that scores your organisation\'s education capacity gaps across 6 dimensions.',
    href: '/capacity-assessment',
    gradient: 'var(--kuza-purple-dark)',
    pattern: "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0zM8 8h4v4H8zM16 16h4v4h-4zM24 24h4v4h-4z' fill='%23ffffff' fill-opacity='0.04'/%3E%3C/svg%3E\")",
  },
  {
    title: 'M&E Analyzer',
    desc: 'Upload any M&E report. AI extracts key findings, risks, and recommendations in seconds.',
    href: '/mne-analyzer',
    gradient: 'var(--kuza-purple-dark)',
    pattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='9' width='20' height='1' fill='%23000000' fill-opacity='0.16'/%3E%3Crect x='9' y='0' width='1' height='20' fill='%23000000' fill-opacity='0.16'/%3E%3C/svg%3E\")",
  },
]

const proverbs = [
  '"If you want to go fast, go alone; if you want to go far, go together."',
  '"A person is taller than any mountain they have climbed."',
  '"It takes a village to educate a child."',
  '"There are no shortcuts to the top of the palm tree."',
  '"If you wish to move mountains tomorrow, you must start by lifting stones today."',
]

const trustFeatures = [
  { icon: CheckCircle, label: 'Evidence-based methodology' },
  { icon: TrendUp, label: 'Measurable impact' },
  { icon: Shield, label: 'Locally-led approach' },
  { icon: Globe, label: 'Global South expertise' },
]

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return { count, ref }
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function StatPill({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div>
      <div className="text-3xl font-bold tabular-nums leading-none" style={{ color: '#c9a84c' }}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="text-xs mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</div>
    </div>
  )
}

const HERO_IMAGES = [
  '/assets/images/hero-bg_1.jpg',
  '/assets/images/hero-bg_2.jpg',
  '/assets/images/hero-bg_3.jpg',
]

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_IMAGES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[index]}
            alt="KuzaConnect Hero Background"
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>
      {/* Overlay to ensure text readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26,22,48,0.45)' }}
      />
    </div>
  )
}

function ProverbTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % proverbs.length), 5500)
    return () => clearInterval(t)
  }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45 }}
        className="italic"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {proverbs[i]}
      </motion.span>
    </AnimatePresence>
  )
}

function AiToolCard({ tool }: { tool: typeof aiTools[0] }) {
  return (
    <Link href={tool.href}>
      <div
        className="relative rounded-2xl p-7 text-white overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
        style={{
          background: tool.gradient,
          backgroundImage: tool.pattern,
          minHeight: '220px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.68)' }}>
            {tool.desc}
          </p>
          <div
            className="flex items-center gap-1.5 mt-5 text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Open tool <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col justify-between h-full card"
      style={{ background: 'white', minHeight: '220px' }}
    >
      <div>
        <p className="text-body leading-relaxed mb-5" style={{ color: '#374151' }}>
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
          style={{ background: 'var(--kuza-purple-dark)' }}
        >
          {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--kuza-purple-dark)' }}>{t.name}</p>
          <p className="text-xs" style={{ color: '#6b7280' }}>{t.role}, {t.org}</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--kuza-purple-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <BackgroundSlideshow />


        {/* MAIN CONTENT */}
        <div className="container-xl relative flex-1 flex items-center py-24 md:py-28 w-full" style={{ zIndex: 2 }}>
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-20 items-center w-full">

            {/* LEFT */}
            <div>
              {/* Headline - word reveal */}
              <ScrollRevealText
                text="Kuza Connect"
                as="h1"
                className="text-display text-white mb-3"
                style={{ lineHeight: 1.05 }}
                delay={0.1}
                staggerDelay={0.12}
                duration={0.75}
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-lg font-semibold mb-6 uppercase tracking-widest"
                style={{ color: 'var(--kuza-orange)' }}
              >
                Impact through excellence
              </motion.p>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-body-lg mb-8"
                style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '520px', lineHeight: 1.65 }}
              >
                Kuza Connect helps locally driven solutions to grow. Offering high-quality support
                connecting international evidence, local knowledge, technology, and expert teams,
                we build the capacity of governments and local organisations to deliver system-wide impact.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap gap-x-6 gap-y-2.5 mb-10"
              >
                {trustFeatures.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <f.icon size={13} style={{ color: 'var(--kuza-orange)' }} />
                    {f.label}
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-14"
              >
                <Link href="/impact-matcher" className="btn-primary">
                  Find Your Solution <ArrowRight size={15} />
                </Link>
                <Link href="/about" className="btn-outline-white">
                  Learn More
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex flex-wrap gap-8 border-t pt-8"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {stats.map((s) => (
                  <StatPill key={s.label} {...s} />
                ))}
              </motion.div>
            </div>

            {/* RIGHT - Featured tool + service + explore prompt */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex flex-col gap-3"
            >
              {/* ── Featured AI Tool ── */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}
              >
                {/* colour band */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--kuza-orange), var(--kuza-yellow))' }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(239,113,34,0.2)', color: 'var(--kuza-orange)' }}
                    >
                      AI Tool
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Impact Matcher</h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Answer 4 quick questions about your organisation and challenge. Get a personalised KuzaConnect service recommendation in seconds.
                  </p>
                  <Link
                    href="/impact-matcher"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: 'var(--kuza-orange)', color: 'white' }}
                  >
                    Try it now <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* ── Featured Service ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}
              >
                {/* colour band */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--kuza-purple), var(--kuza-purple-light))' }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(99,87,165,0.25)', color: 'var(--kuza-purple-light)' }}
                    >
                      Service
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Foundation Learning</h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Building literacy and numeracy at scale. We design and implement early-grade reading and maths programmes aligned to national standards.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    View service <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>

              {/* ── Explore prompt ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  3 AI tools &amp; 14 service areas
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/ai-solutions"
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-90"
                    style={{ background: 'rgba(239,113,34,0.18)', color: 'var(--kuza-orange)' }}
                  >
                    All AI tools
                  </Link>
                  <Link
                    href="/services"
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-90"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
                  >
                    All services
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM STRIP: Proverb + Scroll ── */}
        <div
          className="relative flex items-center justify-between px-6 py-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)', zIndex: 2 }}
        >
          <p className="text-xs italic flex-1 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <ProverbTicker />
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="shrink-0 ml-4"
          >
            <CaretDown size={16} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </div>
      </section>

      {/* ── APPROACH ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="section-label">Our Approach</div>
              <ScrollRevealText
                text="Evidence drives impact. Context beats content."
                as="h2"
                className="text-h2 mb-5"
                style={{ color: 'var(--kuza-purple-dark)' }}
                staggerDelay={0.04}
              />
              <p className="text-body mb-6" style={{ color: '#4b5563' }}>
                We have two principles. First, that evidence drives impact. Second, that context beats content.
                Hence, we combine local knowledge with internationally benchmarked evidence for any assignment.
                We are led by your needs, with a teaming approach that is flexible, connecting international
                and locally based consultants to offer the right blended expertise, a capacity development
                model for sustainable results, and quality assurance process focussed on impact.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Flexible teaming: right blended expertise for every context',
                  'Capacity development model for sustainable results',
                  'Quality assurance process focussed on impact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#374151' }}>
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--kuza-purple)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-ghost-green">
                About us <ArrowRight size={15} />
              </Link>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: '360px' }}>
                <Image
                  src="/assets/images/gallery4.webp"
                  alt="KuzaConnect workshop, collaborative session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-6 py-5"
                  style={{ background: 'linear-gradient(to top, rgba(26,22,48,0.85) 0%, transparent 100%)' }}
                >
                  <p className="text-white text-sm font-medium">Workshop facilitation, Nairobi</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Co-designing solutions with local partners</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <div className="section-label">What We Do</div>
                <ScrollRevealText
                  text="Our Service Areas"
                  as="h2"
                  className="text-h2"
                  style={{ color: 'var(--kuza-purple-dark)' }}
                  staggerDelay={0.06}
                />
              </div>
              <Link href="/services" className="btn-ghost-green">
                View all services <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07} direction="up">
                <div
                  className="card card-cream card-border-top p-6 h-full"
                  style={{ borderRadius: '20px' }}
                >
                  {/* Number badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 hover:rotate-3"
                      style={{ background: 'rgba(var(--kuza-purple-rgb), 0.08)' }}
                    >
                      <s.icon size={20} style={{ color: 'var(--kuza-purple)' }} />
                    </div>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: 'rgba(var(--kuza-purple-rgb), 0.2)' }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-h3 mb-2" style={{ color: 'var(--kuza-purple-dark)' }}>{s.title}</h3>
                  <p className="text-caption" style={{ color: '#6b7280' }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ───────────────────────────────── */}
      <section style={{ background: 'var(--kuza-purple-dark)' }}>
        <div className="container-xl py-10">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              In the Field
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FadeIn direction="left" delay={0.05}>
              <div className="relative rounded-xl overflow-hidden img-zoom" style={{ height: 'clamp(200px, 30vw, 280px)' }}>
                <Image
                  src="/assets/images/gallery2.webp"
                  alt="KuzaConnect partners collaborating at a conference"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative rounded-xl overflow-hidden img-zoom" style={{ height: 'clamp(200px, 30vw, 280px)' }}>
                <Image
                  src="/assets/images/gallery3.webp"
                  alt="Eric Nyamwaro presenting at an education workshop"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TESTIMONIALS ───────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="section-label justify-center">Partner Voices</div>
              <ScrollRevealText
                text="Trusted by leaders across the Global South"
                as="h2"
                className="text-h2"
                style={{ color: 'var(--kuza-purple-dark)' }}
                staggerDelay={0.04}
              />
              <p className="text-body mt-3 mx-auto" style={{ color: '#6b7280', maxWidth: '480px' }}>
                Governments, donors, and NGOs rely on Kuza Connect to deliver system-wide education impact.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08} direction="up">
                <TestimonialCard t={t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI TOOLS ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <div className="section-label">AI Tools</div>
                <h2 className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }}>Intelligence built for education</h2>
                <p className="text-body mt-2" style={{ color: '#6b7280', maxWidth: '440px' }}>
                  Kuza Connect embeds AI directly into the consulting process for faster, smarter insights to support your work.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {aiTools.map((tool, i) => (
              <FadeIn key={tool.href} delay={i * 0.09} direction="up">
                <AiToolCard tool={tool} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION CTA ───────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: 'var(--kuza-purple-dark)',
          padding: '100px 0',
        }}
      >
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <FadeIn>
            <div className="section-label justify-center" style={{ color: '#c9a84c' }}>
              Our Mission
            </div>
            <ScrollRevealText
              text="A world where all children learn"
              as="h2"
              className="text-h1 mb-5 mt-1"
              staggerDelay={0.05}
            />
            <p className="text-body-lg mb-6" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              As a mission-driven organisation, we want a world where all children learn. We focus on
              the Global South where learning poverty and equity issues are greatest. Our contribution
              is to strengthening the capacity of education ecosystems, both government and local
              organisations. We believe passionately in local ownership and locally driven solutions,
              acting as partners in the process.
            </p>
            <p className="text-sm italic mb-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
              &ldquo;It takes a village to educate a child.&rdquo; African Proverb
            </p>
            <Link href="/contact" className="btn-primary">
              Ready to Work with Us? <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
