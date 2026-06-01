export function PrivacyPolicy() {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)', lineHeight: '1.7' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ffffff 0%, #fdba74 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Effective Date: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>1. Introduction</h2>
        <p style={{ marginBottom: '1rem' }}>
          At AeroClaim ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our flight compensation checking tools.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>2. Information We Collect</h2>
        <p style={{ marginBottom: '1rem' }}>We may collect the following types of data:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Flight Data:</strong> Information necessary to evaluate your claim, such as flight number, date, departure and arrival airports, and disruption details.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Contact Information:</strong> If you choose to submit a claim for processing, we may collect your email address, full name, and booking reference.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> We automatically collect analytics data including IP addresses, browser types, and interaction metrics to improve our service.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>3. How We Use Your Information</h2>
        <p style={{ marginBottom: '1rem' }}>Your data is used strictly for the following purposes:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Evaluating flight compensation eligibility under global frameworks (e.g., EU261, APPR).</li>
          <li style={{ marginBottom: '0.5rem' }}>Generating custom claim letters and facilitating communication with airlines.</li>
          <li style={{ marginBottom: '0.5rem' }}>Improving our algorithms and website user experience.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>4. GDPR & CCPA Compliance (Your Rights)</h2>
        <p style={{ marginBottom: '1rem' }}>Depending on your location (e.g., European Economic Area, California), you have specific rights regarding your personal data:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Right to Erasure (Right to be Forgotten):</strong> You can request that we delete your data from our systems.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Right to Opt-Out:</strong> California residents can opt out of the sale of personal data (Note: We do not sell your personal data).</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>5. Data Retention & Security</h2>
        <p style={{ marginBottom: '1rem' }}>
          We implement commercially reasonable security measures to protect your data. We retain flight assessment data only as long as necessary to provide our services, after which it is anonymized or securely deleted.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>6. Contact Us</h2>
        <p style={{ marginBottom: '1rem' }}>
          If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer at <strong>privacy@aeroclaim.example.com</strong>.
        </p>
      </section>
    </div>
  );
}
