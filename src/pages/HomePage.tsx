import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShieldCheck, Landmark, Scale, MapPin, Briefcase, FileText, CheckCircle, ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "How much flight compensation can I get?",
    answer: "Depending on the regulation, distance of your flight, and length of delay, you can receive up to €600 (~$650 USD) under EU261, up to £520 under UK261, or up to $1,000 CAD under Canadian APPR rules."
  },
  {
    question: "Does it cost anything to check my eligibility?",
    answer: "No. Checking your eligibility is 100% free. We scan all global passenger rights frameworks instantly to show you exactly what regulations protect your flight."
  },
  {
    question: "What documents do I need to file a claim?",
    answer: "You typically need your boarding pass, booking confirmation or e-ticket, and any notification emails from the airline. Keep copies of food, drink, or accommodation receipts if you spent money during the delay."
  },
  {
    question: "How long does the compensation process take?",
    answer: "Airlines typically process claims within 4 to 12 weeks. If the airline contests the claim, it can take longer. We help ensure your claim is fully documented to minimize delays."
  },
  {
    question: "What counts as an 'extraordinary circumstance'?",
    answer: "Airlines are exempt from paying compensation if the disruption is caused by factors outside their control, such as severe weather or air traffic control strikes. Crew shortages or technical faults are not considered extraordinary circumstances."
  }
];

export function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <h1>Airlines rely on bureaucracy.<br/>We rely on the law.</h1>
        <p>Check your eligibility for up to $650 in flight compensation in under two minutes. 100% free. No middlemen.</p>
        <Link to="/claim" className="cta-button">Check Eligibility Now</Link>
      </section>

      {/* Trust & Pricing Section */}
      <section className="trust-section" style={{ padding: '3rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The standard "No Win, No Fee" model is broken.</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Traditional claim agencies take up to 30% of your compensation just for sending an email on your behalf. We believe you should keep 100% of what you are legally owed.</p>
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 0', fontWeight: '600' }}>Traditional Agencies</th>
                  <td style={{ padding: '1rem 0', color: 'var(--error-color)', fontWeight: '500' }}>Take a 30% Cut</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 0', fontWeight: '600' }}>Our Platform</th>
                  <td style={{ padding: '1rem 0', color: 'var(--success-color)', fontWeight: '500' }}>100% Free</td>
                </tr>
                <tr>
                  <th style={{ padding: '1rem 0', fontWeight: '600' }}>Your Payout</th>
                  <td style={{ padding: '1rem 0', fontWeight: '600' }}>You keep everything.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works animate-fade-in" style={{ animationDelay: '0.2s', borderTop: 'none' }}>
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">1</div>
            <h3>Tell us what happened</h3>
            <p>Enter your flight details. No legal jargon required.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">2</div>
            <h3>We analyze the law</h3>
            <p>Our engine routes your claim to the correct regulation framework globally.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">3</div>
            <h3>You send the demand</h3>
            <p>Use our generated, highly-formal legal letters to demand your compensation directly.</p>
          </div>
        </div>
      </section>

      {/* Social Proof / Editorial Quote */}
      <section className="social-proof" style={{ padding: '5rem 0', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', lineHeight: '1.5', color: 'var(--text-primary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
            "I was ignored by the airline for six weeks. Generating the exact legal statute through this platform and pasting it into their web portal got my €600 transferred in 3 days."
          </p>
          <p style={{ fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.85rem' }}>— M. Davis, London</p>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="global-coverage animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="section-header">
          <h2 className="section-title">Comprehensive Global Coverage</h2>
          <p className="section-subtitle">We automatically evaluate your eligibility against regulations worldwide.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><ShieldCheck /></div>
            <h3>EU261 Rights</h3>
            <p>If you're flying from or to the EU and face delays over 3 hours, you could be owed up to €600 under European law.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Landmark /></div>
            <h3>UK261 Rights</h3>
            <p>Similar to EU261, UK law protects passengers flying from or to the UK, offering up to £520 for qualifying disruptions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Plane /></div>
            <h3>Canadian APPR</h3>
            <p>Flying within, to, or from Canada? You are protected against cancellations and delays within the airline's control.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Scale /></div>
            <h3>US DOT Regulations</h3>
            <p>Passengers in the US are entitled to prompt refunds for cancelled flights and significant schedule changes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><MapPin /></div>
            <h3>Brazil ANAC 400</h3>
            <p>Extensive passenger rights for flights in Brazil, including material assistance and compensation for delays and cancellations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FileText /></div>
            <h3>Saudi GACA</h3>
            <p>Saudi Arabia's regulations providing compensation for denied boarding, delays, cancellations, and baggage issues.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><CheckCircle /></div>
            <h3>Turkey SHY-PASS</h3>
            <p>Turkish regulations protecting your rights during denied boarding, cancellations, and delays.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Briefcase /></div>
            <h3>Montreal Convention 1999</h3>
            <p>An international treaty covering compensation for damages caused by delays, baggage issues, and injuries on international flights.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about global flight compensation.</p>
        </div>
        <div className="faq-accordion">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <ChevronDown className="faq-chevron" />
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to claim what's yours?</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' }}>We handle the bureaucracy; you get your money.</p>
        <Link to="/claim" className="cta-button">Check Eligibility Now</Link>
      </section>
    </div>
  );
}
