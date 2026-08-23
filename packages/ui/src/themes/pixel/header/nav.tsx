'use client'

import * as React from 'react'

import { PixelIcon } from '../../../components/pixel-icon'
import type { NavItem } from '../../../types/common'

/*
 * Pixel header nav — client interactivity only.
 *
 * The static markup (top-level links, dropdown trigger buttons AND every
 * dropdown child link) is rendered on the server so it lands in the SSR HTML
 * for SEO; this component adds the click-to-open dropdown state, click-outside
 * and Escape dismissal, and active styling. Dropdown panels are always in the
 * DOM and toggled via `hidden`/`block` (never conditionally mounted), so the
 * links remain crawlable regardless of open state.
 */
export function PixelHeaderNav({ items }: { items: NavItem[] }) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const navRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav ref={navRef} className="hidden md:flex items-center gap-6">
      {items.map((item, idx) => {
        const hasDropdown = item.children && item.children.length > 0
        const isOpen = openMenu === item.title
        return (
          <div key={idx} className="relative">
            {hasDropdown ? (
              <>
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : (item.title ?? ''))}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 px-3 py-1.5 font-mono text-sm cursor-pointer rounded transition-colors ${
                    isOpen
                      ? 'text-retro-cyan bg-retro-cyan/10'
                      : 'text-retro-muted hover:text-retro-text hover:bg-retro-surface/40'
                  }`}
                >
                  {item.icon && <PixelIcon name={item.icon as string} size={14} />}
                  {item.title}
                  <span className="inline-flex transition-transform">
                    <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 shrink-0" shapeRendering="crispEdges" fill="currentColor">
                      <rect x="1" y="2" width="1" height="1" />
                      <rect x="2" y="3" width="1" height="1" />
                      <rect x="3" y="4" width="2" height="1" />
                      <rect x="5" y="3" width="1" height="1" />
                      <rect x="6" y="2" width="1" height="1" />
                    </svg>
                  </span>
                </button>
                {/* Always in the DOM — visibility toggled so links stay in the
                    SSR HTML for crawlers even while the menu is closed. */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-retro-bg border-2 border-retro-border pxl-corner-md p-2 pxl-shadow z-50 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {item.children?.map((subItem, iidx) => (
                    <a
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || '_self'}
                      className="flex items-start gap-3 w-full px-3 py-2.5 rounded-md text-left hover:bg-retro-surface/60 transition-colors group"
                    >
                      <span className="mt-0.5">
                        {subItem.icon && <PixelIcon name={subItem.icon as string} size={18} />}
                      </span>
                      <span>
                        <span className="flex items-center gap-1.5 font-mono text-sm text-retro-text group-hover:text-retro-cyan transition-colors">
                          {subItem.title}
                        </span>
                        {subItem.description && (
                          <span className="block font-mono text-xs text-retro-muted/70 mt-0.5">
                            {subItem.description}
                          </span>
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <a
                href={item.url || ''}
                target={item.target || '_self'}
                className="group flex items-center gap-1.5 font-mono text-sm cursor-pointer text-retro-muted transition-colors hover:text-retro-green"
              >
                {item.icon && <PixelIcon name={item.icon as string} size={14} />}
                <span className="relative">
                  {item.title}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-retro-green transition-all group-hover:w-full" />
                </span>
              </a>
            )}
          </div>
        )
      })}
    </nav>
  )
}
