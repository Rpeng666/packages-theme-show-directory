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
          <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("appearance_opacity")}</span>
          <span className="font-mono text-xs tabular-nums text-[#a09b94]">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={Math.round(opacity * 100)}
          onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
          className="w-full cursor-pointer accent-[#fc725a]"
        />
      </div>

      {/* Blend mode */}
      <div className="space-y-1">
        <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("appearance_blend")}</span>
        <select
          value={blendMode}
          onChange={(e) => onChange({ globalCompositeOperation: e.target.value })}
          className="h-8 w-full cursor-pointer rounded-[10px] border border-[#e9e6e1] bg-white px-2 text-xs text-[#4a4642] outline-none focus:border-[rgba(252,114,90,0.5)] focus:shadow-[0_0_0_3px_rgba(252,114,90,0.12)]"
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
