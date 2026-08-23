'use client'

import * as React from 'react'
import { cn } from '../../../lib/utils'

/**
 * Raycast workbench header — the ray.so-style fixed top bar.
 *
 * Data-driven: the app computes the active segment / back state (Next routing
 * hooks stay in the app) and passes them in; links carry `icon` ReactNodes so
 * the app injects its own SVG assets. `LinkComponent` is injected so the
 * package has no Next dependency — falls back to a native <a>.
 *
 * The dropdown is a lightweight self-contained implementation (click-outside
 * + Escape dismissal), so the theme carries no extra deps beyond react/cn.
 */
export interface WorkbenchHeaderLink {
  href: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface WorkbenchHeaderProps {
  links?: WorkbenchHeaderLink[]
  /** 当前激活链接（app 用 useSelectedLayoutSegments 计算） */
  activeHref?: string
  /** 是否显示返回按钮（app 按路由深度计算） */
  showBack?: boolean
  /** 返回按钮目标 */
  backHref?: string
  /** 左侧品牌槽位（app 注入 "by Raycast" 等） */
  brandSlot?: React.ReactNode
  /** 链接渲染注入（app 传 next/link），默认原生 <a> */
  LinkComponent?: React.ComponentType<{
    href: string
    className?: string
    'aria-label'?: string
    'aria-disabled'?: boolean
    tabIndex?: number
    onClick?: () => void
    children: React.ReactNode
  }>
  className?: string
  /** 透传到根 <nav>（注册表会注入 data-registry 标记等） */
  [key: string]: unknown
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * WorkbenchHeader — 工作台顶部 header。
 * 结构与 ray.so 的 Navigation 一致：返回按钮 + 工具下拉 + 品牌槽位。
 */
export function WorkbenchHeader({
  links = [],
  activeHref,
  showBack = false,
  backHref = '/',
  brandSlot,
  LinkComponent,
  className,
  ...rest
}: WorkbenchHeaderProps) {
  const Link = LinkComponent ?? defaultLink
  const [open, setOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  const active = links.find((l) => l.href === activeHref) ?? links[0]

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      {...rest}
      className={cn('flex items-center gap-3 h-[50px] pl-4 pr-5 bg-gray-2 text-white w-full fixed z-10', className)}
    >
      <div
        className={cn(
          'flex items-center gap-3 transition-transform ease-in-out',
          showBack ? 'translate-x-0' : '-translate-x-10',
        )}
      >
        <Link
          href={backHref}
          aria-label="Home"
          aria-disabled={!showBack}
          tabIndex={showBack ? 0 : -1}
          className={cn(
            'inline-flex items-center justify-center rounded-full w-6 h-6 bg-gray-4 hover:bg-gray-5 text-gray-12',
            showBack ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
          )}
        >
          <ChevronLeftIcon />
        </Link>

        {/* 工具下拉 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={cn(
              'flex items-center gap-2 py-1 pl-1 pr-2 rounded-md text-gray-12 transition-colors',
              open ? 'bg-gray-4' : 'hover:bg-gray-4',
            )}
          >
            {active?.icon}
            <span className="text-[15px] font-medium">{active?.label}</span>
            <ChevronDownIcon />
          </button>

          {open ? (
            <div className="absolute left-0 top-full mt-1 z-50 min-w-[280px] rounded-md border border-gray-4 bg-panel p-2 shadow-lg flex flex-col gap-1.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex gap-3 items-center pl-[10px] pr-6 py-2 rounded-md transition-colors group',
                    link.href === activeHref ? 'bg-gray-4' : 'hover:bg-gray-a2',
                  )}
                >
                  {link.icon}
                  <span className="flex flex-col leading-none gap-1">
                    <span className="text-[15px] font-medium text-gray-12">{link.label}</span>
                    {link.description ? (
                      <span className="text-[13px] text-gray-9 group-hover:text-gray-10">{link.description}</span>
                    ) : null}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {brandSlot}
      </div>
    </nav>
  )
}

/**
 * WorkbenchActions — 固定在 header 右侧的操作区（导出/格式化等按钮）。
 * 对应 ray.so 的 NavigationActions。
 */
export function WorkbenchActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-[275px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function defaultLink({
  href,
  className,
  'aria-label': ariaLabel,
  'aria-disabled': ariaDisabled,
  tabIndex,
  onClick,
  children,
}: {
  href: string
  className?: string
  'aria-label'?: string
  'aria-disabled'?: boolean
  tabIndex?: number
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <a href={href} className={className} aria-label={ariaLabel} aria-disabled={ariaDisabled} tabIndex={tabIndex} onClick={onClick}>
      {children}
    </a>
  )
}
