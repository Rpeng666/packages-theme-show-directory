/**
 * Theme registry — mirror of the theme system used by the source project.
 *
 * Themes live under `themes/{name}/`:
 *   themes/{name}/blocks/   forwarder components (resolve the registered
 *                           implementation from @template/ui and inject data)
 *   themes/{name}/style/    design tokens (index.css entry)
 *
 * The loader below resolves a block by name with fallback to `default`,
 * mirroring the reference's getThemeBlock().
 */
import * as defaultBlocks from "./default/blocks";
import * as pixelBlocks from "./pixel/blocks";
import * as semiBlocks from "./semi/blocks";
import * as raycastBlocks from "./raycast/blocks";

export type ThemeName = "default" | "pixel" | "semi" | "raycast";

export const themeNames: ThemeName[] = ["default", "pixel", "semi", "raycast"];
export const defaultTheme: ThemeName = "default";

export interface ThemeBlockRef {
  name: string;
  fallback: string | null;
}

type BlockMap = Record<string, unknown>;

const registries: Record<string, BlockMap> = {
  default: defaultBlocks as unknown as BlockMap,
  pixel: pixelBlocks as unknown as BlockMap,
  semi: semiBlocks as unknown as BlockMap,
  raycast: raycastBlocks as unknown as BlockMap,
};

/**
 * Resolve a theme block by name. Returns the component for the active theme,
 * falling back to the `default` theme when the requested theme doesn't ship
 * the block (mirrors the source project's fallback chain).
 */
export function getThemeBlock(name: string, theme: string = defaultTheme): unknown {
  const block = registries[theme]?.[name] ?? registries[defaultTheme]?.[name];
  return block ?? null;
}

/** List every block name available for a theme (falling back to default). */
export function getThemeBlockNames(theme: string = defaultTheme): string[] {
  const set = new Set<string>([
    ...Object.keys(registries[theme] ?? {}),
    ...Object.keys(registries[defaultTheme] ?? {}),
  ]);
  return Array.from(set);
}

export function isTheme(name: string): name is ThemeName {
  return themeNames.includes(name as ThemeName);
}

export { defaultBlocks, pixelBlocks, semiBlocks, raycastBlocks };