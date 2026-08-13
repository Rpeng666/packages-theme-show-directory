'use client';

import { useState } from 'react';

import { cn } from '../../../lib/utils';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { SmartIcon } from '../../../components/smart-icon';
import type { FeaturesAccordionProps } from '../../../contracts/sections/features-accordion';

/**
 * Default (shadcn) features-accordion — simple controlled accordion with a
 * preview image. Kept lightweight; the pixel theme's is the richer retro one.
 */
export function FeaturesAccordion({ section, className }: FeaturesAccordionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = (section.items || []) as Array<{
    title?: string;
    description?: string;
    icon?: string;
    image?: { src?: string; alt?: string };
  }>;
  const active = items[activeIdx];

  return (
    <section
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-10 md:grid-cols-2">
          <ScrollAnimation delay={0.1}>
            <div className="divide-y rounded-xl border">
              {items.map((item, idx) => (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-expanded={activeIdx === idx}
                    className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <SmartIcon name={item.icon} size={16} />}
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        'text-muted-foreground transition-transform',
                        activeIdx === idx && 'rotate-180'
                      )}
                    >
                      ▾
                    </span>
                  </button>
                  {activeIdx === idx && (
                    <p className="px-4 pb-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <div className="overflow-hidden rounded-xl border">
              {active?.image?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.image.src}
                  alt={active.image.alt || active.title || ''}
                  className="size-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center bg-muted">
                  {active?.icon ? <SmartIcon name={active.icon} size={32} /> : null}
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
