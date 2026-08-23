'use client'

import * as React from "react"

import { PixelInput } from "@pxlkit/ui-kit"
import { stripTemplateTokens } from "../../lib/strip-tokens"
import type { InputProps } from "../../contracts/input"

const sizeBySize: Record<string, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

/**
 * Pixel-theme input — adapts the contract onto pxlkit's PixelInput, which has
 * FieldShell (label/hint/error) built in. ReactNode slots are passed through
 * (FieldShell renders them); className template tokens are stripped.
 */
function Input({
  className,
  label,
  hint,
  error,
  size = "md",
  tone,
  prefix,
  suffix,
  icon,
  clearable,
  onClear,
  showCount,
  loading,
  ...props
}: InputProps) {
  return (
    <PixelInput
      label={label as string | undefined}
      hint={hint as string | undefined}
      error={error as string | undefined}
      size={sizeBySize[size]}
      tone={tone}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
      clearable={clearable}
      onClear={onClear}
      showCount={showCount}
      loading={loading}
      className={stripTemplateTokens(className)}
      {...props}
    />
  )
}

export { Input }
