import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './desktop.module.css'

/**
 * WorkbenchDesktop — 桌面模拟器骨架（主题预览大展示框）。
 *
 * 复刻 app themes 页 Desktop：圆角边框容器 + 居中布局 + 双壁纸（亮/暗）+ Dock。
 * 壁纸用普通 <img>（object-cover）替代 next/image，避免资产库依赖 Next；
 * 壁纸 URL 与 Dock/内容由 app 注入：
 *
 *   <WorkbenchDesktop
 *     darkWallpaper={darkWallpaperUrl}   // app 传入壁纸 URL
 *     lightWallpaper={lightWallpaperUrl}
 *     dock={<WorkbenchDock …/>}          // app 注入 Dock
 *   >
 *     <Raycast …/>  // 主题预览内容
 *   </WorkbenchDesktop>
 */
export interface WorkbenchDesktopProps {
  /** 暗色壁纸 URL */
  darkWallpaper?: string
  /** 亮色壁纸 URL */
  lightWallpaper?: string
  /** 底栏 Dock */
  dock?: React.ReactNode
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export function WorkbenchDesktop({
  darkWallpaper,
  lightWallpaper,
  dock,
  children,
  className,
  ...rest
}: WorkbenchDesktopProps) {
  return (
    <div
      data-desktop
      className={cn(styles.desktop, className)}
      {...rest}
    >
      <div className={cn(styles.content)}>
        <div className={styles.main}>{children}</div>
        {dock}
      </div>

      {darkWallpaper ? (
        <img
          data-wallpaper="dark"
          className={styles.wallpaper}
          src={darkWallpaper}
          alt=""
        />
      ) : null}
      {lightWallpaper ? (
        <img
          data-wallpaper="light"
          className={styles.wallpaper}
          src={lightWallpaper}
          alt=""
        />
      ) : null}
    </div>
  )
}