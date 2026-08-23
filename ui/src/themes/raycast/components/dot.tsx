import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './dot.module.css'

/**
 * WorkbenchDot — 主题色点（圆形色块 + 渐变/阴影）。
 * 用于主题卡片（色点行）与桌面 Dock。无业务依赖。
 */
export function WorkbenchDot({
  color,
  colorSecondary = color,
  size = 12,
  className,
}: {
  color?: string
  colorSecondary?: string
  size?: number
  className?: string
}) {
  return (
    <span
      className={cn(styles.dot, className)}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        backgroundImage: `linear-gradient(to bottom, ${color}, ${colorSecondary})`,
      }}
    />
  )
}