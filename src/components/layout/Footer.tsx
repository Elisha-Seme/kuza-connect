'use client'

import { Envelope, Phone, MapPin, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Services', href: '/services' },
      { label: 'Associates', href: '/associates' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'AI Tools',
    links: [
      { label: 'Impact Matcher', href: '/impact-matcher' },
      { label: 'Capacity Assessment', href: '/capacity-assessment' },
      { label: 'M&E Analyzer', href: '/mne-analyzer' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--kuza-purple-dark)', color: 'white' }}>
      {/* Wave divider */}
      <div
        className="w-full overflow-hidden leading-none"
        style={{ height: '56px', marginTop: '-2px' }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z"
            fill="var(--kuza-purple-dark)"
          />
        </svg>
      </div>

      {/* Inline CSS for hover states (server component safe) */}
      <style>{`
        .footer-link { color: rgba(255,255,255,0.5); transition: color 0.2s; }
        .footer-link:hover { color: var(--kuza-orange); }
        .footer-link .footer-arrow { width: 0; overflow: hidden; opacity: 0; transition: width 0.2s, opacity 0.2s; display: inline-block; }
        .footer-link:hover .footer-arrow { width: 14px; opacity: 1; }
        .footer-contact-link { color: rgba(255,255,255,0.5); transition: color 0.2s; }
        .footer-contact-link:hover { color: rgba(255,255,255,0.9); }
      `}</style>

      <div className="container-xl pt-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 mb-12">

          {/* Brand */}
          <div className="py-2">
            <div className="relative h-10 w-[140px] mb-4">
              <Image
                src="/assets/images/logo.png"
                alt="KuzaConnect Logo"
                fill
                sizes="140px"
                className="object-contain object-left"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)', maxWidth: '280px' }}>
              Helping locally-driven solutions expand by connecting international evidence, local knowledge,
              and expert teams for system-wide education impact.
            </p>
            <div
              className="h-px w-14 rounded-full"
              style={{ background: 'var(--kuza-orange)' }}
            />
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-label mb-4" style={{ color: 'var(--kuza-orange)' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link inline-flex items-center gap-1 text-sm">
                      <span className="footer-arrow">
                        <ArrowRight size={11} />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-label mb-4" style={{ color: 'var(--kuza-orange)' }}>Contact Us</h4>
            <div className="space-y-3">
              {[
                { icon: Envelope, value: 'info@kuzaconnect.com', href: 'mailto:info@kuzaconnect.com' },
                { icon: Phone, value: '+254 729 980718', href: 'tel:+254729980718' },
                { icon: MapPin, value: 'Nairobi, Kenya', href: undefined },
              ].map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-start gap-2.5">
                  <Icon size={13} className="mt-[3px] shrink-0" style={{ color: 'var(--kuza-orange)' }} />
                  {href ? (
                    <a href={href} className="footer-contact-link text-sm">{value}</a>
                  ) : (
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} KuzaConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs hover:text-white transition" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy Policy</Link>
            <Link href="/terms" className="text-xs hover:text-white transition" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
