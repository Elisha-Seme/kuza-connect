'use client'

import { useState } from 'react'
import { ArrowRight, CircleNotch, CheckCircle, CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'

type Step = 0 | 1 | 2 | 3 | 4
type Result = {
  primaryService: string
  primaryReason: string
  additionalServices: string[]
  additionalReasons: string[]
  approach: string
  nextStep: string
}

const ORG_TYPES = ['Government / Ministry', 'International NGO', 'Local NGO', 'Donor / Foundation', 'Academic / Research', 'Other']
const CHALLENGES = [
  'Low learning outcomes in early grades',
  'Weak teacher quality or motivation',
  'Outdated or misaligned curriculum',
  'Poor data and accountability systems',
  'Youth unemployment / skills gaps',
  'Gender gaps and exclusion in education',
  'Technology integration challenges',
  'Organisational capacity and strategy',
  'Fundraising and financial sustainability',
]
const SCALES = ['Pilot / Single school', 'District level', 'Regional / Provincial', 'National', 'Multi-country']

export default function ImpactMatcherPage() {
  const [step, setStep] = useState<Step>(0)
  const [country, setCountry] = useState('')
  const [orgType, setOrgType] = useState('')
  const [challenge, setChallenge] = useState('')
  const [scale, setScale] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  async function submit() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/impact-matcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, orgType, challenge, scale }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
      setStep(4)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(0); setCountry(''); setOrgType(''); setChallenge(''); setScale(''); setResult(null); setError('')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--kuza-cream)' }}>
      {/* Header */}
      <section
        className="text-white relative overflow-hidden"
        style={{ background: 'var(--kuza-purple-dark)', padding: '80px 0 88px' }}
      >
        <div className="container-xl text-center">
          <div
            className="inline-flex items-center gap-1.5 glass-light rounded-full px-4 py-1.5 text-xs font-semibold mb-5"
            style={{ color: 'var(--kuza-orange)' }}
          >
            AI Tool
          </div>
          <h1 className="text-h1 text-white mb-3">Impact Matcher</h1>
          <p className="text-body-lg mx-auto" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '480px' }}>
            Answer 4 quick questions. Get a personalised KuzaConnect service recommendation in seconds.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        {step < 4 && (
          <>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-10">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
                    style={step >= n - 1
                      ? { background: 'var(--kuza-purple)', color: 'white', boxShadow: '0 0 0 3px rgba(99,87,165,0.15)' }
                      : { background: '#ddd8f0', color: '#9ca3af' }
                    }
                  >
                    {step > n - 1 ? <CheckCircle size={14} /> : n}
                  </div>
                  {n < 4 && (
                    <div
                      className="h-0.5 flex-1 rounded-full transition-colors duration-500"
                      style={{ background: step >= n ? 'var(--kuza-purple)' : '#ddd8f0' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0: Country */}
            {step === 0 && (
              <div>
                <p className="text-label mb-2" style={{ color: '#c9a84c' }}>Question 1 of 4</p>
                <h2 className="text-h2 mb-6" style={{ color: '#0f4226' }}>Which country or region are you working in?</h2>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Kenya, Nigeria, Bangladesh, Francophone West Africa..."
                  className="form-input mb-6"
                />
                <button
                  disabled={!country.trim()}
                  onClick={() => setStep(1)}
                  className="btn-primary disabled:opacity-40"
                >
                  Next <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* Step 1: Org Type */}
            {step === 1 && (
              <div>
                <p className="text-label mb-2" style={{ color: '#c9a84c' }}>Question 2 of 4</p>
                <h2 className="text-h2 mb-6" style={{ color: '#0f4226' }}>What type of organisation are you?</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {ORG_TYPES.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrgType(o)}
                      className="px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200"
                      style={orgType === o
                        ? { background: '#0f4226', color: 'white', borderColor: '#0f4226', boxShadow: '0 4px 12px rgba(15,66,38,0.2)' }
                        : { background: '#f3f0fc', color: '#0f4226', borderColor: '#ddd8f0' }
                      }
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep(0)} className="btn-ghost-green text-sm">
                    <CaretLeft size={14} /> Back
                  </button>
                  <button disabled={!orgType} onClick={() => setStep(2)} className="btn-primary disabled:opacity-40">
                    Next <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Challenge */}
            {step === 2 && (
              <div>
                <p className="text-label mb-2" style={{ color: '#c9a84c' }}>Question 3 of 4</p>
                <h2 className="text-h2 mb-6" style={{ color: '#0f4226' }}>What is your primary challenge?</h2>
                <div className="space-y-2 mb-6">
                  {CHALLENGES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setChallenge(c)}
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200"
                      style={challenge === c
                        ? { background: '#0f4226', color: 'white', borderColor: '#0f4226', boxShadow: '0 4px 12px rgba(15,66,38,0.2)' }
                        : { background: '#f3f0fc', color: '#0f4226', borderColor: '#ddd8f0' }
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep(1)} className="btn-ghost-green text-sm">
                    <CaretLeft size={14} /> Back
                  </button>
                  <button disabled={!challenge} onClick={() => setStep(3)} className="btn-primary disabled:opacity-40">
                    Next <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Scale */}
            {step === 3 && (
              <div>
                <p className="text-label mb-2" style={{ color: '#c9a84c' }}>Question 4 of 4</p>
                <h2 className="text-h2 mb-6" style={{ color: '#0f4226' }}>What is the scale of your work?</h2>
                <div className="space-y-2 mb-6">
                  {SCALES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200"
                      style={scale === s
                        ? { background: '#0f4226', color: 'white', borderColor: '#0f4226', boxShadow: '0 4px 12px rgba(15,66,38,0.2)' }
                        : { background: '#f3f0fc', color: '#0f4226', borderColor: '#ddd8f0' }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep(2)} className="btn-ghost-green text-sm">
                    <CaretLeft size={14} /> Back
                  </button>
                  <button disabled={!scale || loading} onClick={submit} className="btn-primary disabled:opacity-40">
                    {loading
                      ? <><CircleNotch size={15} className="animate-spin" /> Analysing...</>
                      : <>Get My Recommendation <ArrowRight size={14} /></>}
                  </button>
                </div>
                {error && <p className="mt-3 text-sm" style={{ color: '#dc2626' }}>{error}</p>}
              </div>
            )}
          </>
        )}

        {/* Result */}
        {step === 4 && result && (
          <div className="space-y-5">
            {/* Success header */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--kuza-purple-dark)', boxShadow: '0 8px 24px rgba(26,22,48,0.25)' }}
              >
                <CheckCircle size={30} color="white" />
              </div>
              <h2 className="text-h2 mb-1" style={{ color: '#0f4226' }}>Your Recommendation</h2>
              <p className="text-body" style={{ color: '#6b7280' }}>Based on your responses for <strong style={{ color: '#0f4226' }}>{country}</strong></p>
            </div>

            {/* Primary match */}
            <div
              className="rounded-2xl p-8 text-white relative overflow-hidden"
              style={{ background: 'var(--kuza-purple-dark)' }}
            >
              <div className="section-label mb-3" style={{ color: '#c9a84c' }}>Best Match</div>
              <h3 className="text-h2 text-white mb-3">{result.primaryService}</h3>
              <p className="text-body" style={{ color: 'rgba(255,255,255,0.78)' }}>{result.primaryReason}</p>
            </div>

            {/* Additional services */}
            {result.additionalServices?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {result.additionalServices.map((s, i) => (
                  <div
                    key={s}
                    className="card card-cream card-accent-left p-5"
                    style={{ borderRadius: '14px' }}
                  >
                    <div className="text-label mb-1" style={{ color: '#c9a84c' }}>Also Relevant</div>
                    <h4 className="text-h3 mb-1.5" style={{ color: '#0f4226' }}>{s}</h4>
                    <p className="text-body" style={{ color: '#6b7280', fontSize: '0.9rem' }}>{result.additionalReasons?.[i]}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Approach */}
            <div className="card p-6" style={{ borderRadius: '14px' }}>
              <p className="text-h3 mb-2" style={{ color: '#0f4226' }}>How we&apos;d approach this</p>
              <p className="text-body" style={{ color: '#4b5563' }}>{result.approach}</p>
            </div>

            {/* Next step */}
            <div
              className="rounded-xl p-6 text-white"
              style={{ background: 'var(--kuza-purple-dark)' }}
            >
              <div className="text-label mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Your Next Step</div>
              <p className="text-body text-white">{result.nextStep}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn-primary">
                Contact KuzaConnect <ArrowRight size={15} />
              </Link>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-full border font-semibold text-sm transition-all hover:bg-[#0f4226] hover:text-white duration-200"
                style={{ borderColor: '#0f4226', color: '#0f4226' }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
