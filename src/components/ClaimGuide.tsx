import React from 'react';
import airlineGuidesRaw from '../data/airlineGuides.json';

type AirlineGuide = {
  name: string;
  icao: string;
  claimUrl: string;
  steps: string[];
};

const airlineGuides: Record<string, AirlineGuide> = airlineGuidesRaw;

interface ClaimGuideProps {
  flightNumber: string;
}

export const ClaimGuide: React.FC<ClaimGuideProps> = ({ flightNumber }) => {
  // Extract alphabetic prefix (e.g., 'RYR' from 'RYR1234' or 'FR' from 'FR1234')
  const prefixMatch = flightNumber.trim().toUpperCase().match(/^[A-Z]+/);
  const code = prefixMatch ? prefixMatch[0] : '';

  // Try matching IATA key first, then search for ICAO value
  let guide = airlineGuides[code];
  if (!guide && code.length >= 3) {
    const found = Object.values(airlineGuides).find(g => g.icao === code);
    if (found) guide = found;
  }

  if (guide) {
    return (
      <div className="claim-guide-card animate-fade-in" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>How to Claim from {guide.name}</h3>
        
        <p style={{ marginBottom: '1rem' }}>
          <strong>Official Claim Portal: </strong>
          <a href={guide.claimUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
            {guide.claimUrl}
          </a>
        </p>

        <div className="steps-container">
          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Step-by-Step Instructions:</h4>
          <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
            {guide.steps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  // Fallback Guide for Airlines not in the database
  const fallbackSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(code + ' airline flight delay compensation claim form official')}`;

  return (
    <div className="claim-guide-card animate-fade-in" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>How to Claim your Compensation</h3>
      
      <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        We haven't added the exact URL for airline code <strong>{code}</strong> to our database yet, but you can easily find it online!
      </p>

      <div className="steps-container">
        <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Step-by-Step Instructions:</h4>
        <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href={fallbackSearchUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
              Click here to search Google
            </a> for the airline's official EU261/APPR/Compensation claim form.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>Look for the official website of the airline (avoid third-party agencies that take a 30% cut!).</li>
          <li style={{ marginBottom: '0.5rem' }}>Navigate to "Customer Service", "Feedback", or "Flight Delays".</li>
          <li style={{ marginBottom: '0.5rem' }}>Submit your booking reference number and wait for their response.</li>
        </ol>
      </div>
    </div>
  );
};
