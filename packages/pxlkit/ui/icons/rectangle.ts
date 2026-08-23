import type { PxlKitData } from '@pxlkit/core';

/**
 * ▭ Rectangle — 16×16 pixel art rectangle tool icon.
 *
 * A chunky rectangle outline with a corner accent — the rectangle-drawing
 * tool metaphor.
 *
 *   B = Stroke  (#333333)
 *   A = Accent  (#4ECDC4)
 */
export const Rectangle: PxlKitData = {
  name: 'rectangle',
  size: 16,
  category: 'ui',
  grid: [
    '................',
    '.BBBBBBBBBBBBBB.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.B............B.',
    '.BAAAA........B.',
    '.BBBBBBBBBBBBBB.',
    '................',
  ],
  palette: {
    B: '#333333',
    A: '#4ECDC4',
  },
  tags: ['rectangle', 'rect', 'shape', 'tool'],
  author: 'pxlkit',
};
