import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join KuzaConnect. We are hiring a Senior International Education Systems Advisor based in Kenya to support education system strengthening across East Africa.',
  openGraph: {
    title: 'Careers at KuzaConnect',
    description: 'Senior International Education Systems Advisor role — Kenya-based, part-time. Closing date 15 May.',
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
