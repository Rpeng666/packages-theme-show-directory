'use client'

import {
  PixelCluster,
  PixelDivider,
  PixelGrid,
  PixelStack,
} from '@pxlkit/ui-kit'
import type { StackProps, ClusterProps, GridProps, DividerProps } from '../../contracts/layout'

/** Pixel Stack — pxlkit PixelStack. */
export function Stack(props: StackProps) {
  const { direction, gap, align, justify, wrap, inline, ...rest } = props
  return (
    <PixelStack
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      inline={inline}
      {...(rest as object)}
    />
  )
}

/** Pixel Cluster — pxlkit PixelCluster. */
export function Cluster(props: ClusterProps) {
  const { gap, align, justify, ...rest } = props
  return (
    <PixelCluster
      gap={gap}
      align={align}
      justify={justify}
      {...(rest as object)}
    />
  )
}

/** Pixel Grid — pxlkit PixelGrid. */
export function Grid(props: GridProps) {
  const { cols, gap, ...rest } = props
  return (
    <PixelGrid
      cols={cols as never}
      gap={gap}
      {...(rest as object)}
    />
  )
}

/** Pixel Divider — pxlkit PixelDivider. */
export function Divider({ label, spacing, className }: DividerProps) {
  return (
    <PixelDivider
      label={label}
      spacing={spacing}
      className={className}
    />
  )
}
