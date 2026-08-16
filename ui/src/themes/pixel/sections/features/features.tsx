'use client';

import { PixelFeatureCard } from '@pxlkit/ui-kit';
import { cn } from '../../../../lib/utils';
import { PixelIcon } from '../../../../components/pixel-icon';
import { ScrollAnimation } from '../../../../components/scroll-animation';
import type { FeaturesProps } from '../../../../contracts/sections/features';

/*
 * Pixel features — chamfered feature card grid. Each item maps onto pxlkit's
 * PixelFeatureCard (icon/title/description), so the section is a real consumer
 * of the ported component library instead of hand-rolled markup. Same contract
 * as features-grid but without the cited-sources footer (kept minimal for the
 * plain features block).
 */
export function Features({ section, className, ...rest }: FeaturesProps) {
  return (
    <section {...rest}
      id={section.id}
      className={cn('bg-background py-16 md:py-24', section.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider md:text-2xl">
              {section.title}
            </h2>
            {section.description ? (
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
                {section.description}
              </p>
            ) : null}
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
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
                  {...(item.description ? { description: item.description } : {})}
                  descriptionLines={2}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </ScrollAnimation>
      </div>
    </section>
  );
}
