'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '../../../lib/utils'
import styles from './action-menu.module.css'

/**
 * WorkbenchActionMenu — 通用"主按钮 + 下拉动作菜单（含快捷键项）"。
 *
 * 复刻 ray.so 工具页的导出/安装菜单模式（code ExportButton、themes AddToRaycast、
 * prompts 导出下拉同构）。数据驱动：
 *
 *   <WorkbenchActionMenu
 *     label="Export"
 *     icon={<DownloadIcon />}
 *     onPrimaryClick={handleExport}
 *     primaryDisabled={!selection}
 *     items={[
 *       { key: 'json', label: 'Download JSON', icon: <DownloadIcon />,
 *         shortcut: ['⌘', 'D'], onSelect: handleDownload },
 *       { key: 'url', label: 'Copy URL', shortcut: ['⌘', '⇧', 'C'], onSelect: handleCopyUrl },
 *     ]}
 *   />
 */
export interface WorkbenchActionMenuItem {
  key: string
  label: string
  icon?: React.ReactNode
  shortcut?: string[]
  disabled?: boolean
  onSelect?: () => void
}

export interface WorkbenchActionMenuProps {
  /** 主按钮文案 */
  label: string
  /** 主按钮图标 */
  icon?: React.ReactNode
  /** 主按钮点击 */
  onPrimaryClick?: () => void
  /** 主按钮禁用 */
  primaryDisabled?: boolean
  /** 主按钮 aria-label */
  primaryAriaLabel?: string
  /** 下拉动作项 */
  items: WorkbenchActionMenuItem[]
  /** 下拉开关（受控，可选） */
  open?: boolean
  /** 下拉开关回调（受控，可选） */
  onOpenChange?: (open: boolean) => void
  className?: string
  [key: string]: unknown
}

export function WorkbenchActionMenu({
  label,
  icon,
  onPrimaryClick,
  primaryDisabled = false,
  primaryAriaLabel,
  items,
  open,
  onOpenChange,
  className,
  ...rest
}: WorkbenchActionMenuProps) {
  return (
    <span className={cn(styles.root, className)} {...rest}>
      <button
        type="button"
        className={styles.primary}
        onClick={onPrimaryClick}
        disabled={primaryDisabled}
      >
        {icon}
        {label}
      </button>

      <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            type="button"
            className={styles.chevron}
            aria-label={primaryAriaLabel ?? `${label} options`}
            disabled={primaryDisabled}
          >
            <ChevronDown />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content align="end" sideOffset={8} className={styles.menu}>
            {items.map((item) => (
              <DropdownMenuPrimitive.Item
                key={item.key}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={styles.item}
              >
                <span className={styles.itemLabel}>
                  {item.icon}
                  {item.label}
                </span>
                {item.shortcut ? (
                  <span className={styles.shortcut}>
                    {item.shortcut.map((key) => (
                      <kbd key={key} className={styles.kbd}>
                        {key}
                      </kbd>
                    ))}
                  </span>
                ) : null}
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </span>
  )
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
