import type { PxlKitData } from '@pxlkit/core';

/**
 * ✋ Hand — 16×16 pixel art open-hand / pan tool icon.
 *
 * A flat palm with five fingers pointing up, used for the hand (pan) tool.
 *
 *   B = Body        (#FFFFFF)
 *   O = Outline     (#333333)
 *   D = Detail      (#888888)
 */
export const Hand: PxlKitData = {
  name: 'hand',
  size: 16,
  category: 'ui',
  grid: [
    '................',
    '.....OOO....O...',
    '....OBBB....O...',
    '..O.OBBB....O...',
    '..O.BBBB....O...',
    '..OBBBBB....O...',
    '..OBBBBO.OOOO...',
    '..OBBBBO.OBBB...',
    '..OBBBBO.OBBB...',
    '..OBBBBOOOBBB...',
    '..OBBBBBBBBBO...',
    '..OBBBBBBBBBO...',
    '..OBBBBBBBBBO...',
    '..OOBBBBBBBOO...',
    '...OOOOOOOOO....',
    '................',
  ],
  palette: {
    B: '#FFFFFF',
    O: '#333333',
    D: '#888888',
  },
  tags: ['hand', 'pan', 'move', 'drag', 'tool'],
  author: 'pxlkit',
};
