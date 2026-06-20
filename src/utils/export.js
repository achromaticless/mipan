import { toPng } from 'html-to-image';

async function waitForImages(el) {
  const images = el.querySelectorAll('img');
  return Promise.all(
    Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
}

async function captureSticker(pixelRatio = 4) {
  const el = document.querySelector('.sticker-card');
  if (!el) throw new Error('Sticker card element not found');

  // Wait for all images to load before capturing
  await waitForImages(el);

  // Small delay for iOS to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 100));

  return toPng(el, {
    pixelRatio,
    cacheBust: true,
    allowTaint: true,
  });
}

export async function exportPNG() {
  return captureSticker(4);
}

export async function exportStickerSheet() {
  const DPI = 150;
  const MM_TO_PX = DPI / 25.4;

  const pageW = Math.round(210 * MM_TO_PX);
  const pageH = Math.round(297 * MM_TO_PX);
  const marginMM = 10;
  const gapMM = 5;
  const stickerWmm = 50;
  const stickerHmm = Math.round((stickerWmm * 184.5) / 138.75 * 10) / 10;

  const margin = Math.round(marginMM * MM_TO_PX);
  const gap = Math.round(gapMM * MM_TO_PX);
  const sW = Math.round(stickerWmm * MM_TO_PX);
  const sH = Math.round(stickerHmm * MM_TO_PX);

  const stickerDataUrl = await captureSticker(sW / document.querySelector('.sticker-card').offsetWidth);
  const stickerImg = await new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = stickerDataUrl;
  });
  const stickerCanvas = document.createElement('canvas');
  stickerCanvas.width = sW;
  stickerCanvas.height = sH;
  stickerCanvas.getContext('2d').drawImage(stickerImg, 0, 0, sW, sH);

  const sheet = document.createElement('canvas');
  sheet.width = pageW;
  sheet.height = pageH;
  const ctx = sheet.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, pageW, pageH);

  const cols = 2;
  const rows = Math.floor((pageH - 2 * margin + gap) / (sH + gap));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = margin + c * (sW + gap);
      const y = margin + r * (sH + gap);
      ctx.drawImage(stickerCanvas, x, y, sW, sH);

      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      const mk = 6;
      [[x, y], [x + sW, y], [x, y + sH], [x + sW, y + sH]].forEach(([cx, cy]) => {
        ctx.beginPath(); ctx.moveTo(cx - mk, cy); ctx.lineTo(cx - 2, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 2, cy); ctx.lineTo(cx + mk, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy - mk); ctx.lineTo(cx, cy - 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy + 2); ctx.lineTo(cx, cy + mk); ctx.stroke();
      });
    }
  }

  return sheet.toDataURL('image/png');
}

export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
