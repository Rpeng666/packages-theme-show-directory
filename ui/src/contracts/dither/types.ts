/**
 * Dither workbench — shared types for packages/ui components.
 *
 * Self-contained so the theme components have no app-layer dependency
 * (mirrors contracts/perler-beads/types.ts). Structurally identical to the
 * app's `src/shared/lib/domain/dither/types.ts` — the app owns the canonical
 * types + algorithm, the package mirrors the option shape for props typing.
 */
export type DitherMethod =
  | 'none'
  | 'bayer2'
  | 'bayer4'
  | 'bayer8'
  | 'floyd'
  | 'atkinson'
  | 'jarvis'
  | 'stucki'
  | 'sierra';

export type DitherMode = 'bw' | 'grayscale' | 'rgb' | 'websafe' | 'duotone';

export interface DitherOptions {
  method: DitherMethod;
  mode: DitherMode;
  grayLevels: number;
  rgbBits: number;
  strength: number;
  serpentine: boolean;
  duotoneFrom?: string;
  duotoneTo?: string;
}

export const DITHER_METHODS: DitherMethod[] = [
  'none',
  'bayer2',
  'bayer4',
  'bayer8',
  'floyd',
  'atkinson',
  'jarvis',
  'stucki',
  'sierra',
];

export const DITHER_MODES: DitherMode[] = [
  'bw',
  'grayscale',
  'rgb',
  'websafe',
  'duotone',
];

export const DEFAULT_DITHER_OPTIONS: DitherOptions = {
  method: 'floyd',
  mode: 'grayscale',
  grayLevels: 4,
  rgbBits: 2,
  strength: 100,
  serpentine: true,
};
