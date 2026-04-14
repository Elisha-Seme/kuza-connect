'use client'

import { ArrowRight, Target, Heart, Lightbulb, CheckCircle } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'
import ScrollRevealText from '@/components/sections/ScrollRevealText'

const values = [
  {
    icon: Target,
    title: 'Evidence-Driven',
    desc: 'Every recommendation is grounded in internationally benchmarked evidence, carefully adapted to local context and realities.',
    color: 'var(--kuza-purple)',
  },
  {
    icon: Heart,
    title: 'Locally-Led',
    desc: 'Sustainable change comes from building local ownership and capacity, not dependency on external expertise.',
    color: 'var(--kuza-orange)',
  },
  {
    icon: Lightbulb,
    title: 'Context-First',
    desc: 'Context beats content. What works elsewhere must be adapted thoughtfully to the specific cultural and systemic realities.',
    color: 'var(--kuza-yellow)',
  },
]

const team = [
  { name: 'Richard King', role: 'Founder', region: 'East Africa', expertise: 'Strategy, Organisational Development', photo: '/assets/images/richard_king.jpg' },
  { name: 'Eric Nyamwaro', role: 'Co-Founder', region: 'East Africa', expertise: 'Partnerships, Programme Design', photo: '/assets/images/eric-nyamwaro.webp' },
  { name: 'Vanessa Wambui', role: 'M&E Specialist', region: 'East Africa', expertise: 'M&E, Data Analysis', photo: '/assets/images/Vanessa.webp' },
  { name: 'Elisha Papa', role: 'IT Specialist', region: 'East Africa', expertise: 'Technology, Systems', photo: null },
]

const milestones = [
  { year: '2009', label: 'Founded in Nairobi, Kenya' },
  { year: '2013', label: 'First government partnership with Ministry of Education, Uganda' },
  { year: '2017', label: 'Expanded to Francophone Africa' },
  { year: '2021', label: 'Launched AI-powered diagnostic tools' },
  { year: '2024', label: '20 countries, 100+ expert associates' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About Us"
        heading="Who We Are"
        description="KuzaConnect is a team of international development and local contextual experts with decades of experience building education system capacity across the Global South."
      />

      {/* ── MISSION & VISION ─────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div
                className="rounded-2xl p-9 h-full"
                style={{ background: 'var(--kuza-cream)', border: '1px solid #e4e0d8' }}
              >
                <div className="section-label mb-4">Our Mission</div>
                <ScrollRevealText text="A world where all children learn" as="h2" className="text-h2 mb-4" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.05} />
                <p className="text-body" style={{ color: '#4b5563' }}>
                  We strengthen the capacity of governments and local organisations to deliver quality
                  education at scale, with a focus on equity, inclusion, and measurable outcomes for learners.
                </p>
                <div className="mt-6 space-y-2">
                  {['Learning poverty reduction', 'Systemic capacity building', 'Gender equity in education'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm" style={{ color: '#374151' }}>
                      <CheckCircle size={14} style={{ color: 'var(--kuza-orange)' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div
                className="rounded-2xl p-9 text-white h-full relative overflow-hidden"
                style={{ background: 'var(--kuza-purple-dark)' }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-12 translate-x-12 pointer-events-none"
                  style={{ background: 'rgba(239,113,34,0.1)' }}
                />
                <div className="section-label mb-4" style={{ color: 'var(--kuza-orange)' }}>Our Vision</div>
                <h2 className="text-h2 mb-4 text-white">Systems that outlast us</h2>
                <p className="text-body" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  We work ourselves out of a job by building local teams and institutions that can
                  sustain, adapt, and expand quality education without external dependency.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="section-label justify-center">What We Stand For</div>
              <ScrollRevealText text="Our Core Values" as="h2" className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.07} />
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08} direction="up">
                <div
                  className="card card-cream card-border-top p-7 h-full"
                  style={{ borderRadius: '20px' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${v.color}14` }}
                  >
                    <v.icon size={22} style={{ color: v.color }} />
                  </div>
                  <h3 className="text-h3 mb-3" style={{ color: 'var(--kuza-purple-dark)' }}>{v.title}</h3>
                  <p className="text-body" style={{ color: '#6b7280' }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="section-label justify-center">History</div>
              <ScrollRevealText text="Our Journey" as="h2" className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.08} />
            </div>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[88px] top-0 bottom-0 w-px"
              style={{ background: 'var(--kuza-purple-dark)', opacity: 0.7 }}
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.07} direction="left">
                  <div className="flex items-start gap-6">
                    <div
                      className="w-[88px] shrink-0 text-right pr-5 font-bold text-sm pt-0.5"
                      style={{ color: '#c9a84c' }}
                    >
                      {m.year}
                    </div>
                    <div className="relative">
                      {/* Dot */}
                      <div
                        className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: '#1a6b3c' }}
                      />
                      <p className="text-body font-medium" style={{ color: '#1e1e1e' }}>{m.label}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <div className="section-label">Leadership</div>
                <h2 className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }}>Meet the Core Team</h2>
              </div>
              <Link href="/associates" className="btn-ghost-green text-sm">
                View all associates <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.07} direction="up">
                <div
                  className="card card-cream overflow-hidden h-full"
                  style={{ borderRadius: '20px' }}
                >
                  {member.photo ? (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-48 flex items-center justify-center font-bold text-2xl text-white"
                      style={{ background: 'var(--kuza-purple-dark)' }}
                    >
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-[15px] mb-0.5" style={{ color: 'var(--kuza-purple-dark)' }}>{member.name}</h3>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#c9a84c' }}>{member.role}</p>
                    <p className="text-xs mb-2" style={{ color: '#9ca3af' }}>{member.region}</p>
                    <div
                      className="text-xs px-2 py-1 rounded-md inline-block"
                      style={{ background: 'rgba(99,87,165,0.07)', color: 'var(--kuza-purple)' }}
                    >
                      {member.expertise}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--kuza-purple-dark)', padding: '80px 0' }}
      >
        <FadeIn>
          <div className="container-xl text-center">
            <h2 className="text-h1 mb-4">Ready to partner with us?</h2>
            <p className="text-body mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '520px' }}>
              Whether you&apos;re a government ministry, development partner, or local NGO. Let&apos;s
              explore how we can build lasting education impact together.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
