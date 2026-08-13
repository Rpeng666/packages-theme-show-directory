'use client';

import { cn } from '../../../lib/utils';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { SmartIcon } from '../../../components/smart-icon';
import type { FeaturesProps } from '../../../contracts/sections/features';

/**
 * Default (shadcn) features — simple bordered feature grid. Kept lightweight;
 * the pixel theme's Features is the richer retro rendering.
 */
export function Features({ section, className }: FeaturesProps) {
  return (
    <section
      id={section.id}
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, idx) => (
            <div
              className="rounded-xl border bg-card p-6"
              key={idx}
            >
              <div className="flex items-center gap-2">
                {item.icon && (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-secondary text-secondary-foreground">
                    <SmartIcon name={item.icon as string} size={16} />
                  </span>
                )}
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
