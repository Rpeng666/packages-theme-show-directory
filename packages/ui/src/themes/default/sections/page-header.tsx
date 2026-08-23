 'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';

import { cn } from '../../../lib/utils';
import { Button } from '../button';
import { ConsoleLink, useConsoleBridge } from '../../../components/console/bridge';
import { SmartIcon } from '../../../components/smart-icon';
import type { PageHeaderProps } from '../../../contracts/sections/page-header';

function buildQuery(current: string, name: string, value: string): string {
  const params = new URLSearchParams(current);
  if (value) params.set(name, value);
  else params.delete(name);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Default (shadcn) PageHeader - fallback rendering of the console page
 * header. Kept lightweight; the semi theme is the reference implementation.
 */
export function PageHeader({
  title,
  description,
  crumbs,
  actions,
  tabs,
  search,
  filters,
  className = '',
}: PageHeaderProps) {
  const { routerPush, pathname, searchParams } = useConsoleBridge();
  const [keyword, setKeyword] = useState(search?.value || '');

  const activeTab = useMemo(() => {
    if (!tabs?.length) return undefined;
    const direct = tabs.find((tab) => tab.is_active);
    if (direct) return direct;
    return tabs.find((tab) => tab.url && pathname && pathname.startsWith(tab.url));
  }, [tabs, pathname]);

  const submitSearch = () => {
    if (!search || !routerPush) return;
    if (keyword === (search.value || '')) return;
    routerPush(buildQuery(searchParams || '', search.name, keyword));
  };

  return (
    <div className={cn('mb-8 flex flex-col gap-6', className)}>
      {crumbs && crumbs.length > 0 ? (
        <nav className="text-muted-foreground flex items-center gap-1 text-sm">
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.url && !crumb.is_active ? (
                <ConsoleLink
                  href={crumb.url}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.title}
                </ConsoleLink>
              ) : (
                <span className="text-foreground font-medium">{crumb.title}</span>
              )}
              {idx < crumbs.length - 1 ? (
                <span className="text-muted-foreground/40">/</span>
              ) : null}
            </React.Fragment>
          ))}
        </nav>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          {title ? (
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        {actions && actions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {actions.map((action, idx) => {
              const icon =
                typeof action.icon === 'string' ? (
                  <SmartIcon name={action.icon} className="size-3.5" />
                ) : (
                  action.icon
                );
              const button = (
                <Button
                  key={idx}
                  variant={action.variant}
                  size={action.size === 'lg' ? 'default' : 'sm'}
                  onClick={action.onClick}
                  className="inline-flex items-center gap-2"
                >
                  {icon}
                  {action.title}
                </Button>
              );
              return action.url ? (
                <ConsoleLink
                  key={idx}
                  href={action.url}
                  target={action.target || '_self'}
                >
                  {button}
                </ConsoleLink>
              ) : (
                button
              );
            })}
          </div>
        ) : null}
      </div>

      {tabs?.length || search || (filters && filters.length > 0) ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-2">
          {tabs && tabs.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1">
              {tabs.map((tab) => {
                const active = activeTab === tab || activeTab?.name === tab.name;
                return (
                  <button
                    key={tab.name || tab.title || String(tab)}
                    type="button"
                    onClick={() => tab.url && routerPush?.(tab.url)}
                    className={cn(
                      'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                    )}
                  >
                    {tab.title}
                  </button>
                );
              })}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            {search ? (
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                placeholder={search.placeholder || search.title}
                className="h-9 w-56 rounded-md border bg-background px-3 text-sm outline-none ring-ring focus-visible:ring-2"
              />
            ) : null}
            {filters?.map((filter) => (
              <select
                key={filter.name}
                value={filter.value || ''}
                onChange={(e) =>
                  routerPush?.(
                    buildQuery(searchParams || '', filter.name, e.target.value),
                  )
                }
                className="h-9 rounded-md border bg-background px-2 text-sm outline-none ring-ring focus-visible:ring-2"
              >
                <option value="">{filter.title}</option>
                {filter.options
                  ?.filter((option) => option.value && option.value !== '')
                  .map((option) => (
                    <option key={option.value} value={option.value as string}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
