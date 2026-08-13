'use client'

import { PixelIcon } from '../../components/pixel-icon'
import type { FooterProps } from '../../contracts/footer'
import type { NavItem } from '../../types/common'

/*
 * Pixel footer — pxlkit MultiColumn chrome, data-driven with slot injection.
 *
 * - retro top border + surface tint, font-pixel column headings, font-mono
 *   muted links that turn retro-green on hover, chamfered social buttons
 * - navigation columns / copyright / social / agreement render from `footer`
 *   data via native <a> (SEO friendly — a server layout can render it)
 * - brand / external-link badges / locale+theme are injected slots (they bind
 *   app business: BrandLogo, BadgeBar-from-db, LocaleSelector/ThemeToggler)
 */
export function Footer({
  footer,
  brandSlot,
  badgesSlot,
  localeThemeSlot,
  LinkComponent,
  className,
}: FooterProps) {
  const navColumns = footer.nav?.items ?? []
  const Link = LinkComponent ?? defaultLink

  return (
    <footer
      id={footer.id}
      className={`mt-auto border-t-2 border-retro-border/50 bg-retro-surface/30 ${footer.className || ''} ${className || ''} overflow-x-hidden`}
    >
      <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-5 md:gap-12">
          {/* Brand */}
          <div className="min-w-0 space-y-4 break-words md:col-span-2">
            {brandSlot}
            {footer.brand?.description ? (
              <p
                className="font-mono max-w-sm text-sm leading-relaxed text-retro-muted"
                dangerouslySetInnerHTML={{ __html: footer.brand.description }}
              />
            ) : null}
          </div>

          {/* Nav columns */}
          <div className="col-span-3 grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3">
            {navColumns.map((item, idx) => (
              <div key={idx} className="min-w-0 space-y-4 break-words">
                {item.url ? (
                  <Link
                    href={item.url || ''}
                    target={item.target || ''}
                    className="font-pixel block break-words text-xs uppercase tracking-wider text-retro-text transition-colors hover:text-retro-green"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <h3 className="font-pixel block break-words text-xs uppercase tracking-wider text-retro-text">
                    {item.title}
                  </h3>
                )}

                <div className="flex min-w-0 flex-col gap-2.5">
                  {item.children?.map((subItem, iidx) => (
                    <Link
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || ''}
                      className="font-mono break-words text-sm text-retro-muted transition-colors hover:text-retro-green hover:underline underline-offset-2"
                    >
                      {subItem.title || ''}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External-link badges (database) */}
        {badgesSlot ? <div className="mt-10 flex justify-center">{badgesSlot}</div> : null}

        {/* Hairline divider + bottom bar */}
        <div className="mt-10 border-t-2 border-retro-border/30 pt-6">
          <div className="flex min-w-0 flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <div className="flex min-w-0 flex-col items-center gap-2 sm:items-start">
              {footer.copyright ? (
                <p
                  className="font-mono break-words text-xs text-retro-muted/70"
                  dangerouslySetInnerHTML={{ __html: footer.copyright }}
                />
              ) : footer.brand ? (
                <p className="font-mono break-words text-xs text-retro-muted/70">
                  © {new Date().getFullYear()}{' '}
                  <a
                    href={footer.brand.url || ''}
                    target={footer.brand.target || ''}
                    className="text-retro-green transition-colors hover:text-retro-green/80"
                  >
                    {footer.brand.title || ''}
                  </a>
                  , All rights reserved
                </p>
              ) : null}

              {footer.agreement ? (
                <div className="flex min-w-0 flex-wrap items-center justify-center gap-4">
                  {footer.agreement?.items.map((item: NavItem, index: number) => (
                    <Link
                      key={index}
                      href={item.url || ''}
                      target={item.target || ''}
                      className="font-mono break-words text-xs text-retro-muted/70 underline underline-offset-2 transition-colors hover:text-retro-green"
                    >
                      {item.title || ''}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Locale/theme + social */}
            <div className="flex min-w-0 flex-col items-center gap-3 sm:items-end">
              {localeThemeSlot ? (
                <div className="flex min-w-0 items-center gap-3">{localeThemeSlot}</div>
              ) : null}

              {footer.social ? (
                <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
                  {footer.social?.items.map((item: NavItem, index) => (
                    <a
                      key={index}
                      href={item.url || ''}
                      target={item.target || ''}
                      className="bg-retro-surface/40 pxl-corner-sm block cursor-pointer rounded-none border-2 border-retro-border p-2 text-retro-muted transition-all duration-150 hover:-translate-y-0.5 hover:border-retro-green hover:text-retro-green hover:shadow-[0_0_12px_rgba(0,255,136,0.15)]"
                      aria-label={item.title || 'Social media link'}
                    >
                      {item.icon && (
                        <PixelIcon name={item.icon as string} size={18} />
                      )}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function defaultLink({
  href,
  target,
  children,
  className,
}: {
  href: string
  target?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  )
}
