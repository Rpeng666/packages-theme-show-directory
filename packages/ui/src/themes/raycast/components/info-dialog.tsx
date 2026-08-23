'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../../lib/utils'
import { WorkbenchShortcutRow, type WorkbenchShortcut } from './kbd'

export type { WorkbenchShortcut } from './kbd'

/**
 * Raycast workbench info dialog — the "About + Shortcuts" dialog shared by
 * every ray.so tool page (Code Images / Icon Maker / Prompts / Presets /
 * Quicklinks / Snippets / Themes / iOS Icons).
 *
 * Data-driven: the app supplies the About paragraphs (`description`), the
 * shortcut list (`shortcuts`) and the footer slot (`footerSlot` — the theme's
 * own WorkbenchFooter or the app's SocialFooter). The dialog chrome (overlay,
 * panel, close button) and the `shift+/` hotkey are self-contained so the
 * package carries no app dependency (radix dialog + inline SVG icons only).
 */
export interface WorkbenchInfoDialogProps {
  /** About 标题（默认 "About"） */
  title?: string
  /** About 描述段落（ReactNode，可含链接） */
  description?: React.ReactNode
  /** 快捷键列表（右侧栏） */
  shortcuts?: WorkbenchShortcut[]
  /** 底部 footer 槽位（app 注入 SocialFooter / WorkbenchFooter） */
  footerSlot?: React.ReactNode
  /** 触发按钮文案（默认 "About"） */
  triggerLabel?: string
  /** 触发按钮图标（默认内联 Info SVG） */
  triggerIcon?: React.ReactNode
  /** 是否响应 shift+/ 快捷键打开（默认 true） */
  enableHotkey?: boolean
  /** 触发按钮 className */
  triggerClassName?: string
  className?: string
  /** 透传到触发按钮（注册表会注入 data-registry 标记等） */
  [key: string]: unknown
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM8 7v4.5M8 4.75v.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WorkbenchInfoDialog({
  title = 'About',
  description,
  shortcuts = [],
  footerSlot,
  triggerLabel = 'About',
  triggerIcon,
  enableHotkey = true,
  triggerClassName,
  className,
  ...rest
}: WorkbenchInfoDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), [])

  // shift+/ — self-contained hotkey (no hotkeys-js dependency).
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
            'hidden md:inline-flex items-center gap-2 h-[30px] px-3 rounded-md text-sm text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 transition-colors',
            triggerClassName,
          )}
        >
          {triggerIcon ?? <InfoIcon />}
          {triggerLabel}
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="bg-black/60 fixed inset-0 z-50 data-[state=open]:animate-overlayShow overflow-y-auto grid place-items-center"
        >
          <DialogPrimitive.Content
            className={cn(
              'grid w-full gap-4 rounded-md bg-panel border border-gray-a3 shadow-md duration-200 data-[state=open]:animate-contentShow sm:rounded-lg my-10 relative max-w-3xl p-6',
              className,
            )}
          >
            <div className="flex gap-8">
              <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
                <DialogPrimitive.Title className="text-base font-medium leading-none text-gray-12">
                  {title}
                </DialogPrimitive.Title>
                {description}
                {footerSlot}
              </div>

              {shortcuts.length > 0 ? (
                <>
                  <div className="w-px h-full bg-gray-a3" />
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-medium -mt-[3px]">Shortcuts</h2>
                    <div className="flex flex-col gap-4">
                      {shortcuts.map((s) => (
                        <WorkbenchShortcutRow key={String(s.label)} {...s} />
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-panel transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close"
            >
              <CloseIcon />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
