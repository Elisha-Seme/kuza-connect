import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impact Matcher',
  description: 'Free AI tool: match your education challenge to the right intervention. Answer a few questions and get tailored recommendations grounded in evidence.',
  openGraph: {
    title: 'Impact Matcher — Free AI Tool | KuzaConnect',
    description: 'Describe your education challenge and get evidence-based intervention recommendations in minutes. Free, no registration required.',
  },
}

export default function ImpactMatcherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
