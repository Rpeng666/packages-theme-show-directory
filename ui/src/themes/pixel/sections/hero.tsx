'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

import { PixelHeroSection } from '@pxlkit/ui-kit';
import { Button } from '../../../themes/pixel/button';
import { PixelIcon } from '../../../components/pixel-icon';
import { cn } from '../../../lib/utils';
import type { HeroProps, SectionLink, SectionImage } from '../../../contracts/sections/hero';
import type { SectionItem } from '../../../types/landing';
import type { Button as ButtonType } from '../../../types/common';

/*
 * Pixel generic hero — rendered by the pxlkit PixelHeroSection (split
 * layout: headline/subline/CTAs left, media right) inside the retro backdrop
 * (blueprint grid + scanlines + optional background image).
 *
 * Section → Pixel*Props glue: label → eyebrow, title → headline, description
 * → subline, buttons[0]/[1] → primaryCta/secondaCta, features → the meta
 * trust row, and the mockup + section.image compose the `media` slot.
 *
 * Link/Image are injected (LinkComponent/ImageComponent) so the package has
 * no Next dependency; they fall back to native <a>/<img> when omitted.
 *
 * The pixel surface is injected once at the root by the registry's
 * AmbientProvider — no per-block PxlKitSurfaceProvider here.
 */
export function Hero({ section, className, LinkComponent, ImageComponent }: HeroProps) {
  const buttons = section.buttons ?? [];
  const Link = LinkComponent ?? defaultLink;
  const Img = ImageComponent ?? defaultImage;

  const renderCta = (button?: ButtonType, primary = false) => {
    if (!button) return undefined;
    return (
      <Button
        asChild
        size={button.size || 'default'}
        variant={button.variant || 'default'}
        className={cn(
          'pxl-corner-sm gap-2 rounded-none border-2 px-5 text-sm shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
          primary
            ? 'border-foreground/20 bg-primary text-primary-foreground'
            : 'border-foreground/20 bg-background'
        )}
      >
        <Link href={button.url ?? ''} target={button.target ?? '_self'}>
          {button.icon && <PixelIcon name={button.icon as string} />}
          <span>{button.title}</span>
          {primary && <ArrowRight className="size-4" />}
        </Link>
      </Button>
    );
  };

  const meta = section.features?.length ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {section.features.map((feature: SectionItem, idx: number) => (
        <div key={idx} className="flex items-start gap-3">
          <div className="pxl-corner-sm border-2 border-foreground/15 bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center shadow-sm">
            {feature.icon && (
              <PixelIcon name={feature.icon as string} size={18} />
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
  ) : undefined;

  const media = (
    <div className="relative">
      <div className="border-2 border-foreground/15 bg-muted pxl-corner-md relative mx-auto aspect-[4/3] w-full max-w-lg p-6 shadow-md">
        <div className="relative flex h-full flex-col items-center justify-center gap-5">
          <div className="border-2 border-foreground/20 bg-accent text-accent-foreground pxl-corner-sm flex size-20 items-center justify-center shadow-sm">
            <Sparkles className="size-10" strokeWidth={1.5} />
          </div>
          <div className="w-3/4 space-y-2.5">
            <div className="bg-foreground/15 h-2 w-full" />
            <div className="bg-foreground/15 h-2 w-5/6" />
            <div className="bg-foreground/15 h-2 w-4/6" />
          </div>
          <div className="pxl-corner-sm border-2 border-foreground/20 bg-primary text-primary-foreground absolute top-6 right-6 px-3 py-1 font-display text-[10px] font-normal uppercase tracking-wider shadow-sm">
            AI Cleaned
          </div>
        </div>
      </div>

      {(section.image?.src || section.image_invert?.src) && (
        <div className="border-2 border-foreground/15 bg-card pxl-corner-sm absolute -bottom-8 -left-8 w-48 p-2 shadow-md">
          <Img
            className="block w-full"
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
  );

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden bg-background pt-24 pb-12 md:pt-32 md:pb-16',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />

      {section.background_image?.src && (
        <div className="absolute inset-0 -z-10 hidden h-full w-full overflow-hidden md:block">
          <div className="from-background/80 via-background/80 to-background absolute inset-0 z-10 bg-gradient-to-b" />
          <Img
            src={section.background_image.src}
            alt={section.background_image.alt || ''}
            className="object-cover opacity-40"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 0vw, 100vw"
            quality={70}
            unoptimized={section.background_image.src.startsWith('http')}
          />
        </div>
      )}

      <PixelHeroSection
        variant="split"
        eyebrow={section.label}
        headline={section.title ?? ''}
        subline={section.description}
        primaryCta={renderCta(buttons[0], true)}
        secondaryCta={renderCta(buttons[1])}
        meta={meta}
        media={media}
        density="compact"
        minHeight="sm"
        className="relative"
      />
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
