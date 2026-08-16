import type { PxlKitData } from '@pxlkit/core';

/**
 * 📏 Line — 16×16 pixel art diagonal-line tool icon.
 *
 * A straight diagonal stroke from bottom-left to top-right with arrowheads —
 * the line-drawing tool metaphor.
 *
 *   B = Stroke  (#333333)
 *   A = Arrow   (#E74C3C)
 */
export const Line: PxlKitData = {
  name: 'line',
  size: 16,
  category: 'ui',
  grid: [
    '................',
    '..........BAAA..',
    '.........BB..A..',
    '........BB.....A',
    '.......BB.......',
    '......BB........',
    '.....BB.........',
    '....BB..........',
    '...BB...........',
    '..BB............',
    '.BB.............',
    'BB..............',
    '................',
    '................',
    '................',
    '................',
  ],
  palette: {
    B: '#333333',
    A: '#E74C3C',
  },
  tags: ['line', 'stroke', 'draw', 'tool'],
  author: 'pxlkit',
};
