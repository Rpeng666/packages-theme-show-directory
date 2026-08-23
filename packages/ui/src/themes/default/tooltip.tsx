'use client';

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";
import type { TooltipProps } from "../../contracts/tooltip";

/**
 * Default (shadcn) tooltip — self-contained Radix tooltip. Wraps the single
 * trigger child via asChild and renders the content in a portal. `trigger`
 * only supports hover/focus (Radix native); 'click' falls back to hover.
 */
function Tooltip({
  content,
  children,
  side = "top",
  trigger: _trigger,
  open,
  defaultOpen,
  onOpenChange,
  delay,
  sideOffset = 0,
  className,
}: TooltipProps) {
  const delayDuration = typeof delay === "number" ? delay : delay?.open;

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration ?? 200}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className={cn(
              "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip };
