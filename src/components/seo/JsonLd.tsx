const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzaconnect.com'

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KuzaConnect',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.jpg`,
    description:
      'KuzaConnect helps locally-driven solutions grow. We connect international evidence, local knowledge, technology, and expert teams to build education system capacity across the Global South.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Nairobi, Kenya',
    },
    areaServed: 'Global South',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@kuzaconnect.com',
      telephone: '+254729980718',
      contactType: 'customer service',
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
