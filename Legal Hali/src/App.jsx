import { useState } from 'react';
import { Scale } from 'lucide-react';
import Dropzone from './components/Dropzone';
import ResultsViewer from './components/ResultsViewer';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (text) => {
    setIsScanning(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to scan document.');
      }

      const data = await response.json();
      setScanResult({ text, citations: data.citations });
    } catch (err) {
      console.error(err);
      setError('An error occurred while scanning the document. Please ensure the backend is running.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setScanResult(null);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px', marginTop: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(30, 58, 138, 0.05)', padding: '20px', borderRadius: '50%', marginBottom: '24px', border: '1px solid rgba(30, 58, 138, 0.1)' }}>
          <Scale size={48} color="var(--accent-primary)" />
        </div>
        <h1 style={{ fontSize: '52px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Legal Hallucination Scanner
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Instantly verify legal citations against real databases to catch AI-generated fabrications before they reach the courtroom.
        </p>
      </header>

      <main>
        {error && (
          <div style={{ background: 'rgba(185, 28, 28, 0.05)', color: 'var(--error)', padding: '16px', borderRadius: '4px', maxWidth: '800px', margin: '0 auto 24px auto', textAlign: 'center', border: '1px solid rgba(185, 28, 28, 0.2)' }}>
            {error}
          </div>
        )}

        {isScanning && !scanResult && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="panel" style={{ display: 'inline-block', padding: '40px 60px' }}>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Analyzing document...</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '12px 0 0 0' }}>Extracting and verifying citations.</p>
            </div>
          </div>
        )}

        {!isScanning && !scanResult && (
          <Dropzone onScan={handleScan} />
        )}

        {!isScanning && scanResult && (
          <ResultsViewer 
            text={scanResult.text} 
            citations={scanResult.citations} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
