'use client';

import { PixelFeatureCard } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { cn } from '../../../../lib/utils';
import type { FeaturesGridProps } from '../../../../contracts/sections/features-grid';

/*
 * Pixel "Why Choose" — chamfered feature cards on a blueprint grid backdrop.
 * Same data contract as the default features-grid block (icon + title +
 * description per item, optional cited sources), now rendered by the
 * pxlkit PixelFeatureCard so the section is a real consumer of the ported
 * component library instead of hand-rolled chrome.
 *
 * Section → Pixel*Props glue: section.items[] maps onto PixelFeatureCard's
 * icon/title/description; SmartIcon (template's lazy icon resolver) is
 * passed as the icon node; descriptionLines fixed at 2 for even card
 * heights. The pixel surface is injected once at the root by the registry's
 * AmbientProvider — no per-block PxlKitSurfaceProvider here.
 */
export function FeaturesGrid({ section, className }: FeaturesGridProps) {
  return (
    <section
      id={section.id}
      className={cn('relative bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
        <div className="mx-auto max-w-4xl text-center text-balance">
          {section.label ? (
            <span className="pxl-corner-sm border-2 border-foreground/15 bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary-foreground">
              {section.label}
            </span>
          ) : null}
          <h2 className="font-display text-foreground mt-5 text-xl font-normal uppercase tracking-wider text-balance md:text-2xl">
            {section.title}
          </h2>
          {section.description ? (
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          ) : null}
        </div>

        <ul className="grid min-w-0 list-none gap-4 break-words sm:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, idx) => (
            <li key={idx} className="min-w-0 break-words">
              <PixelFeatureCard
                icon={
                  item.icon ? (
                    <PixelIcon name={item.icon as string} size={28} />
                  ) : undefined
                }
                iconSize={56}
                title={item.title ?? ''}
                {...(item.description
                  ? { description: item.description }
                  : {})}
                descriptionLines={2}
                className="h-full"
              />
            </li>
          ))}
        </ul>

        {/* Named sources with outbound links (Citations & Quotations). */}
        {section.sources && section.sources.length > 0 && (
          <ul className="space-y-1 text-xs text-muted-foreground">
            {section.sources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span aria-hidden="true">•</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
