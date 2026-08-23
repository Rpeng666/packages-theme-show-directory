'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../../lib/utils'
import { WorkbenchShortcutRow, type WorkbenchShortcut } from './kbd'

/**
 * Raycast workbench keyboard-shortcuts dialog — the compact "Keyboard
 * Shortcuts" popover (ray.so themes page). Data-driven: the app supplies the
 * shortcut list; the dialog chrome + `shift+/` hotkey are self-contained.
 */
export interface WorkbenchKeyboardShortcutsDialogProps {
  /** 快捷键列表 */
  shortcuts?: WorkbenchShortcut[]
  /** 触发按钮文案（默认 "Keyboard Shortcuts"） */
  triggerLabel?: string
  /** 触发按钮图标 */
  triggerIcon?: React.ReactNode
  /** 是否响应 shift+/ 快捷键（默认 true） */
  enableHotkey?: boolean
  /** 触发按钮 className */
  triggerClassName?: string
  className?: string
  /** 透传到触发按钮（注册表会注入 data-registry 标记等） */
  [key: string]: unknown
}

function KeyboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4 6.5h.01M6.5 6.5h.01M9 6.5h.01M11.5 6.5h.01M4 9.5h.01M6.5 9.5h.01M9 9.5h.01M11.5 9.5h.01M5 11.5h6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WorkbenchKeyboardShortcutsDialog({
  shortcuts = [],
  triggerLabel = 'Keyboard Shortcuts',
  triggerIcon,
  enableHotkey = true,
  triggerClassName,
  className,
  ...rest
}: WorkbenchKeyboardShortcutsDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), [])

  React.useEffect(() => {
    if (!enableHotkey) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '?' && e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        toggleOpen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enableHotkey, toggleOpen])

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          {...rest}
          className={cn(
            'inline-flex items-center gap-2 h-[30px] px-3 rounded-md text-sm text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 transition-colors',
            triggerClassName,
          )}
        >
          {triggerIcon ?? <KeyboardIcon />}
          {triggerLabel}
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-black/60 fixed inset-0 z-50 data-[state=open]:animate-overlayShow overflow-y-auto grid place-items-center">
          <DialogPrimitive.Content
            className={cn(
              'grid w-full gap-4 rounded-md bg-panel border border-gray-a3 shadow-md duration-200 data-[state=open]:animate-contentShow sm:rounded-lg my-10 relative max-w-xs p-6',
              className,
            )}
          >
            <DialogPrimitive.Title className="text-base font-medium leading-none text-gray-12">
              {triggerLabel}
            </DialogPrimitive.Title>
            <div className="flex flex-col gap-4">
              {shortcuts.map((s) => (
                <WorkbenchShortcutRow key={String(s.label)} {...s} />
              ))}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
