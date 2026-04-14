'use client'

import Link from 'next/link'
import { ArrowRight, ChartBar, BookOpen, MagnifyingGlass, CheckCircle, ArrowSquareOut, ChartLineUp, Robot, FileText, TreeStructure, UsersFour, Database } from '@phosphor-icons/react'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'
import ScrollRevealText from '@/components/sections/ScrollRevealText'

const tools = [
  {
    icon: MagnifyingGlass,
    title: 'Impact Matcher',
    tagline: 'Find the right service for your context',
    description:
      'Answer 4 quick questions about your organisation, the challenge you face, and the scale you work at. The Impact Matcher analyses your inputs against KuzaConnect\'s full service catalogue and returns a personalised service recommendation in seconds.',
    how: [
      'Select your organisation type',
      'Describe your primary education challenge',
      'Indicate your scale of operation',
      'Specify your country context',
    ],
    output: 'A ranked service recommendation with reasoning, approach guidance, and suggested next steps.',
    href: '/impact-matcher',
    color: 'var(--kuza-purple)',
    accent: 'rgba(99,87,165,0.08)',
  },
  {
    icon: ChartBar,
    title: 'Capacity Assessment',
    tagline: 'Diagnose your organisation\'s education capacity',
    description:
      'A seven-question AI-guided diagnostic that scores your organisation across six dimensions: strategic vision, technical expertise, data use, financial management, stakeholder engagement, and learning culture. Identifies your strongest areas and biggest gaps.',
    how: [
      'Answer 7 structured questions about your organisation',
      'AI scores each dimension from 0 to 100',
      'Benchmarks your scores against best practice',
      'Identifies priority areas for capacity development',
    ],
    output: 'A scored capacity profile across 6 dimensions, with specific findings and tailored recommendations for each gap.',
    href: '/capacity-assessment',
    color: 'var(--kuza-orange)',
    accent: 'rgba(239,113,34,0.08)',
  },
  {
    icon: BookOpen,
    title: 'M&E Report Analyzer',
    tagline: 'Extract structured insights from any M&E document',
    description:
      'Upload any monitoring and evaluation document — a progress report, baseline study, endline evaluation, or programme review. The AI reads the full document and extracts key findings, achievements, risks, data gaps, and actionable recommendations.',
    how: [
      'Upload your document (PDF, DOCX, XLSX, PPTX, and more)',
      'Optionally add context about the programme',
      'AI analyses the full document content',
      'Results structured into findings, risks, and recommendations',
    ],
    output: 'A structured analysis with key findings, risk register, data gaps, prioritised recommendations, and suggested areas where KuzaConnect can add value.',
    href: '/mne-analyzer',
    color: '#1a6b3c',
    accent: 'rgba(26,107,60,0.07)',
  },
]

const aiServices = [
  {
    icon: ChartLineUp,
    title: 'Data Strategy & Architecture',
    desc: 'We help governments and NGOs design data strategies that connect programme monitoring to national education management systems. From data collection to dashboards, we build the infrastructure for evidence-based decision making.',
    outcomes: ['National EMIS integration', 'Real-time programme dashboards', 'Data governance frameworks'],
    color: 'var(--kuza-purple)',
    accent: 'rgba(99,87,165,0.08)',
  },
  {
    icon: Robot,
    title: 'AI-Assisted M&E Systems',
    desc: 'We embed AI into your monitoring and evaluation workflows. Rather than manual report collation, AI can surface trends, flag anomalies, and generate structured insight from field data at scale.',
    outcomes: ['Automated report synthesis', 'Anomaly detection in learning outcomes', 'AI-generated progress summaries'],
    color: 'var(--kuza-orange)',
    accent: 'rgba(239,113,34,0.08)',
  },
  {
    icon: FileText,
    title: 'Evidence Synthesis & Literature Review',
    desc: 'Our AI-assisted evidence synthesis service scans hundreds of papers, evaluations, and grey literature to distil the most relevant findings for your context, saving weeks of manual review.',
    outcomes: ['Rapid evidence reviews', 'Context-filtered literature mapping', 'What Works summaries'],
    color: '#1a6b3c',
    accent: 'rgba(26,107,60,0.08)',
  },
  {
    icon: TreeStructure,
    title: 'Theory of Change Development',
    desc: 'We work with your team to develop rigorous, AI-informed theories of change that connect activities to outcomes and map the assumptions underpinning your programme logic.',
    outcomes: ['Logic model development', 'Assumption mapping', 'Indicator framework design'],
    color: 'var(--kuza-purple)',
    accent: 'rgba(99,87,165,0.08)',
  },
  {
    icon: UsersFour,
    title: 'Capacity Building in Data Use',
    desc: 'We train programme teams, government officials, and local organisations to use data and AI tools confidently. Practical, context-specific workshops that build lasting internal capability.',
    outcomes: ['Data literacy workshops', 'AI tool onboarding', 'Coaching for senior leaders'],
    color: 'var(--kuza-orange)',
    accent: 'rgba(239,113,34,0.08)',
  },
  {
    icon: Database,
    title: 'Custom AI Tool Development',
    desc: 'Beyond our public tools, we build bespoke AI solutions tailored to your programme. From intake diagnostics to automated progress reporting, we scope, build, and deploy AI that fits your context.',
    outcomes: ['Bespoke diagnostic tools', 'Programme-specific AI assistants', 'Automated reporting pipelines'],
    color: '#1a6b3c',
    accent: 'rgba(26,107,60,0.08)',
  },
]

const principles = [
  {
    title: 'Evidence-informed, not evidence-replaced',
    desc: 'Our AI tools surface patterns and structure insights — but every recommendation is grounded in the same internationally benchmarked evidence base our consultants use.',
  },
  {
    title: 'Context as the starting point',
    desc: 'Each tool takes your country, organisation type, and specific challenge as inputs. The output is shaped by your context, not generic best practice.',
  },
  {
    title: 'Built for non-technical users',
    desc: 'No data science background needed. The tools are designed for programme managers, government officials, and NGO leaders who need fast, usable insights.',
  },
  {
    title: 'A bridge to deeper support',
    desc: 'AI tools give you a starting point. Where deeper diagnosis or implementation support is needed, our team of associates steps in to build from the AI output.',
  },
]

export default function AiSolutionsPage() {
  return (
    <>
      <PageHero
        tag="AI Solutions"
        heading="AI Built for Education Impact"
        description="Kuza Connect embeds artificial intelligence directly into the consulting process. Three tools designed to give governments, NGOs, and development partners faster, sharper insights."
      />

      {/* ── WHY AI ───────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="section-label">Our Approach to AI</div>
              <ScrollRevealText
                text="Faster insights. Deeper impact."
                as="h2"
                className="text-h2 mb-5"
                style={{ color: 'var(--kuza-purple-dark)' }}
                staggerDelay={0.05}
              />
              <p className="text-body mb-8" style={{ color: '#4b5563' }}>
                Education consulting has traditionally been slow — weeks of assessment before a recommendation,
                months before a plan. We use AI to compress that timeline without sacrificing quality.
                Our tools give organisations an immediate, structured starting point so the human expertise
                goes further, faster.
              </p>
              <Link href="/contact" className="btn-ghost-green">
                Talk to our team <ArrowRight size={15} />
              </Link>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="grid gap-4">
                {principles.map((p, i) => (
                  <div
                    key={p.title}
                    className="flex gap-4 p-5 rounded-xl"
                    style={{ background: i % 2 === 0 ? 'var(--kuza-cream)' : 'white', border: '1px solid #e4e0d8' }}
                  >
                    <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--kuza-orange)' }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--kuza-purple-dark)' }}>{p.title}</p>
                      <p className="text-sm" style={{ color: '#6b7280' }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TOOLS ────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="section-label justify-center">The Tools</div>
              <ScrollRevealText
                text="Three AI tools, one mission"
                as="h2"
                className="text-h2"
                style={{ color: 'var(--kuza-purple-dark)' }}
                staggerDelay={0.06}
              />
              <p className="text-body mt-3 mx-auto" style={{ color: '#6b7280', maxWidth: '480px' }}>
                Each tool addresses a different bottleneck in the education consulting process.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {tools.map((tool, i) => (
              <FadeIn key={tool.title} delay={i * 0.08} direction="up">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'white', border: '1px solid #e4e0d8' }}
                >
                  <div className="grid md:grid-cols-[1fr_340px]">
                    {/* Left: content */}
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: tool.accent }}
                        >
                          <tool.icon size={20} style={{ color: tool.color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-none" style={{ color: 'var(--kuza-purple-dark)' }}>{tool.title}</h3>
                          <p className="text-xs mt-0.5" style={{ color: tool.color }}>{tool.tagline}</p>
                        </div>
                      </div>

                      <p className="text-body mb-6" style={{ color: '#4b5563' }}>{tool.description}</p>

                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>How it works</p>
                        <ol className="space-y-2">
                          {tool.how.map((step, si) => (
                            <li key={si} className="flex items-start gap-3 text-sm" style={{ color: '#374151' }}>
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                style={{ background: tool.accent, color: tool.color }}
                              >
                                {si + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div
                        className="text-sm p-4 rounded-xl mb-6"
                        style={{ background: tool.accent, color: '#374151' }}
                      >
                        <span className="font-semibold" style={{ color: tool.color }}>Output: </span>
                        {tool.output}
                      </div>

                      <Link
                        href={tool.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
                        style={{ background: tool.color }}
                      >
                        Launch {tool.title} <ArrowSquareOut size={14} />
                      </Link>
                    </div>

                    {/* Right: visual accent */}
                    <div
                      className="hidden md:flex flex-col items-center justify-center p-10 relative overflow-hidden"
                      style={{ background: tool.accent }}
                    >
                      <tool.icon size={80} style={{ color: tool.color, opacity: 0.15 }} />
                      <div className="text-center mt-6">
                        <p className="text-3xl font-bold" style={{ color: tool.color }}>
                          {i === 0 ? '4' : i === 1 ? '7' : '20+'}
                        </p>
                        <p className="text-xs mt-1 font-medium" style={{ color: '#6b7280' }}>
                          {i === 0 ? 'Questions to a recommendation' : i === 1 ? 'Dimensions assessed' : 'File formats supported'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SERVICES ─────────────────────────────── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="section-label justify-center">Consulting Services</div>
              <ScrollRevealText
                text="AI services we deliver for you"
                as="h2"
                className="text-h2"
                style={{ color: 'var(--kuza-purple-dark)' }}
                staggerDelay={0.05}
              />
              <p className="text-body mt-3 mx-auto" style={{ color: '#6b7280', maxWidth: '520px' }}>
                Beyond the free tools above, Kuza Connect offers end-to-end AI consulting services,
                co-designed with your team and delivered by our expert associates.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.07} direction="up">
                <div
                  className="rounded-2xl p-7 h-full flex flex-col card-hover"
                  style={{ background: 'var(--kuza-cream)', border: '1px solid #e4e0d8' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                    style={{ background: svc.accent }}
                  >
                    <svc.icon size={20} style={{ color: svc.color }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: 'var(--kuza-purple-dark)' }}>
                    {svc.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#4b5563' }}>
                    {svc.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {svc.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-xs" style={{ color: '#6b7280' }}>
                        <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-primary">
                Discuss Your Needs <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--kuza-purple-dark)', padding: '80px 0' }}
      >
        <FadeIn>
          <div className="container-xl text-center">
            <h2 className="text-h1 mb-4">Want AI built into your programme?</h2>
            <p className="text-body mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '520px' }}>
              Beyond these tools, Kuza Connect can help you embed data-driven decision making and
              AI-assisted monitoring into your own programmes and systems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get in Touch <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-outline-white">
                View All Services
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
