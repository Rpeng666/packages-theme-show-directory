'use client'

import * as React from "react";

import { cn } from "../../lib/utils";
import type { CardProps } from "../../contracts/card";

/**
 * Default (shadcn) card — flat contract + composite sub-component support.
 *
 * The flat `Card` renders the optional title/description/footer slots and
 * passes `children` into the body, so both styles of consumption work:
 *   <Card title="..." description="...">body</Card>          (flat)
 *   <Card><CardHeader><CardTitle>…</CardTitle></CardHeader>  (composite)
 *
 * The composite sub-components below are layout primitives with a weak theme
 * identity — they always come from the default theme (see the compat layer in
 * src/shared/components/ui/card.tsx). Only the flat `<Card>` root resolves
 * through the registry.
 */

function Card({ className, title, description, icon, footer, children, ...props }: CardProps) {
  const hasTitle = title !== undefined || description !== undefined || icon !== undefined;

  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border border-border py-6 shadow-xs",
        className
      )}
      {...props}
    >
      {hasTitle && (
        <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
          {icon}
          {title !== undefined && (
            <div data-slot="card-title" className="leading-none font-semibold">
              {title}
            </div>
          )}
          {description !== undefined && (
            <div data-slot="card-description" className="text-muted-foreground text-sm">
              {description}
            </div>
          )}
        </div>
      )}
      <div data-slot="card-content" className="px-6">
        {children}
      </div>
      {footer !== undefined && (
        <div data-slot="card-footer" className="flex items-center px-6 [.border-t]:pt-6">
          {footer}
        </div>
      )}
    </div>
  );
}

/* ── Composite sub-components (kept for ~17 composition call sites) ── */

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
