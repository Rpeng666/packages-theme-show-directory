"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { COMPONENT_GROUPS, THEME_NAMES, resolveTheme } from "./catalog";
import { cn } from "@/utils/cn";

/**
 * Client sidebar directory — a Directory tree. Theme top-level, then the
 * component groups specific to the active theme. Selecting a component sets
 * `?c=ComponentKey` so the preview pane scrolls to that component.
 */
export function ThemeDirectory({ theme }: { theme: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = resolveTheme(theme);
  const selected = searchParams?.get("c") ?? null;

  const selectComponent = (key: string) => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.set("c", key);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Themes group */}
      <div className="mb-2">
        <p className="px-3 py-2 text-[12px] font-medium text-gray-9">Themes</p>
        <div className="flex flex-col gap-0.5">
          {THEME_NAMES.map((name) => (
            <Link
              key={name}
              href={`/${name}`}
              className={cn(
                "flex items-center h-8 rounded-md px-3 text-[13px]",
                name === active ? "bg-white/5 text-white" : "text-gray-9 hover:bg-white/5"
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Components for the active theme */}
      {COMPONENT_GROUPS.map((group) => (
        <div key={group.key} className="mb-2">
          <p className="px-3 py-2 text-[12px] font-medium text-gray-9">{group.label}</p>
          <div className="flex flex-col gap-0.5">
            {group.children.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectComponent(key)}
                className={cn(
                  "flex items-center h-8 rounded-md px-3 text-[13px] text-left",
                  selected === key ? "bg-white/5 text-white" : "text-gray-9 hover:bg-white/5",
                )}
                data-active={selected === key}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}