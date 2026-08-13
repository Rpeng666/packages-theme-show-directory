'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '../../../themes/default/button';
import { SmartIcon } from '../../../components/smart-icon';
import { cn } from '../../../lib/utils';
import type { HeroProps, SectionLink, SectionImage } from '../../../contracts/sections/hero';
import type { SectionItem } from '../../../types/landing';

export function Hero({ section, className, LinkComponent, ImageComponent }: HeroProps) {
  const highlightText = section.highlight_text ?? '';
  let texts: string[] | null = null;
  if (highlightText) {
    texts = (section.title?.split(highlightText, 2) ?? [section.title]).filter(
      Boolean
    ) as string[];
  }
  const Link = LinkComponent ?? defaultLink;
  const Img = ImageComponent ?? defaultImage;

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16',
        section.className,
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col items-start text-left">
            {section.label && (
              <div className="border-border bg-accent text-accent-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                {section.label}
              </div>
            )}

            {texts && texts.length > 0 ? (
              <h1 className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                {texts[0]}
                <span className="bg-accent text-accent-foreground rounded-lg px-2 py-0.5">
                  {highlightText}
                </span>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                {section.title}
              </h1>
            )}

            {section.description && (
              <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed text-balance">
                {section.description}
              </p>
            )}

            {section.buttons && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {section.buttons.map((button, idx) => (
                  <Button
                    asChild
                    size={button.size || 'default'}
                    variant={button.variant || 'default'}
                    className={cn('gap-2 px-5 text-sm')}
                    key={idx}
                  >
                    <Link
                      href={button.url ?? ''}
                      target={button.target ?? '_self'}
                    >
                      {button.icon && (
                        <SmartIcon name={button.icon as string} />
                      )}
                      <span>{button.title}</span>
                      {button.variant === 'default' && (
                        <ArrowRight className="size-4" />
                      )}
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {section.features && section.features.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {section.features.map((feature: SectionItem, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-accent text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-xl">
                      {feature.icon && (
                        <SmartIcon name={feature.icon as string} size={18} />
                      )}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">
                        {feature.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: visual */}
          <div className="relative hidden lg:block">
            <div className="bg-muted ring-border relative mx-auto aspect-[4/3] w-full max-w-lg rounded-3xl p-6 shadow-sm ring-1">
              <div className="relative flex h-full flex-col items-center justify-center gap-5">
                <div className="bg-accent flex size-20 items-center justify-center rounded-2xl">
                  <Sparkles
                    className="text-accent-foreground size-10"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="w-3/4 space-y-2.5">
                  <div className="bg-border h-2 w-full rounded-full" />
                  <div className="bg-border h-2 w-5/6 rounded-full" />
                  <div className="bg-border h-2 w-4/6 rounded-full" />
                </div>
                <div className="bg-primary text-primary-foreground absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                  AI Cleaned
                </div>
              </div>
            </div>

            {(section.image?.src || section.image_invert?.src) && (
              <div className="border-border bg-card absolute -bottom-8 -left-8 w-48 rounded-2xl border p-2 shadow-sm">
                <Img
                  className="block w-full rounded-xl"
                  src={section.image?.src || section.image_invert?.src || ''}
                  alt={section.image?.alt || ''}
                  width={200}
                  height={140}
                  loading="lazy"
                  unoptimized={(
                    section.image?.src ||
                    section.image_invert?.src ||
                    ''
                  ).startsWith('http')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {section.background_image?.src && (
        <div className="absolute inset-0 -z-10 hidden h-full w-full overflow-hidden md:block">
          <div className="from-background/80 via-background/80 to-background absolute inset-0 z-10 bg-gradient-to-b" />
          <Img
            src={section.background_image.src}
            alt={section.background_image.alt || ''}
            className="object-cover opacity-40 blur-[0px]"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 0vw, 100vw"
            quality={70}
            unoptimized={section.background_image.src.startsWith('http')}
          />
        </div>
      )}
    </section>
  );
}

/* ── Native fallbacks (no Next dependency in the package) ── */

const defaultLink: SectionLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
)

const defaultImage: SectionImage = (props: any) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img {...props} />
)
