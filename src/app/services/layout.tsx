import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'KuzaConnect offers expert education consulting services including foundation learning, teacher development, curriculum design, M&E, and education system strengthening.',
  openGraph: {
    title: 'Education Consulting Services | KuzaConnect',
    description: 'From foundation learning to system-wide reform — explore KuzaConnect\'s consulting services for governments, NGOs, and development partners.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
