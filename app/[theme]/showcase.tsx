"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { getThemeBlock, getThemeBlockNames } from "@/themes";
import { DEMO_SECTIONS, blogDetailPost } from "@/themes/demo";

/**
 * Previews a single theme block. The block is a forwarder resolved from the
 * theme registry (themes/index.ts); the demo section data comes from
 * themes/demo.ts. No per-component fixtures are hand-rolled here.
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

  const section = DEMO_SECTIONS[selected];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <header className="flex flex-col gap-1">
        <h1 className="text-[15px] font-medium text-gray-12">{selected}</h1>
        <p className="text-[13px] text-gray-9 capitalize">
          {theme} theme · forwarder → resolveSection({selected})
        </p>
      </header>
      <div className="rounded-xl border border-gray-8 bg-panel/40 p-6 overflow-hidden">
        {selected === "BlogDetail" ? (
          <Block post={blogDetailPost} />
        ) : (
          <Block section={section} />
        )}
      </div>
    </div>
  );
}