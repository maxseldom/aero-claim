export function TermsOfService() {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)', lineHeight: '1.7' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ffffff 0%, #fdba74 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Terms of Service</h1>
      <p style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Effective Date: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '1rem' }}>
          By accessing and using the AeroClaim website and its associated services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you must immediately cease using the platform.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>2. Description of Service</h2>
        <p style={{ marginBottom: '1rem' }}>
          AeroClaim provides an automated eligibility checker that compares flight disruptions against global passenger rights regulations (e.g., EU261, UK261, APPR, US DOT). Our service is designed to help you understand your potential legal rights and facilitate the initial steps of claiming compensation from airlines.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--error-color)', borderRadius: '0 8px 8px 0' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--error-color)' }}>3. No Legal Advice & Disclaimer of Warranties</h2>
        <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
          AeroClaim is NOT a law firm and does not provide legal advice.
        </p>
        <p style={{ marginBottom: '0' }}>
          The information, calculations, and eligibility results provided by our platform are estimates based on algorithmic interpretations of complex international laws. We provide the service "AS-IS" without warranties of any kind. We do not guarantee that any claim will be successfully paid by an airline. Airlines may reject claims citing "extraordinary circumstances" or other exemptions. You are solely responsible for verifying the accuracy of your claims.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>4. User Obligations</h2>
        <p style={{ marginBottom: '1rem' }}>When using AeroClaim, you agree to:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Provide accurate, truthful, and complete information regarding your flight and disruption.</li>
          <li style={{ marginBottom: '0.5rem' }}>Not use the platform to submit fraudulent claims or attempt to claim compensation for flights you did not take.</li>
          <li style={{ marginBottom: '0.5rem' }}>Not employ automated scraping, bots, or any mechanisms that interfere with the integrity of our servers.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>5. Limitation of Liability</h2>
        <p style={{ marginBottom: '1rem' }}>
          To the maximum extent permitted by law, AeroClaim and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use or inability to use our services or any denied compensation claims.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>6. Governing Law</h2>
        <p style={{ marginBottom: '1rem' }}>
          These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which AeroClaim is registered, without regard to its conflict of law principles.
        </p>
      </section>
    </div>
  );
}
