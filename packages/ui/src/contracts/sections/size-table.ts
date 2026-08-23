/**
 * SizeTable — a compact "at a glance" table of image formats → exact pixel
 * dimensions → aspect ratio. Used by the image-size guide pages.
 */
export interface SizeTableRow {
  name: string
  href?: string
  width: number
  height: number
  ratio: string
}

export interface SizeTableProps {
  title?: string
  rows: SizeTableRow[]
  className?: string
}
