/**
 * Background-generator pattern renderers — pure `ImageData` generators.
 *
 * Each pattern takes colors (hex) + a tile size and renders a seamless
 * tile. SSR-safe (no canvas), so the preview can render anywhere.
 */

export interface BgColors {
  primary: string;
  secondary: string;
  background: string;
}

export type BgPatternId =
  | 'checker'
  | 'stripes'
  | 'dots'
  | 'brick'
  | 'camo'
  | 'sky'
  | 'grass'
  | 'water';

export interface BgPatternDef {
  id: BgPatternId;
  labelKey: string; // i18n key for the pattern name
}

export const BG_PATTERNS: BgPatternDef[] = [
  { id: 'checker', labelKey: 'bgChecker' },
  { id: 'stripes', labelKey: 'bgStripes' },
  { id: 'dots', labelKey: 'bgDots' },
  { id: 'brick', labelKey: 'bgBrick' },
  { id: 'camo', labelKey: 'bgCamo' },
  { id: 'sky', labelKey: 'bgSky' },
  { id: 'grass', labelKey: 'bgGrass' },
  { id: 'water', labelKey: 'bgWater' },
];

/** Parse #rrggbb → {r,g,b}. */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

/** Helper: set a pixel in the output buffer. */
function px(d: Uint8ClampedArray, size: number, x: number, y: number, c: { r: number; g: number; b: number }, a = 255) {
  const o = (y * size + x) * 4;
  d[o] = c.r;
  d[o + 1] = c.g;
  d[o + 2] = c.b;
  d[o + 3] = a;
}

/**
 * Render a seamless tile of `pattern` at `size`×`size` using the colors.
 * Returns a fresh `ImageData`.
 */
export function renderPattern(pattern: BgPatternId, colors: BgColors, size: number): ImageData {
  const out = new ImageData(size, size);
  const d = out.data;
  const a = hexToRgb(colors.primary);
  const b = hexToRgb(colors.secondary);
  const c = hexToRgb(colors.background);
  const cell = Math.max(2, Math.floor(size / 8));

  // Pre-fill background.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      px(d, size, x, y, c);
    }
  }

  switch (pattern) {
    case 'checker': {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if ((Math.floor(x / cell) + Math.floor(y / cell)) % 2 === 0) px(d, size, x, y, a);
        }
      }
      return out;
    }
    case 'stripes': {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (Math.floor(x / cell) % 2 === 0) px(d, size, x, y, a);
          else if (Math.floor(x / cell) % 4 === 1) px(d, size, x, y, b);
        }
      }
      return out;
    }
    case 'dots': {
      const r = Math.max(1, Math.floor(cell * 0.32));
      for (let gy = 0; gy < size; gy += cell) {
        for (let gx = 0; gx < size; gx += cell) {
          const cx = gx + Math.floor(cell / 2);
          const cy = gy + Math.floor(cell / 2);
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              if (dx * dx + dy * dy <= r * r) {
                const xx = (cx + dx + size) % size;
                const yy = (cy + dy + size) % size;
                px(d, size, xx, yy, a);
              }
            }
          }
        }
      }
      return out;
    }
    case 'brick': {
      const h = Math.max(2, Math.floor(cell * 0.5));
      for (let y = 0; y < size; y++) {
        const row = Math.floor(y / h);
        const offset = row % 2 === 0 ? 0 : Math.floor(cell / 2);
        for (let x = 0; x < size; x++) {
          const col = Math.floor((x + offset) / cell);
          if ((x + offset) % cell === 0 || y % h === 0) {
            px(d, size, x, y, b); // mortar
          } else {
            px(d, size, x, y, a); // brick
          }
        }
      }
      return out;
    }
    case 'camo': {
      // Deterministic pseudo-random blobs.
      let seed = 7;
      const rnd = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
      };
      const blobs = 6;
      for (let i = 0; i < blobs; i++) {
        const bx = Math.floor(rnd() * size);
        const by = Math.floor(rnd() * size);
        const br = Math.floor(rnd() * cell * 1.4) + Math.max(2, Math.floor(cell / 2));
        const col = i % 2 === 0 ? a : b;
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            // wrap-around distance for seamlessness
            let dx = Math.abs(x - bx);
            let dy = Math.abs(y - by);
            dx = Math.min(dx, size - dx);
            dy = Math.min(dy, size - dy);
            if (dx * dx + dy * dy <= br * br) px(d, size, x, y, col);
          }
        }
      }
      return out;
    }
    case 'sky': {
      // Vertical gradient + sun.
      for (let y = 0; y < size; y++) {
        const t = y / size;
        const col = {
          r: Math.round(c.r + (b.r - c.r) * t),
          g: Math.round(c.g + (b.g - c.g) * t),
          b: Math.round(c.b + (b.b - c.b) * t),
        };
        for (let x = 0; x < size; x++) px(d, size, x, y, col);
      }
      const sun = a;
      const cx = Math.floor(size * 0.7);
      const cy = Math.floor(size * 0.3);
      const sr = Math.max(2, Math.floor(cell * 0.6));
      for (let dy = -sr; dy <= sr; dy++) {
        for (let dx = -sr; dx <= sr; dx++) {
          if (dx * dx + dy * dy <= sr * sr) {
            const xx = (cx + dx + size) % size;
            const yy = (cy + dy + size) % size;
            px(d, size, xx, yy, sun);
          }
        }
      }
      return out;
    }
    case 'grass': {
      // Green base + darker blades + sky sliver at top.
      for (let y = 0; y < size; y++) {
        const isSky = y < Math.floor(size / 10);
        const col = isSky ? c : a;
        for (let x = 0; x < size; x++) px(d, size, x, y, col);
      }
      for (let x = 0; x < size; x++) {
        const bladeH = cell + ((x * 7) % 4);
        for (let dy = 0; dy < bladeH; dy++) {
          const y = Math.floor(size / 10) + dy;
          if (y < size && (x + dy) % 3 !== 0) px(d, size, x, y, b);
        }
      }
      return out;
    }
    case 'water': {
      // Blue gradient + wave stripes.
      for (let y = 0; y < size; y++) {
        const t = y / size;
        const col = {
          r: Math.round(c.r + (b.r - c.r) * t * 0.4),
          g: Math.round(c.g + (b.g - c.g) * t * 0.4),
          b: Math.round(c.b + (b.b - c.b) * t * 0.4),
        };
        for (let x = 0; x < size; x++) px(d, size, x, y, col);
      }
      for (let y = 0; y < size; y++) {
        const wave = Math.floor((y + Math.floor(y / cell) % 2) / cell);
        for (let x = 0; x < size; x++) {
          if (Math.floor((x + wave) / (cell / 2)) % 4 === 1) {
            px(d, size, x, y, { r: Math.min(255, a.r), g: Math.min(255, a.g), b: Math.min(255, a.b) });
          }
        }
      }
      return out;
    }
  }
}
