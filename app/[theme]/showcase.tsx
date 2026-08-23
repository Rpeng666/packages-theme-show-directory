"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { resolveComponent } from "@template/ui";

/**
 * Renders a single component resolved for the active theme. Deals with a few
 * primitives we can preview with sample props; every other registered key is
 * still included in the directory and renders as a placeholder card so the
 * full registry is visible.
 */
export function ThemeShowcase({ theme }: { theme: string }) {
  const searchParams = useSearchParams();
  const selected = searchParams?.get("c") ?? "Button";

  const Comp = resolveComponent(selected as never, theme as never);
  if (!Comp) {
    return (
      <div className="flex flex-col gap-4 p-6 max-w-md rounded-xl border border-gray-5 bg-panel/40">
        <p className="text-[13px] text-gray-9">
          <code className="text-gray-11">{selected}</code> is registered for{" "}
          <code className="text-gray-11">{theme}</code> but there&apos;s no preview fixture for it.
          Pick another entry from the directory.
        </p>
      </div>
    );
  }

  const props = demoProps(selected);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <header className="flex flex-col gap-1">
        <h1 className="text-[15px] font-medium text-gray-12">{selected}</h1>
        <p className="text-[13px] text-gray-9 capitalize">
          {theme} theme
        </p>
      </header>
      <div className="rounded-xl border border-gray-8 bg-panel/40 p-6">{renderWithProps(Comp, selected, props, theme)}</div>
    </div>
  );
}

function renderWithProps(
  Comp: ComponentType<any>,
  key: string,
  props: Record<string, any>,
  theme: string,
) {
  if (key === "Button") {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Comp variant="default">Default</Comp>
        <Comp variant="secondary">Secondary</Comp>
        <Comp variant="outline">Outline</Comp>
        <Comp variant="ghost">Ghost</Comp>
        <Comp variant="destructive">Destructive</Comp>
      </div>
    );
  }
  if (key === "Badge") {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <Comp variant="default">Default</Comp>
        <Comp variant="secondary">Secondary</Comp>
        <Comp variant="outline">Outline</Comp>
        <Comp variant="destructive">Destructive</Comp>
      </div>
    );
  }
  if (key === "Card") {
    return (
      <Comp
        title="Getting Started"
        description="A card title and description rendered by the active theme."
        className="w-full max-w-md"
      >
        <div className="flex flex-col gap-2 text-sm">
          Click around — this card is styled by the {theme} theme.
        </div>
      </Comp>
    );
  }
  if (key === "Input") {
    return (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Comp placeholder="Search…" label="Search" />
        <Comp placeholder="Email address" error="This field is required" />
      </div>
    );
  }
  if (key === "Switch") {
    return (
      <div className="flex flex-col gap-4">
        <Comp defaultChecked label="Airplane mode" />
        <Comp label="Wi-Fi" />
      </div>
    );
  }
  if (key === "Avatar") {
    return (
      <div className="flex items-center gap-3">
        <Comp name="Linus Torvalds" size="sm" />
        <Comp name="Grace Hopper" size="md" />
        <Comp name="Ada Lovelace" size="lg" />
      </div>
    );
  }
  if (key === "Progress") {
    return (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Comp value={30} showValue />
        <Comp value={68} label="Uploading…" showValue />
      </div>
    );
  }
  if (key === "Skeleton") {
    return (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Comp className="h-4 w-full" />
        <Comp className="h-4 w-4/5" />
        <Comp className="h-4 w-3/5" />
      </div>
    );
  }
  return <Comp {...props} className="w-full" />;
}

/** Sample props for components that don't need a bespoke fixture. */
function demoProps(key: string): Record<string, any> {
  switch (key) {
    case "Label":
      return { children: "Label text" };
    case "Tag":
      return { children: "Tag" };
    case "Toggle":
      return { value: "on", children: "Toggle" };
    case "Divider":
      return { label: "Divider" };
    case "HintBanner":
      return { actionHint: "Select all", recommendHint: "Press ⌘A" };
    default:
      return {};
  }
}