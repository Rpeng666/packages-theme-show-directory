"use client";

import * as React from "react";

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
  IconGridSquare,
  IconMonitorStroked,
  IconSmartphoneStroked,
  IconSidebar,
  IconShield,
  IconEyeOpened,
  IconAIWandLevel1,
  IconScissors,
  IconShrink,
  IconExpand,
  IconTemplate,
  IconColorPalette,
  IconText,
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
  IconMusic,
  IconUnlock,
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
  IconActivity,
  IconBarChartVStroked,
  IconCoinMoney,
  IconComment,
  IconCreditCard,
  IconCrown,
  IconKey,
  IconOrderedList,
  IconPulse,
  IconSetting,
  IconUserGroup,
  IconPause,
  IconLoading,
  IconDisc,
  IconMoon,
  IconSun,
  IconVolume1,
  IconSync,
  IconSpin,
} from "@douyinfe/semi-icons";

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

  RefreshCw: <IconRefresh />,

  Sync: <IconSync />,

  Disc: <IconDisc />,

  Volume: <IconVolume1 />,

  Volume2: <IconVolume1 />,

  Undo: <IconUndo />,

  Redo: <IconRedo />,

  History: <IconHistory />,

  Search: <IconSearch />,

  Edit: <IconEdit />,

  Send: <IconSend />,

  Play: <IconPlay />,

  Pause: <IconPause />,

  Stop: <IconStop />,

  Lock: <IconLock />,

  Shield: <IconShield />,

  User: <IconUser />,

  Users: <IconUserGroup />,

  UserGroup: <IconUserGroup />,

  Folder: <IconFolder />,

  Layers: <IconLayers />,

  Globe: <IconGlobe />,

  Language: <IconLanguage />,

  Link: <IconLink />,

  File: <IconFile />,

  Image: <IconImage />,

  ImageIcon: <IconImage />,

  Video: <IconVideo />,

  Camera: <IconCamera />,

  Desktop: <IconDesktop />,
  Monitor: <IconMonitorStroked />,
  Smartphone: <IconSmartphoneStroked />,
  Sidebar: <IconSidebar />,
  Eye: <IconEyeOpened />,

  Mobile: <IconSmartphoneStroked />,

  Code: <IconCode />,

  Terminal: <IconTerminal />,

  Gift: <IconGift />,

  Sparkles: <IconAIWandLevel1 />,

  Magic: <IconAIWandLevel1 />,

  Loader2: <IconLoading />,

  LoaderCircle: <IconLoading />,

  Spin: <IconSpin />,

  Music: <IconMusic />,

  Unlock: <IconUnlock />,
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

  Activity: <IconActivity />,

  Chart: <IconBarChartVStroked />,

  BarChart: <IconBarChartVStroked />,

  Coins: <IconCoinMoney />,

  Money: <IconCoinMoney />,

  CreditCard: <IconCreditCard />,

  Card: <IconCreditCard />,

  Message: <IconComment />,

  Chat: <IconComment />,

  Crown: <IconCrown />,

  Key: <IconKey />,

  Task: <IconOrderedList />,

  List: <IconOrderedList />,

  Pulse: <IconPulse />,

  Settings: <IconSetting />,

  // Ri* (remix) names used by landing content data

  RiYoutubeLine: <IconVideo />,

  RiVideoLine: <IconVideo />,

  RiImageEditLine: <IconEdit />,

  RiImageLine: <IconImage />,

  RiFileImageLine: <IconFile />,

  RiFileImage2Line: <IconFile />,

  RiUploadCloud2Line: <IconUpload />,

  RiUpload2Line: <IconUpload />,

  RiDownload2Line: <IconDownload />,

  RiCropLine: <IconCrop />,

  RiLayoutGridLine: <IconGridSquare />,

  GridSquare: <IconGridSquare />,
  RiGridLine: <IconGridSquare />,

  RiStackLine: <IconLayers />,

  RiShieldCheckLine: <IconShield />,

  RiMagicLine: <IconAIWandLevel1 />,

  RiEyeLine: <IconEyeOpened />,

  EyeOpened: <IconEyeOpened />,
  RiGlobalLine: <IconGlobe />,

  RiCompressLine: <IconShrink />,

  Moon: <IconMoon />,
  Sun: <IconSun />,
  Shrink: <IconShrink />,

  RiExpandLine: <IconExpand />,

  RiScissorsLine: <IconScissors />,

  RiTemplateLine: <IconTemplate />,

  RiPaletteLine: <IconColorPalette />,

  RiTextLine: <IconText />,
  Text: <IconText />,
};

/**

 * Render a Semi icon from a shared icon *name*, with a generic fallback.

 * `size` is applied via style so both icon sizes render consistently.

 */

export function SmartIcon({
  name,

  size = 16,

  className = "",
}: {
  name?: string;

  size?: number;

  className?: string;
}) {
  const el = name ? (ICON_MAP[name] ?? null) : null;

  return (
    <span
      className={className}

      style={{
        display: "inline-flex",

        width: size,

        height: size,

        flexShrink: 0,

        alignItems: "center",

        justifyContent: "center",
      }}

      aria-hidden
    >
      {el
        ? React.cloneElement(
            el as React.ReactElement<{
              size?: unknown;
              style?: React.CSSProperties;
            }>,
            {
              size: "inherit",

              style: { fontSize: size, display: "inline-flex" },
            },
          )
        : null}
    </span>
  );
}
