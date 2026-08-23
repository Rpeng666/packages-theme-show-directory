import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './prompt-card.module.css'

/**
 * WorkbenchPromptCard — 可多选的工作台卡片（主体预览 + 信息行，三态）。
 *
 * 复刻 ray.so 工具页（prompts/quicklinks/snippets）的 `.item` 卡片：
 * hover/focus/selected 三态 + 主体区（模板/大字符预览）+ 信息区（名称/角标）。
 * 支持两种色调：
 *   - 'violet'（prompts 风格：紫）
 *   - 'red'（snippets 风格：红）
 * 内容由 app 注入：
 *
 *   <WorkbenchPromptCard
 *     tone="red"
 *     selected={isSelected}
 *     body={<pre>{snippet.text}</pre>}
 *     info={<><span className={styles.name}>{name}</span><span className={styles.keyword}>{keyword}</span></>}
 *     data-key={`${group.slug}-${index}`}
 *   />
 */
export interface WorkbenchPromptCardProps {
  /** 卡片色调（默认 violet） */
  tone?: 'violet' | 'red'
  /** 是否选中（data-selected） */
  selected?: boolean
  /** 卡片主体（模板预览/大字符等） */
  body?: React.ReactNode
  /** 底部信息区（名称/角标等） */
  info?: React.ReactNode
  /** 额外根属性（data-key 等） */
  className?: string
  [key: string]: unknown
}

export function WorkbenchPromptCard({
  tone = 'violet',
  selected = false,
  body,
  info,
  className,
  ...rest
}: WorkbenchPromptCardProps) {
  return (
    <div
      className={cn(styles.item, tone === 'red' && styles.red, className)}
      data-selected={selected ? 'true' : 'false'}
      {...rest}
    >
      {body ? <div className={styles.body}>{body}</div> : null}
      {info ? <div className={styles.info}>{info}</div> : null}
    </div>
  )
}
