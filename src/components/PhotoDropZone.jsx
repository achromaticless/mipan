import { useRef, useState } from 'react';

export default function PhotoDropZone({ photoUrl, onPhoto, onClear }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

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

  return (
    <div>
      {photoUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <img src={photoUrl} className="photo-thumb" alt="Selected" />
          <div className="photo-actions">
            <button
              className="photo-btn-clear photo-btn-remove"
              onClick={onClear}
              type="button"
            >
              Remove
            </button>
            <button
              className="photo-btn-clear photo-btn-change"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              Change
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
