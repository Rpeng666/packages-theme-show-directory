"use client";

import * as React from "react";
import Link from "next/link";
import { WorkbenchHeader } from "@template/ui";
import { THEME_NAMES } from "@template/ui/registry";
import { useSearchParams } from "next/navigation";

const THEME_COLORS: Record<string, string> = {
  default: "#7c4fff",
  pixel: "#51cf66",
  semi: "#f5a524",
  raycast: "#ff6363",
};

/**
 * ThemeHeader — ray.so workbench header. The tool dropdown lists the available
 * themes so the user can switch the active theme; the brand slot shows the
 * active theme's label.
 */
export function ThemeHeader({ theme }: { theme: string }) {
  const searchParams = useSearchParams();
  const selected = searchParams?.get("c") ?? null;

  const links = THEME_NAMES.map((name) => {
    const query = selected ? `?c=${encodeURIComponent(selected)}` : "";
    return {
      href: `/${name}${query}`,
      label: `${name}`,
      description: `${name} theme implementation`,
      icon: (
        <span
          className="size-3 rounded-full shrink-0"
          style={{ background: THEME_COLORS[name] ?? "#7c4fff", boxShadow: "0 0 8px currentColor" }}
        />
      ),
    };
  });

  return (
    <WorkbenchHeader
      links={links}
      activeHref={`/${theme}`}
      LinkComponent={Link}
      brandSlot={
        <div className="flex items-center gap-1 -ml-2">
          <span className="text-[13px] text-gray-9">Theme Directory ·</span>
          <span className="text-[13px] font-medium text-gray-12 capitalize">{theme}</span>
        </div>
      }
    />
  );
}