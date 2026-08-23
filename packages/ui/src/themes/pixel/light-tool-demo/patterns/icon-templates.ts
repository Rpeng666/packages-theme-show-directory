/**
 * Game-icon templates — pure pixel-art icon renderers.
 *
 * Each template is an ASCII pixel grid; `P` = primary color, `S` = secondary
 * (accent), `O` = outline/dark, `.` = transparent. Renders to a fresh
 * `ImageData` at the given size (nearest-neighbor scaled), transparent bg.
 */

export interface IconColors {
  primary: string;
  secondary: string;
  outline: string;
}

export type IconTemplateId =
  | 'sword'
  | 'potion'
  | 'gem'
  | 'shield'
  | 'heart'
  | 'key'
  | 'star'
  | 'skull';

export interface IconTemplateDef {
  id: IconTemplateId;
  label: string;
  grid: string[];
}

/** 8 classic game icons — pixel art, ~10×10 upscaled. */
export const ICON_TEMPLATES: IconTemplateDef[] = [
  {
    id: 'sword',
    label: 'Sword',
    grid: [
      '........PP........',
      '.........P........',
      '.........P........',
      '........PP........',
      '.......PP.........',
      '......PS..........',
      '.....PS...........',
      '....PS............',
      '..OPS.............',
      '.OOP..............',
      '.OO...............',
      '..O...............',
    ],
  },
  {
    id: 'potion',
    label: 'Potion',
    grid: [
      '....OOOO....',
      '....OPPO....',
      '....OPPO....',
      '.OOOOOOOOOO.',
      '.OPPPPPPPO..',
      '.OPPSPSPPO..',
      '.OPPPPPPPO..',
      '.OPPSSSPPO..',
      '.OPPPPPPPO..',
      '.OPPPPPPPO..',
      '.OOPPPPPOO..',
      '..OOOOOO....',
    ],
  },
  {
    id: 'gem',
    label: 'Gem',
    grid: [
      '....OOO....',
      '...OPPPO...',
      '..OPPPPO...',
      '.OPPPPPO...',
      'OPPPSSPPO..',
      '.OPPSSPPO..',
      '..OPPPPO...',
      '..OPPPPO...',
      '...OPPO....',
      '....OO.....',
    ],
  },
  {
    id: 'shield',
    label: 'Shield',
    grid: [
      '.OOOOOOOOOO.',
      '.OPPPPPPPPO.',
      '.OPPPSSPPPO.',
      '.OPPPPSSPPO.',
      '.OPPPPPPPSO.',
      '.OPPPPPPPPO.',
      '.OPPSSSPPPO.',
      '.OPPSSSPPO..',
      '.OPPPPPPO...',
      '.OPPPPPO....',
      '.OOPPPO.....',
      '..OOOO......',
    ],
  },
  {
    id: 'heart',
    label: 'Heart',
    grid: [
      '.OO....OO.',
      'OPPO..OPPO',
      'OPPPPPPPPP',
      '.PPPPPPPP.',
      '..PPPPPP..',
      '...PPPP...',
      '....PP....',
      '....OO....',
    ],
  },
  {
    id: 'key',
    label: 'Key',
    grid: [
      '.OOO...OO.',
      'OPPO..OPPO',
      'OPPO..OPS.',
      '.OO...OPS.',
      '......OPS.',
      '......OO..',
      '..........',
      '..........',
    ],
  },
  {
    id: 'star',
    label: 'Star',
    grid: [
      '....PP....',
      '...PPPP...',
      '....PP....',
      '.PPPPPPS..',
      'PPPPPSSSPP',
      '.PPPSSSPP.',
      '..PSSPP...',
      '...PP.....',
    ],
  },
  {
    id: 'skull',
    label: 'Skull',
    grid: [
      '..OOOOOO..',
      '.OPPPPOPPO',
      'OPPOOPPOOP',
      'OPPOOPPOOP',
      '.OPPPPPPO.',
      '.OPPPPPPO.',
      '.OPPPPPPO.',
      '.OSPPPSO..',
      '.OOPPPOO..',
      '..OOSSO...',
    ],
  },
];

/** Parse #rrggbb. */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

/** Render a template at `size`×`size` (nearest-neighbor upscale). */
export function renderIcon(
  template: IconTemplateId,
  colors: IconColors,
  size: number,
): ImageData {
  const def = ICON_TEMPLATES.find((t) => t.id === template) ?? ICON_TEMPLATES[0];
  const gridH = def.grid.length;
  const gridW = def.grid[0].length;
  const scale = Math.max(1, Math.floor(size / gridW));
  const outSize = gridW * scale;
  const out = new ImageData(outSize, outSize);
  const d = out.data;
  const pal = {
    P: hexToRgb(colors.primary),
    S: hexToRgb(colors.secondary),
    O: hexToRgb(colors.outline),
  };
  for (let gy = 0; gy < gridH; gy++) {
    const row = def.grid[gy];
    for (let gx = 0; gx < gridW; gx++) {
      const ch = row[gx] as keyof typeof pal;
      const col = pal[ch];
      if (!col) continue; // '.' transparent
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          const x = gx * scale + dx;
          const y = gy * scale + dy;
          const o = (y * outSize + x) * 4;
          d[o] = col.r;
          d[o + 1] = col.g;
          d[o + 2] = col.b;
          d[o + 3] = 255;
        }
      }
    }
  }
  return out;
}
