'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import type { ToolsGridProps, ToolGridLink } from '../../../contracts/sections/tools-grid';
import type { SectionItem } from '../../../types/landing';
import { SmartIcon } from '../../../components/smart-icon';

export interface ToolItem extends SectionItem {
  url: string;
}

/**
 * Default (shadcn) tools-grid — simple card grid. Kept lightweight; the pixel
 * theme's ToolsGrid is the richer pxlkit rendering.
 */
export function ToolsGrid({ section, className, LinkComponent, ...rest }: ToolsGridProps) {
  const items = (section.items || []) as ToolItem[];

  return (
    <section {...rest}
      id={section.id || 'tools'}
      className={cn('bg-background py-12 md:py-20', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 text-center">
          {section.label ? (
            <span className="inline-flex rounded-md border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
              {section.label}
            </span>
          ) : null}
          {section.sr_only_title ? (
            <h1 className="text-foreground text-xl font-bold text-balance md:text-2xl">
              {section.sr_only_title}
            </h1>
          ) : null}
          {section.title ? (
            <h2 className="text-foreground mt-3 text-lg font-bold md:text-xl">
              {section.title}
            </h2>
          ) : null}
          {section.description ? (
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <ToolCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ item, LinkComponent }: { item: ToolItem; LinkComponent?: ToolsGridProps['LinkComponent'] }) {
  const Link = LinkComponent ?? defaultLink;
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        {item.icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-secondary text-secondary-foreground">
            <SmartIcon name={item.icon as string} size={18} />
          </span>
        ) : null}
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      {item.description ? (
        <CardContent className="flex-1 pt-0">
          <CardDescription className="text-sm leading-relaxed">
            {item.description}
          </CardDescription>
        </CardContent>
      ) : null}
      <CardContent>
        <Button asChild variant="ghost" size="sm" className="gap-1.5 p-0">
          <Link href={item.url || '#'} target={item.target || '_self'}>
            Open tool
            <span aria-hidden>→</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

const defaultLink: ToolGridLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);
