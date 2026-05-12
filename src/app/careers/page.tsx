'use client'

import Link from 'next/link'
import { MapPin, Clock, Money, ArrowRight, CheckCircle, ArrowSquareOut } from '@phosphor-icons/react'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdGv7UWshpnYhj491d_MRIydqdZ9_tshUKzcmd6wB30548gZg/viewform'

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-7 mb-6"
      style={{ background: '#fdfcff', border: '1px solid #ddd8f0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
    >
      <h2 className="text-h3 mb-5" style={{ color: 'var(--kuza-purple-dark)' }}>{title}</h2>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-body" style={{ color: '#4b5563' }}>
          <CheckCircle size={17} weight="fill" className="shrink-0 mt-0.5" style={{ color: 'var(--kuza-orange)' }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SubSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--kuza-purple)' }}>{title}</h3>
      <BulletList items={items} />
    </div>
  )
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        tag="We're Hiring"
        heading="Senior International Education Systems Advisor"
        description="Help shape education systems across Kenya and East Africa. A senior advisory role for an experienced international education leader."
      />

      <div className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl" style={{ maxWidth: '820px' }}>

          {/* Meta badges */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: MapPin, label: 'Kenya (remote possible)' },
                { icon: Clock, label: 'Part-time' },
                { icon: Money, label: 'TBA — based on experience' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: '#fdfcff', border: '1px solid #ddd8f0', color: '#374151' }}
                >
                  <Icon size={15} style={{ color: 'var(--kuza-orange)' }} />
                  {label}
                </div>
              ))}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'var(--kuza-purple-dark)', color: 'white' }}
              >
                Closing: Friday 15 May
              </div>
            </div>
          </FadeIn>

          {/* Job Purpose */}
          <FadeIn delay={0.05}>
            <SectionCard title="Job Purpose">
              <p className="text-body leading-relaxed" style={{ color: '#4b5563' }}>
                To provide high-level technical leadership and strategic advisory support to Kuza Connect's work with government in Kenya and more widely in East Africa to strengthen education systems. The role focuses on supporting more effective policy design, technical methodologies, data systems, technological adaptation, programme design and implementation capacity across key education priorities, aligned with national development plans. A key part of the role is providing international best practice and benchmarking combined with a deep understanding of local context and stakeholders.
              </p>
            </SectionCard>
          </FadeIn>

          {/* Key Objectives */}
          <FadeIn delay={0.1}>
            <SectionCard title="Key Objectives">
              <SubSection
                title="Strategic Advisory"
                items={[
                  'Provide senior-level advice to government counterparts on education sector planning, reform, and system strengthening.',
                  'Support the development and review of national education policies, strategies and implementation frameworks.',
                ]}
              />
              <SubSection
                title="Systems Strengthening"
                items={[
                  'Identify systemic bottlenecks and recommend evidence-based solutions, drawing on international best practice and evidence.',
                  'Advise on institutional capacity development, governance, and accountability mechanisms.',
                ]}
              />
              <SubSection
                title="Programme Design & Delivery"
                items={[
                  'Lead or contribute to the design of large-scale education programmes and reforms.',
                  'Provide technical oversight and quality assurance for project implementation and outputs.',
                ]}
              />
              <SubSection
                title="Stakeholder Engagement"
                items={[
                  'Build and maintain strong relationships with government ministries, development partners, and regional stakeholders.',
                  'Facilitate high-level dialogue and coordination across partners.',
                ]}
              />
              <SubSection
                title="Evidence & Technology"
                items={[
                  'Promote the use of data and research to inform decision-making, including data architectural design.',
                  'Support the design and adoption of technology within education systems.',
                ]}
              />
              <SubSection
                title="Business Development"
                items={[
                  'Support the growth of Kuza Connect by leading new funding proposals.',
                  'Provide strategy support and advice to the expansion of Kuza Connect.',
                ]}
              />
              <SubSection
                title="Mentorship & Team Support"
                items={[
                  'Provide guidance and mentorship to junior advisors and technical teams, including support to developing senior international expertise locally.',
                  'Contribute to internal capability building within Kuza Connect.',
                ]}
              />
            </SectionCard>
          </FadeIn>

          {/* Person Specification */}
          <FadeIn delay={0.15}>
            <SectionCard title="Person Specification">
              <SubSection
                title="Experience & Expertise"
                items={[
                  'Minimum 15 years of experience in international education.',
                  'Minimum of 10 years working in East Africa, with specific in-depth experience in Kenya.',
                  'Significant experience advising governments or working within/alongside Ministries of Education across at least 5 countries in Africa and 5 countries outside Africa.',
                  'Extensive expertise in education systems strengthening and policy development.',
                  'Extensive experience with donor-funded programmes (e.g., multilateral or bilateral agencies).',
                  'Extensive experience in business development and proposal writing.',
                ]}
              />
              <SubSection
                title="Skills & Competencies"
                items={[
                  'Excellent strategic thinking and problem-solving skills, with a systems-level perspective.',
                  'Outstanding stakeholder management and influencing skills at senior levels.',
                  'Strong ability to translate complex analysis into practical policy and implementation advice.',
                  'Outstanding communication skills, including report writing and high-level presentations.',
                ]}
              />
              <SubSection
                title="Qualifications"
                items={[
                  'Advanced degree (Master\'s or PhD) in Education, International Development, Public Policy, or a related field.',
                  'Business related qualification (MBA or other).',
                  'Education qualification (e.g. Teaching degree).',
                ]}
              />
              <SubSection
                title="Other Requirements"
                items={[
                  'Willingness to travel periodically within the region, as required.',
                ]}
              />
            </SectionCard>
          </FadeIn>

          {/* Screening Questions */}
          <FadeIn delay={0.2}>
            <SectionCard title="Screening Questions">
              <p className="text-body mb-5" style={{ color: '#4b5563' }}>
                As part of the application process, please complete the screening questions via the link below. You will also be asked to upload your CV.
              </p>
              <ol className="space-y-3">
                {[
                  'How many years\' experience do you have working on international education?',
                  'How many Ministries of Education have you worked with in a system strengthening capacity?',
                  'How many years\' experience do you have working in the education system in Kenya?',
                  'How many years of business development experience do you have?',
                  'What are your academic qualifications?',
                  'What is your nationality?',
                  'Why are you interested in this role?',
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-body" style={{ color: '#4b5563' }}>
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--kuza-purple)', color: 'white', marginTop: '1px' }}
                    >
                      {i + 1}
                    </span>
                    {q}
                  </li>
                ))}
              </ol>
            </SectionCard>
          </FadeIn>

          {/* Apply CTA */}
          <FadeIn delay={0.25}>
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'var(--kuza-purple-dark)', color: 'white' }}
            >
              <h2 className="text-h3 mb-3" style={{ color: 'white' }}>Ready to Apply?</h2>
              <p className="text-body mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Complete the screening questions and upload your CV before the closing date of <strong style={{ color: 'var(--kuza-orange)' }}>Friday 15 May</strong>.
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Apply Now <ArrowSquareOut size={16} />
              </a>
              <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Questions? Contact us at{' '}
                <a href="mailto:info@kuzaconnect.com" style={{ color: 'var(--kuza-orange)' }}>
                  info@kuzaconnect.com
                </a>
              </p>
            </div>
          </FadeIn>

          <div className="pt-8 text-center">
            <Link href="/about" className="text-sm hover:underline" style={{ color: 'var(--kuza-purple)' }}>
              Learn more about KuzaConnect <ArrowRight size={13} className="inline" />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
