import type { Section } from "@template/ui";
import * as React from "react";

/** Carousel — a scrolling deck of slides with arrows + indicators. */
const slide = (
  title: string,
  desc: string,
  emoji: string,
  from: string,
  to: string
) => (
  <div
    className={`flex h-44 w-80 shrink-0 flex-col justify-between rounded-xl bg-gradient-to-br ${from} ${to} p-5 text-white`}
  >
    <div className="text-2xl">{emoji}</div>
    <div>
      <div className="text-base font-semibold">{title}</div>
      <div className="text-xs text-white/70">{desc}</div>
    </div>
  </div>
);

export const props = {
  children: [
    slide(
      "Theme registry",
      "The filesystem is the registry — drop a file and it resolves.",
      "🗂️",
      "from-violet-500",
      "to-indigo-600"
    ),
    slide(
      "Forwarders",
      "Every block delegates to a registered implementation.",
      "🔁",
      "from-emerald-500",
      "to-teal-600"
    ),
    slide(
      "Fallback chain",
      "Requested theme → default → any theme → empty.",
      "🪜",
      "from-amber-500",
      "to-orange-600"
    ),
    slide(
      "Theme-able",
      "Each theme overrides any block it ships.",
      "🎨",
      "from-sky-500",
      "to-blue-600"
    ),
  ],
  showArrow: true,
  showIndicator: true,
  autoPlay: false,
};
