import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface IngredientItem {
  amount?: string;
  unit?: string;
  name: string;
  note?: string;
}

interface IngredientSection {
  section?: string;
  items: (string | IngredientItem)[];
}

interface IngredientsProps {
  items?: (string | IngredientItem)[];
  sections?: IngredientSection[];
  className?: string;
}

function parseItem(raw: string | IngredientItem): IngredientItem {
  if (typeof raw === 'object') return raw;
  return { name: raw };
}

function IngredientRow({ item }: { item: IngredientItem }) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 text-primary/0 transition-colors hover:border-primary hover:text-primary cursor-pointer">
        <CheckIcon className="size-3" />
      </span>
      <span className="text-sm text-foreground leading-relaxed">
        {item.amount && (
          <span className="font-semibold text-primary mr-1">
            {item.amount}{item.unit ? ` ${item.unit}` : ''}
          </span>
        )}
        {item.name}
        {item.note && (
          <span className="ml-1 text-muted-foreground italic">({item.note})</span>
        )}
      </span>
    </li>
  );
}

export function Ingredients({ items, sections, className }: IngredientsProps) {
  const resolvedSections: IngredientSection[] = sections
    ? sections
    : items
    ? [{ items }]
    : [];

  if (resolvedSections.length === 0) return null;

  return (
    <div className={cn('not-prose my-6 rounded-xl border bg-card shadow-sm', className)}>
      <div className="border-b px-5 py-3">
        <h3 className="text-base font-semibold text-foreground">Ingredients</h3>
      </div>
      <div className="px-5 py-4 space-y-6">
        {resolvedSections.map((sec, i) => (
          <div key={i}>
            {sec.section && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {sec.section}
              </p>
            )}
            <ul className="space-y-0">
              {sec.items.map((raw, j) => (
                <IngredientRow key={j} item={parseItem(raw)} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
