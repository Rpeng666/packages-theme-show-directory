'use client';

import { PixelTestimonialCard } from '@pxlkit/ui-kit';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { cn } from '../../../lib/utils';
import type { TestimonialsProps } from '../../../contracts/sections/testimonials';

/*
 * Pixel testimonials — chamfered quote cards rendered by the pxlkit
 * PixelTestimonialCard, which ships stars, verified badge, and the retro
 * avatar frame built in. Same data contract as the default testimonials
 * block; Section → Pixel*Props glue here is thin: name/role/quote pass
 * through, and the template's single `image` avatar field maps onto the
 * card's `avatar.src`.
 *
 * The outer container keeps the default's bordered rail look (grid of
 * cards separated by the theme border), but with a 2px pixel border.
 * The pixel surface is injected once at the root by the registry's
 * AmbientProvider — no per-block PxlKitSurfaceProvider here.
 */
export function Testimonials({ section, className }: TestimonialsProps) {
  return (
    <section
      id={section.id}
      className={cn(
        'bg-background py-16 md:py-24',
        section.className,
        className
      )}
    >
      <div className="container">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center text-balance">
            <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider md:text-2xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:mb-12 text-balance">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <div className="border-2 border-foreground/15">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-px">
              {section.items?.map((item, index) => (
                <PixelTestimonialCard
                  key={index}
                  quote={item.quote || item.description || ''}
                  name={item.name || ''}
                  role={item.role || item.title || ''}
                  avatar={
                    item.image?.src
                      ? {
                          src: item.image.src,
                          name: item.name || item.image.alt || '',
                        }
                      : undefined
                  }
                  className="lg:nth-1:rounded-t-none lg:nth-2:rounded-tl-none lg:nth-2:rounded-br-none lg:nth-3:rounded-l-none lg:nth-4:rounded-r-none lg:nth-5:rounded-tl-none lg:nth-5:rounded-br-none lg:nth-6:rounded-b-none"
                />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
