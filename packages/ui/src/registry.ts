/**
 * Component registry — convention-over-configuration resolver.
 *
 * No hand-written manifests. The filesystem IS the registry: a build-time
 * script (`scripts/discover-convention.mjs`, run on predev/prebuild) scans the
 * convention layout and generates `convention.generated.ts` — so adding a
 * block = dropping a file:
 *
 *   themes/<theme>/components/<Name>.tsx    primitives (file or dir/index)
 *   themes/<theme>/sections/<Name>.tsx      landing blocks
 *   themes/<theme>/pages/<Name>.tsx         page-level shells
 *   themes/<theme>/editor|light-tool-demo/… pixel feature assets
 *   themes/<theme>/ambient.tsx              ambient provider
 *
 * A contract key maps to the export with the same name (PascalCase) in the
 * matching file; aggregate files (one file exporting several components) work
 * automatically because every named export is collected. Resolution is a plain
 * synchronous lookup with the fallback contract:
 *
 *   1. the requested theme (e.g. semi)
 *   2. the default theme (fallback when the active theme doesn't ship the block)
 *   3. any other theme that has it ("哪个有就用哪个")
 *   4. an empty component when nothing exists ("都没有就直接返回空")
 *
 * Because collection happens at build time via plain static imports, there is
 * no runtime registry object, no React.lazy, no Suspense — resolve stays
 * synchronous for the ~200 module-top-level call sites, and it works on both
 * Turbopack (dev) and webpack/Turbopack (build) without bundler-specific
 * dynamic-import features.
 */
import { createElement } from "react";
import type { ComponentType, ReactNode } from "react";

import { conventionIndex, conventionAmbient } from "./convention.generated";
import type {
  ThemeName,
  ThemeComponents,
  SectionComponents,
  PerlerBeadsComponents,
  DitherComponents,
  EditorComponents,
  CleanerComponents,
  LightDemoComponents,
} from "./registry-types";

// Re-export the shared types so the package barrel (`index.tsx`) and the app
// keep importing them from "./registry" exactly as before the split.
export type {
  ThemeName,
  ThemeComponents,
  ThemeManifest,
  PartialThemeComponents,
  SectionComponents,
  PartialSectionComponents,
  SectionManifest,
  PerlerBeadsComponents,
  PartialPerlerBeadsComponents,
  DitherComponents,
  PartialDitherComponents,
  EditorComponents,
  PartialEditorComponents,
  CleanerComponents,
  PartialCleanerComponents,
  LightDemoComponents,
  PartialLightDemoComponents,
} from "./registry-types";

/**
 * `defaultThemeName` lives in this aggregator module (not `registry-types`) to
 * preserve the registry↔context cycle topology: context.tsx imports it from
 * "./registry", and registry's body (via the generated convention imports) is
 * mid-evaluation when context's module body runs — see the TDZ note in context.tsx.
 */
export const defaultThemeName = "default";

/**
 * Active theme from build-time env (NEXT_PUBLIC_THEME), mirroring the app's
 * getActiveTheme. The package reads the env directly so callers can resolve
 * components without passing the theme explicitly (e.g. resolveComponent('Footer')).
 */
export function getActiveTheme(): ThemeName {
  return (process.env.NEXT_PUBLIC_THEME as ThemeName) || defaultThemeName;
}

/** Known theme directories — the convention roots that the codegen scans. */
export const THEME_NAMES: readonly ThemeName[] = ["default", "pixel", "semi", "raycast"];

/** The "nothing exists anywhere" fallback — renders nothing, never throws. */
const EmptyComponent: ComponentType<any> = () => null;

/**
 * Registry identity tag — every component resolved through the registry gets
 * `data-registry="{theme}:{key}"` on its DOM root so it can be identified in
 * the DOM / devtools without guessing which implementation backs it. A
 * consumer-supplied `data-registry` prop wins (spread AFTER the default).
 *
 * Wrappers are memoized by `{theme}:{key}` so the resolved component keeps a
 * stable identity across renders (otherwise React remounts the subtree on
 * every render).
 */
const registryTagCache = new Map<string, ComponentType<any>>();

function withRegistryTag(
  key: string,
  theme: ThemeName,
  Comp: ComponentType<any>,
): ComponentType<any> {
  const cacheKey = `${theme}:${key}`;
  const cached = registryTagCache.get(cacheKey);
  if (cached) return cached as ComponentType<any>;

  const wrapped = ((props: any) =>
    createElement(Comp, {
      "data-registry": cacheKey,
      ...props,
    } as any)) as ComponentType<any>;

  registryTagCache.set(cacheKey, wrapped);
  return wrapped;
}

// ---------------------------------------------------------------------------
// Convention resolution — generated index lookup with the fallback chain.
// ---------------------------------------------------------------------------

/** Convention category → directory under themes/<theme>/. */
type Category =
  | "components"
  | "sections"
  | "pages"
  | "sections/perler-beads"
  | "sections/cleaner"
  | "sections/dither"
  | "sections/blog"
  | "editor"
  | "light-tool-demo";

/**
 * The single convention resolver. Synchronous lookup over the fallback chain:
 * requested theme → default → any other theme → empty.
 */
function resolveConvention<K extends string>(
  category: Category,
  key: K,
  theme: ThemeName | undefined,
  tagPrefix: string,
): ComponentType<any> {
  const active = theme ?? getActiveTheme();
  const candidates = [
    active,
    defaultThemeName,
    ...THEME_NAMES.filter((t) => t !== active && t !== defaultThemeName),
  ];
  for (const t of candidates) {
    const comp = conventionIndex[t]?.[category]?.[key];
    if (comp) return withRegistryTag(tagPrefix, t, comp);
    // page-level shells (ToolPage / ConsoleLayout) register under `pages`.
    if (category === "components" || category === "sections") {
      const pageComp = conventionIndex[t]?.pages?.[key];
      if (pageComp) return withRegistryTag(tagPrefix, t, pageComp);
    }
  }
  return EmptyComponent;
}

/**
 * Resolve a contract key to its implementation. `theme` is optional — when
 * omitted, resolves against the active theme (NEXT_PUBLIC_THEME), falling back
 * to the default theme, then any theme, then an empty component.
 *
 * Usage: resolveComponent('Footer')  /  resolveComponent('Button', 'default')
 */
export function resolveComponent<K extends keyof ThemeComponents>(
  key: K,
  theme?: ThemeName,
): ThemeComponents[K] {
  return resolveConvention("components", key, theme, key) as ThemeComponents[K];
}

/**
 * Resolve a section (Hero/Faq/Cta/…). `theme` is optional — when omitted,
 * resolves against the active theme, falling back to the default theme, then
 * any theme, then an empty component.
 *
 * Usage: resolveSection('Faq')  /  resolveSection('Hero', 'default')
 */
export function resolveSection<K extends keyof SectionComponents>(
  key: K,
  theme?: ThemeName,
): SectionComponents[K] {
  return resolveConvention("sections", key, theme, key) as SectionComponents[K];
}

/**
 * Resolve a perler-beads workbench component (pixel feature, sections/perler-beads).
 * Usage: resolvePerler('ColorPalette')  /  resolvePerler('InstallPWA')
 */
export function resolvePerler<K extends keyof PerlerBeadsComponents>(
  key: K,
  theme?: ThemeName,
): PerlerBeadsComponents[K] {
  return resolveConvention("sections/perler-beads", key, theme, `Perler${key}`) as PerlerBeadsComponents[K];
}

/**
 * Resolve a dither workbench component (pixel feature, sections/dither).
 * Usage: resolveDither('SettingsPanel')  /  resolveDither('Preview')
 */
export function resolveDither<K extends keyof DitherComponents>(
  key: K,
  theme?: ThemeName,
): DitherComponents[K] {
  return resolveConvention("sections/dither", key, theme, `Dither${key}`) as DitherComponents[K];
}

/**
 * Resolve a generic image-editor shell component (pixel feature, editor/).
 * Usage: resolveEditor('Shell')  /  resolveEditor('Sidebar')
 */
export function resolveEditor<K extends keyof EditorComponents>(
  key: K,
  theme?: ThemeName,
): EditorComponents[K] {
  return resolveConvention("editor", key, theme, `Editor${key}`) as EditorComponents[K];
}

/**
 * Resolve a cleaner workbench display component (pixel feature, sections/cleaner).
 * Usage: resolveCleaner('Workbench')  /  resolveCleaner('Output')
 */
export function resolveCleaner<K extends keyof CleanerComponents>(
  key: K,
  theme?: ThemeName,
): CleanerComponents[K] {
  return resolveConvention("sections/cleaner", key, theme, `Cleaner${key}`) as CleanerComponents[K];
}

/**
 * Resolve a light-tool demo component (pixel feature, light-tool-demo/).
 * Usage: resolveLightDemo('Demo')
 */
export function resolveLightDemo<K extends keyof LightDemoComponents>(
  key: K,
  theme?: ThemeName,
): LightDemoComponents[K] {
  return resolveConvention("light-tool-demo", key, theme, `LightDemo${key}`) as LightDemoComponents[K];
}

/**
 * Resolve a theme's ambient provider by convention — `themes/<theme>/ambient.tsx`.
 * Returns null when the theme ships no ambient provider.
 */
export function resolveAmbient(
  theme: ThemeName,
): ComponentType<{ children: ReactNode }> | null {
  return conventionAmbient[theme] ?? null;
}
