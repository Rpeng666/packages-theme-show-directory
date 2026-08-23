"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { getThemeBlock, getThemeBlockNames } from "@/themes";
import { DEMO_PROPS } from "@/themes/demo";

/**
 * Previews a single theme block. The block is a forwarder resolved from the
 * theme registry (themes/index.ts); demo props come from themes/demo.tsx
 * (keyed by block name). Data that isn't wired yet renders a placeholder so
 * the page never 500s.
 */
export function ThemeShowcase({ theme }: { theme: string }) {
  const searchParams = useSearchParams();
  const blocks = getThemeBlockNames(theme);
  const selected = searchParams?.get("c") ?? blocks[0] ?? "Hero";

  const Block = getThemeBlock(selected, theme) as React.ComponentType<any> | null;

  if (!Block) {
    return (
      <div className="flex flex-col gap-4 p-6 max-w-md rounded-xl border border-gray-5 bg-panel/40">
        <p className="text-[13px] text-gray-9">
          <code className="text-gray-11">{selected}</code> has no block in this theme.
        </p>
      </div>
    );
  }

  const props = DEMO_PROPS[selected];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <header className="flex flex-col gap-1">
        <h1 className="text-[15px] font-medium text-gray-12">{selected}</h1>
        <p className="text-[13px] text-gray-9 capitalize">
          {theme} theme · forwarder
        </p>
      </header>
      <div className="rounded-xl border border-gray-8 bg-panel/40 p-6 overflow-hidden">
        {props ? (
          <Block {...props} />
        ) : (
          <div className="flex flex-col gap-2 p-4">
            <p className="text-[13px] text-gray-9">
              <code className="text-gray-11">{selected}</code> has no demo data yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}