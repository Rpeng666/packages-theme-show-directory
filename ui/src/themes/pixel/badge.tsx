'use client'

import * as React from "react";

import { PixelBadge } from "@pxlkit/ui-kit";
import { stripTemplateTokens } from "../../lib/strip-tokens";
import type { BadgeProps, BadgeVariant } from "../../contracts/badge";

/* ── Template → pxlkit vocabulary maps (lookups, not branches) ── */

const toneByVariant: Record<BadgeVariant, "green" | "gold" | "red" | "neutral"> = {
  default: "green",
  secondary: "neutral",
  destructive: "red",
  outline: "neutral",
  solid: "green",
}

const pixelVariantByVariant: Record<BadgeVariant, "solid" | "soft" | "outline" | "ghost"> = {
  default: "solid",
  secondary: "soft",
  destructive: "soft",
  outline: "outline",
  solid: "solid",
}

const sizeBySize: Record<string, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

/**
 * Pixel-theme badge — adapts the contract vocabulary onto pxlkit.
 *
 * `variant="solid"` is the pixel-native escape hatch: `tone`/`size`/`iconLeft`
 * forward to PixelBadge verbatim so workbench call sites (cleaner's live
 * indicator, feature-step's gold step number) keep their exact accents.
 */
function Badge({ className, variant, tone, size, iconLeft, children, ...props }: BadgeProps) {
  const v = variant ?? "default"

  return (
    <PixelBadge
      tone={tone ?? toneByVariant[v]}
      variant={pixelVariantByVariant[v]}
      size={sizeBySize[size ?? "md"]}
      iconLeft={iconLeft}
      className={stripTemplateTokens(className)}
      {...props}
    >
      {children}
    </PixelBadge>
  )
}

export { Badge }
