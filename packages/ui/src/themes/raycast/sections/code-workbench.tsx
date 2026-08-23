import * as React from 'react'
import { cn } from '../../../lib/utils'
import { WorkbenchFrameProvider } from '../components/frame-context'
import { WorkbenchNoSSR } from '../components/no-ssr'

/**
 * Raycast code workbench — the home page "中间区域" shell + orchestration.
 *
 * Registered pieces:
 *   - WorkbenchFrameProvider / WorkbenchFrameContext（原 app FrameContextStore）
 *   - WorkbenchNoSSR（原 app NoSSR，自包含实现，不依赖 next/dynamic）
 *   - actions / stage / controls 三槽位（对应 ray.so NavigationActions / Frame / Controls）
 *
 * The app keeps its business (shiki highlighter init, Frame/Controls content)
 * and injects them via slots; the workbench orchestration (frame context,
 * no-SSR mounting, grid layout) lives here so it is reusable.
 *
 *   <CodeWorkbench
 *     actions={<InfoDialog />}          顶部右侧固定操作区
 *     stage={<Frame />}                中间画布（grid-area: content）
 *     controls={<Controls />}          底部控制条
 *   />
 */
export interface CodeWorkbenchProps {
  /** 顶部右侧固定操作区（对应 ray.so NavigationActions 的内容） */
  actions?: React.ReactNode
  /** 中间画布 / stage（Frame 等） */
  stage?: React.ReactNode
  /** 底部控制条（Controls 等） */
  controls?: React.ReactNode
  /** 是否包一层 FrameContext（stage 里用 useContext(FrameContext) 时开启，默认 true） */
  withFrameContext?: boolean
  /** 是否用 no-SSR 包住 stage/controls（默认 true，等效原 NoSSR 行为） */
  withNoSSR?: boolean
  className?: string
  /** 透传到根元素（注册表会注入 data-registry 标记等） */
  [key: string]: unknown
}

export function CodeWorkbench({
  actions,
  stage,
  controls,
  withFrameContext = true,
  withNoSSR = true,
  className,
  ...rest
}: CodeWorkbenchProps) {
  const grid = (
    <div
      className="grid w-full h-full items-center justify-center"
      style={{
        gridTemplateAreas: '"top" "content" "footer"',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '15px auto 110px',
      }}
    >
      {withNoSSR ? <WorkbenchNoSSR>{stage}</WorkbenchNoSSR> : stage}
      {withNoSSR ? <WorkbenchNoSSR>{controls}</WorkbenchNoSSR> : controls}
    </div>
  )

  const actionsBar = actions ? (
    <div className="h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-[275px]">
      {actions}
    </div>
  ) : null

  const content = (
    <div {...rest} className={cn('isolate h-full', className)}>
      {actionsBar}
      {grid}
    </div>
  )

  return withFrameContext ? <WorkbenchFrameProvider>{content}</WorkbenchFrameProvider> : content
}
