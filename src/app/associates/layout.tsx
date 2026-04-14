import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Associates',
  description: 'Meet the KuzaConnect network of education experts, consultants, and specialists who deliver impact across the Global South.',
  openGraph: {
    title: 'Our Associates | KuzaConnect',
    description: 'A network of experienced education consultants and specialists working with KuzaConnect across Africa and the Global South.',
  },
}

export default function AssociatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
