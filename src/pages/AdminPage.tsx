import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClaims, signOut } from '../api/api';
import { supabase } from '../api/supabaseClient';
import { LogOut, Database, AlertCircle } from 'lucide-react';

export function AdminPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      if (!supabase) {
        setError('Supabase is not configured.');
        setLoading(false);
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      try {
        const data = await getAllClaims();
        setClaims(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch claims. Do you have the correct RLS policies?');
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetch();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Verifying credentials and loading records...</div>;
  }

  return (
    <div className="admin-page animate-fade-in" style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '2rem', marginBottom: '0.5rem' }}>
            <Database style={{ color: 'var(--primary)' }} /> Claim Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all passenger compensation claims.</p>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', padding: '1.5rem', borderRadius: '12px' }}>
          <AlertCircle /> <span>{error}</span>
        </div>
      ) : (
        <div className="admin-table-wrapper" style={{ overflowX: 'auto', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem 1.5rem', borderBottom: '2px solid var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', color: 'var(--text-secondary)', fontWeight: '600' }}>Date Submitted</th>
                <th style={{ padding: '1rem 1.5rem', borderBottom: '2px solid var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', color: 'var(--text-secondary)', fontWeight: '600' }}>Flight</th>
                <th style={{ padding: '1rem 1.5rem', borderBottom: '2px solid var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', color: 'var(--text-secondary)', fontWeight: '600' }}>Route</th>
                <th style={{ padding: '1rem 1.5rem', borderBottom: '2px solid var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', borderBottom: '2px solid var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', color: 'var(--text-secondary)', fontWeight: '600' }}>Est. Comp</th>
              </tr>
            </thead>
            <tbody>
              {claims.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No claims submitted yet.</td></tr>
              ) : (
                claims.map((claim) => (
                  <tr key={claim.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>{new Date(claim.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--primary)' }}>{claim.flight_number}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{claim.departure_icao} → {claim.arrival_icao}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {claim.is_eligible ? (
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>Eligible</span>
                      ) : (
                        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--error-color)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>Rejected</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: claim.is_eligible ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {claim.is_eligible ? `${claim.currency} ${claim.compensation_amount} (${claim.regulation_applied})` : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
