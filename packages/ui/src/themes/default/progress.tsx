'use client';

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";
import type { ProgressProps } from "../../contracts/progress";

/**
 * Default (shadcn) progress — bare Radix bar. Optional label/showValue row
 * rendered only when provided (showValue defaults false to avoid double
 * percentage with app call sites that render their own).
 */
function Progress({
  className,
  value,
  label,
  showValue = false,
  indeterminate,
  tone: _tone,
  ...props
}: ProgressProps) {
  const safe = Math.min(100, Math.max(0, value || 0));

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(label != null || showValue) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          {showValue && <span>{safe}%</span>}
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "bg-primary h-full w-full flex-1 transition-all",
            indeterminate && "animate-pulse"
          )}
          style={
            indeterminate
              ? undefined
              : { transform: `translateX(-${100 - safe}%)` }
          }
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { Progress };
