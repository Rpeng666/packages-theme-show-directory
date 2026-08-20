"use client";

import { RotateCcw } from "lucide-react";
import type { WorkbenchEnhance, WorkbenchT } from "@template/ui";

import { Button } from "../../components/button";
import { WbExposureSlider } from "./views";

const ACCENTS = {
  exposure: "oklch(72% 0.17 150)",
  contrast: "oklch(70% 0.16 250)",
  warmth: "oklch(75% 0.18 60)",
};

export function WbEnhancePanel({
  value,
  onChange,
  t,
}: {
  value: WorkbenchEnhance;
  onChange: (patch: Partial<WorkbenchEnhance>) => void;
  t: WorkbenchT;
}) {
  const isNeutral =
    value.exposure === 0 && value.contrast === 0 && value.warmth === 0;

  const controls = [
    { key: "exposure" as const, accent: ACCENTS.exposure, show: true },
    { key: "contrast" as const, accent: ACCENTS.contrast, show: false },
    { key: "warmth" as const, accent: ACCENTS.warmth, show: false },
  ];

  return (
    <div className="space-y-4">
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
        disabled={isNeutral}
        onClick={() => onChange({ exposure: 0, contrast: 0, warmth: 0 })}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        {t("enhance.reset")}
      </Button>
    </div>
  );
}
