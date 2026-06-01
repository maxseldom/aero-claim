import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShieldCheck, Landmark, Scale, MapPin, Briefcase, FileText, CheckCircle, Search, Zap, Banknote, ArrowRight, ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "How much flight compensation can I get?",
    answer: "Depending on the regulation, distance of your flight, and length of delay, you can receive up to €600 (~$650 USD) under EU261, up to £520 under UK261, or up to $1,000 CAD under Canadian APPR rules."
  },
  {
    question: "Does it cost anything to check my eligibility?",
    answer: "No, checking your eligibility is 100% free. We scan all global passenger rights frameworks instantly to show you exactly what regulations protect your flight."
  },
  {
    question: "What documents do I need to file a claim?",
    answer: "You typically need your boarding pass, booking confirmation or e-ticket, and any notification emails or delay certificates from the airline. Keeping copies of food, drink, or accommodation receipts is also highly recommended if you spent money during the delay."
  },
  {
    question: "How long does the compensation process take?",
    answer: "Most claims are processed by airlines within 4 to 12 weeks. If the airline is unresponsive or contests the claim, it can take longer if escalated to a national enforcement body or legal court. We help ensure your claim is fully documented to minimize delays."
  },
  {
    question: "What counts as an 'extraordinary circumstance'?",
    answer: "Airlines are generally exempt from paying compensation if the disruption is caused by factors outside their control. This includes severe weather conditions, air traffic control strikes, security threats, or sudden airport closures. Airline-specific issues like crew shortages, scheduling mistakes, or technical faults with the aircraft are not considered extraordinary circumstances, and you are eligible."
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
        <h1>Democratizing passenger rights worldwide</h1>
        <p>Don't let airlines keep your money. Empowering travelers to easily claim compensation for delayed, canceled, or overbooked flights globally.</p>
        <Link to="/claim" className="cta-button">Check Eligibility Now</Link>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon"><Search /></div>
            <h3>1. Enter Details</h3>
            <p>Tell us about your flight disruption—no legal jargon required.</p>
          </div>
          <div className="step-arrow"><ArrowRight /></div>
          <div className="step-card">
            <div className="step-icon"><Zap /></div>
            <h3>2. Instant Check</h3>
            <p>Our engine instantly routes your claim to the correct regulation framework globally.</p>
          </div>
          <div className="step-arrow"><ArrowRight /></div>
          <div className="step-card">
            <div className="step-icon"><Banknote /></div>
            <h3>3. Get Compensated</h3>
            <p>Find out exactly what you're owed and start your claim immediately.</p>
          </div>
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
        <h2>Ready to claim what's yours?</h2>
        <p>Don't leave your compensation with the airlines. It takes 2 minutes to check.</p>
        <Link to="/claim" className="cta-button">Check Eligibility Now</Link>
      </section>
    </div>
  );
}
