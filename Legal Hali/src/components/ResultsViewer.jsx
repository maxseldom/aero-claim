import { useState } from 'react';
import { ShieldAlert, ShieldCheck, ShieldX, ChevronLeft } from 'lucide-react';
import './ResultsViewer.css';

export default function ResultsViewer({ text, citations, onReset }) {
  const [selectedCitation, setSelectedCitation] = useState(null);

  const sortedCitations = citations ? [...citations].sort((a, b) => a.index - b.index) : [];

  const renderTextWithHighlights = () => {
    if (!citations || citations.length === 0) {
      return (
        <div style={{ padding: '20px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', color: 'var(--text-primary)' }}>
          <h3 style={{ color: 'var(--warning)', marginTop: 0 }}>No standard legal citations detected</h3>
          <p>We couldn't extract any Bluebook-style citations (e.g. "410 U.S. 113", "123 F.3d 456") from your text. The scanner currently relies on standard reporter formats.</p>
          <hr style={{ borderColor: 'var(--glass-border)', margin: '16px 0' }} />
          <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
        </div>
      );
    }

    let lastIndex = 0;
    const elements = [];

    sortedCitations.forEach((cit, idx) => {
      if (cit.index > lastIndex) {
        elements.push(<span key={`text-${idx}`}>{text.substring(lastIndex, cit.index)}</span>);
      }
      
      const isHallucinated = cit.verification?.status === 'Hallucination';
      const isVerified = cit.verification?.status === 'Verified';
      
      let badgeClass = 'highlight-unknown';
      if (isHallucinated) badgeClass = 'highlight-error';
      if (isVerified) badgeClass = 'highlight-success';

      elements.push(
        <mark 
          key={`cit-${idx}`} 
          className={`citation-highlight ${badgeClass} ${selectedCitation === idx ? 'active' : ''}`}
          onClick={() => setSelectedCitation(idx)}
        >
          {text.substring(cit.index, cit.index + cit.length)}
        </mark>
      );
      
      lastIndex = cit.index + cit.length;
    });

    if (lastIndex < text.length) {
      elements.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return elements;
  };

  const getStatusIcon = (status) => {
    if (status === 'Verified') return <ShieldCheck size={28} color="var(--success)" />;
    if (status === 'Hallucination') return <ShieldX size={28} color="var(--error)" />;
    return <ShieldAlert size={28} color="var(--warning)" />;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <button className="button back-button" onClick={onReset}>
          <ChevronLeft size={20} /> Back to Upload
        </button>
        <div className="summary-stats">
          <div className="stat-badge">
            <span className="stat-number">{citations.length}</span>
            <span className="stat-label">Citations Found</span>
          </div>
          <div className="stat-badge error">
            <span className="stat-number">{citations.filter(c => c.verification?.status === 'Hallucination').length}</span>
            <span className="stat-label">Potential Hallucinations</span>
          </div>
        </div>
      </div>

      <div className="results-layout">
        <div className="document-viewer panel">
          <div className="document-content">
            {renderTextWithHighlights()}
          </div>
        </div>

        <div className="sidebar panel">
          {selectedCitation !== null ? (
            <div className="citation-details">
              {(() => {
                const cit = sortedCitations[selectedCitation];
                return (
                  <>
                    <div className="details-header">
                      {getStatusIcon(cit.verification?.status)}
                      <h3 className={cit.verification?.status === 'Hallucination' ? 'text-error' : cit.verification?.status === 'Verified' ? 'text-success' : 'text-warning'}>
                        {cit.verification?.status || 'Unknown'}
                      </h3>
                    </div>
                    <div className="details-body">
                      <div className="citation-block">
                        <span className="label">Cited As:</span>
                        <p className="citation-text">"{cit.full}"</p>
                      </div>
                      
                      <div className="message-block">
                        <p className="verification-message">{cit.verification?.message}</p>
                      </div>
                      
                      {cit.verification?.details && (
                        <div className="case-details">
                          <h4>Database Match:</h4>
                          <div className="detail-row">
                            <span className="label">Name:</span>
                            <span>{cit.verification.details.caseName}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Court:</span>
                            <span>{cit.verification.details.court}</span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Date:</span>
                            <span>{cit.verification.details.dateFiled}</span>
                          </div>
                        </div>
                      )}
                      
                      {cit.deepTrace && (
                        <div className="deep-trace-details">
                          <div className="deep-trace-header">
                            <h4>Deep Trace Analysis</h4>
                            <span className="confidence-badge">{cit.deepTrace.confidence} Confidence</span>
                          </div>
                          
                          {cit.deepTrace.factCheck && (
                            <div className={`fact-check-banner ${cit.deepTrace.factCheck.status === 'Supported' ? 'status-supported' : 'status-unsupported'}`}>
                              <div className="fact-check-status">
                                {cit.deepTrace.factCheck.status === 'Supported' ? (
                                  <span className="status-icon">✓</span>
                                ) : (
                                  <span className="status-icon">✗</span>
                                )}
                                <span>Fact Check: {cit.deepTrace.factCheck.status}</span>
                              </div>
                              <p className="fact-check-explanation">{cit.deepTrace.factCheck.explanation}</p>
                            </div>
                          )}

                          <div className="trace-comparison">
                            <div className="trace-side">
                              <span className="label">Your Paraphrased Claim</span>
                              <p className="trace-text claim-text">"{cit.deepTrace.paraphrasedClaim}"</p>
                            </div>
                            <div className="trace-side">
                              <span className="label">Actual Court Quote</span>
                              <p className="trace-text quote-text">"{cit.deepTrace.exactQuote}"</p>
                            </div>
                          </div>
                          <div className="trace-analysis">
                            <span className="label">LLM Analysis</span>
                            <p>{cit.deepTrace.analysis}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="sidebar-empty">
              <ShieldAlert size={64} color="var(--text-secondary)" opacity={0.3} />
              <p>Click on a highlighted citation in the text to view verification details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
