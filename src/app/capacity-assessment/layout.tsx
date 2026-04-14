import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capacity Assessment',
  description: 'Free AI tool: assess your organisation\'s education delivery capacity and receive a prioritised plan for strengthening. No registration needed.',
  openGraph: {
    title: 'Capacity Assessment — Free AI Tool | KuzaConnect',
    description: 'Understand your organisation\'s current capacity and get a tailored strengthening plan. Free AI tool for education organisations.',
  },
}

export default function CapacityAssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
