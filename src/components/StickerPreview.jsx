import paniniPng from '../assets/panini.png';

const TWO_PATH = 'M 56.8225 0H170.465C201.848 0 227.286 25.4399 227.286 56.8212C227.286 88.2025 201.848 113.642 170.465 113.642H227.286V170.465H0V113.642C0 82.2598 25.4386 56.8212 56.8225 56.8212H0C0 25.4399 25.4386 0 56.8225 0Z';
const SIX_PATH = 'M56.8225 0H170.465C201.848 0 227.286 25.4399 227.286 56.8212H170.465C201.848 56.8212 227.286 82.2598 227.286 113.642C227.286 145.025 201.848 170.465 170.465 170.465H56.8225C25.4386 170.465 0 145.025 0 113.642V56.8212C0 25.4399 25.4386 0 56.8225 0Z';

export default function StickerPreview({ fields }) {
  const { photoDataUrl, name, date, weight, height, team } = fields;
  const statsLine = [date, height, weight].filter(Boolean).join(' | ');

  return (
    <div className="sticker-card">
      <svg className="sticker-bg-six" viewBox="0 0 228 171" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d={SIX_PATH} fill="white" />
      </svg>

      <svg className="sticker-bg-two" viewBox="0 0 228 171" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d={TWO_PATH} fill="#3aabb5" />
      </svg>

      <svg className="sticker-logo-top" viewBox="15 74.6 98 89" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="white">
        <path d="m77.6 133.5h14.7c0-6.8-5.9-14.2-14.7-14.2h-10.6v0.5l-0.2 0.2-0.3 1.9-0.1 0.2 0.1 0.4-0.1 0.7 0.5 2.5-0.1 1 0.1 1 0.7 1.4 1.1 1.3 0.8 2.1 1.6 2.8 1.5 3.4-0.1 0.6-0.3 0.1-1.8 0.1-0.1-0.1-2.6 0.1h-10.6l-5.5-0.1-0.2-0.3v-0.4l0.3-0.3 1.2-3.3 1.7-2.5 0.7-2.3 0.6-0.9 0.8-2.7 0.1-0.1v-0.6l0.3-0.7-0.1-1.1-0.2-0.5 0.2-1.9-0.3-2.3h-8.6c-7 0-14.3 5.2-14.4 13.7v15.3c0.1 6.6 6 13.6 14.4 13.6h29.2c7.5 0 14.4-5.5 14.4-14.1 0.1-6.3-4.6-14-14.1-14.5zm-20.9 13.7h-3.1v1.6h2.5l-0.7 1.8h-1.8v3.4h-2.8v-8.5h6.4l-0.5 1.7zm4 6.8h-2.7v-8.5h2.6l0.1 8.5zm7.2-3.4h-2v3.4h-3.1v-8.5h6.2l-1 1.7h-3.1v1.6h2.5l-0.7 1.8h1.2zm5.9 3.3-0.3-1.1h-3.1l-0.3 1.1h-2.7l3-8.4h2.8l3 8.4h-2.4z" />
        <polygon points="71.8 147.6 70.9 151.1 73 151.1" />
        <path d="m47.9 88.4c-6-0.1-13.9 5-14.2 13.7v14.9h22.9l-0.2-0.7 0.2-0.3v-0.5l-0.3-0.6-0.7-1.1-0.1-0.4-0.4-0.5-0.4-1.2 0.1-0.1-0.7-2.4v-0.4l-0.4-1.8-0.3-3-0.2-0.6 0.1-0.6-0.4-0.8-1.3-3.9-0.1-1.1 0.1-1.7h0.6v-1.6l-0.2-0.3c0.4-2.4 1.4-4.7 2.6-6l1.3-1.3c1.4-1.3 3.5-2.5 6.3-2.5 3.4 0 6.4 1.5 7.9 3.8l0.3 0.3 0.3 0.4 1.1 2 0.5 1.3 0.3 1.4 0.8-0.6 0.3 0.3 0.5 2.4-0.3 0.8-0.4 2.4-0.7 1.7 0.1 0.9-0.6 2-0.3 0.6-0.4 1.6-0.3 0.5-0.3 0.9-0.4 1.4-0.3 2.3-0.1 0.2v0.6l-0.2 0.3v0.3l-0.6 2.6-1.4 3h13.7 10.1v-14.7h-14.5c7.3 0 14.1-5.2 14.4-13.1 0.4-7.3-5.2-14.9-14.1-15.2h-29.5c-7.3 0-14.3 5.7-14.4 14.4h14.2z" />
        <path d="m90.2 161.7v-0.9h0.3v0.6h1.2v0.4h-1.2v0.6h-0.3v-0.7z" />
        <path d="m90.2 160.5v-0.6l1.1-0.4-1.1-0.7v-0.5h1.5v0.3h-1.2l1.2 0.7v0.2l-1.2 0.4 1.2 0.1v0.4l-1.5 0.1z" />
      </svg>

      <div className="sticker-photo-area">
        {photoDataUrl && (
          <img src={photoDataUrl} className="sticker-photo-img" alt="Player" />
        )}
      </div>

      <div className="sticker-name-bar">
        <span className="sticker-player-name">{(name || 'YOUR NAME').toUpperCase()}</span>
      </div>

      <div className="sticker-info-bar">
        <div className="sticker-player-stats">
          <span>{statsLine || '31-1-2000 | 1,70 m | 71 kg'}</span>
          <span>{(team || 'ATLÉTICO DE MADRID (ESP)').toUpperCase()}</span>
        </div>
      </div>

      <img src={paniniPng} className="sticker-panini" alt="Panini" />
    </div>
  );
}
