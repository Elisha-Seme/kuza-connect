'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Sparkle, CircleNotch, ArrowRight, Warning, CheckCircle,
  Info, ChartLineUp, UploadSimple, FileText, X, File,
} from '@phosphor-icons/react'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'

type Finding = { finding: string; significance: string; evidence: string }
type Risk = { risk: string; severity: string; mitigation: string }
type Recommendation = { recommendation: string; priority: string; owner: string }
type AnalysisResult = {
  title: string; type: string; overallAssessment: string
  keyFindings: Finding[]; achievements: string[]; risks: Risk[]
  dataGaps: string[]; recommendations: Recommendation[]; kuzaSupportAreas: string[]
}

const severityColor: Record<string, string> = {
  High: '#ef4444', Medium: '#f37021', Low: '#6357a5',
}

// File types Claude can handle (via text extraction or native PDF support)
const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md'],
  'text/csv': ['.csv'],
  'text/html': ['.html'],
  'application/json': ['.json'],
  'text/xml': ['.xml'],
  'application/rtf': ['.rtf'],
}

const FORMAT_LABELS = ['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT', 'CSV', 'MD', 'HTML', 'JSON', 'RTF']

function fileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase()
  const color = ext === 'pdf' ? '#ef4444'
    : ['docx', 'doc'].includes(ext ?? '') ? '#3b82f6'
      : ['xlsx', 'xls'].includes(ext ?? '') ? '#22c55e'
        : ['pptx', 'ppt'].includes(ext ?? '') ? '#f97316'
          : '#6357a5'
  return { color }
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
      style={{ backgroundColor: `${color}15`, color }}>
      {label}
    </span>
  )
}

export default function MneAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [reportContext, setReportContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) { setFile(accepted[0]); setError('') }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20 MB
    onDropRejected: () => setError('File not supported or exceeds 20 MB.'),
  })

  async function analyze() {
    if (!file) { setError('Please upload a document first.'); return }
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('reportContext', reportContext)

      const res = await fetch('/api/mne-analyzer', { method: 'POST', body: form })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--kuza-cream)' }}>
      <PageHero
        tag="AI-Powered Tool"
        heading="M&amp;E Report Analyzer"
        description="Upload any M&amp;E document and let AI extract key findings, risks, and recommendations instantly."
      />

      <section className="section-pad">
        <div className="container-xl max-w-4xl mx-auto">
          {!result ? (
            <FadeIn>
              <div className="card card-cream p-8" style={{ borderRadius: '24px' }}>
                <h2 className="text-h3 mb-2" style={{ color: 'var(--kuza-purple)' }}>Upload Your Report</h2>
                <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
                  Supports {FORMAT_LABELS.join(', ')} up to 20 MB
                </p>

                <div className="space-y-5">
                  {/* Context field */}
                  <div className="form-group">
                    <label className="form-label">
                      Additional Context <span className="font-normal opacity-50">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={reportContext}
                      onChange={e => setReportContext(e.target.value)}
                      placeholder="e.g. Midterm evaluation for a 3-year girls education programme in Uganda"
                      className="form-input"
                    />
                  </div>

                  {/* Dropzone */}
                  <div>
                    <label className="form-label mb-2 block">
                      Document <span className="text-red-500">*</span>
                    </label>

                    {!file ? (
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200"
                        style={{
                          borderColor: isDragActive ? 'var(--kuza-purple)' : 'var(--kuza-border)',
                          background: isDragActive ? 'rgba(99,87,165,0.04)' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <input {...getInputProps()} />
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                          style={{ background: 'rgba(99,87,165,0.08)' }}
                        >
                          <UploadSimple size={24} style={{ color: 'var(--kuza-purple)' }} />
                        </div>
                        <p className="font-semibold mb-1" style={{ color: 'var(--kuza-purple-dark)' }}>
                          {isDragActive ? 'Drop it here' : 'Drag & drop your document'}
                        </p>
                        <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>
                          or click to browse files
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {FORMAT_LABELS.map(f => (
                            <span
                              key={f}
                              className="text-[10px] px-2 py-0.5 rounded font-bold tracking-wider"
                              style={{ background: 'rgba(99,87,165,0.08)', color: 'var(--kuza-purple)' }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-4 p-5 rounded-2xl border"
                        style={{ background: 'rgba(99,87,165,0.04)', borderColor: 'rgba(99,87,165,0.2)' }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(99,87,165,0.1)' }}
                        >
                          <File size={22} style={fileIcon(file.name)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate" style={{ color: 'var(--kuza-purple-dark)' }}>
                            {file.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition shrink-0"
                          style={{ color: '#9ca3af' }}
                          aria-label="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 mt-5 p-4 rounded-xl text-sm"
                    style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }}>
                    <Warning size={16} /> {error}
                  </div>
                )}

                <div className="mt-8">
                  <button
                    onClick={analyze}
                    disabled={loading || !file}
                    className="btn-primary w-full justify-center"
                    style={{ background: 'var(--kuza-purple)', color: 'white', opacity: !file ? 0.6 : 1 }}
                  >
                    {loading
                      ? <><CircleNotch size={16} className="animate-spin" /> Analysing Document...</>
                      : <><Sparkle size={16} /> Analyse Report</>}
                  </button>
                </div>

                {/* Tips */}
                <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--kuza-border)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={14} style={{ color: 'var(--kuza-purple)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--kuza-purple-dark)' }}>Tips for best results</span>
                  </div>
                  <ul className="text-[13px] space-y-2" style={{ color: '#6b7280' }}>
                    <li className="flex items-start gap-2">
                      <FileText size={12} className="mt-0.5 shrink-0" style={{ color: 'var(--kuza-orange)' }} />
                      Include the executive summary, key findings, and data sections
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText size={12} className="mt-0.5 shrink-0" style={{ color: 'var(--kuza-orange)' }} />
                      Add context above to help Claude understand the programme scope
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText size={12} className="mt-0.5 shrink-0" style={{ color: 'var(--kuza-orange)' }} />
                      PDFs are read natively; Word, Excel, and PowerPoint are extracted automatically
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-6">
              {/* Result Header */}
              <FadeIn>
                <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{ background: 'var(--kuza-purple-dark)' }}>
                  <p className="text-label text-white/50 mb-2">Analysis Complete</p>
                  <h2 className="text-h2 text-white mb-3">{result.title}</h2>
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                    style={{ background: 'rgba(201,168,76,0.2)', color: 'var(--kuza-gold)' }}>
                    {result.type}
                  </div>
                  <p className="text-body mt-5" style={{ color: 'rgba(255,255,255,0.72)' }}>{result.overallAssessment}</p>
                </div>
              </FadeIn>

              {/* Key findings */}
              <FadeIn>
                <div className="card overflow-hidden" style={{ borderRadius: '20px' }}>
                  <div className="flex items-center gap-3 px-6 py-4" style={{ background: 'var(--kuza-purple-dark)' }}>
                    <ChartLineUp size={16} style={{ color: 'var(--kuza-gold)' }} />
                    <h3 className="font-bold text-white text-[15px]">Key Findings</h3>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--kuza-border)' }}>
                    {result.keyFindings?.map((f, i) => (
                      <div key={i} className="p-6 transition-colors hover:bg-white">
                        <div className="flex items-start justify-between gap-6 mb-2">
                          <p className="font-bold text-[15px]" style={{ color: 'var(--kuza-black)' }}>{f.finding}</p>
                          <Badge label={f.significance} color={severityColor[f.significance] ?? 'var(--kuza-gray)'} />
                        </div>
                        <p className="text-[13px] opacity-70 leading-relaxed italic" style={{ color: 'var(--kuza-gray-dark)' }}>&quot;{f.evidence}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Achievements */}
                <FadeIn direction="left">
                  <div className="card overflow-hidden h-full" style={{ borderRadius: '20px' }}>
                    <div className="flex items-center gap-3 px-6 py-4 border-b"
                      style={{ borderColor: 'var(--kuza-border)', background: 'rgba(34,197,94,0.05)' }}>
                      <CheckCircle size={16} style={{ color: 'var(--kuza-green)' }} />
                      <h3 className="font-bold text-[15px]" style={{ color: 'var(--kuza-green-dark)' }}>Achievements</h3>
                    </div>
                    <ul className="p-6 space-y-3">
                      {result.achievements?.map((a, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: 'var(--kuza-gray-dark)' }}>
                          <span style={{ color: 'var(--kuza-green)' }} className="font-bold">✓</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* Data gaps */}
                <FadeIn direction="right">
                  <div className="card overflow-hidden h-full" style={{ borderRadius: '20px' }}>
                    <div className="flex items-center gap-3 px-6 py-4 border-b"
                      style={{ borderColor: 'var(--kuza-border)', background: 'rgba(245,158,11,0.05)' }}>
                      <Info size={16} style={{ color: 'var(--kuza-orange)' }} />
                      <h3 className="font-bold text-[15px]" style={{ color: 'var(--kuza-orange-dark)' }}>Data Gaps</h3>
                    </div>
                    <ul className="p-6 space-y-3">
                      {result.dataGaps?.map((g, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: 'var(--kuza-gray-dark)' }}>
                          <span style={{ color: 'var(--kuza-orange)' }} className="font-bold">!</span> {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* Risks */}
              <FadeIn>
                <div className="card overflow-hidden" style={{ borderRadius: '20px' }}>
                  <div className="flex items-center gap-3 px-6 py-4" style={{ background: 'var(--kuza-red)' }}>
                    <Warning size={16} color="white" />
                    <h3 className="font-bold text-white text-[15px]">Risks & Challenges</h3>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--kuza-border)' }}>
                    {result.risks?.map((r, i) => (
                      <div key={i} className="p-6">
                        <div className="flex items-start justify-between gap-6 mb-2">
                          <p className="font-bold text-[15px]" style={{ color: 'var(--kuza-black)' }}>{r.risk}</p>
                          <Badge label={r.severity} color={severityColor[r.severity] ?? 'var(--kuza-gray)'} />
                        </div>
                        <p className="text-[13px]" style={{ color: 'var(--kuza-gray)' }}><strong>Mitigation:</strong> {r.mitigation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Recommendations */}
              <FadeIn>
                <div className="card overflow-hidden" style={{ borderRadius: '20px' }}>
                  <div className="px-6 py-4 border-b"
                    style={{ borderColor: 'var(--kuza-border)', background: 'var(--kuza-cream-light)' }}>
                    <h3 className="font-bold text-[15px]" style={{ color: 'var(--kuza-green-dark)' }}>Recommendations</h3>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--kuza-border)' }}>
                    {result.recommendations?.map((r, i) => (
                      <div key={i} className="p-6 flex items-start gap-4 transition-colors hover:bg-white">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                          style={{ background: 'var(--kuza-orange)', color: 'white' }}>{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <p className="text-[15px] font-medium leading-relaxed" style={{ color: 'var(--kuza-black)' }}>{r.recommendation}</p>
                            <Badge label={r.priority} color={severityColor[r.priority] ?? 'var(--kuza-gray)'} />
                          </div>
                          <p className="text-[11px] font-bold uppercase tracking-wider opacity-40">Owner: {r.owner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Kuza areas */}
              {result.kuzaSupportAreas?.length > 0 && (
                <FadeIn>
                  <div className="rounded-2xl p-8 text-white relative overflow-hidden"
                    style={{ background: 'var(--kuza-purple-dark)', boxShadow: '0 8px 24px rgba(99,87,165,0.3)' }}>
                    <p className="text-label text-white/50 mb-4">How KuzaConnect Can Help</p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {result.kuzaSupportAreas.map((a, i) => (
                        <li key={i} className="text-[13px] text-white/90 flex items-start gap-3">
                          <span style={{ color: 'var(--kuza-gold)' }} className="font-bold">→</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="btn-primary">
                  Discuss Results <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => { setResult(null); setFile(null) }}
                  className="px-6 py-3 rounded-full border font-bold text-sm transition-all"
                  style={{ borderColor: 'var(--kuza-purple)', color: 'var(--kuza-purple)' }}
                >
                  Analyse Another Report
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
