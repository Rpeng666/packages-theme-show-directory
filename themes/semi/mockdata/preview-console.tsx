import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  mode: "single" as const,
  onModeChange: () => {},
  singleLabel: "Single",
  abLabel: "A/B",
  uploadTitle: "Upload an image",
  uploadHint: "PNG or JPG",
  uploadFormatHint: "Up to 10MB",
  replaceLabel: "Replace",
  uploadA: null,
  uploadB: null,
  onUploadA: () => {},
  onUploadB: () => {},
  titleLabel: "Title",
  titleValue: "My video title",
  titlePlaceholder: "Enter a title…",
  onTitleChange: () => {},
  channelLabel: "Channel",
  channelValue: "@my-channel",
  channelPlaceholder: "Channel…",
  onChannelChange: () => {},
  sceneLabel: "Scene",
  scenes: [
    { id: "feed", label: "Feed", icon: "home", size: "desktop" },
    { id: "search", label: "Search", icon: "search", size: "desktop" },
    { id: "mobile", label: "Mobile", icon: "smartphone", size: "mobile" },
  ],
  scene: "feed",
  onSceneChange: () => {},
};
