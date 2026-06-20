// SVG coordinate constants (viewBox: 0 0 138.75 184.499994)
const PHOTO_PATH = 'M 66.882812 46.929688 L 107.105469 46.929688 C 118.210938 46.929688 127.214844 55.933594 127.214844 67.039062 L 107.105469 67.039062 C 118.210938 67.039062 127.214844 76.042969 127.214844 87.148438 C 127.214844 98.257812 118.210938 107.261719 107.105469 107.261719 L 66.882812 107.261719 C 55.777344 107.261719 46.773438 98.257812 46.773438 87.148438 L 46.773438 67.039062 C 46.773438 55.933594 55.777344 46.929688 66.882812 46.929688 Z';

let cachedSvgText = null;

async function loadSvgText() {
  if (cachedSvgText) return cachedSvgText;
  const resp = await fetch('/sticker-template.svg');
  cachedSvgText = await resp.text();
  return cachedSvgText;
}

export async function buildStickerSVG({ photoDataUrl, name, date, weight, height, team }) {
  const svgText = await loadSvgText();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svg = doc.documentElement;
  const ns = 'http://www.w3.org/2000/svg';
  const xlinkNs = 'http://www.w3.org/1999/xlink';

  const defs = doc.querySelector('defs');

  // ── Add clipPath for the rounded photo shape ─────────────────────
  if (!doc.getElementById('mypan-photo-clip')) {
    const photoClip = doc.createElementNS(ns, 'clipPath');
    photoClip.id = 'mypan-photo-clip';
    const p = doc.createElementNS(ns, 'path');
    p.setAttribute('d', PHOTO_PATH);
    photoClip.appendChild(p);
    defs.appendChild(photoClip);
  }

  // ── Mask the teal background: punch a transparent hole for the photo ─
  if (!doc.getElementById('mypan-bg-mask')) {
    const mask = doc.createElementNS(ns, 'mask');
    mask.id = 'mypan-bg-mask';
    const whiteRect = doc.createElementNS(ns, 'rect');
    whiteRect.setAttribute('x', '-10'); whiteRect.setAttribute('y', '-10');
    whiteRect.setAttribute('width', '160'); whiteRect.setAttribute('height', '200');
    whiteRect.setAttribute('fill', 'white');
    const hole = doc.createElementNS(ns, 'path');
    hole.setAttribute('d', PHOTO_PATH);
    hole.setAttribute('fill', 'black');
    mask.appendChild(whiteRect);
    mask.appendChild(hole);
    defs.appendChild(mask);
  }

  // Apply mask to the full-card teal background path
  const bgPath = doc.querySelector('path[fill="#46bdc7"]');
  if (bgPath) {
    const d = bgPath.getAttribute('d') || '';
    if (d.includes('183')) {
      bgPath.setAttribute('mask', 'url(#mypan-bg-mask)');
    }
  }

  // ── Clear the white photo placeholder ────────────────────────────
  const photoGroup = doc.querySelector('[clip-path="url(#f93eb8d898)"]');
  if (photoGroup) {
    while (photoGroup.firstChild) photoGroup.removeChild(photoGroup.firstChild);
  }

  // ── Inject user photo as the very first rendered element ─────────
  if (photoDataUrl) {
    const img = doc.createElementNS(ns, 'image');
    img.setAttribute('x', '46.773438');
    img.setAttribute('y', '46.929688');
    img.setAttribute('width', '80.695312');
    img.setAttribute('height', '60.519531');
    img.setAttribute('clip-path', 'url(#mypan-photo-clip)');
    img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    img.setAttribute('href', photoDataUrl);
    img.setAttributeNS(xlinkNs, 'xlink:href', photoDataUrl);
    // Insert before defs (i.e., as absolute first child after defs)
    const firstNonDefs = [...svg.children].find(el => el.tagName !== 'defs');
    if (firstNonDefs) svg.insertBefore(img, firstNonDefs);
    else svg.appendChild(img);
  }

  // ── Hide original text path groups ──────────────────────────────
  for (const g of doc.querySelectorAll('g[transform]')) {
    const t = g.getAttribute('transform');
    if (t === 'matrix(1, 0, 0, 1, 31, 150)' || t === 'matrix(1, 0, 0, 1, 30, 167)') {
      g.setAttribute('visibility', 'hidden');
    }
  }

  return new XMLSerializer().serializeToString(doc);
}

export function svgToBlobUrl(svgString) {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}
