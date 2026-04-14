import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'M&E Analyzer',
  description: 'Free AI tool: upload your monitoring and evaluation report and get instant analysis, key findings, and actionable recommendations.',
  openGraph: {
    title: 'M&E Analyzer — Free AI Tool | KuzaConnect',
    description: 'Upload your M&E report for instant AI-powered analysis. Identify key findings and gaps in minutes. Free, no registration required.',
  },
}

export default function MneAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
