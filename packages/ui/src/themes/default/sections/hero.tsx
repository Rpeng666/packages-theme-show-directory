'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '../../../themes/default/button';
import { SmartIcon } from '../../../components/smart-icon';
import { cn } from '../../../lib/utils';
import type { HeroProps, SectionLink, SectionImage } from '../../../contracts/sections/hero';
import type { SectionItem } from '../../../types/landing';

/**
 * Default Hero — restrained editor style.
 *
 * Left: eyebrow + headline (highlight in a soft mark), description, dual
 * CTA, feature row. Right: a real "app window" mock (window chrome with
 * traffic lights + a small chart card) instead of a placeholder box.
 */

const FEATURE_TONES: Record<string, string> = {
  blue: 'bg-blue/10 text-blue',
  green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  purple: 'bg-purple/10 text-purple',
  gold: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

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
              <div className="border-border bg-card mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {section.label}
              </div>
            )}

            {texts && texts.length > 0 ? (
              <h1 className="text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                {texts[0]}
                <span className="text-primary">{highlightText}</span>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
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
                    className={cn('gap-2 px-5 text-sm', button.variant === 'default' && 'group')}
                    key={idx}
                  >
                    <Link
                      href={button.url ?? ''}
                      target={button.target ?? '_self'}
                    >
                      <span>{button.title}</span>
                      {button.variant === 'default' && (
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {section.features && section.features.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                {section.features.map((feature: SectionItem, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg',
                        FEATURE_TONES[feature.tone as string] ??
                          'bg-primary/10 text-primary'
                      )}
                    >
                      {feature.icon && (
                        <SmartIcon name={feature.icon as string} size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium">
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

          {/* Right: app-window mockup */}
          <div className="relative hidden lg:block">
            <div className="border-border bg-card relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border shadow-sm">
              {/* window chrome */}
              <div className="border-border flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 h-4 flex-1 rounded-md bg-muted" />
              </div>
              {/* body: chart card + stat chips */}
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Output size</p>
                    <p className="text-foreground font-mono text-xl font-semibold">
                      980 KB
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    −79%
                  </span>
                </div>
                {/* bars */}
                <div className="flex h-24 items-end gap-2">
                  {[40, 65, 50, 80, 60, 90, 70, 100, 55, 75, 62, 88].map(
                    (h, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex-1 rounded-t-md',
                          i === 7
                            ? 'bg-primary'
                            : 'bg-muted-foreground/20'
                        )}
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
                  <span className="text-xs font-medium text-foreground">
                    Download compressed
                  </span>
                  <span className="text-xs text-muted-foreground">JPG · 80%</span>
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
