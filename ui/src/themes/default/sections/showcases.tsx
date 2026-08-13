'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';

import { cn } from '../../../lib/utils';
import { SmartIcon } from '../../../components/smart-icon';
import type { ShowcasesProps, ShowcaseLink, ShowcaseImage } from '../../../contracts/sections/showcases';

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
 * Default (shadcn) showcases — filter chips + responsive card grid. Kept
 * lightweight; the pixel theme's is the richer retro rendering. Link/Image
 * are injected by the app.
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

  return (
    <section
      id={section.id || section.name}
      className={cn('py-24 md:py-36', section.className, className)}
    >
      <motion.div
        className="container mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {section.sr_only_title && <h1 className="sr-only">{section.sr_only_title}</h1>}
        <h2 className="mx-auto mb-6 max-w-full text-3xl font-semibold tracking-tight text-pretty md:max-w-5xl md:text-4xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground mx-auto mb-4 max-w-full md:max-w-5xl">
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
          {groups.map((group) => {
            const isSelected = selectedGroup === group.name;
            return (
              <button
                key={group.name}
                type="button"
                onClick={() => setSelectedGroup(group.name)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                )}
              >
                {group.title}
              </button>
            );
          })}
        </motion.div>
      )}

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={item.image?.src ?? ''}
                      alt={item.image?.alt ?? ''}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 line-clamp-1 text-base font-semibold">{item.title}</h3>
                    <p
                      className="text-muted-foreground line-clamp-3 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description ?? '' }}
                    />
                    {item.button && (
                      <div className="mt-4">
                        <a
                          href={item.button.url || ''}
                          target={item.button.target || '_self'}
                          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                          {item.button.icon && (
                            <SmartIcon name={item.button.icon} className="size-4" />
                          )}
                          {item.button.title}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return item.button ? (
              <div key={index}>{cardContent}</div>
            ) : (
              <Link key={index} href={item.url || ''} target={item.target}>
                {cardContent}
              </Link>
            );
          })
        ) : (
          <div className="text-muted-foreground col-span-full text-center">
            No items found in this category.
          </div>
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
