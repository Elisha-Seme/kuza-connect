'use client'

import { useState } from 'react'
import { Envelope, Phone, MapPin, Clock, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'

const contactInfo = [
  { icon: Envelope, label: 'Email', value: 'info@kuzaconnect.com', href: 'mailto:info@kuzaconnect.com' },
  { icon: Phone, label: 'Phone', value: '+254 729 980718', href: 'tel:+254729980718' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: undefined },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 8am–6pm EAT', href: undefined },
]

const subjectOptions = [
  'Partnership enquiry',
  'Service information',
  'Associate application',
  'Media / press',
  'Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', organisation: '', subject: subjectOptions[0], message: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Basic validation pass — would wire to API in real usage
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        tag="Get In Touch"
        heading="Contact Us"
        description="Ready to explore a partnership? Have a question about our services? We'd love to hear from you. We respond within 24 hours."
      />

      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl">
          <div className="grid md:grid-cols-[1fr_380px] gap-14 items-start">

            {/* ── FORM ── */}
            <FadeIn direction="left">
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'var(--kuza-cream)',
                  border: '1px solid #e4e0d8',
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'rgba(99,87,165,0.1)' }}
                    >
                      <CheckCircle size={32} style={{ color: 'var(--kuza-purple)' }} />
                    </div>
                    <h3 className="text-h3 mb-2" style={{ color: 'var(--kuza-purple-dark)' }}>Message sent!</h3>
                    <p className="text-body" style={{ color: '#6b7280' }}>
                      We&apos;ll get back to you within 24 hours. Thank you for reaching out.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-ghost-purple mt-6 text-sm"
                    >
                      Send another message <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-h3 mb-6" style={{ color: 'var(--kuza-purple-dark)' }}>Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <input
                            id="firstName"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Jane"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                          <input
                            id="lastName"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          className="form-input"
                          placeholder="jane@organisation.org"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="organisation">Organisation</label>
                        <input
                          id="organisation"
                          type="text"
                          className="form-input"
                          placeholder="Ministry of Education / NGO / Donor..."
                          value={form.organisation}
                          onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="subject">Subject</label>
                        <select
                          id="subject"
                          className="form-select"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        >
                          {subjectOptions.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          rows={5}
                          required
                          className="form-input resize-none"
                          placeholder="Tell us about your project or question..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary w-full justify-center mt-2"
                      >
                        Send Message <ArrowRight size={15} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>

            {/* ── CONTACT INFO SIDEBAR ── */}
            <FadeIn direction="right" delay={0.12}>
              <div className="space-y-5">
                {/* Info card */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'var(--kuza-cream)', border: '1px solid #e4e0d8' }}
                >
                  <h3 className="text-h3 mb-5" style={{ color: '#0f4226' }}>Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-3.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(15,66,38,0.08)' }}
                        >
                          <Icon size={16} style={{ color: 'var(--kuza-purple)' }} />
                        </div>
                        <div>
                          <p className="text-label" style={{ color: '#9ca3af' }}>{label}</p>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm font-medium hover:underline transition-colors"
                              style={{ color: '#0f4226' }}
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium" style={{ color: '#0f4226' }}>{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI shortcut card */}
                <div
                  className="rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ background: 'var(--kuza-purple-dark)' }}
                >
                  <div
                    className="absolute top-0 right-0 w-28 h-28 rounded-full -translate-y-8 translate-x-8 pointer-events-none"
                    style={{ background: 'rgba(201,168,76,0.08)' }}
                  />
                  <div className="relative z-10">
                    <div className="mb-3">
                      <span className="text-label" style={{ color: '#c9a84c' }}>Not sure where to start?</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      Not sure what you need yet? Our AI Impact Matcher takes 2 minutes and gives you a personalised service recommendation.
                    </p>
                    <Link
                      href="/impact-matcher"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: '#c9a84c' }}
                    >
                      Try Impact Matcher <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Response time badge */}
                <div
                  className="rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ background: 'rgba(var(--kuza-purple-rgb), 0.07)', border: '1px solid rgba(var(--kuza-purple-rgb), 0.15)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--kuza-purple)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--kuza-purple)' }}>
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
