'use client'

import { PixelBox } from '@pxlkit/ui-kit'

import { Button } from '../../../themes/pixel/button'
import { PixelIcon } from '../../../components/pixel-icon'
import { cn } from '../../../lib/utils'
import type { CtaLink, CtaProps } from '../../../contracts/sections/cta'

/*
 * Pixel CTA — chamfered retro panel (PixelBox) with pixel display-face
 * buttons. Link is injected (LinkComponent) so the package has no Next
 * dependency; it falls back to a native <a> when omitted.
 */
export function Cta({ section, className, LinkComponent, ...rest }: CtaProps) {
  const Link = LinkComponent ?? defaultLink
  const buttons = section.buttons ?? []

  return (
    <section {...rest}
      id={section.id}
      className={cn('py-10 md:py-14', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <PixelBox
          tone="neutral"
          radius="md"
          padding="none"
          className="border-2 border-foreground/15 bg-retro-gold/20 shadow-md flex flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row md:px-10 md:py-8"
        >
          <div className="text-center md:text-left">
            <h2 className="font-display text-xl font-normal uppercase tracking-wider text-balance md:text-2xl">
              {section.title}
            </h2>
            <p
              className="text-muted-foreground mt-3 text-sm"
              dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {buttons.map((button, idx) => (
              <Button
                asChild
                key={idx}
                size={button.size || 'default'}
                variant={button.variant || 'default'}
                className={cn(
                  'pxl-corner-sm gap-2 rounded-none border-2 shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
                  button.variant === 'outline'
                    ? 'border-foreground/20 bg-background'
                    : 'border-foreground/20 bg-primary text-primary-foreground'
                )}
              >
                <Link href={button.url || ''} target={button.target || '_self'}>
                  {button.icon && (
                    <PixelIcon name={button.icon as string} size={16} />
                  )}
                  <span>{button.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </PixelBox>
      </div>
    </section>
  )
}

const defaultLink: CtaLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
)
