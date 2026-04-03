export const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%23090909'/%3E%3Cstop offset='1' stop-color='%23151515'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Crect x='70' y='70' width='1060' height='660' rx='28' fill='none' stroke='%23b74b4b' stroke-opacity='0.55' stroke-width='6'/%3E%3Ctext x='50%25' y='48%25' text-anchor='middle' fill='%23ffffff' fill-opacity='0.92' font-family='Arial, sans-serif' font-size='44'%3EImage Unavailable%3C/text%3E%3Ctext x='50%25' y='56%25' text-anchor='middle' fill='%23b74b4b' fill-opacity='0.9' font-family='Arial, sans-serif' font-size='28'%3ENEXTGEN E-COM%3C/text%3E%3C/svg%3E";

export function applyImageFallback(e) {
  const img = e?.currentTarget;
  if (!img) return;
  if (img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = IMAGE_FALLBACK;
}

