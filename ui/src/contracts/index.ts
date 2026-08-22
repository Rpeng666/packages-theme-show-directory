/**
 * Component contracts — the semantic vocabulary both themes implement.
 *
 * Each contract is pure types only (no runtime deps): the props interface +
 * the semantic variant/size words. This is the layer you reuse across themes —
 * not the visual implementation.
 */
export type { ButtonProps, ButtonVariant, ButtonSize } from './button'
export type { BadgeProps, BadgeVariant } from './badge'
export type { CardProps, CardBadge } from './card'
export type { SkeletonProps } from './skeleton'
export type { FieldTone, FieldSize } from './field'
export type { InputProps } from './input'
export type { TextareaProps } from './textarea'
export type { SwitchProps } from './switch'
export type { ProgressProps } from './progress'
export type { TooltipProps } from './tooltip'
export type { InputNumberProps } from './input-number'
export type { SliderProps } from './slider'
export type { TagProps } from './tag'
export type { TabsProps, TabsItem } from './tabs'
export type { EmptyProps } from './empty'
export type { SpinProps } from './spin'
export type { StepsProps, StepsItem, StepStatus } from './steps'
export type { TableProps, TableColumn } from './table'
export type { DescriptionsProps, DescriptionsItem } from './descriptions'
export type { BannerProps } from './banner'
export type { LayoutShellProps } from './layout-shell'
export type { NavigationItem, NavigationProps } from './navigation'
export type { ImageProps } from './image'
export type { ColorPickerProps } from './color-picker'
export type { CollapsePanelItem, CollapseProps } from './collapse'
export type { ListGrid, ListProps } from './list'
export type { CarouselProps } from './carousel'
export type { TimelineItem, TimelineProps } from './timeline'
export type { CopyTextProps } from './copy-text'
export type {
  ConsoleLayoutProps,
  ConsoleLayoutBrand,
  ConsoleLayoutNavGroup,
  ConsoleLayoutNavItem,
} from './pages'

