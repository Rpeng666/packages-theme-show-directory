'use client';

import { SmartIcon } from '../../../components/smart-icon';
import { Button } from '../../../themes/default/button';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { cn } from '../../../lib/utils';
import type { CtaLink, CtaProps } from '../../../contracts/sections/cta';

/*
 * Default (shadcn) CTA — rounded card with title/description + buttons.
 * Link is injected (LinkComponent) so the package has no Next dependency; it
 * falls back to a native <a> when omitted.
 */
export function Cta({ section, className, LinkComponent, ...rest }: CtaProps) {
  const Link = LinkComponent ?? defaultLink;

  return (
    <section
      {...rest}
      id={section.id}
      className={cn('py-10 md:py-14', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="border-border text-foreground flex flex-col items-center justify-between gap-6 rounded-3xl border bg-secondary px-6 py-8 shadow-sm md:flex-row md:px-10 md:py-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              {section.title}
            </h2>
            <p
              className="text-muted-foreground mt-1 text-sm"
              dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {section.buttons?.map((button, idx) => (
              <Button
                asChild
                size={button.size || 'default'}
                variant={button.variant || 'default'}
                className="gap-2 px-5 text-sm"
                key={idx}
              >
                <Link href={button.url || ''} target={button.target || '_self'}>
                  {button.icon && (
                    <SmartIcon name={button.icon as string} className="size-4" />
                  )}
                  {button.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultLink: CtaLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);
