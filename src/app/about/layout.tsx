import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about KuzaConnect — our mission, values, and the team behind our education consulting work across the Global South.',
  openGraph: {
    title: 'About KuzaConnect',
    description: 'Meet the team and learn the mission behind KuzaConnect\'s education consulting work across Africa and the Global South.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
