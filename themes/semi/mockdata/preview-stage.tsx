import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  dark: true,
  colorBlind: false,
  mode: "single" as const,
  singleLabel: "Single",
  abLabel: "A/B",
  activeScene: { id: "feed", label: "Feed", icon: "home", size: "desktop" },
  scene: "feed",
  sceneProps: {
    title: "My video title",
    channel: "@my-channel",
    avatarSrc: "",
  },
  foldLine: true,
  foldLineLabel: "The fold",
};
