'use client'

import { PixelBox } from '@pxlkit/ui-kit'
import type { BoxProps } from '../../contracts/box'

/**
 * Pixel Box — pxlkit's chamfered surface container (PixelBox).
 */
export function Box({
  tone,
  variant,
  padding,
  radius,
  border,
  shadow,
  as,
  className,
  ...rest
}: BoxProps) {
  return (
    <PixelBox
      tone={tone}
      variant={variant}
      padding={padding}
      radius={radius}
      border={border}
      shadow={shadow}
      as={as}
      className={className}
      {...(rest as object)}
    />
  )
}
