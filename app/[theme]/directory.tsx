"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { WorkbenchSidebarNav } from "@template/ui";
import { getThemeBlockNames } from "@/themes";
import { cn } from "@/utils/cn";

/**
 * Client sidebar directory — lists EVERY theme block registered for the
 * active theme (the forwarder names from themes/{theme}/blocks). Selecting a
 * block sets `?c=BlockName` so the preview pane renders it.
 */
export function ThemeDirectory({ theme }: { theme: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams?.get("c") ?? null;
  const blocks = getThemeBlockNames(theme);

  const select = (key: string) => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.set("c", key);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <WorkbenchSidebarNav
        title={`Blocks (${blocks.length})`}
        items={blocks.map((key) => ({
          key,
          label: key,
          icon: <DotIcon active={selected === key} />,
          active: selected === key,
          onSelect: () => select(key),
        }))}
      />
    </div>
  );
}

function DotIcon({ active }: { active?: boolean }) {
  return (
    <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill={active ? "currentColor" : "rgba(255,255,255,0.25)"} />
    </svg>
  );
}