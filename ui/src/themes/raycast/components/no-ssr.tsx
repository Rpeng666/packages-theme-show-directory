'use client'

import * as React from 'react'

/**
 * WorkbenchNoSSR — 原 app components/NoSSR。
 *
 * 自包含实现（客户端挂载后才渲染），不依赖 next/dynamic，也不用
 * useState+useEffect 的挂载标记（会被 react-hooks/set-state-in-effect
 * 拦截）。改用 useSyncExternalStore：服务端快照 false（SSR 不渲染），
 * 客户端首帧订阅后即 true（等效 ssr:false，且无 cascading render）。
 */
export function WorkbenchNoSSR({ children }: { children: React.ReactNode }) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return mounted ? <React.Fragment>{children}</React.Fragment> : null
}
