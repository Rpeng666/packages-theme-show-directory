import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './form.module.css'

/**
 * WorkbenchFormSection — 折叠表单区（<details> + summary，含展开/收起 chevron）。
 * 复刻 app icon-generator 的设置面板 section（Presets / Fill / Background …）。
 * children 是面板内容（通常为 WorkbenchFormItem 列表）。
 */
export function WorkbenchFormSection({
  title,
  children,
  defaultOpen = true,
  className,
  ...rest
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  [key: string]: unknown
}) {
  return (
    <details className={cn(styles.section, className)} open={defaultOpen} {...rest}>
      <summary>
        {title}
        <span className={styles.closed} aria-hidden="true">
          <ChevronUp />
        </span>
        <span className={styles.opened} aria-hidden="true">
          <ChevronDown />
        </span>
      </summary>
      <div>{children}</div>
    </details>
  )
}

/**
 * WorkbenchFormItem — 表单行（label + 控件，含 disabled 态）。
 * 复刻 app icon-generator 的 settings formItem（如 "Fill Type" + Select）。
 * 每行之间自动加 12px 间距。
 */
export function WorkbenchFormItem({
  label,
  children,
  disabled = false,
  className,
  ...rest
}: {
  label?: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  [key: string]: unknown
}) {
  return (
    <label className={cn(styles.formItem, disabled && styles.disabled, className)} {...rest}>
      {label ? <span>{label}</span> : null}
      {children}
    </label>
  )
}

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
