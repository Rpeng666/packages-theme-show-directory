'use client'

import * as React from 'react'
import {
  IconAlertCircle,
  IconAppCenter,
  IconArrowRight,
  IconBolt,
  IconCalendar,
  IconCamera,
  IconCheckList,
  IconClock,
  IconClose,
  IconCode,
  IconCopy,
  IconCrop,
  IconDelete,
  IconDesktop,
  IconDownload,
  IconEdit,
  IconFile,
  IconFilter,
  IconFlag,
  IconFolder,
  IconGift,
  IconGlobe,
  IconHistory,
  IconImage,
  IconInbox,
  IconLanguage,
  IconLayers,
  IconLink,
  IconLock,
  IconPlay,
  IconPlus,
  IconQuote,
  IconRedo,
  IconRefresh,
  IconSave,
  IconScan,
  IconSearch,
  IconSend,
  IconStar,
  IconStop,
  IconTerminal,
  IconTick,
  IconUndo,
  IconUpload,
  IconUser,
  IconVideo,
  IconWifi,
} from '@douyinfe/semi-icons'

/**
 * Shared icon map — the shared `Section`/`Button` data carries icon *names*
 * (SmartIcon vocabulary). Semi has no generic icon-by-name registry, so this
 * maps the common names onto Semi icons and falls back to a generic app icon.
 */
const ICON_MAP: Record<string, React.ReactNode> = {
  Zap: <IconBolt />,
  Bolt: <IconBolt />,
  ArrowRight: <IconArrowRight />,
  Arrow: <IconArrowRight />,
  Check: <IconTick />,
  CheckCircle: <IconTick />,
  X: <IconClose />,
  Close: <IconClose />,
  Plus: <IconPlus />,
  Star: <IconStar />,
  Quote: <IconQuote />,
  Calendar: <IconCalendar />,
  Clock: <IconClock />,
  Copy: <IconCopy />,
  Download: <IconDownload />,
  Upload: <IconUpload />,
  Save: <IconSave />,
  Refresh: <IconRefresh />,
  Undo: <IconUndo />,
  Redo: <IconRedo />,
  History: <IconHistory />,
  Search: <IconSearch />,
  Edit: <IconEdit />,
  Send: <IconSend />,
  Play: <IconPlay />,
  Stop: <IconStop />,
  Lock: <IconLock />,
  User: <IconUser />,
  Users: <IconUser />,
  Folder: <IconFolder />,
  Layers: <IconLayers />,
  Globe: <IconGlobe />,
  Language: <IconLanguage />,
  Link: <IconLink />,
  File: <IconFile />,
  Image: <IconImage />,
  Video: <IconVideo />,
  Camera: <IconCamera />,
  Desktop: <IconDesktop />,
  Mobile: <IconDesktop />,
  Code: <IconCode />,
  Terminal: <IconTerminal />,
  Gift: <IconGift />,
  Crop: <IconCrop />,
  Scan: <IconScan />,
  Delete: <IconDelete />,
  Filter: <IconFilter />,
  Flag: <IconFlag />,
  Warning: <IconAlertCircle />,
  Alert: <IconAlertCircle />,
  Wifi: <IconWifi />,
  CheckList: <IconCheckList />,
  Inbox: <IconInbox />,
  AppCenter: <IconAppCenter />,
}

/**
 * Render a Semi icon from a shared icon *name*, with a generic fallback.
 * `size` is applied via style so both icon sizes render consistently.
 */
export function SmartIcon({
  name,
  size = 16,
  className = '',
}: {
  name?: string
  size?: number
  className?: string
}) {
  const el = name ? ICON_MAP[name] ?? null : null
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
      aria-hidden
    >
      {el
        ? React.cloneElement(el as React.ReactElement<{ size?: number }>, { size })
        : null}
    </span>
  )
}
