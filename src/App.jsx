import { useState } from 'react';
import './App.css';
import StickerPreview from './components/StickerPreview';
import FormPanel from './components/FormPanel';

function PanLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Loaf body */}
      <rect x="6" y="22" width="36" height="18" rx="4" fill="#FF3D00" opacity="0.85" />
      {/* Loaf dome */}
      <ellipse cx="24" cy="22" rx="18" ry="10" fill="#FF3D00" />
      {/* Score lines */}
      <line x1="16" y1="18" x2="14" y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="16" x2="24" y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="18" x2="34" y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Shine */}
      <ellipse cx="17" cy="18" rx="4" ry="2" transform="rotate(-20 17 18)" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

const DEFAULT_FIELDS = {
  photoDataUrl: null,
  name: '',
  date: '',
  weight: '',
  height: '',
  team: '',
};

export default function App() {
  const [fields, setFields] = useState(DEFAULT_FIELDS);

  function handleChange(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function handlePhoto(dataUrl) {
    setFields((f) => ({ ...f, photoDataUrl: dataUrl }));
  }

  function handleClearPhoto() {
    setFields((f) => ({ ...f, photoDataUrl: null }));
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo" role="banner">
          <PanLogo />
          <span className="header-wordmark">Mi Pan</span>
          <span className="header-tagline">Crea tu estampita</span>
        </div>
      </header>

      <main className="main">
        <section className="preview-panel">
          <p className="preview-label">Preview</p>
          <StickerPreview fields={fields} />
          <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px' }}>
            5 × 6.7 cm · Medidas para imprimir
          </p>
        </section>

        <FormPanel
          fields={fields}
          onChange={handleChange}
          onPhoto={handlePhoto}
          onClearPhoto={handleClearPhoto}
        />
      </main>

      <footer className="footer-strip">
        <PanLogo />
        <span>Mi Pan · Built by @josueus</span>
        <span className="footer-rights">Los logos de Panini y FIFA son propiedad de sus respectivos dueños · Solo para uso personal, no comercial</span>
      </footer>
    </div>
  );
}
