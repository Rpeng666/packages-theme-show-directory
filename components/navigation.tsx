"use client";

import { useSelectedLayoutSegments } from "next/navigation";

import { RaycastLogoNegIcon } from "@raycast/icons";
import { useThemeComponent } from "@template/ui";
import Link from "next/link";
import CodeImagesIcon from "@/app/assets/code-images.svg";
import IconMakerIcon from "@/app/assets/icon-maker.svg";
import IosIconsIcon from "@/app/assets/ios-icons.svg";
import SnippetExplorerIcon from "@/app/assets/snippet-explorer.svg";
import PresetExplorerIcon from "@/app/assets/preset-explorer.svg";
import QuicklinkExplorerIcon from "@/app/assets/quicklink-explorer.svg";
import PromptExplorerIcon from "@/app/assets/prompt-explorer.svg";
import ThemeExplorerIcon from "@/app/assets/theme-explorer.svg";

const links = [
  {
    href: "/",
    label: "Code Images",
    description: "Create beautiful images of your code",
    icon: <CodeImagesIcon className="w-6 h-6" />,
  },
  {
    href: "/icon",
    label: "Icon Maker",
    description: "Create beautiful icons",
    icon: <IconMakerIcon className="w-6 h-6" />,
  },
  {
    href: "/prompts",
    label: "Prompts",
    description: "Explore AI Prompts for Raycast",
    icon: <PromptExplorerIcon className="w-6 h-6" />,
  },
  {
    href: "/presets",
    label: "Presets",
    description: "Explore AI Presets for Raycast",
    icon: <PresetExplorerIcon className="w-6 h-6" />,
  },
  {
    href: "/quicklinks",
    label: "Quicklinks",
    description: "Explore Raycast Quicklinks",
    icon: <QuicklinkExplorerIcon className="w-6 h-6" />,
  },
  {
    href: "/snippets",
    label: "Snippets",
    description: "Browse and import Raycast Snippets",
    icon: <SnippetExplorerIcon className="w-6 h-6" />,
  },
  {
    href: "/themes",
    label: "Themes",
    description: "Browse and import Raycast Themes",
    icon: <ThemeExplorerIcon className="w-6 h-6" />,
  },
  {
    href: "/ios-icons",
    label: "iOS App Icons",
    description: "Save iOS shortcut icons for Raycast features",
    icon: <IosIconsIcon className="w-6 h-6" />,
  },
];

/**
 * Navigation — 工作台顶部 header 的应用侧薄转发层。
 *
 * 路由相关的"聪明逻辑"（segment 解析、激活链接、返回按钮显隐）留在 app；
 * 视觉与交互（下拉菜单、返回按钮、品牌槽位）全部来自 @template/ui 的
 * raycast 主题 WorkbenchHeader —— 从而实现拆分与复用。
 */
export function Navigation() {
  const WorkbenchHeader = useThemeComponent("WorkbenchHeader");
  const segments = useSelectedLayoutSegments();
  const segment = segments[0] || "(code)";
  const showBackButton = segments.find((s) => s === "shared") ? segments.length > 1 : segments.length > 2;
  const activeHref = segment === "(code)" ? "/" : links.find((link) => link.href.includes(segment))?.href;

  return (
    <WorkbenchHeader
      links={links}
      activeHref={activeHref}
      showBack={showBackButton}
      backHref={`/${segment}`}
      LinkComponent={Link}
      brandSlot={
        <div className="-ml-2 flex items-center relative z-10 gap-[4px]">
          <span className="text-sm text-gray-9">by </span>
          <Link href="https://raycast.com#ref=ray-so" target="_blank" rel="noopener" className="flex items-center gap-1 pl-[8px] rounded-md hover:bg-gray-4 transition-colors py-1 pr-2">
            <RaycastLogoNegIcon className="w-5 h-5 text-brand" />
            <span className="text-sm text-gray-12 font-medium hidden sm:block">Raycast</span>
          </Link>
        </div>
      }
    />
  );
}

/**
 * NavigationActions — 固定在 header 右侧的操作区。
 * 直接转发到主题的 WorkbenchActions，调用方无需改动。
 */
export function NavigationActions({ children, className }: { children: React.ReactNode; className?: string }) {
  const WorkbenchActions = useThemeComponent("WorkbenchActions");
  return <WorkbenchActions className={className}>{children}</WorkbenchActions>;
}
