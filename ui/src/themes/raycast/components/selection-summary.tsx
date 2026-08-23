'use client'

import * as React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { cn } from '../../../lib/utils'
import styles from './selection-summary.module.css'

/**
 * WorkbenchSelectionSummary — 多选汇总抽屉（"N selected" + 列表 + 操作按钮）。
 *
 * 复刻 app prompts 页的 sidebar summary：Collapsible 折叠 "N selected" +
 * 已选项列表（可移除）+ 底部操作按钮。数据驱动：
 *
 *   <WorkbenchSelectionSummary
 *     count={selectedPrompts.length}
 *     noun="Prompt"
 *     items={selectedPrompts.map(p => ({ key: p.id, label: p.title, onRemove: () => … }))}
 *     actions={<><Button onClick={add}>Add to Raycast</Button><Button onClick={clear}>Clear</Button></>}
 *   />
 */
export interface WorkbenchSelectionSummaryItem {
  key: string
  label: string
  onRemove?: () => void
}

export interface WorkbenchSelectionSummaryProps {
  /** 已选数量 */
  count: number
  /** 名词（单数，如 "Prompt"）—— 显示 "N Prompts"/"1 Prompt" */
  noun: string
  items: WorkbenchSelectionSummaryItem[]
  /** 底部操作按钮（Add/Clear 等） */
  actions?: React.ReactNode
  /** 移除图标（app 注入，默认内置 X） */
  removeIcon?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export function WorkbenchSelectionSummary({
  count,
  noun,
  items,
  actions,
  removeIcon,
  className,
  ...rest
}: WorkbenchSelectionSummaryProps) {
  const label = `${count} ${count > 1 ? `${noun}s` : noun} selected`

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <p className={styles.title}>Add to Raycast</p>

      <Collapsible.Root>
        <Collapsible.Trigger asChild>
          <button type="button" className={styles.trigger}>
            {label}
            <ChevronGlyph />
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content className={styles.content}>
          {items.map((item) => (
            <div key={item.key} className={styles.item}>
              {item.label}
              {item.onRemove ? (
                <button type="button" className={styles.itemButton} onClick={item.onRemove} aria-label={`Remove ${item.label}`}>
                  {removeIcon ?? <XGlyph />}
                </button>
              ) : null}
            </div>
          ))}
        </Collapsible.Content>
      </Collapsible.Root>

      {actions ? <div className={styles.controls}>{actions}</div> : null}
    </div>
  )
}

function ChevronGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
