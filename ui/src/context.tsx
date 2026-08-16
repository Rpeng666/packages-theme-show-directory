'use client'

import * as React from 'react'
import {
  defaultThemeName,
  getThemeManifest,
  resolveComponent,
  type ThemeComponents,
  type ThemeName,
} from './registry'

/**
 * Runtime theme registry context.
 *
 * The active theme defaults to `defaultThemeName`; the app overrides it by
 * passing its build-time `getActiveTheme()` as the Provider's `theme` prop
 * (so SSR and the first client frame match). `setTheme` switches at runtime
 * (future: theme previewer).
 *
 * Only the primitives resolve through this context. Section-level components
 * are app-side and stay on the app's own resolution (getThemeBlock).
 */
interface ThemeRegistryValue {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const ThemeRegistryContext = React.createContext<ThemeRegistryValue>({
  // Literal, not `defaultThemeName`: the registry module (via the cleaner
  // workbench components) imports this module, creating a registry↔context
  // cycle. Accessing the registry's `defaultThemeName` const here would hit the
  // TDZ (registry's body hasn't run yet while this module body evaluates).
  theme: 'default',
  setTheme: () => {},
})

export function ThemeRegistryProvider({
  theme,
  children,
}: {
  /** 可选：默认 default；app 传构建期 getActiveTheme()，预览器可嵌套覆盖子树 */
  theme?: ThemeName
  children: React.ReactNode
}) {
  const [active, setActive] = React.useState<ThemeName>(theme ?? defaultThemeName)
  const value = React.useMemo(() => ({ theme: active, setTheme: setActive }), [active])
  const Ambient = getThemeManifest(active).AmbientProvider

  return (
    <ThemeRegistryContext.Provider value={value}>
      {Ambient ? <Ambient>{children}</Ambient> : children}
    </ThemeRegistryContext.Provider>
  )
}

export function useActiveTheme(): ThemeName {
  return React.useContext(ThemeRegistryContext).theme
}

export function useThemeComponent<K extends keyof ThemeComponents>(
  key: K,
): ThemeComponents[K] {
  const { theme } = React.useContext(ThemeRegistryContext)
  return resolveComponent(key, theme)
}
