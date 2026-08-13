import type * as React from 'react'

/**
 * IconFrame contract — a framed icon tile with optional tone tint and corner
 * accent badge. pixel → PixelIconFrame (chamfered frame + accent), default →
 * simple rounded div. Used by feature-step blocks for per-step icon markers.
 */
export interface IconFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 图标节点 */
  icon: React.ReactNode
  /** 尺寸（px），默认 56 */
  size?: 48 | 56 | 64 | 80 | 112
  /** 强调色调（影响边框/背景/文字），默认 neutral */
  tone?: 'green' | 'cyan' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral'
  /** 形状，默认 square */
  shape?: 'square' | 'rounded' | 'circle'
  /** 右上角小徽标（图标 + 位置） */
  accent?: { icon: React.ReactNode; position?: 'top-right' | 'bottom-right' }
  /** 呼吸动画 */
  animated?: boolean
}
