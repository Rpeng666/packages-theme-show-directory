/**
 * Display helpers for the cleaner section — pure, self-contained rendering
 * utilities. Vendored from the app's domain helpers (they only do string
 * slicing / counting; no business state), so the package renders without
 * importing app modules.
 */

export function countWords(text: string): number {
  const s = text.trim();
  if (!s) return 0;
  const cjk = (s.match(/[一-鿿㐀-䶿豈-﫿]/g) || []).length;
  const latin = s
    .replace(/[一-鿿㐀-䶿豈-﫿]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return cjk + latin;
}
