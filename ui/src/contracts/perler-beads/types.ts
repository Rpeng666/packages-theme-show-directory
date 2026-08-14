/** Perler-beads shared types — self-contained so packages/ui components have
 * no app-layer dependency. Mirrors the app's domain types. */
export interface PerlerMappedPixel {
  key: string;
  color: string;
  isExternal?: boolean;
}
