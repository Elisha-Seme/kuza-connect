'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe } from '@phosphor-icons/react'
import PageHero from '@/components/sections/PageHero'
import FadeIn from '@/components/sections/FadeIn'
import ScrollRevealText from '@/components/sections/ScrollRevealText'

const associates = [
  {
    name: 'Richard King',
    region: 'East Africa',
    country: 'Kenya',
    expertise: ['Strategy', 'Organisational Development'],
    role: 'Founder',
    photo: '/assets/images/richard_king.jpg',
  },
  {
    name: 'Eric Nyamwaro',
    region: 'East Africa',
    country: 'Kenya',
    expertise: ['Partnerships', 'Programme Design'],
    role: 'Co-Founder',
    photo: '/assets/images/eric-nyamwaro.webp',
  },
  {
    name: 'Vanessa Wambui',
    region: 'East Africa',
    country: 'Kenya',
    expertise: ['M&E', 'Data Analysis'],
    role: 'M&E Specialist',
    photo: '/assets/images/Vanessa.webp',
  },
  {
    name: 'Elisha Papa',
    region: 'East Africa',
    country: 'Kenya',
    expertise: ['Technology', 'Systems'],
    role: 'IT Specialist',
    photo: null,
  },
]

const regions = ['All', 'East Africa']

export default function AssociatesPage() {
  return (
    <>
      <PageHero
        tag="Our Team"
        heading="Meet the Team"
        description="The core KuzaConnect team, combining education expertise, M&E rigour, and technology to deliver impact across the Global South."
      />

      {/* Associates grid */}
      <section className="section-pad" style={{ background: 'var(--kuza-cream)' }}>
        <div className="container-xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {associates.map((a, i) => (
              <FadeIn key={a.name} delay={i * 0.06} direction="up">
                <div className="card card-cream card-border-top overflow-hidden h-full" style={{ borderRadius: '20px' }}>
                  {/* Photo or avatar */}
                  {a.photo ? (
                    <div className="relative w-full h-52 overflow-hidden img-zoom">
                      <Image
                        src={a.photo}
                        alt={a.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-52 flex items-center justify-center font-bold text-2xl text-white"
                      style={{ background: 'var(--kuza-purple-dark)' }}
                    >
                      {a.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-bold text-[15px] mb-0.5" style={{ color: 'var(--kuza-purple-dark)' }}>{a.name}</h3>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--kuza-orange)' }}>{a.role}</p>

                    <div className="flex items-center gap-1.5 mb-3">
                      <Globe size={10} style={{ color: '#9ca3af' }} />
                      <p className="text-xs" style={{ color: '#9ca3af' }}>
                        {a.country} · {a.region}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {a.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(99,87,165,0.07)', color: 'var(--kuza-purple)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'var(--kuza-purple-dark)', padding: '80px 0' }}
      >
        <FadeIn>
          <div className="container-xl text-center">
            <ScrollRevealText text="Ready to work with us?" as="h2" className="text-h1 mb-4" staggerDelay={0.06} />
            <p className="text-body mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '460px' }}>
              Get in touch and we will find the right combination of expertise for your context.
            </p>
            <Link href="/contact" className="btn-primary">
              Talk to Us <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
