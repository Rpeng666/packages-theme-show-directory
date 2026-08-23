import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './icon-preview-stage.module.css'

/**
 * WorkbenchIconPreviewStage — 工作台输出展示区骨架（居中预览 + 动态尺寸 + 尺寸角标）。
 *
 * 复刻 app icon-generator 的 `.preview` 区域：绝对居中、随 scale 放大、
 * 点击收起侧栏、底部显示尺寸。背景纹理与渲染内容由 app 注入：
 *
 *   <WorkbenchIconPreviewStage
 *     size={512}
 *     scale={1}
 *     dimensionsLabel="512 x 512"
 *     backgroundImage="url(...bg.png)"
 *     onBackgroundClick={() => { setIconsPanelOpened(false); setOptionsPanelOpened(false); }}
 *   >
 *     <ResultIcon settings={settings} IconComponent={IconComponent} ref={svgRef} />
 *   </WorkbenchIconPreviewStage>
 */
export interface WorkbenchIconPreviewStageProps {
  /** 预览基准尺寸（默认 512） */
  size?: number
  /** 缩放比例（>1 时放大容器） */
  scale?: number
  /** 尺寸角标文本（如 "512 x 512"） */
  dimensionsLabel?: string
  /** 背景纹理（CSS background 值，app 注入资产 URL） */
  backgroundImage?: string
  /** 点击背景回调（app 收起侧栏） */
  onBackgroundClick?: () => void
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export function WorkbenchIconPreviewStage({
  size = 512,
  scale = 1,
  dimensionsLabel,
  backgroundImage,
  onBackgroundClick,
  children,
  className,
  ...rest
}: WorkbenchIconPreviewStageProps) {
  const scaled = size * scale + 32

  return (
    <div
      className={cn(styles.preview, className)}
      style={{
        width: `${scaled}px`,
        height: `${scaled}px`,
        backgroundImage: backgroundImage ?? undefined,
      }}
      onClick={onBackgroundClick}
      {...rest}
    >
      <div
        className={styles.scaleContainer}
        style={scale > 1 ? { transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
      {dimensionsLabel ? <div className={styles.dimensions}>{dimensionsLabel}</div> : null}
    </div>
  )
}
