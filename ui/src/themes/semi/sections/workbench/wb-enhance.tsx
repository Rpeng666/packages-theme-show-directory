"use client";

import { RotateCcw, Sparkles } from "lucide-react";
import type { WorkbenchEnhance, WorkbenchT } from "@template/ui";

import { Button } from "../../components/button";
import { WbExposureSlider } from "./views";

const ACCENTS = {
  exposure: "oklch(72% 0.17 150)",
  contrast: "oklch(70% 0.16 250)",
  warmth: "oklch(75% 0.18 60)",
};

type EnhancePatch = Partial<WorkbenchEnhance>;

/** One-tap look presets (id → enhance patch). */
const PRESETS: { id: string; patch: EnhancePatch; accent: string }[] = [
  { id: "original", patch: { exposure: 0, contrast: 0, warmth: 0, grayscale: false }, accent: "oklch(65% 0 0)" },
  { id: "vivid", patch: { exposure: 5, contrast: 12, warmth: 30, grayscale: false }, accent: "oklch(72% 0.2 150)" },
  { id: "bold", patch: { exposure: 0, contrast: 32, warmth: 8, grayscale: false }, accent: "oklch(68% 0.18 250)" },
  { id: "soft", patch: { exposure: -6, contrast: -8, warmth: -16, grayscale: false }, accent: "oklch(75% 0.12 70)" },
  { id: "mono", patch: { exposure: 2, contrast: 26, warmth: -100, grayscale: true }, accent: "oklch(70% 0 0)" },
];

function isNeutral(v: WorkbenchEnhance) {
  return v.exposure === 0 && v.contrast === 0 && v.warmth === 0 && !v.grayscale;
}

export function WbEnhancePanel({
  value,
  onChange,
  t,
}: {
  value: WorkbenchEnhance;
  onChange: (patch: EnhancePatch) => void;
  t: WorkbenchT;
}) {
  const controls = [
    { key: "exposure" as const, accent: ACCENTS.exposure },
    { key: "contrast" as const, accent: ACCENTS.contrast },
    { key: "warmth" as const, accent: ACCENTS.warmth },
  ];

  return (
    <div className="space-y-4">
      {/* One-tap look presets */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--semi-color-text-3)] inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t("enhance.presets.title")}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => {
            const active =
              value.exposure === preset.patch.exposure &&
              value.contrast === preset.patch.contrast &&
              value.warmth === preset.patch.warmth &&
              Boolean(value.grayscale) === Boolean(preset.patch.grayscale);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange(preset.patch)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "border-transparent text-white"
                    : "border-[var(--semi-color-border-2)] text-[var(--semi-color-text-2)] hover:bg-[var(--semi-color-hover)]"
                }`}
                style={active ? { background: preset.accent } : undefined}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: active ? "rgba(255,255,255,0.9)" : preset.accent }}
                />
                {t(`enhance.presets.${preset.id}`)}
              </button>
            );
          })}
        </div>
      </div>

      {controls.map((control) => (
        <div key={control.key} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--semi-color-text-1)]">
              {t(`enhance.${control.key}`)}
            </span>
            <span className="font-mono text-xs text-[var(--semi-color-text-3)] tabular-nums">
              {value[control.key] > 0 ? "+" : ""}
              {value[control.key]}
            </span>
          </div>
          <WbExposureSlider
            accentColor={control.accent}
            value={value[control.key]}
            min={-100}
            max={100}
            step={5}
            onChange={(v) => onChange({ [control.key]: v })}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        disabled={isNeutral(value)}
        onClick={() => onChange({ exposure: 0, contrast: 0, warmth: 0, grayscale: false })}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        {t("enhance.reset")}
      </Button>
    </div>
  );
}
