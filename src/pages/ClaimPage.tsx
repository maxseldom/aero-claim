import { useState } from 'react';
import type { FlightData, EligibilityResult } from '../engine/types';
import { EvaluationController } from '../engine/EvaluationController';
import { submitClaim } from '../api/api';
import { ClaimGuide } from '../components/ClaimGuide';
import { AirportAutocomplete } from '../components/AirportAutocomplete';
import { EmailTemplate } from '../components/EmailTemplate';
import icaoToCountryRaw from '../data/icaoToCountry.json';

const icaoToCountry: Record<string, string> = icaoToCountryRaw;

export function ClaimPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FlightData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string; eligibility?: EligibilityResult; allEvals?: EligibilityResult[] } | null>(null);

  const controller = new EvaluationController();

  const handleBack = () => {
    setErrorMsg(null);
    setStep((s) => s - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'delayInputHours' || name === 'delayInputMinutes') {
      const val = parseInt(value, 10) || 0;
      setFormData((prev) => {
        const newData = { ...prev, [name]: val } as any;
        const hrs = newData.delayInputHours || 0;
        const mins = newData.delayInputMinutes || 0;
        newData.delayMinutes = (hrs * 60) + mins;
        return newData;
      });
    } else {
      const upperValue = value.toUpperCase();
      setFormData((prev) => {
        const newData = { ...prev, [name]: upperValue };
        
        // Auto-resolve country logic
        if (name === 'departure') {
          newData.departureCountry = upperValue.length === 4 ? (icaoToCountry[upperValue] || '') : '';
        }
        if (name === 'arrival') {
          newData.arrivalCountry = upperValue.length === 4 ? (icaoToCountry[upperValue] || '') : '';
        }
        
        return newData;
      });
    }
  };

  const proceedToReview = () => {
    // Basic validation
    if (!formData.flightNumber || !formData.date || !formData.departure || !formData.departureCountry || !formData.arrival || !formData.arrivalCountry || !formData.disruptionReason) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    setErrorMsg(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const flightData = formData as FlightData;
    
    // Ensure delayMinutes is a number
    flightData.delayMinutes = Number(flightData.delayMinutes) || 0;
    
    const eligibility = controller.evaluateClaim(flightData);
    const allEvals = controller.evaluateAll(flightData);
    const res = await submitClaim(flightData, eligibility);
    
    setResult({ ...res, eligibility, allEvals });
    setIsSubmitting(false);
    setStep(3);
  };

  return (
    <div className="claim-page-container animate-fade-in">
      <div className="claim-header">
        <h1>Submit Your Claim</h1>
        <p>Enter your flight details manually to check for compensation eligibility.</p>
      </div>
      
      <div className="form-card">
        {step < 3 && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(step / 2) * 100}%` }}></div>
          </div>
        )}
        
        {/* Step 1: Manual Data Entry */}
        {step === 1 && (
          <div className="step animate-fade-in">
            <h2>Flight Details</h2>
            {errorMsg && <div className="error-message" style={{color: 'var(--error-color)', marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px'}}>{errorMsg}</div>}
            
            <div className="form-group">
              <label>
                Flight Number
                <input type="text" name="flightNumber" value={formData.flightNumber || ''} onChange={handleInputChange} placeholder="e.g. AF1234" required />
              </label>
              <label>
                Date of Flight
                <input type="date" name="date" value={formData.date?.toLowerCase() || ''} onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))} required />
              </label>
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label>
                Departure Airport
                <AirportAutocomplete 
                  name="departure"
                  placeholder="e.g. Heathrow, JFK, EGLL" 
                  value={formData.departure || ''} 
                  onChange={(val) => setFormData(prev => ({ ...prev, departure: val, departureCountry: val.length === 4 ? (icaoToCountry[val] || '') : '' }))} 
                />
              </label>
              <label>
                Arrival Airport
                <AirportAutocomplete 
                  name="arrival"
                  placeholder="e.g. Charles de Gaulle, KJFK" 
                  value={formData.arrival || ''} 
                  onChange={(val) => setFormData(prev => ({ ...prev, arrival: val, arrivalCountry: val.length === 4 ? (icaoToCountry[val] || '') : '' }))} 
                />
              </label>
            </div>

            <div className="form-group">
              <label>Amount of Delay</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={{ fontWeight: 'normal' }}>
                  Hours
                  <input type="number" name="delayInputHours" value={(formData as any).delayInputHours ?? ''} onChange={handleInputChange} placeholder="0" min="0" required />
                </label>
                <label style={{ fontWeight: 'normal' }}>
                  Minutes
                  <input type="number" name="delayInputMinutes" value={(formData as any).delayInputMinutes ?? ''} onChange={handleInputChange} placeholder="0" min="0" max="59" required />
                </label>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                ℹ️ Delay is the exact difference between your scheduled landing time and your actual landing time at the gate.
              </span>
            </div>
            
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal' }}>
                <input type="checkbox" name="isCancelled" checked={formData.isCancelled || false} onChange={handleInputChange} style={{ width: 'auto' }} />
                Was this flight cancelled?
              </label>
            </div>

            <div className="form-group">
              <label>
                Reason for Disruption
                <select name="disruptionReason" value={formData.disruptionReason || ''} onChange={(e) => setFormData(prev => ({...prev, disruptionReason: e.target.value as any}))} required>
                  <option value="" disabled>Select a reason...</option>
                  <option value="weather">Extreme Weather</option>
                  <option value="atc">Air Traffic Control / Congestion</option>
                  <option value="technical">Aircraft Technical Issue</option>
                  <option value="crew">Crew Shortage</option>
                  <option value="knock_on">Late arrival of incoming aircraft</option>
                  <option value="strike_airline">Strike (Airline Staff)</option>
                  <option value="strike_airport">Strike (Airport / ATC Staff)</option>
                  <option value="security">Security Issue / Unruly Passenger</option>
                  <option value="denied_boarding">Denied Boarding (Overbooking)</option>
                  <option value="bird_strike">Bird or Lightning Strike</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="other">Other / Unknown</option>
                </select>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '8px', display: 'block', lineHeight: '1.5' }}>
                  ℹ️ <strong>Tip:</strong> Airlines are only required to pay compensation if the disruption was within their control (e.g. crew shortages, routine technical faults). "Extraordinary circumstances" like severe weather or air traffic control restrictions are usually exempt from compensation.
                </span>
              </label>
            </div>

            <div className="button-group-right">
              <button onClick={proceedToReview}>
                Review Claim
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="step animate-fade-in">
            <h2>Review & Submit</h2>
            <div className="summary">
              <div className="summary-item">
                <span className="label">Flight:</span>
                <span className="value">{formData.flightNumber}</span>
              </div>
              <div className="summary-item">
                <span className="label">Airline Detected:</span>
                <span className="value" style={{ color: 'var(--primary-color)' }}>
                  ✈️ {formData.flightNumber ? formData.flightNumber.substring(0, 2).toUpperCase() : 'Unknown'}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Date:</span>
                <span className="value">{formData.date}</span>
              </div>
              <div className="summary-item">
                <span className="label">Route:</span>
                <span className="value">{formData.departure} ({formData.departureCountry}) ➔ {formData.arrival} ({formData.arrivalCountry})</span>
              </div>
              <div className="summary-item">
                <span className="label">Delay:</span>
                <span className="value">
                  {(formData as any).delayInputHours ? `${(formData as any).delayInputHours}h ` : ''}
                  {(formData as any).delayInputMinutes ? `${(formData as any).delayInputMinutes}m ` : ''}
                  ({formData.delayMinutes} mins total) {formData.isCancelled ? '(Cancelled)' : ''}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Reason:</span>
                <span className="value" style={{textTransform: 'capitalize'}}>{formData.disruptionReason}</span>
              </div>
            </div>
            <div className="button-group">
              <button className="secondary" onClick={handleBack} disabled={isSubmitting}>Back</button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Processing...' : 'Submit Claim'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="step animate-fade-in result-view">
            {!result.success && !result.eligibility?.isEligible && !result.message.includes('Supabase') && !result.message.includes('error') ? (
              <div className="error-state">
                <div className="icon">✗</div>
                <h2>Not Eligible</h2>
                <p className="message">Unfortunately, your flight does not qualify for compensation under the applicable frameworks.</p>
                
                {result.allEvals && result.allEvals.length > 0 && (
                  <div className="ineligibility-table-container">
                    <table className="ineligibility-table">
                      <thead>
                        <tr>
                          <th>Framework</th>
                          <th>Reason for Ineligibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.allEvals.map((evalResult, i) => (
                          <tr key={i}>
                            <td className="framework-name">{evalResult.regulationApplied}</td>
                            <td className="framework-reason">{evalResult.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : result.eligibility?.isEligible && result.success ? (
              <div className="success-state">
                <div className="icon">✓</div>
                <h2>You're Eligible!</h2>
                <div className="amount-card">
                  <p className="amount">{result.eligibility?.compensationAmount} {result.eligibility?.currency}</p>
                  <p className="regulation">Under {result.eligibility?.regulationApplied} Framework</p>
                </div>
                <p className="message">{result.message}</p>
                <ClaimGuide flightNumber={formData.flightNumber || ''} />
                <EmailTemplate flightData={formData as FlightData} eligibility={result.eligibility!} />
              </div>
            ) : (
              <div className="error-state" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error-color)' }}>
                <div className="icon" style={{ background: 'var(--error-color)' }}>!</div>
                <h2>Database Error</h2>
                <p className="message" style={{ color: 'var(--error-color)', fontWeight: 'bold' }}>{result.message}</p>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>It looks like your Supabase connection failed. Have you added your API keys to .env.local?</p>
              </div>
            )}
            <button onClick={() => { setStep(1); setFormData({}); setResult(null); }} className="start-over-btn">Start New Claim</button>
          </div>
        )}
      </div>
    </div>
  );
}
