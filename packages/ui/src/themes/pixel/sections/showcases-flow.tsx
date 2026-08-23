'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { PixelIcon } from '../../../components/pixel-icon';
import { useThemeComponent } from '../../../context';
import { cn } from '../../../lib/utils';
import type {
  ShowcasesFlowProps,
  ShowcasesFlowLink,
  ShowcasesFlowImage,
} from '../../../contracts/sections/showcases-flow';

interface ShowcasesFlowItem {
  title?: string;
  description?: string;
  url?: string;
  target?: string;
  group?: string;
  image?: { src?: string; alt?: string };
  button?: { title?: string; url?: string; target?: string; icon?: string; variant?: string; size?: string };
}

interface ShowcasesFlowGroup {
  name: string;
  title: string;
}

/*
 * Pixel showcases-flow — masonry gallery with category filter + lightbox.
 * Same data contract and interaction as the app showcases-flow block, with
 * chamfered tiles and a chamfered lightbox frame. Rendering deps (Link,
 * Image) are injected by the app so the package has no Next/next-intl
 * dependency; falls back to native <a>/<img> when omitted.
 */
export function ShowcasesFlow({ section,
  className,
  LinkComponent,
  ImageComponent, ...rest }: ShowcasesFlowProps) {
  const groups = (section.groups as ShowcasesFlowGroup[]) || [];
  const items = (section.items as ShowcasesFlowItem[]) || [];

  const [selectedGroup, setSelectedGroup] = useState<string>(
    groups.length > 0 ? groups[0].name : ''
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    if (!selectedGroup || !groups.length) return items;
    if (selectedGroup === 'all') return items;
    return items.filter((item) => item.group === selectedGroup);
  }, [items, selectedGroup, groups.length]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? prev === 0
          ? (filteredItems.length ?? 1) - 1
          : prev - 1
        : null
    );
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? prev === (filteredItems.length ?? 1) - 1
          ? 0
          : prev + 1
        : null
    );
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevious, handleNext]);

  const Link = (LinkComponent ?? defaultLink) as ShowcasesFlowLink;
  const Image = (ImageComponent ?? defaultImage) as ShowcasesFlowImage;
  const Button = useThemeComponent('Button');

  return (
    <section {...rest}
      id={section.id || section.name}
      className={cn('bg-background py-24 md:py-36', section.className, className)}
    >
      <motion.div
        className="container mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {section.sr_only_title && (
          <h1 className="sr-only">{section.sr_only_title}</h1>
        )}
        <h2 className="font-display mx-auto mb-6 max-w-full text-xl font-normal uppercase tracking-wider text-pretty md:max-w-5xl md:text-2xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground text-md mx-auto mb-4 line-clamp-3 max-w-full md:max-w-5xl">
          {section.description}
        </p>
        {section.buttons && section.buttons.length > 0 && (
          <div className="container mx-auto mt-8 mb-12 flex flex-wrap justify-center gap-4">
            {section.buttons.map((button) => (
              <Button
                key={button.title}
                variant={(button.variant as any) || 'default'}
                size={(button.size as any) || 'sm'}
                asChild
                className={cn(
                  'pxl-corner-sm rounded-none border-2 border-foreground/20 shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
                  button.variant === 'outline'
                    ? 'bg-background'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <Link href={button.url || ''} target={button.target || '_self'}>
                  {button.icon && (
                    <PixelIcon name={button.icon as string} className="size-4" />
                  )}
                  {button.title}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </motion.div>

      {groups.length > 0 && (
        <motion.div
          className="container mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {groups.map((group, index) => {
            const isSelected = selectedGroup === group.name;
            return (
              <motion.button
                key={group.name}
                type="button"
                onClick={() => setSelectedGroup(group.name)}
                className={cn(
                  'pxl-corner-sm cursor-pointer rounded-none border-2 px-4 py-1.5 font-display text-[11px] font-normal uppercase tracking-wider transition-all',
                  isSelected
                    ? 'border-foreground/20 bg-primary text-primary-foreground shadow-sm'
                    : 'border-foreground/15 bg-card text-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:shadow-sm'
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {group.title}
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {filteredItems.length > 0 ? (
        <div className="container mx-auto columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className="group relative cursor-zoom-in break-inside-avoid overflow-hidden border-2 border-foreground/15 pxl-corner-sm shadow-sm"
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={item.image?.src ?? ''}
                alt={item.image?.alt ?? ''}
                className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="mb-2 translate-y-4 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
                  {item.title}
                </h3>
                {item.button && (
                  <div
                    className="mt-3 translate-y-4 transition-transform delay-100 duration-300 group-hover:translate-y-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      asChild
                      variant={(item.button.variant as any) || 'default'}
                      size={(item.button.size as any) || 'sm'}
                      className="pxl-corner-sm h-8 w-full rounded-none border-2 border-white/25 bg-primary text-primary-foreground text-sm font-normal shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                    >
                      <Link
                        href={item.button.url || ''}
                        target={item.button.target || '_self'}
                      >
                        {item.button.icon && (
                          <PixelIcon
                            name={item.button.icon}
                            className="size-4"
                          />
                        )}
                        {item.button.title}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-muted-foreground container text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          No items found in this category.
        </motion.div>
      )}

      <AnimatePresence>
        {selectedIndex !== null && filteredItems && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-50 text-white/70 transition-colors hover:text-white"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="size-8" />
            </button>

            <button
              type="button"
              className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/70 transition-colors hover:bg-black/40 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="size-8 md:size-12" />
            </button>

            <button
              type="button"
              className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/70 transition-colors hover:bg-black/40 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="size-8 md:size-12" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative flex h-full w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pxl-corner-md border-2 border-white/25 relative max-h-full max-w-full overflow-hidden bg-black shadow-md">
                <Image
                  src={filteredItems[selectedIndex].image?.src ?? ''}
                  alt={filteredItems[selectedIndex].image?.alt ?? ''}
                  className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
                />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
                  <h3 className="font-display mb-2 text-base font-normal uppercase tracking-wider">
                    {filteredItems[selectedIndex].title}
                  </h3>
                  {filteredItems[selectedIndex].description && (
                    <p className="line-clamp-3 text-base text-white/90">
                      {filteredItems[selectedIndex].description}
                    </p>
                  )}
                  {filteredItems[selectedIndex].button && (
                    <div className="mt-4">
                      <Button
                        asChild
                        variant={
                          (filteredItems[selectedIndex].button?.variant as any) || 'default'
                        }
                        size={
                          (filteredItems[selectedIndex].button?.size as any) || 'default'
                        }
                        className="pxl-corner-sm rounded-none border-2 border-white/25 bg-primary text-primary-foreground shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                      >
                        <Link
                          href={filteredItems[selectedIndex].button?.url || ''}
                          target={filteredItems[selectedIndex].button?.target || '_self'}
                        >
                          {filteredItems[selectedIndex].button?.icon && (
                            <PixelIcon
                              name={filteredItems[selectedIndex].button?.icon}
                              className="size-4"
                            />
                          )}
                          {filteredItems[selectedIndex].button?.title}
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const defaultLink: ShowcasesFlowLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);

const defaultImage: ShowcasesFlowImage = ({ src, alt, className, sizes }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} className={className} loading="lazy" sizes={sizes} />
);
