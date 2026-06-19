import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import './Dropzone.css';

export default function Dropzone({ onScan }) {
  const [text, setText] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!text.trim()) return;
    setIsScanning(true);
    await onScan(text);
    setIsScanning(false);
  };

  return (
    <div className="dropzone-container panel">
      <div className="dropzone-header">
        <UploadCloud size={48} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
        <h2>Paste Legal Document</h2>
        <p>Drop your brief or judgement below to scan for fabricated AI citations.</p>
      </div>
      <textarea 
        className="document-textarea"
        placeholder="Paste document text here... e.g. 'In Mata v. Avianca, 410 U.S. 113, the court held...'"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="dropzone-footer">
        <button 
          className="button scan-button" 
          onClick={handleScan}
          disabled={isScanning || !text.trim()}
        >
          {isScanning ? 'Scanning...' : 'Scan for Hallucinations'}
        </button>
      </div>
    </div>
  );
}
