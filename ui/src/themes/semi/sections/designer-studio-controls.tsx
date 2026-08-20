"use client";

import type { ReactNode } from "react";

import { ColorPicker } from "../components/color-picker";
import { Slider } from "../components/slider";
import { Switch } from "../components/switch";

/**
 * Atomic design-settings controls shared by the DesignerStudio stages.
 * Extracted from designer-studio.tsx to keep each file under the size limit.
 */

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function SettingLabel({ children }: { children: ReactNode }) {
  return <span className="designstudio-setting-label">{children}</span>;
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="designstudio-setting-row">
      <div className="designstudio-setting-row-head">
        <SettingLabel>{label}</SettingLabel>
        <span className="designstudio-setting-value">
          {value}
          {unit ?? ""}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="designstudio-setting-row designstudio-setting-row-switch">
      <SettingLabel>{label}</SettingLabel>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function ColorRow({
  label,
  value,
  onChange,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="designstudio-setting-row">
      <SettingLabel>{label}</SettingLabel>
      <ColorPicker value={value} onChange={onChange} />
    </div>
  );
}

export function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<{ value: string; label: ReactNode }>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="designstudio-seg">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={cn(
            "designstudio-seg-btn",
            value === o.value && "designstudio-seg-btn-active",
          )}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}