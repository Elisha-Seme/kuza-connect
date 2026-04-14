import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ai/ChatWidget'
import AccessibilityWidget from '@/components/ui/AccessibilityWidget'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'Kuza Connect: Impact Through Excellence',
  description:
    'Kuza Connect helps locally driven solutions to grow. Connecting international evidence, local knowledge, technology, and expert teams to build the capacity of governments and local organisations to deliver system-wide impact.',
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
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
      </body>
    </html>
  )
}

