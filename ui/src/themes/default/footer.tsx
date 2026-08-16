'use client'

import { cn } from '../../lib/utils'
import type { FooterProps } from '../../contracts/footer'
import type { NavItem } from '../../types/common'

/*
 * Default theme footer — shadcn visual language, FooterProps contract.
 *
 * Data-driven navigation columns / copyright / social / agreement (native
 * <a href>), business slots injected: `brandSlot` (brand logo), `badgesSlot`
 * (external-link badge bar from the database), `localeThemeSlot` (locale +
 * theme togglers).
 */
export function Footer({ footer,
  brandSlot,
  badgesSlot,
  localeThemeSlot,
  LinkComponent,
  className, ...rest }: FooterProps) {
  const navColumns = footer.nav?.items ?? []
  const Link = LinkComponent ?? defaultLink

  return (
    <footer {...rest}
      id={footer.id}
      className={`py-6 sm:py-8 ${footer.className || ''} ${className || ''} overflow-x-hidden`}
    >
      <div className="container space-y-6 overflow-x-hidden sm:space-y-8">
        <div className="grid min-w-0 gap-8 md:grid-cols-5 md:gap-12">
          <div className="min-w-0 space-y-4 break-words md:col-span-2 md:space-y-6">
            {brandSlot}
            {footer.brand?.description ? (
              <p
                className="text-muted-foreground text-center text-sm break-words text-balance sm:text-left"
                dangerouslySetInnerHTML={{ __html: footer.brand.description }}
              />
            ) : null}
          </div>

          <div className="col-span-3 grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {navColumns.map((item, idx) => (
              <div key={idx} className="min-w-0 space-y-4 break-words text-sm">
                {item.url ? (
                  <Link
                    href={item.url || ''}
                    target={item.target || ''}
                    className="hover:text-primary block break-words font-medium duration-150"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="block break-words font-medium">
                    {item.title}
                  </span>
                )}

                <div className="flex min-w-0 flex-col gap-2 sm:gap-3">
                  {item.children?.map((subItem, iidx) => (
                    <Link
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || ''}
                      className="text-muted-foreground hover:text-primary block break-words duration-150"
                    >
                      {subItem.title || ''}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {badgesSlot ? <div className="flex justify-center">{badgesSlot}</div> : null}

        <div className="flex min-w-0 items-center justify-center gap-4 sm:justify-end sm:gap-8">
          {localeThemeSlot}
        </div>

        <div aria-hidden className="bg-border h-0.5 min-w-0" />

        <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-8">
          {footer.copyright ? (
            <p
              className="text-muted-foreground text-sm break-words text-balance"
              dangerouslySetInnerHTML={{ __html: footer.copyright }}
            />
          ) : footer.brand ? (
            <p className="text-muted-foreground text-sm break-words text-balance">
              © {new Date().getFullYear()}{' '}
              <a
                href={footer.brand.url || ''}
                target={footer.brand.target || ''}
                className="text-primary hover:text-primary/80"
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
                  className="text-muted-foreground hover:text-primary block break-words text-xs underline duration-150"
                >
                  {item.title || ''}
                </Link>
              ))}
            </div>
          ) : null}

          {footer.social ? (
            <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
              {footer.social?.items.map((item: NavItem, index) => (
                <a
                  key={index}
                  href={item.url || ''}
                  target={item.target || ''}
                  className="bg-secondary pxl-corner-sm block cursor-pointer rounded-none border-2 border-foreground/10 p-2 text-muted-foreground shadow-sm duration-150 hover:-translate-y-0.5 hover:text-foreground"
                  aria-label={item.title || 'Social media link'}
                >
                  {item.icon && <span className="text-sm">{item.title}</span>}
                </a>
              ))}
            </div>
          ) : null}
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
    <a href={href} target={target} className={cn(className)}>
      {children}
    </a>
  )
}
