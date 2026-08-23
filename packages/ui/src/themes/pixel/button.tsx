'use client'

import * as React from "react"

import { PixelButton } from "@pxlkit/ui-kit"
import { stripTemplateTokens } from "../../lib/strip-tokens"
import type {
  ButtonProps,
  ButtonVariant,
  PixelButtonVariant,
} from "../../contracts/button"

/* ── Template → pxlkit vocabulary maps (lookups, not branches) ── */

const toneByVariant: Record<ButtonVariant, "green" | "red" | "neutral"> = {
  default: "green",
  destructive: "red",
  outline: "neutral",
  secondary: "neutral",
  ghost: "neutral",
  link: "neutral",
}

const pixelVariantByVariant: Record<ButtonVariant, "solid" | "outline" | "ghost"> = {
  default: "solid",
  destructive: "solid",
  outline: "outline",
  secondary: "solid",
  ghost: "ghost",
  link: "ghost",
}

const sizeBySize: Record<string, "sm" | "md" | "lg"> = {
  default: "md",
  sm: "sm",
  md: "md",
  lg: "lg",
  icon: "md",
  "icon-sm": "sm",
}

/**
 * Pixel-theme button — adapts the contract vocabulary onto pxlkit.
 *
 * Two entry points:
 * - shadcn words (`variant="default|outline|ghost|…"`) → mapped via the lookups above
 * - pixel-native words (`variant="solid"` + `tone`) → forwarded to PixelButton
 *   verbatim, so workbench call sites (cleaner toolbar, etc.) keep their
 *   exact accent colors.
 */
function Button({
  className,
  variant,
  size,
  tone,
  asChild = false,
  loading,
  iconLeft,
  iconRight,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  const v = variant ?? "default"
  const s = size ?? "default"

  const isPixelVariant = v === "solid" || v === "ghost" || v === "outline"
  const pixelVariant = (isPixelVariant ? v : pixelVariantByVariant[v as ButtonVariant]) as PixelButtonVariant

  return (
    <PixelButton
      tone={tone ?? toneByVariant[v as ButtonVariant]}
      variant={pixelVariant}
      size={sizeBySize[s]}
      asChild={asChild}
      loading={loading}
      iconLeft={iconLeft}
      iconRight={iconRight}
      fullWidth={fullWidth}
      className={stripTemplateTokens(className)}
      {...props}
    >
      {children}
    </PixelButton>
  )
}

export { Button }
