'use client'

import { PxlKitIcon, type IconAppearance, type PxlKitData } from '@pxlkit/core'
// Curated static imports — only the icons the pixel theme actually renders.
// This keeps the 144-icon library out of the shared chunk (same lesson as the
// smart-icon-ri whitelist: dynamic import would hoist the whole pack back into
// the eager graph).
import {
  ArrowRight,
  Check,
  Close,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Gear,
  Grid,
  History,
  Home,
  List,
  Lock,
  Menu,
  Package,
  Palette,
  Pencil,
  Play,
  Pause,
  Redo,
  Robot,
  Search,
  Settings,
  Trash,
  Undo,
  Upload,
  Clock,
  Calendar,
  PaintBucket,
  Eyedropper,
  Eraser,
  SparkleSmall,
  DotsMenu,
  CloudSync,
  Hand,
  Line,
  Rectangle,
  Selection,
} from '@pxlkit/ui'
import {
  Trophy,
  Star,
  Heart,
  Lightning,
  Gem,
  Crown,
  Shield,
} from '@pxlkit/gamification'
import { Sun, Moon } from '@pxlkit/weather'

/**
 * Curated pxlkit icon registry — kebab-case name → PxlKitData.
 * Icon names follow pxlkit's kebab-case (e.g. 'check', 'trophy'), a separate
 * namespace from SmartIcon's lucide/ri names. Add icons here as the pixel
 * theme needs them.
 */
const registry: Record<string, PxlKitData> = {
  'arrow-right': ArrowRight,
  check: Check,
  close: Close,
  copy: Copy,
  download: Download,
  edit: Edit,
  'external-link': ExternalLink,
  gear: Gear,
  grid: Grid,
  history: History,
  home: Home,
  list: List,
  lock: Lock,
  menu: Menu,
  package: Package,
  palette: Palette,
  pencil: Pencil,
  play: Play,
  pause: Pause,
  redo: Redo,
  robot: Robot,
  search: Search,
  settings: Settings,
  trash: Trash,
  undo: Undo,
  upload: Upload,
  clock: Clock,
  calendar: Calendar,
  'paint-bucket': PaintBucket,
  eyedropper: Eyedropper,
  eraser: Eraser,
  sparkles: SparkleSmall,
  'dots-menu': DotsMenu,
  'cloud-sync': CloudSync,
  hand: Hand,
  line: Line,
  rectangle: Rectangle,
  selection: Selection,
  // gamification
  trophy: Trophy,
  star: Star,
  heart: Heart,
  lightning: Lightning,
  gem: Gem,
  crown: Crown,
  shield: Shield,
  // weather
  sun: Sun,
  moon: Moon,
}

/**
 * lucide 大写名 → pxlkit kebab 名。section 数据的 icon 字段用的是 lucide
 * 命名空间（'ArrowUpRight'/'Settings'…），pixel 主题经此映射到 pxlkit 图标。
 * 未知名返回 undefined → PixelIcon 渲染兜底。
 */
const lucideToPixel: Record<string, string> = {
  ArrowRight: 'arrow-right',
  Check: 'check',
  X: 'close',
  Copy: 'copy',
  Download: 'download',
  Pencil: 'pencil',
  ExternalLink: 'external-link',
  Settings: 'settings',
  Grid: 'grid',
  History: 'history',
  Home: 'home',
  List: 'list',
  Lock: 'lock',
  Menu: 'menu',
  Package: 'package',
  Palette: 'palette',
  Play: 'play',
  Pause: 'pause',
  Redo: 'redo',
  Robot: 'robot',
  Search: 'search',
  Trash: 'trash',
  Undo: 'undo',
  Upload: 'upload',
  Clock: 'clock',
  Calendar: 'calendar',
  PaintBucket: 'paint-bucket',
  Eyedropper: 'eyedropper',
  Trophy: 'trophy',
  Star: 'star',
  Heart: 'heart',
  Zap: 'lightning',
  Gem: 'gem',
  Crown: 'crown',
  Shield: 'shield',
  // ri 名 → pxlkit 像素图标。有语义对应就映射；无对应则留空 → 渲染兜底。
  RiAddLine: 'star',
  RiDeleteBinLine: 'trash',
  RiEditLine: 'pencil',
  RiEyeLine: 'search',
  RiLockPasswordLine: 'lock',
  RiRefreshLine: 'redo',
  RiFileReduceLine: 'arrow-right',
  RiShieldCheckLine: 'shield',
  RiCpuLine: 'robot',
  RiTimeLine: 'clock',
  RiFileTextLine: 'list',
  RiMagicLine: 'star',
  RiSearchLine: 'search',
  RiTaskLine: 'check',
  RiUserSmileLine: 'star',
  RiClipboardLine: 'list',
  RiExpandWidthLine: 'arrow-right',
  RiKeyLine: 'lock',
  RiMailLine: 'list',
  RiCheckDoubleLine: 'check',
  RiBookOpenLine: 'list',
  RiArticleLine: 'list',
  RiFlashlightFill: 'star',
  RiVoiceprintLine: 'search',
  RiSearchEyeLine: 'search',
  RiQuestionLine: 'star',
}

/** 未收录的 icon 名 → 兜底像素图标（通用星形块，避免空白） */
const FALLBACK_ICON: PxlKitData | undefined = Star

export interface PixelIconProps {
  /** lucide 大写名 或 pxlkit kebab 名 */
  name: string
  size?: number
  appearance?: IconAppearance
  /** solid 模式需要显式 color（<img> 无法继承 currentColor） */
  color?: string
  className?: string
  'aria-label'?: string
}

export function PixelIcon({
  name,
  size = 20,
  appearance,
  color,
  className,
  'aria-label': ariaLabel,
}: PixelIconProps) {
  const data = registry[name] ?? (lucideToPixel[name] ? registry[lucideToPixel[name]] : FALLBACK_ICON)
  if (!data) return null
  return (
    <PxlKitIcon
      icon={data}
      size={size}
      appearance={appearance}
      color={color}
      className={className}
      aria-label={ariaLabel}
    />
  )
}
