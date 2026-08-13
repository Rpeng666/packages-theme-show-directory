'use client'

import * as React from "react"

import { cn } from "../../lib/utils"
import type { SkeletonProps } from "../../contracts/skeleton"

/**
 * Default (shadcn) skeleton — the template implementation. Pixel-agnostic.
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
