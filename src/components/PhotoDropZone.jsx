import { useRef, useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import Spinner from './Spinner';

export default function PhotoDropZone({ photoUrl, onPhoto, onClear }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [removing, setRemoving] = useState(false);

  function handleFiles(files) {
    const file = files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onPhoto(e.target.result);
    reader.readAsDataURL(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  async function handleRemoveBackground() {
    if (!photoUrl) return;
    setRemoving(true);
    try {
      const blob = await removeBackground(photoUrl);
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhoto(e.target.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Error al quitar el fondo. Intenta de nuevo.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div>
      {photoUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <img src={photoUrl} className="photo-thumb" alt="Selected" />
            {removing && (
              <div className="photo-overlay">
                <Spinner />
              </div>
            )}
          </div>
          <div className="photo-actions">
            <button
              className="photo-btn-clear photo-btn-remove"
              onClick={onClear}
              type="button"
              disabled={removing}
            >
              Remove
            </button>
            <button
              className="photo-btn-clear photo-btn-change"
              onClick={() => inputRef.current?.click()}
              type="button"
              disabled={removing}
            >
              Change
            </button>
            <button
              className="photo-btn-clear photo-btn-remove-bg"
              onClick={handleRemoveBackground}
              disabled={removing}
              type="button"
            >
              Quitar fondo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      ) : (
        <div
          className={`photo-dropzone${dragOver ? ' drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          aria-label="Subir foto"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <p className="photo-dropzone-text">
            <strong>Click para subir una foto</strong> o arrástrala acá
          </p>
          <p className="photo-dropzone-text" style={{ fontSize: 11, opacity: 0.6 }}>
            JPG, PNG, WEBP
          </p>
        </div>
      )}
    </div>
  );
}
