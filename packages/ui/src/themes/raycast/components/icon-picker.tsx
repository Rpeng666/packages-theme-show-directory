import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './icon-picker.module.css'

/**
 * WorkbenchIconPicker — 图标选择器面板（复刻 app icon-generator 左侧 icon 面板）。
 *
 * 布局（搜索栏 + 图标 grid + 空态）+ 交互逻辑（搜索过滤、单选）由主题提供；
 * 图标组件由 app 注入（避免主题依赖具体图标库，如 @raycast/icons）：
 *
 *   <WorkbenchIconPicker
 *     icons={allIcons}                       // 全部可用图标名
 *     value={settings.icon}                  // 当前选中
 *     onSelect={(name) => ...}               // 选择回调
 *     searchTerm={searchTerm}                // 受控搜索词
 *     onSearch={(v) => ...}
 *     renderIcon={(name) => <Component />}   // 图标名 → 图标元素
 *     searchInput={...}                      // 自定义搜索输入（可选）
 *     emptySlot={...}                        // 空态内容（可选）
 *   />
 */
export interface WorkbenchIconPickerProps {
  /** 全部图标名 */
  icons: string[]
  /** 当前选中图标名 */
  value?: string
  /** 选择回调 */
  onSelect?: (name: string) => void
  /** 搜索词（受控） */
  searchTerm?: string
  /** 搜索变化回调 */
  onSearch?: (term: string) => void
  /** 图标名 → 图标元素（app 注入） */
  renderIcon: (name: string) => React.ReactNode
  /** 搜索输入区上方额外动作（随机/上传/文字等按钮，app 注入） */
  extraActions?: React.ReactNode
  /** 空态内容（可选，默认 "We couldn't find an icon for that"） */
  emptySlot?: React.ReactNode
  /** 标题（默认 "All Icons"，搜索时 "Results"） */
  title?: string
  className?: string
  [key: string]: unknown
}

export function WorkbenchIconPicker({
  icons,
  value,
  onSelect,
  searchTerm = '',
  onSearch,
  renderIcon,
  extraActions,
  emptySlot,
  title,
  className,
  ...rest
}: WorkbenchIconPickerProps) {
  const filtered = searchTerm
    ? icons.filter((n) => n.toLowerCase().includes(searchTerm.toLowerCase()))
    : icons

  return (
    <div className={cn(styles.root, className)} {...rest}>
      {onSearch ? (
        <div className={styles.searchRow}>
          {onSearch ? (
            <SearchBox value={searchTerm} onChange={onSearch} />
          ) : null}
          {extraActions}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {emptySlot ?? <span>We couldn’t find an icon for that</span>}
        </div>
      ) : (
        <>
          <h4 className={styles.title}>{title ?? (searchTerm ? 'Results' : 'All Icons')}</h4>
          <div className={styles.grid}>
            {filtered.map((name) => (
              <label key={name} className={styles.icon}>
                <input
                  type="radio"
                  name="workbench-icon"
                  value={name}
                  checked={name === value}
                  onChange={() => onSelect?.(name)}
                />
                {renderIcon(name)}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/** 搜索框（简单的图标+输入，app 可自行替换为 WorkbenchInput + slot） */
function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.search}>
      <SearchGlyph />
      <input
        type="text"
        placeholder="Search icons…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
