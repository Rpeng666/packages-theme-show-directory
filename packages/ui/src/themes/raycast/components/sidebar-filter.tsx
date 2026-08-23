import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './sidebar-filter.module.css'

/**
 * WorkbenchSidebarFilter — 侧栏过滤器区块（开关 / 勾选列表）。
 *
 * 复刻 app presets 页 sidebar 的 Models/AI Extensions 区块：区块标题 +
 * 分隔线 + 过滤器控件列表。数据驱动：
 *
 *   <WorkbenchSidebarFilter
 *     sections={[
 *       { key: 'models', title: 'Models', tooltip: '…',
 *         controls: [
 *           { key: 'advanced', label: 'Show Advanced AI',
 *             control: <WorkbenchSwitch checked={…} onCheckedChange={…} color="purple" /> },
 *         ] },
 *       { key: 'extensions', title: 'AI Extensions', tooltip: '…',
 *         list: [{ key, label, icon, checked, onToggle }] },
 *     ]}
 *   />
 */
export interface WorkbenchSidebarFilterSection {
  key: string
  /** 区块标题 */
  title: string
  /** 标题旁说明图标（app 注入 Tooltip） */
  titleHint?: React.ReactNode
  /** 开关/选择类控件（label + control） */
  controls?: { key: string; label: string; control: React.ReactNode }[]
  /** 勾选列表项 */
  list?: { key: string; label: string; icon?: React.ReactNode; checked?: boolean; onToggle?: (checked: boolean) => void }[]
}

export function WorkbenchSidebarFilter({
  sections,
  className,
}: {
  sections: WorkbenchSidebarFilterSection[]
  className?: string
}) {
  return (
    <div className={cn(styles.root, className)}>
      {sections.map((section, idx) => (
        <React.Fragment key={section.key}>
          {idx > 0 ? <div className={styles.divider} /> : null}

          <div className={styles.section}>
            <div className={styles.heading}>
              <p>{section.title}</p>
              {section.titleHint}
            </div>

            {section.controls
              ? section.controls.map((c) => (
                  <div key={c.key} className={styles.filterRow}>
                    <span className={styles.filterLabel}>{c.label}</span>
                    {c.control}
                  </div>
                ))
              : null}

            {section.list ? (
              <ul className={styles.list}>
                {section.list.map((item) => (
                  <li key={item.key} className={styles.listItem}>
                    <label className={styles.listLabel}>
                      {item.icon}
                      {item.label}
                    </label>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={item.checked}
                      onChange={(e) => item.onToggle?.(e.target.checked)}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
