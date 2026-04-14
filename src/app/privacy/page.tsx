import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'

export const metadata = {
  title: 'Privacy Policy | KuzaConnect',
  description: 'How KuzaConnect collects, uses, and protects your personal information.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-h3 mb-3" style={{ color: 'var(--kuza-purple-dark)' }}>{title}</h2>
      <div className="space-y-3 text-body" style={{ color: '#4b5563', lineHeight: 1.75 }}>
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        tag="Legal"
        heading="Privacy Policy"
        description="How we collect, use, and protect your information when you use KuzaConnect's website and services."
      />

      <div className="section-pad" style={{ background: 'white' }}>
        <div className="container-xl" style={{ maxWidth: '760px' }}>

          <p className="text-caption mb-10" style={{ color: '#9ca3af' }}>
            Last updated: January 2025
          </p>

          <Section title="1. Who We Are">
            <p>
              KuzaConnect is an education consulting organisation based in Nairobi, Kenya. We help governments,
              NGOs, and development partners build education system capacity across the Global South.
            </p>
            <p>
              This Privacy Policy explains how KuzaConnect (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, stores, and
              protects personal information when you visit our website at kuzaconnect.com, use our AI tools,
              or contact us.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect information in the following ways:</p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>
                <strong style={{ color: '#1a1630' }}>Contact form submissions</strong> — name, email address,
                organisation, and message when you reach out via our contact form.
              </li>
              <li>
                <strong style={{ color: '#1a1630' }}>AI tool inputs</strong> — responses you provide when using
                our Impact Matcher, Capacity Assessment, or M&amp;E Analyzer tools. These are processed to
                generate your results and are not stored permanently.
              </li>
              <li>
                <strong style={{ color: '#1a1630' }}>Chat interactions</strong> — messages sent to our Kuza
                Assistant chatbot. These are processed in real time and are not stored beyond the active session.
              </li>
              <li>
                <strong style={{ color: '#1a1630' }}>Usage data</strong> — standard web analytics including
                pages visited, time on site, browser type, and device. This data is aggregated and
                does not identify individuals.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>Respond to enquiries and requests submitted via the contact form</li>
              <li>Deliver the results of our AI tools during your session</li>
              <li>Improve the performance and content of our website and tools</li>
              <li>Communicate with you about our services if you have opted in</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We do not use your personal information for automated decision-making that produces legal
              or similarly significant effects.
            </p>
          </Section>

          <Section title="4. AI Tools and Data Processing">
            <p>
              Our three AI tools (Impact Matcher, Capacity Assessment, and M&amp;E Analyzer) process your
              inputs using the Claude API provided by Anthropic. When you use these tools:
            </p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>Your inputs are sent to Anthropic&apos;s API to generate a response</li>
              <li>Inputs are not stored by KuzaConnect after your session ends</li>
              <li>For the M&amp;E Analyzer, uploaded documents are processed in memory and are not retained</li>
              <li>Anthropic&apos;s own privacy policy governs how they handle API data</li>
            </ul>
            <p>
              We recommend not uploading documents containing sensitive personal data to the M&amp;E Analyzer.
            </p>
          </Section>

          <Section title="5. Sharing Your Information">
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share
              information only in the following circumstances:
            </p>
            <ul className="space-y-2 pl-5 list-disc">
              <li>
                <strong style={{ color: '#1a1630' }}>Service providers</strong> — trusted third-party services
                that help us operate our website (including Anthropic for AI processing, Supabase for data
                storage, and Vercel for hosting). These providers are bound by confidentiality obligations.
              </li>
              <li>
                <strong style={{ color: '#1a1630' }}>Legal requirements</strong> — where required by law,
                court order, or to protect the rights and safety of KuzaConnect or others.
              </li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>
              Contact form submissions are retained for up to 2 years to allow us to follow up on
              enquiries. AI tool session data is not retained after your session ends. Usage analytics
              are retained in aggregated, anonymised form.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              Depending on your location, you may have rights over your personal data, including the
              right to access, correct, or request deletion of information we hold about you. To exercise
              any of these rights, contact us at{' '}
              <a href="mailto:info@kuzaconnect.com" style={{ color: 'var(--kuza-purple)', textDecoration: 'underline' }}>
                info@kuzaconnect.com
              </a>.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Our website uses minimal cookies necessary for the site to function correctly. We do not
              use advertising or tracking cookies. Analytics data is collected in aggregate form only.
            </p>
          </Section>

          <Section title="9. Security">
            <p>
              We take reasonable technical and organisational measures to protect your personal information
              against unauthorised access, loss, or misuse. Our website is served over HTTPS, and data
              stored with Supabase is encrypted at rest.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top
              of this page will reflect any changes. Continued use of our website after changes are
              posted constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              For any questions or concerns about this Privacy Policy or how we handle your data,
              please contact us:
            </p>
            <div
              className="mt-4 p-5 rounded-xl"
              style={{ background: 'var(--kuza-cream)', border: '1px solid #e4e0d8' }}
            >
              <p className="font-semibold mb-1" style={{ color: 'var(--kuza-purple-dark)' }}>KuzaConnect</p>
              <p>Email: <a href="mailto:info@kuzaconnect.com" style={{ color: 'var(--kuza-purple)' }}>info@kuzaconnect.com</a></p>
              <p>Phone: +254 729 980718</p>
              <p>Location: Nairobi, Kenya</p>
            </div>
          </Section>

          <div className="pt-8 border-t" style={{ borderColor: '#e4e0d8' }}>
            <Link href="/terms" style={{ color: 'var(--kuza-purple)' }} className="text-sm hover:underline">
              View our Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
