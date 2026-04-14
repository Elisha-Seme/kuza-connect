import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ai/ChatWidget'
import AccessibilityWidget from '@/components/ui/AccessibilityWidget'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: ['normal', 'italic'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzaconnect.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'KuzaConnect | Impact Through Excellence',
    template: '%s | KuzaConnect',
  },
  description:
    'KuzaConnect helps locally-driven solutions grow. We connect international evidence, local knowledge, technology, and expert teams to build education system capacity across the Global South.',

  keywords: [
    'education consulting', 'Global South', 'Africa education', 'capacity building',
    'Kenya consulting', 'NGO support', 'government education', 'M&E', 'foundation learning',
    'teacher development', 'curriculum development', 'education impact', 'development partner',
    'AI education tools', 'education technology',
  ],

  authors: [{ name: 'KuzaConnect', url: SITE_URL }],
  creator: 'KuzaConnect',
  publisher: 'KuzaConnect',

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'KuzaConnect',
    title: 'KuzaConnect | Impact Through Excellence',
    description:
      'KuzaConnect helps locally-driven solutions grow. Connecting international evidence, local knowledge, and expert teams for system-wide education impact.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KuzaConnect - Impact Through Excellence',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'KuzaConnect | Impact Through Excellence',
    description:
      'Connecting international evidence, local knowledge, and expert teams for system-wide education impact across the Global South.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
  },

  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} ${geist.className}`}>
      <body className="min-h-screen flex flex-col bg-[#faf8f3] text-[#1e1e1e]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <AccessibilityWidget />
        <OrganizationJsonLd />
      </body>
    </html>
  )
}
