'use client'

import * as React from 'react'

/**
 * Workbench frame context — 原 app store/FrameContextStore。
 * 独立文件 + 'use client'：被 client 组件（Frame/ExportButton）消费，
 * 且不把 createContext 泄漏进 server 组件图。
 */
export const WorkbenchFrameContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

export function WorkbenchFrameProvider({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  return <WorkbenchFrameContext.Provider value={ref}>{children}</WorkbenchFrameContext.Provider>
}
