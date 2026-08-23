"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Lock,
  Unlock,
  Plus,
  ChevronDown,
  Layers,
  Sparkles,
  LayoutTemplate,
  Frame,
  SlidersHorizontal,
  Paintbrush,
  Wand2,
  MonitorSmartphone,
  Type,
} from "lucide-react";
import type { ReactNode } from "react";
import type {
  WorkbenchAiTask,
  WorkbenchBackground,
  WorkbenchElementKind,
  WorkbenchEnhance,
  WorkbenchLayer,
  WorkbenchLayerMoveDir,
  WorkbenchObject,
  WorkbenchT,
  WorkbenchTemplate,
  WorkbenchTemplateCategory,
  WorkbenchTextPreset,
  WorkbenchTextStyle,
} from "@template/ui";

import { Input } from "../../components/input";
import { WbAppearancePanel } from "./wb-appearance";
import { WbRemoveBgPanel } from "./wb-remove-bg";
import { WbAiTitleGenerator } from "./wb-ai-title";
import { WbLayersPanel } from "./wb-layers";
import { WbElementsPanel } from "./wb-elements";
import { WbTemplateGallery } from "./wb-templates";
import { WbEnhancePanel } from "./wb-enhance";
import { WbPlatformPicker } from "./views";
import { cn } from "./helpers";

const BG_SWATCHES = ["#ffffff", "#000000", "#141110", "#f76a6a", "#e5371d", "#2563eb"];

const BG_GRADIENTS = [
  { id: "flame", from: "#e5371d", to: "#2a0c08" },
  { id: "ocean", from: "#0f3460", to: "#1b1e3b" },
  { id: "sunset", from: "#ff512f", to: "#dd2476" },
  { id: "ember", from: "#141110", to: "#4a3423" },
];

interface WbPropertiesPanelProps {
  canvasW: number;
  canvasH: number;
  bgColor: string;
  selectedObject: WorkbenchObject | null;
  layers: WorkbenchLayer[];
  layersVersion: number;
  enhance: WorkbenchEnhance;
  templates: WorkbenchTemplate[];
  templateCategories: WorkbenchTemplateCategory[];
  textStylePresets: WorkbenchTextPreset[];
  t: WorkbenchT;
  aiRemoveBg: {
    task: WorkbenchAiTask;
    run: (file: File) => Promise<void>;
  };
  aiTitle: {
    task: WorkbenchAiTask;
    run: (title: string, style: WorkbenchTextStyle) => Promise<void>;
  };
  onResize: (w: number, h: number) => void;
  onBgColor: (color: string) => void;
  onSetBackground: (bg: WorkbenchBackground) => void;
  onLoadImage: (dataUrl: string) => void;
  onSelectLayer: (id: number) => void;
  onSelectLayerMulti: (id: number) => void;
  onReorderLayer: (orderedIds: number[]) => void;
  onMoveLayer: (id: number, dir: WorkbenchLayerMoveDir) => void;
  onToggleLayer: (id: number) => void;
  onToggleLayerLock: (id: number) => void;
  onDeleteLayer: (id: number) => void;
  onEnhance: (patch: Partial<WorkbenchEnhance>) => void;
  onAddElement: (kind: WorkbenchElementKind, value?: string) => void;
  onApplyTemplateById: (id: string) => void;
  onUpdateObject: (patch: Record<string, unknown>) => void;
  onApplyStylePreset: (presetId: string) => void;
}

/** Collapsible card — each inspector group floats as its own card. */
function CollapseGroup({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e9e6e1] bg-white shadow-[0_8px_22px_-18px_rgba(28,26,23,0.3)]">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-3 py-[11px] text-left text-[#1c1a17] transition-colors hover:bg-[#f7f5f2]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {icon && (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#f1efeb] text-[#4a4642] transition-colors">
            {icon}
          </span>
        )}
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fc725a] shadow-[0_0_8px_rgba(252,114,90,0.7)] animate-[wb-dot-pulse_1.8s_ease-in-out_infinite]" aria-hidden />
        <span className="flex flex-1 items-center gap-2 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b6760]">
          {title}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-[#a09b94] transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </section>
  );
}

export function WbPropertiesPanel({
  canvasW,
  canvasH,
  bgColor,
  selectedObject,
  layers,
  layersVersion,
  enhance,
  templates,
  templateCategories,
  textStylePresets,
  t,
  aiRemoveBg,
  aiTitle,
  onResize,
  onBgColor,
  onSetBackground,
  onLoadImage,
  onSelectLayer,
  onSelectLayerMulti,
  onReorderLayer,
  onMoveLayer,
  onToggleLayer,
  onToggleLayerLock,
  onDeleteLayer,
  onEnhance,
  onAddElement,
  onApplyTemplateById,
  onUpdateObject,
  onApplyStylePreset,
}: WbPropertiesPanelProps) {
  const [localW, setLocalW] = useState(canvasW);
  const [localH, setLocalH] = useState(canvasH);
  const [aspectLocked, setAspectLocked] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const applySize = useCallback(() => {
    if (localW > 0 && localH > 0) onResize(localW, localH);
  }, [localW, localH, onResize]);

  const changeWidth = useCallback(
    (w: number) => {
      setLocalW(w);
      if (aspectLocked && localH > 0) {
        const h = Math.round((w * localH) / localW);
        if (h > 0) setLocalH(h);
      }
    },
    [aspectLocked, localW, localH],
  );

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => onLoadImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    },
    [onLoadImage],
  );

  const isText = selectedObject?.type === "i-text" || selectedObject?.type === "text";

  return (
    <aside className="z-[3] flex w-[300px] shrink-0 flex-col gap-3 overflow-x-hidden overflow-y-auto border-l border-[#e9e6e1] bg-[#fbfaf8] px-3.5 py-4 pb-6">
      {/* Layers — the primary organizing tool, always visible */}
      <section className="overflow-hidden rounded-2xl border border-[#e9e6e1] bg-white shadow-[0_8px_22px_-18px_rgba(28,26,23,0.3)]">
        <div className="flex w-full items-center gap-2 px-3 py-[11px]">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#f1efeb] text-[#4a4642]">
            <Layers className="w-3.5 h-3.5" />
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fc725a] shadow-[0_0_8px_rgba(252,114,90,0.7)] animate-[wb-dot-pulse_1.8s_ease-in-out_infinite]" aria-hidden />
          <span className="flex flex-1 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b6760]">
            {t("layers")}
          </span>
        </div>
        <div className="px-3 pb-3 pt-3">
          <WbLayersPanel
            layers={layers}
            version={layersVersion}
            t={t}
            onSelect={onSelectLayer}
            onSelectMulti={onSelectLayerMulti}
            onReorder={onReorderLayer}
            onMove={onMoveLayer}
            onToggle={onToggleLayer}
            onToggleLock={onToggleLayerLock}
            onDelete={onDeleteLayer}
          />
        </div>
      </section>

      <CollapseGroup title={t("elements_title")} icon={<Sparkles className="w-3.5 h-3.5" />}>
        <WbElementsPanel onAdd={onAddElement} t={t} />
      </CollapseGroup>

      <CollapseGroup title={t("templates_title")} icon={<LayoutTemplate className="w-3.5 h-3.5" />}>
        <WbTemplateGallery
          templates={templates}
          templateCategories={templateCategories}
          onApply={onApplyTemplateById}
          t={t}
        />
      </CollapseGroup>

      {/* Document — canvas size + background */}
      <CollapseGroup title={t("canvas")} icon={<Frame className="w-3.5 h-3.5" />} defaultOpen>
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-[1.5px] border-dashed border-[rgba(252,114,90,0.4)] bg-[linear-gradient(180deg,rgba(252,114,90,0.06),transparent)] px-3 py-[22px] transition-[border-color,background,transform] duration-200 hover:-translate-y-px hover:border-[rgba(252,114,90,0.6)] hover:bg-[linear-gradient(180deg,rgba(252,114,90,0.12),transparent)]"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-[#fc725a] text-white shadow-[0_10px_22px_-8px_rgba(252,114,90,0.55)]">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-[13px] font-semibold text-[#1c1a17]">{t("add_image")}</span>
          <span className="text-[11px] text-[#a09b94]">{t("add_image_hint")}</span>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        <div className="mt-3 flex flex-col gap-2.5">
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("width")}</span>
              <Input
                type="number" min={1} max={7680} value={localW}
                onChange={(e) => changeWidth(Number(e.target.value))}
                onBlur={applySize}
                onKeyDown={(e) => e.key === "Enter" && applySize()}
                size="sm"
                className="h-7 text-xs"
              />
            </div>
            <button
              type="button"
              className={cn("inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border border-[#e9e6e1] transition-all", aspectLocked ? "border-transparent bg-[#fc725a] text-white shadow-[0_6px_16px_-6px_rgba(252,114,90,0.5)]" : "bg-transparent text-[#a09b94] hover:border-[rgba(252,114,90,0.4)] hover:text-[#1c1a17]")}
              onClick={() => setAspectLocked((v) => !v)}
              title={aspectLocked ? t("unlock_ratio") : t("lock_ratio")}
            >
              {aspectLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <div className="min-w-0 flex-1">
              <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("height")}</span>
              <Input
                type="number" min={1} max={4320} value={localH}
                onChange={(e) => setLocalH(Number(e.target.value))}
                onBlur={applySize}
                onKeyDown={(e) => e.key === "Enter" && applySize()}
                size="sm"
                className="h-7 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#e9e6e1] bg-[#f7f5f2] px-2.5 py-2">
            <div className="h-[25px] w-[44px] shrink-0 rounded-[5px] border-2 border-[rgba(252,114,90,0.7)] bg-[linear-gradient(135deg,rgba(252,114,90,0.25),rgba(252,114,90,0.1))]" />
            <div className="flex flex-col leading-[1.2]">
              <b className="text-[13px] tabular-nums text-[#1c1a17]">{localW} × {localH}</b>
              <span className="text-[10px] text-[#a09b94]">{(localW / localH).toFixed(2)} : 1</span>
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("background")}</span>
          <div className="flex flex-wrap items-center gap-[7px]">
            {BG_SWATCHES.map((color) => (
              <button
                key={color}
                type="button"
                className={cn("h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-white shadow-[0_0_0_1px_#e9e6e1] transition-transform hover:scale-[1.15]", bgColor.toLowerCase() === color && "shadow-[0_0_0_2px_#fc725a]")}
                style={{ backgroundColor: color }}
                onClick={() => onBgColor(color)}
                title={color}
              />
            ))}
            <button
              type="button"
              className="inline-flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full border border-dashed border-[#dcd9d3] text-[#a09b94] transition-all hover:border-[rgba(252,114,90,0.5)] hover:text-[#1c1a17]"
              onClick={() => colorInputRef.current?.click()}
              title={t("custom_color")}
            >
              <Plus className="w-3 h-3" />
            </button>
            <input ref={colorInputRef} type="color" value={bgColor} onChange={(e) => onBgColor(e.target.value)} className="hidden" />

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {BG_GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-white shadow-[0_0_0_1px_#e9e6e1] transition-transform hover:scale-[1.15]"
                  title={t("bg_gradient")}
                  style={{ width: 26, height: 26, background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                  onClick={() => onSetBackground({ type: "gradient", from: g.from, to: g.to })}
                />
              ))}
              <button
                type="button"
                className="h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-white shadow-[0_0_0_1px_#e9e6e1] transition-transform hover:scale-[1.15]"
                title={t("bg_checker")}
                style={{ width: 26, height: 26, background: "conic-gradient(#ffffff 25%, #d7d0c6 0 50%, #ffffff 0 75%, #d7d0c6 0)", backgroundSize: "12px 12px" }}
                onClick={() => onSetBackground({ type: "checker" })}
              />
            </div>
          </div>
        </div>
      </CollapseGroup>

      <CollapseGroup title={t("enhance.title")} icon={<SlidersHorizontal className="w-3.5 h-3.5" />}>
        <WbEnhancePanel value={enhance} onChange={onEnhance} t={t} />
      </CollapseGroup>

      <CollapseGroup title={t("ai_tools")} icon={<Wand2 className="w-3.5 h-3.5" />}>
        <div className="space-y-3">
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("remove_bg")}</span>
            <WbRemoveBgPanel task={aiRemoveBg.task} run={aiRemoveBg.run} onResult={onLoadImage} t={t} />
          </div>
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("ai_title")}</span>
            <WbAiTitleGenerator task={aiTitle.task} run={aiTitle.run} onResult={onLoadImage} t={t} />
          </div>
        </div>
      </CollapseGroup>

      <CollapseGroup title={t("platform_presets")} icon={<MonitorSmartphone className="w-3.5 h-3.5" />}>
        <WbPlatformPicker
          currentWidth={canvasW}
          currentHeight={canvasH}
          onSelect={(w, h) => {
            setLocalW(w);
            setLocalH(h);
            onResize(w, h);
          }}
        />
      </CollapseGroup>

      {selectedObject && (
        <CollapseGroup title={t("appearance_title")} icon={<Paintbrush className="w-3.5 h-3.5" />} defaultOpen>
          <WbAppearancePanel
            opacity={selectedObject.opacity ?? 1}
            blendMode={selectedObject.globalCompositeOperation ?? "source-over"}
            onChange={onUpdateObject}
            t={t}
          />
        </CollapseGroup>
      )}

      {isText && (
        <CollapseGroup title={t("text")} icon={<Type className="w-3.5 h-3.5" />} defaultOpen>
          <TextProperties obj={selectedObject} presets={textStylePresets} onUpdate={onUpdateObject} onApplyPreset={onApplyStylePreset} t={t} />
        </CollapseGroup>
      )}
    </aside>
  );
}

// ── Text style presets ────────────────────────────────────────────────────────

function TextProperties({
  obj,
  presets,
  onUpdate,
  onApplyPreset,
  t,
}: {
  obj: WorkbenchObject;
  presets: WorkbenchTextPreset[];
  onUpdate: (patch: Record<string, unknown>) => void;
  onApplyPreset: (presetId: string) => void;
  t: WorkbenchT;
}) {
  const fontSize = (obj.fontSize as number | undefined) ?? 48;

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("quick_styles")}</span>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              className="flex cursor-pointer flex-col gap-[5px] rounded-xl border border-[#e9e6e1] bg-[#f7f5f2] p-2 transition-all hover:-translate-y-px hover:border-[rgba(252,114,90,0.5)]"
              onClick={() => onApplyPreset(p.id)}
            >
              <span className="flex h-[34px] items-center justify-center overflow-hidden rounded-[8px] bg-[#2a2724]">
                <span
                  style={{
                    fontFamily: p.preview.fontFamily,
                    fontSize: 18,
                    fontWeight: 900,
                    color: p.preview.color,
                    textShadow: p.preview.textShadow,
                    WebkitTextStroke: p.preview.stroke,
                  }}
                >
                  Aa
                </span>
              </span>
              <span className="text-[11px] font-semibold text-[#4a4642]">{t(p.labelKey)}</span>
              <span className="text-[9px] text-[#a09b94]">{t(p.descKey)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("font_size")}</span>
          <span className="font-mono text-xs tabular-nums text-[#a09b94]">{fontSize}px</span>
        </div>
        <input
          type="range"
          min={16}
          max={240}
          step={2}
          value={fontSize}
          onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
          className="w-full cursor-pointer accent-[#fc725a]"
        />
      </div>

      <div className="space-y-1">
        <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("fill_color")}</span>
        <div className="flex flex-wrap items-center gap-[7px]">
          {["#ffffff", "#111111", "#f76a6a", "#2563eb", "#fbbf24", "#22c55e"].map((c) => (
            <button
              key={c}
              type="button"
              className={cn("h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-white shadow-[0_0_0_1px_#e9e6e1] transition-transform hover:scale-[1.15]", String(obj.fill).toLowerCase() === c && "shadow-[0_0_0_2px_#fc725a]")}
              style={{ backgroundColor: c }}
              onClick={() => onUpdate({ fill: c })}
              title={c}
            />
          ))}
          <input
            type="color"
            defaultValue={typeof obj.fill === "string" ? obj.fill : "#ffffff"}
            onChange={(e) => onUpdate({ fill: e.target.value })}
            className="hidden"
            id="wb-text-fill-color"
          />
          <button
            type="button"
            className="inline-flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full border border-dashed border-[#dcd9d3] text-[#a09b94] transition-all hover:border-[rgba(252,114,90,0.5)] hover:text-[#1c1a17]"
            onClick={() => document.getElementById("wb-text-fill-color")?.click()}
            title={t("custom_color")}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("stroke")}</span>
          <span className="font-mono text-xs tabular-nums text-[#a09b94]">{(obj.strokeWidth as number | undefined) ?? 0}px</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            defaultValue={(obj.stroke as string | undefined) ?? "#000000"}
            onChange={(e) => onUpdate({ stroke: e.target.value })}
            className="h-7 w-8 cursor-pointer rounded border border-[#e9e6e1] bg-transparent p-0.5"
          />
          <input
            type="range"
            min={0}
            max={20}
            defaultValue={(obj.strokeWidth as number | undefined) ?? 0}
            onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) })}
            className="flex-1 cursor-pointer accent-[#fc725a]"
          />
        </div>
      </div>
    </div>
  );
}
