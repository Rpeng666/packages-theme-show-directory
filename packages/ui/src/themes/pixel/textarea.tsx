'use client'

import * as React from "react"

import { PixelTextarea } from "@pxlkit/ui-kit"
import { stripTemplateTokens } from "../../lib/strip-tokens"
import type { TextareaProps } from "../../contracts/textarea"

/**
 * Pixel-theme textarea — adapts the contract onto pxlkit's PixelTextarea
 * (FieldShell + autosize built in).
 */
function Textarea({
  className,
  label,
  hint,
  error,
  tone,
  autosize,
  minRows,
  maxRows,
  showCount,
  ...props
}: TextareaProps) {
  return (
    <PixelTextarea
      label={label as string | undefined}
      hint={hint as string | undefined}
      error={error as string | undefined}
      tone={tone}
      autosize={autosize}
      minRows={minRows}
      maxRows={maxRows}
      showCount={showCount}
      className={stripTemplateTokens(className)}
      {...props}
    />
  )
}

export { Textarea }
