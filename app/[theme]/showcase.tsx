"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { resolveComponent } from "@template/ui";
import { THEME_NAMES } from "./catalog";
import { cn } from "@/utils/cn";

type Preview = {
  key: string;
  label: string;
  render: (theme: string) => React.ReactNode;
};

const PREVIEWS: Preview[] = [
  {
    key: "Button",
    label: "Button",
    render: (theme) => {
      const Button = resolveComponent("Button", theme as never);
      if (!Button) return null;
      return (
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      );
    },
  },
  {
    key: "Badge",
    label: "Badge",
    render: (theme) => {
      const Badge = resolveComponent("Badge", theme as never);
      if (!Badge) return null;
      return (
        <div className="flex flex-wrap gap-3 items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      );
    },
  },
  {
    key: "Card",
    label: "Card",
    render: (theme) => {
      const Card = resolveComponent("Card", theme as never);
      if (!Card) return null;
      return (
        <Card
          title="Getting Started"
          description="A card title and description rendered by the active theme."
          className="w-full max-w-sm"
        >
          <div className="text-sm">Card body content — styled by the active theme.</div>
        </Card>
      );
    },
  },
  {
    key: "Input",
    label: "Input",
    render: (theme) => {
      const Input = resolveComponent("Input", theme as never);
      if (!Input) return null;
      return (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Input placeholder="Search…" label="Search" />
          <Input placeholder="Email address" error="This field is required" />
        </div>
      );
    },
  },
  {
    key: "Switch",
    label: "Switch",
    render: (theme) => {
      const Switch = resolveComponent("Switch", theme as never);
      if (!Switch) return null;
      return (
        <div className="flex flex-col gap-3">
          <Switch defaultChecked label="Airplane mode" />
          <Switch label="Wi-Fi" />
        </div>
      );
    },
  },
  {
    key: "Avatar",
    label: "Avatar",
    render: (theme) => {
      const Avatar = resolveComponent("Avatar", theme as never);
      if (!Avatar) return null;
      return (
        <div className="flex items-center gap-3">
          <Avatar name="Linus Torvalds" size="sm" />
          <Avatar name="Grace Hopper" size="md" />
          <Avatar name="Ada Lovelace" size="lg" />
        </div>
      );
    },
  },
  {
    key: "Progress",
    label: "Progress",
    render: (theme) => {
      const Progress = resolveComponent("Progress", theme as never);
      if (!Progress) return null;
      return (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Progress value={30} showValue />
          <Progress value={68} label="Uploading…" showValue />
        </div>
      );
    },
  },
  {
    key: "Skeleton",
    label: "Skeleton",
    render: (theme) => {
      const Skeleton = resolveComponent("Skeleton", theme as never);
      if (!Skeleton) return null;
      return (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      );
    },
  },
];

export function ThemeShowcase({ theme }: { theme: string }) {
  const searchParams = useSearchParams();
  const selected = searchParams?.get("c") ?? null;
  const active = (THEME_NAMES as readonly string[]).includes(theme) ? theme : "default";

  React.useEffect(() => {
    if (!selected) return;
    const el = document.getElementById(selected);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {PREVIEWS.map((p) => {
        const isSelected = selected === p.key;
        return (
          <section
            key={p.key}
            id={p.key}
            data-active={isSelected}
            className={cn(
              "flex flex-col gap-3 scroll-mt-6",
              isSelected ? "rounded-xl border border-white/10 ring-1 ring-brand/40" : ""
            )}
          >
            <h2 className="text-sm font-medium text-gray-11">{p.label}</h2>
            <div className="grid gap-3 rounded-xl border border-panel bg-panel/40 p-5">
              {p.render(active)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
