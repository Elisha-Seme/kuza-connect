import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with KuzaConnect. We work with governments, NGOs, and development partners on education system strengthening across the Global South.',
  openGraph: {
    title: 'Contact KuzaConnect',
    description: 'Reach out to discuss how KuzaConnect can support your education initiative across Africa and the Global South.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
