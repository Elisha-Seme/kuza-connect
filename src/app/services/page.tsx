'use client'

import Link from 'next/link'
import { ArrowRight, MagnifyingGlass, Lightbulb, RocketLaunch } from '@phosphor-icons/react'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'
import ScrollRevealText from '@/components/sections/ScrollRevealText'

const methodology = [
  { title: 'Foundation Learning', desc: 'Building literacy and numeracy at scale. We design and implement early-grade reading and math programs aligned to national standards.' },
  { title: 'Teacher Development', desc: 'From pre-service to in-service training: coaching, mentoring, and structured professional development that sticks.' },
  { title: 'Curriculum Development', desc: 'Co-designing contextually relevant, standards-aligned curricula with national teams, bringing international evidence to local realities.' },
  { title: 'Accountability Systems', desc: 'Building robust assessment frameworks that enable governments to track learning outcomes at scale with actionable data.' },
  { title: 'Employability', desc: 'Bridging education and work, designing skills programs that connect youth to meaningful economic opportunities.' },
  { title: 'Gender & Inclusion', desc: 'Embedding equity at every level, from policy design to classroom practice, ensuring no learner is left behind.' },
  { title: 'EdTech', desc: 'Deploying appropriate technology that fits context. We evaluate, adapt, and implement EdTech solutions for real classrooms.' },
]

const organisational = [
  { title: 'Strategy', desc: 'Supporting governments and organisations to develop clear, evidence-based education strategies with measurable goals.' },
  { title: 'Policy Support', desc: 'Translating political priorities into actionable policy, and policies into implementable, funded plans.' },
  { title: 'Business Growth & Fundraising', desc: 'Helping local organisations build sustainable funding pipelines and expand their geographic reach.' },
  { title: 'Solution Design', desc: 'Co-designing fit-for-purpose interventions from problem diagnosis through to implementation planning.' },
  { title: 'Project Management', desc: 'End-to-end project management ensuring quality delivery, stakeholder alignment, and adaptive management.' },
  { title: 'Budget Management', desc: 'Financial management systems ensuring accountability, transparency, and efficient use of development resources.' },
  { title: 'M&E', desc: 'Monitoring and evaluation frameworks that measure what matters, generating actionable data for continuous learning.' },
]

const howWeWork = [
  { icon: MagnifyingGlass, num: '01', title: 'Diagnose', desc: 'We start by deeply understanding the problem: context, history, system dynamics, and existing capacity.' },
  { icon: Lightbulb, num: '02', title: 'Design', desc: 'We co-create solutions with local partners, adapting international evidence to fit the specific context.' },
  { icon: RocketLaunch, num: '03', title: 'Deliver', desc: 'We implement with quality, adapt in real-time, and build local capacity to sustain and scale outcomes.' },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="What We Offer"
        heading="Our Services"
        description="Fourteen service areas across methodology and organisational development, co-designed with partners to meet real needs in real contexts."
      />

      {/* ── HOW WE WORK ──────────────────────────────── */}
      <section className="section-pad" style={{ background: '#f3f0fc' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="section-label justify-center">Our Method</div>
              <ScrollRevealText text="How We Work" as="h2" className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.07} />
              <p className="text-body mt-3 mx-auto" style={{ color: '#6b7280', maxWidth: '480px' }}>
                A structured approach to problem-solving that balances international evidence with local wisdom.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div
              className="absolute top-[44px] left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-px hidden md:block"
              style={{ background: 'var(--kuza-purple-dark)', opacity: 0.15 }}
            />
            {howWeWork.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1} direction="up">
                <div className="text-center p-7">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 relative"
                    style={{ background: i === 1 ? 'var(--kuza-purple)' : 'rgba(99,87,165,0.08)' }}
                  >
                    <step.icon size={22} style={{ color: i === 1 ? 'var(--kuza-yellow)' : 'var(--kuza-purple)' }} />
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                      style={{ background: 'var(--kuza-orange)', color: 'white' }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-h3 mb-3" style={{ color: 'var(--kuza-purple-dark)' }}>{step.title}</h3>
                  <p className="text-body" style={{ color: '#6b7280' }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY SERVICES ─────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(99,87,165,0.1)', color: 'var(--kuza-purple)' }}>
                Track 01
              </div>
              <ScrollRevealText text="Methodology Services" as="h2" className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.05} />
              <p className="text-body mt-2" style={{ color: '#6b7280' }}>Education-specific technical expertise.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {methodology.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05} direction="up">
                <div
                  className="card card-cream card-accent-left p-6 h-full"
                  style={{ borderRadius: '16px' }}
                >
                  <h3 className="text-h3 mb-2.5" style={{ color: 'var(--kuza-purple-dark)' }}>{s.title}</h3>
                  <p className="text-body" style={{ color: '#6b7280', fontSize: '0.9rem' }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORGANISATIONAL SERVICES ──────────────────── */}
      <section className="section-pad" style={{ background: '#f3f0fc' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(239,113,34,0.12)', color: 'var(--kuza-orange)' }}>
                Track 02
              </div>
              <ScrollRevealText text="Organisational Services" as="h2" className="text-h2" style={{ color: 'var(--kuza-purple-dark)' }} staggerDelay={0.05} />
              <p className="text-body mt-2" style={{ color: '#6b7280' }}>Systems and capacity that make change stick.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {organisational.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05} direction="up">
                <div
                  className="card card-border-top orange p-6 h-full"
                  style={{ borderRadius: '16px', background: 'var(--kuza-cream)', border: '1px solid #ddd8f0' }}
                >
                  <h3 className="text-h3 mb-2.5" style={{ color: 'var(--kuza-purple-dark)' }}>{s.title}</h3>
                  <p className="text-body" style={{ color: '#6b7280', fontSize: '0.9rem' }}>{s.desc}</p>
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
            <h2 className="text-h1 mb-4">Not sure which service fits?</h2>
            <p className="text-body mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '480px' }}>
              Use our AI Impact Matcher: answer 4 questions and get a personalised recommendation in under 2 minutes.
            </p>
            <Link href="/impact-matcher" className="btn-primary">
              Try Impact Matcher <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
