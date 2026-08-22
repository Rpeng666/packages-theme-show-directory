"use client";

import type { WorkbenchT } from "@template/ui";

const BLEND_MODES: { value: string; label: string }[] = [
  { value: "source-over", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "darken", label: "Darken" },
  { value: "lighten", label: "Lighten" },
  { value: "color-dodge", label: "Color Dodge" },
];

/** Opacity + blend mode for the selected object(s). */
export function WbAppearancePanel({
  opacity,
  blendMode,
  onChange,
  t,
}: {
  opacity: number;
  blendMode: string;
  onChange: (patch: Record<string, unknown>) => void;
  t: WorkbenchT;
}) {
  return (
    <div className="space-y-3">
      {/* Opacity */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="wb-dims-label">{t("appearance_opacity")}</span>
          <span className="font-mono text-xs text-[var(--semi-color-text-3)] tabular-nums">
            {Math.round(opacity * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={Math.round(opacity * 100)}
          onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
          className="wb-fs-range"
        />
      </div>

      {/* Blend mode */}
      <div className="space-y-1">
        <span className="wb-dims-label">{t("appearance_blend")}</span>
        <select
          value={blendMode}
          onChange={(e) => onChange({ globalCompositeOperation: e.target.value })}
          className="wb-blend-select"
        >
          {BLEND_MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
