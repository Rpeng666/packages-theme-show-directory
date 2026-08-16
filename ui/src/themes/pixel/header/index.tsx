import { PixelIcon } from '../../../components/pixel-icon'
import { PixelHeaderNav } from './nav'
import type { HeaderProps } from '../../../contracts/header'

/*
 * Pixel theme header — SERVER component.
 *
 * Everything that should be in the SSR HTML (for SEO) is rendered here as
 * static markup: brand slot, nav links (delegated to the client PixelHeaderNav
 * which renders real <a> links that get server-rendered), business slots, and
 * CTA buttons as plain <a> links with retro classes. The only client parts
 * are the injected business slots (theme toggler / locale / sign) and
 * PixelHeaderNav's dropdown open/close state — the dropdown panels stay in the
 * DOM (visibility toggled) so their links remain crawlable.
 */
export function Header({
  nav,
  brandSlot,
  actions,
  business,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header
      {...rest}
      className={`relative flex h-16 items-center justify-between border-b border-retro-border px-6 ${className ?? ''}`}
    >
      {/* Left: brand */}
      <div className="flex items-center gap-2.5">{brandSlot}</div>

      {/* Center: desktop nav (client interactivity, server-rendered links) */}
      <PixelHeaderNav items={nav ?? []} />

      {/* Right: business slots + CTA actions */}
      <div className="flex items-center gap-3">
        {business}
        {actions?.map((action, idx) => {
          const isOutline = action.variant === 'outline'
          return (
            <a
              key={idx}
              href={action.url || ''}
              target={action.target || '_self'}
              className={`inline-flex items-center justify-center gap-1.5 border-2 font-mono pxl-corner-sm px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                isOutline
                  ? 'border-retro-border bg-transparent text-retro-text hover:bg-retro-surface/40'
                  : 'border-retro-green/30 bg-retro-green/18 text-retro-green hover:bg-retro-green/25 pxl-shadow'
              }`}
            >
              {action.icon && (
                <PixelIcon name={action.icon as string} size={14} />
              )}
              {action.title}
            </a>
          )
        })}
      </div>
    </header>
  )
}
