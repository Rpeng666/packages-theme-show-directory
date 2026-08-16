/** Perler-beads shared types — self-contained so packages/ui components have
 * no app-layer dependency. Mirrors the app's domain types. */
export interface PerlerMappedPixel {
  key: string;
  color: string;
  isExternal?: boolean;
}

/** Perler-beads color-swatch descriptor (palette entry). */
export interface PerlerPaletteColor {
  key: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

/** Perler-beads color-replace mode state (app-owned; passed down for display). */
export interface PerlerColorReplaceState {
  isActive: boolean;
  step: 'select-source' | 'select-target';
  sourceColor?: { key: string; color: string };
}

/** Custom palette selections — map of hexValue -> selected boolean. */
export type PerlerPaletteSelections = Record<string, boolean>;

/** Color-number system id (mirrors the app's ColorSystem union). */
export type PerlerColorSystem = 'MARD' | 'COCO' | '漫漫' | '盼盼' | '咪小窝';
