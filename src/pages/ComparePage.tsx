import { Check, X, Info } from 'lucide-react';

const frameworks = [
  { name: 'EU261', jurisdiction: 'EU / EEA', maxComp: '€600', delays: true, cancellations: true, overbooking: true },
  { name: 'UK261', jurisdiction: 'United Kingdom', maxComp: '£520', delays: true, cancellations: true, overbooking: true },
  { name: 'APPR', jurisdiction: 'Canada', maxComp: '$1,000 CAD', delays: true, cancellations: true, overbooking: true },
  { name: 'US DOT', jurisdiction: 'United States', maxComp: 'Refunds Only', delays: false, cancellations: true, overbooking: true },
  { name: 'ANAC 400', jurisdiction: 'Brazil', maxComp: 'Material Assistance', delays: true, cancellations: true, overbooking: true },
  { name: 'SHY-PASS', jurisdiction: 'Turkey', maxComp: '€600', delays: true, cancellations: true, overbooking: true },
  { name: 'GACA', jurisdiction: 'Saudi Arabia', maxComp: '200% of Ticket Value', delays: true, cancellations: true, overbooking: true },
  { name: 'MC99', jurisdiction: 'International Treaty', maxComp: 'Up to ~$6,500 USD', delays: true, cancellations: false, overbooking: false }
];

export function ComparePage() {
  return (
    <div className="home-page animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #ffffff 0%, #fdba74 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Global Passenger Rights
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Compare the world's major flight compensation frameworks side-by-side to understand exactly what you're legally entitled to when disruptions occur.
        </p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Regulation</th>
              <th>Jurisdiction</th>
              <th>Max Compensation</th>
              <th><div className="table-header-icon">Delays</div></th>
              <th><div className="table-header-icon">Cancellations</div></th>
              <th><div className="table-header-icon">Overbooking</div></th>
            </tr>
          </thead>
          <tbody>
            {frameworks.map((fw, index) => (
              <tr key={index}>
                <td className="fw-name">{fw.name}</td>
                <td>{fw.jurisdiction}</td>
                <td className="fw-comp">{fw.maxComp}</td>
                <td className="status-cell">
                  {fw.delays ? <Check className="status-icon success" /> : <X className="status-icon error" />}
                </td>
                <td className="status-cell">
                  {fw.cancellations ? <Check className="status-icon success" /> : <X className="status-icon error" />}
                </td>
                <td className="status-cell">
                  {fw.overbooking ? <Check className="status-icon success" /> : <X className="status-icon error" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="info-box" style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <Info style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Extraordinary Circumstances</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Under almost all global frameworks (including EU261, UK261, and APPR), airlines are exempt from paying monetary compensation if the disruption was caused by "extraordinary circumstances" outside of their control. This includes severe weather, air traffic control restrictions, and security threats. Routine technical faults and airline staff shortages do <strong>not</strong> count as extraordinary circumstances.
          </p>
        </div>
      </div>
    </div>
  );
}
