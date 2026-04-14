import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Solutions',
  description: 'Free AI-powered tools for education impact: Impact Matcher, Capacity Assessment, and M&E Analyzer. Plus AI consulting services for education organisations.',
  openGraph: {
    title: 'AI Solutions for Education | KuzaConnect',
    description: 'Explore KuzaConnect\'s free AI tools and consulting services — designed for governments, NGOs, and development partners working in education.',
  },
}

export default function AiSolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
