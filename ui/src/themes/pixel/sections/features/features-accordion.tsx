'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '../../../../lib/utils';
import { ScrollAnimation } from '../../../../components/scroll-animation';
import { SmartIcon } from '../../../../components/smart-icon';
import type { FeaturesAccordionProps } from '../../../../contracts/sections/features-accordion';

/**
 * Pixel features-accordion — chamfered accordion panel beside a preview frame.
 * Controlled: the app's active item drives both the open accordion row AND the
 * preview image swap. Uses registered primitives (ScrollAnimation, SmartIcon);
 * the image renders via a plain <img> (the package has no Next dependency).
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
      className={cn(
        'overflow-x-hidden bg-background py-16 md:py-24',
        section.className,
        className
      )}
    >
      <div className="container space-y-8 overflow-x-hidden px-2 sm:px-6 md:space-y-16 lg:space-y-20">
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <h2 className="font-display text-foreground text-xl font-normal uppercase tracking-wider md:text-2xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid min-w-0 gap-12 sm:px-6 md:grid-cols-2 lg:gap-20 lg:px-0">
          <ScrollAnimation delay={0.1} direction="left">
            <div className="border-2 border-foreground/15 bg-muted/40 pxl-corner-md w-full p-2 shadow-md">
              {items.map((item, idx) => {
                const open = activeIdx === idx;
                return (
                  <div
                    key={idx}
                    className={cn(
                      'border-b-2 border-foreground/10 last:border-b-0',
                      open && 'border-foreground/20'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      aria-expanded={open}
                      className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-3 font-display text-[13px] font-normal uppercase tracking-wider hover:no-underline"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <SmartIcon name={item.icon} size={16} />
                        )}
                        {item.title}
                      </span>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground"
                      >
                        <svg viewBox="0 0 8 8" className="h-2 w-2 shrink-0" shapeRendering="crispEdges" fill="currentColor" aria-hidden>
                          <rect x="1" y="3" width="6" height="1" />
                          <rect x="3" y="1" width="1" height="6" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-3 pb-3 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2} direction="right">
            <div className="relative flex min-w-0 flex-shrink overflow-hidden border-2 border-foreground/15 bg-card pxl-corner-md p-2 shadow-md">
              <div className="absolute inset-0 right-0 ml-auto w-15 border-l border-dashed border-foreground/15"></div>
              <div className="relative aspect-76/59 w-full min-w-0 sm:w-[calc(3/4*100%+3rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeIdx}-id`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="pxl-corner-sm size-full overflow-hidden border-2 border-foreground/10 shadow-sm"
                  >
                    {active?.image?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={active.image.src}
                        alt={active.image.alt || active.title || ''}
                        className="size-full object-cover object-left-top dark:mix-blend-lighten"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted">
                        {active?.icon ? (
                          <SmartIcon name={active.icon} size={24} />
                        ) : null}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
