import type { PxlKitData } from '@pxlkit/core';

/**
 * ✂️ Selection — 16×16 pixel art selection (marquee) tool icon.
 *
 * A dashed selection box with corner handles — the marquee / region-select
 * tool metaphor.
 *
 *   B = Dashed box  (#333333)
 *   H = Handle      (#E67E22)
 */
export const Selection: PxlKitData = {
  name: 'selection',
  size: 16,
  category: 'ui',
  grid: [
    '................',
    '.BBB.H......HBBB',
    '.B............B.',
    '.B............B.',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.B............B.',
    '.B............B.',
    '.BBB.H......HBBB',
    '................',
  ],
  palette: {
    B: '#333333',
    H: '#E67E22',
  },
  tags: ['selection', 'marquee', 'select', 'region', 'tool'],
  author: 'pxlkit',
};
