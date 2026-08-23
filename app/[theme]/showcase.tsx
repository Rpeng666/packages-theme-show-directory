"use client";

import * as React from "react";
import { resolveComponent } from "@template/ui";

const THEME_NAMES = ["default", "pixel", "semi", "raycast"];

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
  const active = (THEME_NAMES as readonly string[]).includes(theme) ? theme : "default";

  return (
    <div className="flex flex-col gap-8 px-[360px] py-8">
      <h1 className="text-lg font-bold">{active} theme</h1>
      <p className="text-sm text-gray-9">
        Live component previews. The directory on the left lists themes; panels below render each
        component with the active theme&apos;s implementation.
      </p>
      <div className="flex flex-col gap-6 max-w-4xl">
        {PREVIEWS.map((p) => (
          <section key={p.key} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-gray-11">{p.label}</h2>
            <div className="grid gap-3 rounded-xl border border-panel bg-panel/40 p-5">
              {p.render(active)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}