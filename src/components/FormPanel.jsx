import PhotoDropZone from './PhotoDropZone';
import { exportPNG, downloadDataUrl } from '../utils/export';
import { useState } from 'react';

export default function FormPanel({ fields, onChange, onPhoto, onClearPhoto }) {
  const { photoDataUrl, name, date, weight, height, team } = fields;
  const [exporting, setExporting] = useState(false);

  function field(key) {
    return {
      value: fields[key] ?? '',
      onChange: (e) => onChange(key, e.target.value),
    };
  }

  async function handleExportPNG() {
    setExporting(true);
    try {
      const dataUrl = await exportPNG();
      downloadDataUrl(dataUrl, `my-pan-sticker-${Date.now()}.png`);
    } finally {
      setExporting(false);
    }
  }

return (
    <div className="form-panel">
      <div>
        <p className="form-section-title">Foto</p>
        <PhotoDropZone
          photoUrl={photoDataUrl}
          onPhoto={onPhoto}
          onClear={onClearPhoto}
        />
      </div>

      <div>
        <p className="form-section-title">Detalles</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="f-name">Nombre</label>
            <input
              id="f-name"
              className="form-input"
              placeholder="Your Name"
              {...field('name')}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="f-date">Fecha</label>
              <input
                id="f-date"
                className="form-input"
                placeholder="06-12-2025"
                {...field('date')}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-weight">Peso / Stat 2</label>
              <input
                id="f-weight"
                className="form-input"
                placeholder="67kg"
                {...field('weight')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="f-height">Altura / Stat 3</label>
              <input
                id="f-height"
                className="form-input"
                placeholder="1.7m"
                {...field('height')}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-team">Equipo / Label</label>
              <input
                id="f-team"
                className="form-input"
                placeholder="Guatemala"
                {...field('team')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="export-section">
        <p className="form-section-title">Exportar</p>
        <button
          className="btn-export btn-png"
          onClick={handleExportPNG}
          disabled={exporting}
          type="button"
        >
          {exporting ? 'Generando…' : 'Descargar Estampita'}
        </button>
      </div>
    </div>
  );
}
