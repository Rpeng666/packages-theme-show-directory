/**
 * Component registry — aggregates the per-theme manifests and resolves
 * contract keys to concrete implementations.
 *
 * Each theme registers its own components in `src/themes/<theme>/manifest.ts`
 * (default / pixel / semi); this file only assembles the `registry` map and
 * provides the resolution functions (`resolveComponent`/`resolveSection`/…).
 * The shared contract types live in `registry-types.ts`.
 *
 * This is the piece that makes the contracts reusable across themes: a theme
 * declares which implementations back each contract key, and consumers always
 * resolve through `resolveComponent`/`useThemeComponent`, never importing a
 * concrete visual implementation directly.
 */
import { createElement } from "react";
import type { ComponentType } from "react";

import { defaultManifest } from "./themes/default/manifest";
import { pixelManifest } from "./themes/pixel/manifest";
import { semiManifest } from "./themes/semi/manifest";
import type {
  ThemeName,
  ThemeManifest,
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
 * "./registry", and registry's body (via the manifests → cleaner components →
 * context) is mid-evaluation when context's module body runs — see the TDZ
 * note in context.tsx.
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

export const registry: Record<ThemeName, ThemeManifest> = {
  default: defaultManifest,
  pixel: pixelManifest,
  semi: semiManifest,
};

export function getThemeManifest(name?: ThemeName): ThemeManifest {
  return registry[name ?? defaultThemeName] ?? registry[defaultThemeName];
}

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

/**
 * Resolve a contract key to its implementation. `theme` is optional — when
 * omitted, resolves against the active theme (NEXT_PUBLIC_THEME), falling back
 * to the default theme when the theme hasn't registered that component.
 *
 * Usage: resolveComponent('Footer')  /  resolveComponent('Button', 'default')
 */
export function resolveComponent<K extends keyof ThemeComponents>(
  key: K,
  theme?: ThemeName,
): ThemeComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).components[key];
  // Tag prefix = the theme that actually supplied the implementation (so a
  // fallback to default shows `default:Key`, not a misleading `pixel:Key`).
  const source = themed ? t : defaultThemeName;
  const Comp = themed ?? getThemeManifest(defaultThemeName).components[key]!;
  return withRegistryTag(key, source, Comp) as ThemeComponents[K];
}

/**
 * Resolve a section (Hero/Faq/Cta/…). `theme` is optional — when omitted,
 * resolves against the active theme, falling back to the default theme.
 *
 * Usage: resolveSection('Faq')  /  resolveSection('Hero', 'default')
 */
export function resolveSection<K extends keyof SectionComponents>(
  key: K,
  theme?: ThemeName,
): SectionComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).sections?.[key];
  const source = themed ? t : defaultThemeName;
  const Comp = themed ?? getThemeManifest(defaultThemeName).sections?.[key]!;
  return withRegistryTag(key, source, Comp) as SectionComponents[K];
}

/**
 * Resolve a perler-beads workbench component. The feature is pixel-only, so
 * the implementation always resolves against `pixel` (never falls back to the
 * default theme, which has no perler entries) — but the active theme is still
 * used for the registry identity tag, mirroring the other resolvers.
 *
 * Usage: resolvePerler('ColorPalette')  /  resolvePerler('InstallPWA')
 */
export function resolvePerler<K extends keyof PerlerBeadsComponents>(
  key: K,
  theme?: ThemeName,
): PerlerBeadsComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).perler?.[key];
  const source = themed ? t : "pixel";
  const Comp = themed ?? getThemeManifest("pixel").perler?.[key]!;
  return withRegistryTag(
    `Perler${key}`,
    source,
    Comp,
  ) as PerlerBeadsComponents[K];
}

/**
 * Resolve a dither workbench component. The feature is pixel-only, so the
 * implementation always resolves against `pixel` (never falls back to the
 * default theme) — mirroring `resolvePerler`.
 *
 * Usage: resolveDither('SettingsPanel')  /  resolveDither('Preview')
 */
export function resolveDither<K extends keyof DitherComponents>(
  key: K,
  theme?: ThemeName,
): DitherComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).dither?.[key];
  const source = themed ? t : "pixel";
  const Comp = themed ?? getThemeManifest("pixel").dither?.[key]!;
  return withRegistryTag(`Dither${key}`, source, Comp) as DitherComponents[K];
}

/**
 * Resolve a generic image-editor shell component. The asset is pixel-only, so
 * the implementation always resolves against `pixel` (never falls back to the
 * default theme) — mirroring `resolvePerler`/`resolveDither`.
 *
 * Usage: resolveEditor('Shell')  /  resolveEditor('Sidebar')
 */
export function resolveEditor<K extends keyof EditorComponents>(
  key: K,
  theme?: ThemeName,
): EditorComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).editor?.[key];
  const source = themed ? t : "pixel";
  const Comp = themed ?? getThemeManifest("pixel").editor?.[key]!;
  return withRegistryTag(`Editor${key}`, source, Comp) as EditorComponents[K];
}

/**
 * Resolve a cleaner workbench display component. Falls back to the `pixel`
 * implementation when the active theme has no cleaner entry (mirroring
 * `resolveEditor`/`resolveDither`) — pixel is the historical reference.
 *
 * Usage: resolveCleaner('Workbench')  /  resolveCleaner('Output')
 */
export function resolveCleaner<K extends keyof CleanerComponents>(
  key: K,
  theme?: ThemeName,
): CleanerComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).cleaner?.[key];
  const source = themed ? t : "pixel";
  const Comp = themed ?? getThemeManifest("pixel").cleaner?.[key]!;
  return withRegistryTag(`Cleaner${key}`, source, Comp) as CleanerComponents[K];
}

/**
 * Resolve a light-tool demo component. The asset is pixel-only, so the
 * implementation always resolves against `pixel` (never the default theme).
 *
 * Usage: resolveLightDemo('Demo')
 */
export function resolveLightDemo<K extends keyof LightDemoComponents>(
  key: K,
  theme?: ThemeName,
): LightDemoComponents[K] {
  const t = theme ?? getActiveTheme();
  const themed = getThemeManifest(t).lightDemo?.[key];
  const source = themed ? t : "pixel";
  const Comp = themed ?? getThemeManifest("pixel").lightDemo?.[key]!;
  return withRegistryTag(
    `LightDemo${key}`,
    source,
    Comp,
  ) as LightDemoComponents[K];
}
