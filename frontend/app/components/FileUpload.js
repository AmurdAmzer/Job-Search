'use client';
import { useState } from 'react';

export default function FileUpload({ onFileSelect }) {
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    setError(null);
    onFileSelect(file); // Pass the file back to the parent
  };

  return (
    <div>
      <label htmlFor="resume-upload">Upload Resume (PDF only):</label>
      <input
        type="file"
        accept="application/pdf"
        id="resume-upload"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
}
