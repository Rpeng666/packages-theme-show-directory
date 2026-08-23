import * as React from 'react'
import { cn } from '../../../lib/utils'

/**
 * Raycast workbench Kbd — keyboard key cap (ray.so style).
 *
 * Split out of WorkbenchInfoDialog so any dialog / table / row can render key
 * caps without pulling in the whole info dialog. Mirrors the app's
 * `@/components/kbd` (Kbd / Kbds / Shortcut) with no app dependency.
 */
export function WorkbenchKbd({
  children,
  size = 'small',
  className,
  ...rest
}: {
  children: React.ReactNode
  size?: 'small' | 'medium'
  className?: string
  /** 透传到 <kbd>（注册表会注入 data-registry 标记等） */
  [key: string]: unknown
}) {
  return (
    <kbd
      {...rest}
      className={cn(
        'inline-flex items-center justify-center px-2 font-medium bg-gray-a4 tracking-[0.1px] font-sans w-auto text-gray-a10',
        size === 'small' && 'h-[18px] px-1 text-[10px] rounded-[3px] min-w-[18px]',
        size === 'medium' && 'h-[28px] px-2 text-xs rounded-md min-w-[28px]',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

/**
 * Kbd cluster — right-aligned key caps (used in rows: label … ⌘ K).
 */
export function WorkbenchKbds({ children, className, ...rest }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return <div {...rest} className={cn('ml-auto inline-flex gap-1 pl-4', className)}>{children}</div>
}

/**
 * Shortcut row — label + key cluster.
 */
export interface WorkbenchShortcut {
  label: React.ReactNode
  keys: string[]
}

export function WorkbenchShortcutRow({ label, keys, ...rest }: WorkbenchShortcut & { [key: string]: unknown }) {
  return (
    <div {...rest} className="flex justify-between items-center">
      <div className="text-gray-11 text-[13px]">{label}</div>
      <WorkbenchKbds>
        {keys.map((key) => (
          <WorkbenchKbd key={key} size="medium">
            {key}
          </WorkbenchKbd>
        ))}
      </WorkbenchKbds>
    </div>
  )
}
