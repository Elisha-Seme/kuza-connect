'use client'

import { useState } from 'react'
import { Sparkle, CircleNotch, ArrowRight, CaretLeft, CheckCircle } from '@phosphor-icons/react'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'

const QUESTIONS = [
  { id: 'vision', question: 'Does your organisation have a clear strategic plan with measurable education goals?', options: ['No plan exists', 'Informal plans only', 'Formal plan but not implemented', 'Clear plan, actively implemented'] },
  { id: 'staff', question: 'How would you describe your team\'s technical education expertise?', options: ['Very limited, few education specialists', 'Some expertise in one or two areas', 'Good expertise across most areas', 'Strong expertise across all key areas'] },
  { id: 'data', question: 'How does your organisation use data to make decisions?', options: ['We rarely collect or use data', 'We collect data but rarely act on it', 'We use data for some decisions', 'Data drives all key decisions'] },
  { id: 'finance', question: 'How would you describe your financial management systems?', options: ['Basic or informal systems', 'Some systems in place, inconsistently used', 'Systems in place and mostly followed', 'Robust systems, full compliance and reporting'] },
  { id: 'partnerships', question: 'How well does your organisation engage with government and development partners?', options: ['Minimal engagement', 'Some relationships, ad hoc', 'Active relationships with key stakeholders', 'Strong influence on policy and programmes'] },
  { id: 'learning', question: 'How does your organisation learn and adapt from its work?', options: ['No formal learning processes', 'Informal learning, rarely documented', 'Regular reviews, some adaptation', 'Strong learning culture, continuous improvement'] },
  { id: 'reach', question: 'What is the reach of your education programmes?', options: ['Fewer than 1,000 learners', '1,000–10,000 learners', '10,000–100,000 learners', 'Over 100,000 learners'] },
]

type DimensionResult = { name: string; score: number; level: string; finding: string; recommendation: string }
type AssessmentResult = {
  overallScore: number; overallLevel: string; summary: string
  dimensions: DimensionResult[]; topPriorities: string[]; kuzaRecommendation: string
}

const levelColor: Record<string, string> = {
  Foundational: '#ef4444', Developing: '#ef7122', Established: '#6357a5', Advanced: '#8e82c7',
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(99,87,165,0.08)' }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${score}%`, backgroundColor: score < 40 ? '#ef4444' : score < 65 ? '#ef7122' : score < 85 ? '#6357a5' : '#8e82c7' }} />
    </div>
  )
}

export default function CapacityAssessmentPage() {
  const [step, setStep] = useState<'intro' | 'form' | 'questions' | 'result'>('intro')
  const [orgName, setOrgName] = useState('')
  const [orgType, setOrgType] = useState('')
  const [country, setCountry] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState('')

  async function submitAssessment(finalAnswers: Record<string, string>) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/capacity-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgName, orgType, country, answers: finalAnswers }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
      setStep('result')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function selectAnswer(answer: string) {
    const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: answer }
    setAnswers(newAnswers)
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      submitAssessment(newAnswers)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--kuza-cream)' }}>
      <PageHero
        tag="AI-Powered Diagnostic"
        heading="Capacity Assessment"
        description="An AI-guided diagnostic that scores your organisation's education capacity gaps and recommends targeted interventions."
      />

      <section className="section-pad">
        <div className="max-w-2xl mx-auto px-4">
          {/* Intro */}
          {step === 'intro' && (
            <FadeIn>
              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[['7', 'Diagnostic questions'], ['5', 'Capacity dimensions'], ['AI', 'Personalised report']].map(([v, l]) => (
                    <div key={l} className="card card-cream p-5 text-center" style={{ borderRadius: '16px' }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--kuza-purple)' }}>{v}</div>
                      <div className="text-label" style={{ color: '#9ca3af' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <p className="text-body mb-8 mx-auto" style={{ color: '#4b5563', maxWidth: '480px' }}>
                  This assessment takes about <strong>5 minutes</strong>. You&apos;ll receive a scored report across 5 capacity dimensions
                  with specific recommendations for your organisation.
                </p>
                <button onClick={() => setStep('form')} className="btn-primary mx-auto">
                  Start Assessment <ArrowRight size={15} />
                </button>
              </div>
            </FadeIn>
          )}

          {/* Org form */}
          {step === 'form' && (
            <FadeIn>
              <div className="card card-cream p-8" style={{ borderRadius: '20px' }}>
                <h2 className="text-h3 mb-6" style={{ color: '#0f4226' }}>About your organisation</h2>
                <div className="space-y-5 mb-8">
                  <div className="form-group">
                    <label className="form-label">Organisation Name</label>
                    <input value={orgName} onChange={e => setOrgName(e.target.value)}
                      type="text" placeholder="e.g. Ministry of Education, Tanzania"
                      className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Organisation Type</label>
                    <select value={orgType} onChange={e => setOrgType(e.target.value)} className="form-select">
                      <option value="">Select type...</option>
                      {['Government Ministry', 'District Education Office', 'International NGO', 'Local NGO', 'Donor / Foundation', 'School / University'].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input value={country} onChange={e => setCountry(e.target.value)}
                      type="text" placeholder="e.g. Uganda"
                      className="form-input" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep('intro')} className="btn-ghost-green text-sm">
                    <CaretLeft size={14} /> Back
                  </button>
                  <button
                    disabled={!orgName.trim() || !orgType || !country.trim()}
                    onClick={() => setStep('questions')}
                    className="btn-primary"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Questions */}
          {step === 'questions' && (
            <FadeIn>
              {/* Progress bar */}
              <div className="mb-10">
                <div className="flex justify-between text-label mb-2" style={{ color: '#9ca3af' }}>
                  <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQ) / QUESTIONS.length) * 100)}% complete</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'rgba(15,66,38,0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(currentQ / QUESTIONS.length) * 100}%`, backgroundColor: 'var(--kuza-purple)' }} />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(26,107,60,0.1)' }}>
                    <CircleNotch size={32} className="animate-spin" style={{ color: 'var(--kuza-purple)' }} />
                  </div>
                  <p className="text-h3" style={{ color: '#0f4226' }}>Analysing your responses...</p>
                  <p className="text-body mt-1" style={{ color: '#9ca3af' }}>This takes a few seconds</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-h2 mb-8" style={{ color: '#0f4226' }}>{QUESTIONS[currentQ].question}</h2>
                  <div className="space-y-3 mb-8">
                    {QUESTIONS[currentQ].options.map((opt) => (
                      <button key={opt} onClick={() => selectAnswer(opt)}
                        className="w-full px-5 py-4 rounded-xl border text-sm font-medium text-left transition-all duration-200 hover:bg-white hover:shadow-md"
                        style={{ background: '#fdfcff', borderColor: '#ddd8f0', color: '#0f4226' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {currentQ > 0 && (
                    <button onClick={() => setCurrentQ(currentQ - 1)} className="btn-ghost-green text-sm">
                      <CaretLeft size={14} /> Previous question
                    </button>
                  )}
                  {error && <p className="mt-4 text-sm" style={{ color: '#dc2626' }}>{error}</p>}
                </div>
              )}
            </FadeIn>
          )}

          {/* Result */}
          {step === 'result' && result && (
            <div className="space-y-6">
              {/* Overall score */}
              <FadeIn>
                <div className="rounded-2xl p-8 text-white text-center relative overflow-hidden" style={{ background: 'var(--kuza-purple-dark)' }}>
                  <p className="text-label text-white/60 mb-2">Overall Capacity Score</p>
                  <div className="text-7xl font-bold mb-3" style={{ color: '#c9a84c' }}>{result.overallScore}</div>
                  <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5"
                    style={{ backgroundColor: levelColor[result.overallLevel] || '#1a6b3c', color: 'white' }}>
                    {result.overallLevel}
                  </div>
                  <p className="text-body mx-auto" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '440px' }}>{result.summary}</p>
                </div>
              </FadeIn>

              {/* Dimensions */}
              <div className="space-y-4">
                <h3 className="text-h3" style={{ color: '#0f4226' }}>Capacity Dimensions</h3>
                {result.dimensions.map((d, i) => (
                  <FadeIn key={d.name} delay={i * 0.08}>
                    <div className="card card-cream p-5" style={{ borderRadius: '16px' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-[15px]" style={{ color: '#0f4226' }}>{d.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black" style={{ color: '#0f4226' }}>{d.score}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                            style={{ backgroundColor: `${levelColor[d.level] || '#1a6b3c'}15`, color: levelColor[d.level] || '#1a6b3c' }}>
                            {d.level}
                          </span>
                        </div>
                      </div>
                      <ScoreBar score={d.score} />
                      <p className="text-[13px] mt-3" style={{ color: '#6b7280' }}>{d.finding}</p>
                      <p className="text-[13px] mt-1.5 font-bold" style={{ color: 'var(--kuza-purple)' }}>→ {d.recommendation}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Top priorities */}
              <FadeIn>
                <div className="card p-7" style={{ borderRadius: '20px' }}>
                  <h3 className="text-h3 mb-4" style={{ color: '#0f4226' }}>Top 3 Priorities</h3>
                  <div className="space-y-3">
                    {result.topPriorities.map((p, i) => (
                      <div key={p} className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ backgroundColor: '#c9a84c', color: '#0f4226' }}>{i + 1}</span>
                        <p className="text-body" style={{ color: '#4b5563' }}>{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Kuza recommendation */}
              <FadeIn>
                <div className="rounded-2xl p-7 text-white" style={{ background: 'var(--kuza-purple-dark)' }}>
                  <p className="text-label text-white/60 mb-2">How KuzaConnect Can Help</p>
                  <p className="text-body text-white">{result.kuzaRecommendation}</p>
                </div>
              </FadeIn>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="btn-primary">
                  Discuss Results <ArrowRight size={15} />
                </Link>
                <button onClick={() => { setStep('intro'); setCurrentQ(0); setAnswers({}); setResult(null) }}
                  className="px-6 py-3 rounded-full border font-bold text-sm transition-all hover:bg-[#0f4226] hover:text-white"
                  style={{ borderColor: '#0f4226', color: '#0f4226' }}>
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
