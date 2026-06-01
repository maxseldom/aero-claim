import React, { useState } from 'react';
import type { FlightData, EligibilityResult } from '../engine/types';

interface EmailTemplateProps {
  flightData: FlightData;
  eligibility: EligibilityResult;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ flightData, eligibility }) => {
  const [copied, setCopied] = useState(false);

  const hours = Math.floor((flightData.delayMinutes || 0) / 60);
  const minutes = (flightData.delayMinutes || 0) % 60;
  const delayString = hours > 0 
    ? `${hours} hour(s) and ${minutes} minute(s)` 
    : `${minutes} minute(s)`;

  const subject = `Formal Claim for Flight ${flightData.isCancelled ? 'Cancellation' : 'Delay'} Compensation under ${eligibility.regulationApplied} - Flight ${flightData.flightNumber?.toUpperCase()}`;

  const body = `Dear Customer Service Team,

I am writing to formally request compensation under the ${eligibility.regulationApplied} framework regarding my disrupted flight.

Flight Details:
- Flight Number: ${flightData.flightNumber?.toUpperCase()}
- Date of Flight: ${flightData.date}
- Departure Airport: ${flightData.departure}
- Arrival Airport: ${flightData.arrival}

My flight was ${flightData.isCancelled ? 'cancelled' : `delayed by a total of ${delayString} upon arrival at the final destination`}. Because this disruption was caused by reasons within the airline's control (categorized as: ${flightData.disruptionReason?.replace('_', ' ')}), it does not fall under "extraordinary circumstances." 

Therefore, I am legally entitled to a fixed compensation of ${eligibility.compensationAmount} ${eligibility.currency} under ${eligibility.regulationApplied}. 

Please arrange for this compensation to be transferred to my bank account within the standard processing timeframe. If I do not receive a substantive response, I reserve the right to escalate this claim to the relevant Civil Aviation Authority or pursue further legal action.

I look forward to your prompt resolution of this matter.

Sincerely,
[Your Full Name]
[Your Contact Information]
[Your Booking Reference / PNR]`;

  const fullText = `Subject: ${subject}\n\n${body}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="email-template-container" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
      <details style={{
        background: 'var(--surface-color)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        <summary style={{
          padding: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          color: 'var(--primary)',
          backgroundColor: 'rgba(255,255,255,0.02)',
          userSelect: 'none'
        }}>
          📝 Assistance with Writing a Form
        </summary>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            You can copy and paste this formal demand letter directly into the airline's web form or email. Be sure to replace the bracketed text at the bottom with your real information!
          </p>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleCopy}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                backgroundColor: copied ? 'var(--success-color)' : 'var(--primary)',
              }}
            >
              {copied ? '✓ Copied' : 'Copy to Clipboard'}
            </button>
            <textarea 
              readOnly
              value={fullText}
              style={{
                width: '100%',
                height: '350px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                resize: 'vertical',
                lineHeight: '1.4'
              }}
            />
          </div>
        </div>
      </details>
    </div>
  );
};
