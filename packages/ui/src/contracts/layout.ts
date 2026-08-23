import type * as React from 'react'

/**
 * Stack contract — vertical/horizontal flex stack. pixel → PixelStack,
 * default → flex div.
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'col' | 'row'
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  inline?: boolean
}

/**
 * Cluster contract — inline-flex wrap group with gap. pixel → PixelCluster,
 * default → flex div.
 */
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

/**
 * Grid contract — CSS grid. pixel → PixelGrid, default → grid div.
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number }
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
}

/**
 * Divider contract — horizontal rule. pixel → PixelDivider, default → hr.
 */
export interface DividerProps {
  label?: string
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}
