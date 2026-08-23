'use client'

import { SmartIcon } from '../../../../components/smart-icon'
import { ScrollAnimation } from '../../../../components/scroll-animation'
import { Button } from '../../../../themes/pixel/button'
import { cn } from '../../../../lib/utils'
import type { FeaturesListProps } from '../../../../contracts/sections/features-media'

/*
 * Pixel features-list — headline + image + feature grid, rendered with pxlkit
 * chrome (chamfered image frame, pixel display-face title, hard-bordered
 * feature cells). Image/Link are injected (ImageComponent/LinkComponent) so
 * the package has no Next dependency; they fall back to native <img>/<a>.
 */
export function FeaturesList({
  section,
  className,
  ImageComponent,
  LinkComponent,
}: FeaturesListProps) {
  const Img = ImageComponent ?? defaultImage
  const Link = LinkComponent ?? defaultLink

  return (
    <section
      className={cn(
        'overflow-x-hidden bg-background py-16 md:py-24',
        section.className,
        className
      )}
    >
      <div className="container overflow-x-hidden">
        <div className="flex flex-wrap items-center gap-8 pb-12 md:gap-24">
          <ScrollAnimation direction="left">
            <div className="mx-auto w-full max-w-[500px] flex-shrink-0 md:mx-0">
              <div className="pxl-corner-md border-2 border-foreground/15 bg-muted p-2 shadow-md">
                <Img
                  src={section.image?.src ?? ''}
                  alt={section.image?.alt ?? ''}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>

          <div className="w-full min-w-0 flex-1">
            <ScrollAnimation delay={0.1}>
              <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider break-words text-balance md:text-2xl">
                {section.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed break-words text-balance md:text-base">
                {section.description}
              </p>
            </ScrollAnimation>

            {section.buttons && section.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  {section.buttons?.map((button, idx) => (
                    <Button
                      asChild
                      key={idx}
                      variant={button.variant || 'default'}
                      size={button.size || 'default'}
                    >
                      <Link
                        href={button.url ?? ''}
                        target={button.target ?? '_self'}
                        className={cn(
                          'pxl-corner-sm mt-5 gap-2 rounded-none border-2 px-5 shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
                          button.variant === 'outline'
                            ? 'border-foreground/20 bg-background'
                            : 'border-foreground/20 bg-primary text-primary-foreground'
                        )}
                      >
                        {button.icon && (
                          <SmartIcon name={button.icon as string} size={24} />
                        )}
                        {button.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>

        <ScrollAnimation delay={0.1}>
          <div className="relative grid min-w-0 grid-cols-1 gap-px overflow-hidden border-2 border-foreground/15 bg-foreground/10 break-words pxl-corner-md shadow-md sm:grid-cols-2 sm:gap-px lg:grid-cols-4">
            {section.items?.map((item, idx) => (
              <div className="bg-card min-w-0 space-y-3 break-words p-4" key={idx}>
                <div className="flex min-w-0 items-center gap-2">
                  {item.icon && (
                    <div className="pxl-corner-sm border-2 border-foreground/15 bg-secondary text-secondary-foreground flex size-6 shrink-0 items-center justify-center shadow-sm">
                      <SmartIcon name={item.icon as string} size={12} />
                    </div>
                  )}
                  <h3 className="font-display min-w-0 text-[12px] font-normal uppercase tracking-wider break-words">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground min-w-0 text-sm break-words">
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

function defaultImage(props: any) {
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  return <img {...props} />
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
