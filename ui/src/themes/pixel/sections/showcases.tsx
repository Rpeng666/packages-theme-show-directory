'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';

import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import type { ShowcasesProps, ShowcaseLink, ShowcaseImage } from '../../../contracts/sections/showcases';
import { useThemeComponent } from '../../../context';

interface ShowcaseItem {
  title?: string;
  description?: string;
  url?: string;
  target?: string;
  group?: string;
  image?: { src?: string; alt?: string };
  button?: { title?: string; url?: string; target?: string; icon?: string };
}

interface ShowcaseGroup {
  name: string;
  title: string;
}

/**
 * Pixel showcases — chamfered showcase cards with category filter chips.
 * Stateless: filtering is internal (selected group), but rendering deps
 * (Link, Image) are injected by the app so the package has no Next/next-intl
 * dependency. Motion + registered primitives only — no hand-rolled markup.
 */
export function Showcases({ section, className, LinkComponent, ImageComponent }: ShowcasesProps) {
  const groups = (section.groups as ShowcaseGroup[]) || [];
  const items = (section.items as ShowcaseItem[]) || [];

  const [selectedGroup, setSelectedGroup] = useState<string>(
    groups.length > 0 ? groups[0].name : ''
  );

  const filteredItems = useMemo(() => {
    if (!selectedGroup || !groups.length) return items;
    if (selectedGroup === 'all') return items;
    return items.filter((item) => item.group === selectedGroup);
  }, [items, selectedGroup, groups.length]);

  const Link = (LinkComponent ?? defaultLink) as ShowcaseLink;
  const Image = (ImageComponent ?? defaultImage) as ShowcaseImage;

  const Button = useThemeComponent('Button');

  return (
    <section
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
        {section.sr_only_title && <h1 className="sr-only">{section.sr_only_title}</h1>}
        <h2 className="font-display mx-auto mb-6 max-w-full text-xl font-normal uppercase tracking-wider text-pretty md:max-w-5xl md:text-2xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground text-md mx-auto mb-4 max-w-full md:max-w-5xl">
          {section.description}
        </p>
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

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const hasButton = !!item.button;
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="border-2 border-foreground/15 bg-card pxl-corner-md overflow-hidden shadow-md transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
                  <motion.div
                    className="relative aspect-16/10 w-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image?.src ?? ''}
                      alt={item.image?.alt ?? ''}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="object-cover transition-transform duration-300"
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="font-display mb-2 line-clamp-1 text-[13px] font-normal uppercase tracking-wider text-balance">
                      {item.title}
                    </h3>
                    <p
                      className="text-muted-foreground line-clamp-3 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description ?? '' }}
                    />
                    {hasButton && (
                      <div className="mt-4">
                        <Button
                          asChild
                          variant={(item.button as any).variant || 'default'}
                          size={(item.button as any).size || 'sm'}
                          className="pxl-corner-sm w-full rounded-none border-2 border-foreground/20 bg-primary text-primary-foreground shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                          <Link
                            href={item.button?.url || ''}
                            target={item.button?.target || '_self'}
                          >
                            {item.button?.icon && (
                              <PixelIcon name={item.button.icon} className="size-4" />
                            )}
                            {item.button?.title}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return hasButton ? (
              <div key={index}>{cardContent}</div>
            ) : (
              <Link key={index} href={item.url || ''} target={item.target}>
                {cardContent}
              </Link>
            );
          })
        ) : (
          <motion.div
            className="text-muted-foreground col-span-full text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            No items found in this category.
          </motion.div>
        )}
      </div>
    </section>
  );
}

const defaultLink: ShowcaseLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);

const defaultImage: ShowcaseImage = ({ src, alt, className, fill, sizes }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    className={className}
    style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : undefined}
    loading="lazy"
  />
);
