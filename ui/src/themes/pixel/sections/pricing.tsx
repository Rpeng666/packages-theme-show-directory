'use client';

import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';

import {
  PixelPricingCard,
  PixelTable,
} from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../components/pixel-icon';
import { Badge } from '../../../themes/pixel/badge';
import { Button } from '../../../themes/pixel/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/select';
import { Tabs, TabsList, TabsTrigger } from '../../../components/tabs';
import { cn } from '../../../lib/utils';
import type { PricingProps } from '../../../contracts/sections/pricing';
import type { PricingItem } from '../../../types/pricing';

/*
 * Pixel pricing — pure presentational layer. Business logic (payment, auth,
 * i18n, currency persistence) lives in the app's usePricing hook; this
 * component receives the results as props and renders the pxlkit
 * PixelPricingCard grid.
 *
 * The pixel surface is injected once at the root by the registry's
 * AmbientProvider — no per-block PxlKitSurfaceProvider here.
 */
export function Pricing({
  section,
  className,
  currentProductId,
  isLoading,
  productId,
  itemCurrencies,
  handleCurrencyChange,
  onPayment,
  paymentModal,
  tCurrentPlan,
  tProcessing,
}: PricingProps) {
  const [group, setGroup] = useState(() => {
    // find current pricing item
    const currentItem = section.items?.find(
      (i) => i.product_id === currentProductId
    );

    // First look for a group with is_featured set to true
    const featuredGroup = section.groups?.find((g) => g.is_featured);
    // If no featured group exists, fall back to the first group
    return (
      currentItem?.group || featuredGroup?.name || section.groups?.[0]?.name
    );
  });

  // Plans in the active group — used both for the cards grid and the
  // feature-comparison table below.
  const groupItems = useMemo(
    () =>
      section.items?.filter((item) => !item.group || item.group === group) ?? [],
    [section.items, group]
  );

  // Derive the comparison table from the active group's plans: one column per
  // plan, one row per feature name across all plans, cell = included?.
  const compareRows = useMemo(() => {
    if (groupItems.length < 2) return [];
    const planKeys = groupItems.map((p) => p.product_id || p.title);
    const featureSet: string[] = [];
    groupItems.forEach((p) => {
      (p.features ?? []).forEach((f) => {
        if (f && !featureSet.includes(f)) featureSet.push(f);
      });
    });
    return featureSet.map((feature) => {
      const row: Record<string, string | boolean> = { feature };
      groupItems.forEach((p, i) => {
        const key = planKeys[i]!;
        row[key] = (p.features ?? []).includes(feature);
      });
      return row;
    });
  }, [groupItems]);

  const compareColumns = useMemo(() => {
    if (groupItems.length < 2) return [];
    return [
      {
        key: 'feature',
        header: 'Feature',
        render: (row: Record<string, string | boolean>) => (
          <span className="text-retro-text/80 text-xs sm:text-sm">
            {String(row.feature)}
          </span>
        ),
      },
      ...groupItems.map((p) => ({
        key: p.product_id || p.title || '',
        header: (
          <span className="font-display text-[10px] uppercase tracking-wider text-retro-text">
            {p.title}
          </span>
        ),
        align: 'center' as const,
        render: (row: Record<string, string | boolean>) => {
          const v = row[p.product_id || p.title || ''];
          return typeof v === 'string' ? (
            <span className="text-retro-text/70 text-xs font-medium">{v}</span>
          ) : v ? (
            <PixelCheck className="mx-auto size-3.5 text-retro-green" />
          ) : (
            <PixelX className="mx-auto size-3 text-retro-muted/30" />
          );
        },
      })),
    ];
  }, [groupItems]);

  return (
    <section
      id={section.id}
      className={cn('bg-background py-24 md:py-36', section.className, className)}
    >
      <div className="mx-auto mb-12 px-4 text-center md:px-8">
        {section.sr_only_title && (
          <h1 className="sr-only">{section.sr_only_title}</h1>
        )}
        <h2 className="font-display mb-6 text-xl font-normal uppercase tracking-wider text-pretty lg:text-2xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground mx-auto mb-4 max-w-xl text-sm leading-relaxed lg:max-w-none lg:text-base">
          {section.description}
        </p>
      </div>

      <div className="container">
        {section.groups && section.groups.length > 0 && (
          <div className="mx-auto mt-8 mb-16 flex w-full justify-center md:max-w-lg">
            <Tabs value={group} onValueChange={setGroup} className="">
              <TabsList className="border-2 border-foreground/15 bg-card pxl-corner-md gap-1 rounded-none p-1 shadow-sm">
                {section.groups.map((item, i) => {
                  return (
                    <TabsTrigger
                      key={i}
                      value={item.name || ''}
                      className="font-display rounded-none text-[11px] font-normal uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                    >
                      {item.title}
                      {item.label && (
                        <Badge className="pxl-corner-sm ml-2 rounded-none border-2 border-foreground/15 bg-secondary text-secondary-foreground shadow-sm">
                          {item.label}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        )}

        <div
          className={`mx-auto mt-0 grid w-full gap-6 md:grid-cols-${groupItems.length}`}
        >
          {groupItems.map((item: PricingItem, idx) => {

            let isCurrentPlan = false;
            if (currentProductId && currentProductId === item.product_id) {
              isCurrentPlan = true;
            }

            // Get currency state for this item
            const currencyState = itemCurrencies[item.product_id];
            const displayedItem = currencyState?.displayedItem || item;
            const selectedCurrency =
              currencyState?.selectedCurrency || item.currency;
            const currencies = item.currencies?.length
              ? [{ currency: item.currency, amount: item.amount, price: item.price || '', original_price: item.original_price || '' }, ...item.currencies]
              : [{ currency: item.currency, amount: item.amount, price: item.price || '', original_price: item.original_price || '' }];

            return (
              <PixelPricingCard
                key={idx}
                name={item.title || ''}
                description={item.description}
                descriptionLines={2}
                price={{
                  amount: displayedItem.price || '',
                  period: displayedItem.unit || undefined,
                  strikethrough: displayedItem.original_price || undefined,
                }}
                priceBadge={
                  currencies.length > 1 ? (
                    <Select
                      value={selectedCurrency}
                      onValueChange={(currency) =>
                        handleCurrencyChange(item.product_id, currency)
                      }
                    >
                      <SelectTrigger
                        size="sm"
                        className="border-foreground/20 bg-background/50 h-6 min-w-[60px] rounded-none px-2 text-xs"
                      >
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.currency}
                            value={currency.currency}
                            className="text-xs"
                          >
                            {currency.currency.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : undefined
                }
                popular={
                  item.label
                    ? { label: item.label, tone: 'gold' }
                    : undefined
                }
                highlight={item.is_featured}
                features={[
                  ...(item.features_title
                    ? [
                        {
                          label: item.features_title,
                          included: true,
                          highlight: true,
                        },
                      ]
                    : []),
                  ...(item.features ?? []).map((feature) => ({ label: feature })),
                ]}
                footer={item.tip || undefined}
                cta={
                  isCurrentPlan ? (
                    <Button
                      variant="outline"
                      className="pxl-corner-sm h-9 w-full rounded-none border-2 border-foreground/20 bg-background px-4 py-2 shadow-sm"
                      disabled
                    >
                      <span className="font-display hidden text-[11px] font-normal uppercase tracking-wider md:block">
                        {tCurrentPlan}
                      </span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onPayment(item)}
                      disabled={isLoading}
                      className={cn(
                        'pxl-corner-sm focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-none border-2 border-foreground/20 text-sm font-normal whitespace-nowrap transition-all focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                        'h-9 w-full px-4 py-2',
                        'bg-primary text-primary-foreground shadow-md hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
                      )}
                    >
                      {isLoading && item.product_id === productId ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span className="font-display block text-[11px] font-normal uppercase tracking-wider">
                            {tProcessing}
                          </span>
                        </>
                      ) : (
                        <>
                          {item.button?.icon && (
                            <PixelIcon
                              name={item.button?.icon as string}
                              size={16}
                            />
                          )}
                          <span className="font-display block text-[11px] font-normal uppercase tracking-wider">
                            {item.button?.title}
                          </span>
                        </>
                      )}
                    </Button>
                  )
                }
              />
            );
          })}
        </div>

        {/* Feature comparison table (derived from active group's plans) */}
        {compareColumns.length > 1 && (
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-display mb-8 text-center text-lg font-normal uppercase tracking-wider text-retro-text">
              <span className="text-retro-cyan">COMPARE</span> PLANS
            </h2>
            <div className="border-2 border-retro-border/40 bg-retro-surface/20 pxl-corner-md overflow-x-auto p-3 shadow-md">
              <PixelTable
                data={compareRows}
                columns={compareColumns}
                striped
              />
            </div>
          </div>
        )}
      </div>

      {paymentModal}
    </section>
  );
}

/* ─── Pixel check / x icons (inline, retro) ─── */
function PixelCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className ?? 'size-3.5'} shapeRendering="crispEdges" fill="currentColor">
      <rect x="6" y="1" width="1" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="4" y="3" width="1" height="1" />
      <rect x="3" y="4" width="1" height="1" />
      <rect x="2" y="5" width="1" height="1" />
      <rect x="1" y="4" width="1" height="1" />
    </svg>
  );
}

function PixelX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className ?? 'size-3'} shapeRendering="crispEdges" fill="currentColor">
      <rect x="1" y="1" width="1" height="1" />
      <rect x="6" y="1" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="3" y="3" width="2" height="2" />
      <rect x="2" y="5" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
      <rect x="1" y="6" width="1" height="1" />
      <rect x="6" y="6" width="1" height="1" />
    </svg>
  );
}
