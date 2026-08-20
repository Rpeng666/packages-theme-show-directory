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
import {
  WbAppearancePanel,
} from "./wb-appearance";
import {
  WbRemoveBgPanel,
} from "./wb-remove-bg";
import {
  WbAiTitleGenerator,
} from "./wb-ai-title";
import { WbLayersPanel } from "./wb-layers";
import { WbElementsPanel } from "./wb-elements";
import { WbTemplateGallery } from "./wb-templates";
import { WbEnhancePanel } from "./wb-enhance";
import { WbPlatformPicker } from "./views";

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

/** Collapsible glass card — each inspector group floats as its own card. */
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
    <section className="wb-collapse">
      <button
        type="button"
        className="wb-collapse-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {icon && <span className="wb-card-icon">{icon}</span>}
        <span className="wb-card-dot" aria-hidden />
        <span className="wb-collapse-title">{title}</span>
        <ChevronDown className={`wb-collapse-caret${open ? " wb-collapse-caret-open" : ""}`} />
      </button>
      {open ? <div className="wb-collapse-body">{children}</div> : null}
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

  const isText =
    selectedObject?.type === "i-text" || selectedObject?.type === "text";

  return (
    <aside className="wb-panel">
      {/* Layers — the primary organizing tool, always visible */}
      <section className="wb-collapse wb-layers-hero">
        <div className="wb-collapse-head">
          <span className="wb-card-icon">
            <Layers className="w-3.5 h-3.5" />
          </span>
          <span className="wb-card-dot" aria-hidden />
          <span className="wb-collapse-title">{t("layers")}</span>
        </div>
        <div className="wb-collapse-body">
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

      {/* Content library — emoji stickers + quick shapes */}
      <CollapseGroup
        title={t("elements_title")}
        icon={<Sparkles className="w-3.5 h-3.5" />}
        defaultOpen
      >
        <WbElementsPanel onAdd={onAddElement} t={t} />
      </CollapseGroup>

      {/* Template gallery */}
      <CollapseGroup
        title={t("templates_title")}
        icon={<LayoutTemplate className="w-3.5 h-3.5" />}
        defaultOpen
      >
        <WbTemplateGallery
          templates={templates}
          templateCategories={templateCategories}
          onApply={onApplyTemplateById}
          t={t}
        />
      </CollapseGroup>

      {/* Document — canvas size + background */}
      <CollapseGroup title={t("canvas")} icon={<Frame className="w-3.5 h-3.5" />} defaultOpen>
        {/* Add image dropzone */}
        <div
          className="wb-dropzone"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <div className="wb-dropzone-icon">
            <Upload className="w-4 h-4" />
          </div>
          <span className="wb-dropzone-label">{t("add_image")}</span>
          <span className="wb-dropzone-hint">{t("add_image_hint")}</span>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        {/* Dimensions */}
        <div className="wb-dims" style={{ marginTop: 12 }}>
          <div className="wb-dims-row">
            <div className="wb-dims-field">
              <span className="wb-dims-label">{t("width")}</span>
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
              className={`wb-lock-btn${aspectLocked ? " wb-lock-btn-active" : ""}`}
              onClick={() => setAspectLocked((v) => !v)}
              title={aspectLocked ? t("unlock_ratio") : t("lock_ratio")}
            >
              {aspectLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <div className="wb-dims-field">
              <span className="wb-dims-label">{t("height")}</span>
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

          <div className="wb-ratio-preview">
            <div className="wb-ratio-box" />
            <div className="wb-ratio-meta">
              <b>
                {localW} × {localH}
              </b>
              <span>{(localW / localH).toFixed(2)} : 1</span>
            </div>
          </div>
        </div>

        {/* Background swatches */}
        <div className="mt-3 space-y-1">
          <span className="wb-dims-label">{t("background")}</span>
          <div className="wb-swatches">
            {BG_SWATCHES.map((color) => (
              <button
                key={color}
                type="button"
                className={`wb-swatch${bgColor.toLowerCase() === color ? " wb-swatch-active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => onBgColor(color)}
                title={color}
              />
            ))}
            <button
              type="button"
              className="wb-swatch-custom"
              onClick={() => colorInputRef.current?.click()}
              title={t("custom_color")}
            >
              <Plus className="w-3 h-3" />
            </button>
            <input
              ref={colorInputRef}
              type="color"
              value={bgColor}
              onChange={(e) => onBgColor(e.target.value)}
              className="hidden"
            />

            {/* Gradient + transparency-checker presets (export-safe backgrounds) */}
            <div className="mt-2 flex items-center gap-2" style={{ flexWrap: "wrap" }}>
              {BG_GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="wb-swatch"
                  title={t("bg_gradient")}
                  style={{
                    width: 26,
                    height: 26,
                    background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                  }}
                  onClick={() => onSetBackground({ type: "gradient", from: g.from, to: g.to })}
                />
              ))}
              <button
                type="button"
                className="wb-swatch"
                title={t("bg_checker")}
                style={{
                  width: 26,
                  height: 26,
                  background:
                    "conic-gradient(#ffffff 25%, #d7d0c6 0 50%, #ffffff 0 75%, #d7d0c6 0)",
                  backgroundSize: "12px 12px",
                }}
                onClick={() => onSetBackground({ type: "checker" })}
              />
            </div>
          </div>
        </div>
      </CollapseGroup>

      {/* Enhance — photo adjustments */}
      <CollapseGroup
        title={t("enhance.title")}
        icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
        defaultOpen
      >
        <WbEnhancePanel value={enhance} onChange={onEnhance} t={t} />
      </CollapseGroup>

      {/* AI tools — grouped, collapsed by default */}
      <CollapseGroup title={t("ai_tools")} icon={<Wand2 className="w-3.5 h-3.5" />}>
        <div className="space-y-3">
          <div>
            <span className="wb-dims-label" style={{ marginBottom: 8 }}>
              {t("remove_bg")}
            </span>
            <WbRemoveBgPanel
              task={aiRemoveBg.task}
              run={aiRemoveBg.run}
              onResult={onLoadImage}
              t={t}
            />
          </div>
          <div>
            <span className="wb-dims-label" style={{ marginBottom: 8 }}>
              {t("ai_title")}
            </span>
            <WbAiTitleGenerator
              task={aiTitle.task}
              run={aiTitle.run}
              onResult={onLoadImage}
              t={t}
            />
          </div>
        </div>
      </CollapseGroup>

      {/* Platform presets */}
      <CollapseGroup
        title={t("platform_presets")}
        icon={<MonitorSmartphone className="w-3.5 h-3.5" />}
      >
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

      {/* Appearance — opacity + blend mode for any selected object */}
      {selectedObject && (
        <CollapseGroup
          title={t("appearance_title")}
          icon={<Paintbrush className="w-3.5 h-3.5" />}
          defaultOpen
        >
          <WbAppearancePanel
            opacity={selectedObject.opacity ?? 1}
            blendMode={selectedObject.globalCompositeOperation ?? "source-over"}
            onChange={onUpdateObject}
            t={t}
          />
        </CollapseGroup>
      )}

      {/* Text properties — contextual, only when text is selected */}
      {isText && (
        <CollapseGroup title={t("text")} icon={<Type className="w-3.5 h-3.5" />} defaultOpen>
          <TextProperties
            obj={selectedObject}
            presets={textStylePresets}
            onUpdate={onUpdateObject}
            onApplyPreset={onApplyStylePreset}
            t={t}
          />
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
      {/* Style presets — live font previews */}
      <div className="space-y-1.5">
        <span className="wb-dims-label">{t("quick_styles")}</span>
        <div className="wb-style-grid">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              className="wb-style-card"
              onClick={() => onApplyPreset(p.id)}
            >
              <span className="wb-style-preview">
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
              <span className="wb-style-label">{t(p.labelKey)}</span>
              <span className="wb-style-desc">{t(p.descKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font size slider */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="wb-dims-label">{t("font_size")}</span>
          <span className="font-mono text-xs text-[var(--semi-color-text-3)] tabular-nums">
            {fontSize}px
          </span>
        </div>
        <input
          type="range"
          min={16}
          max={240}
          step={2}
          value={fontSize}
          onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
          className="wb-fs-range"
        />
      </div>

      {/* Fill color */}
      <div className="space-y-1">
        <span className="wb-dims-label">{t("fill_color")}</span>
        <div className="wb-swatches">
          {["#ffffff", "#111111", "#f76a6a", "#2563eb", "#fbbf24", "#22c55e"].map((c) => (
            <button
              key={c}
              type="button"
              className={`wb-swatch${String(obj.fill).toLowerCase() === c ? " wb-swatch-active" : ""}`}
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
            className="wb-swatch-custom"
            onClick={() => document.getElementById("wb-text-fill-color")?.click()}
            title={t("custom_color")}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Stroke */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="wb-dims-label">{t("stroke")}</span>
          <span className="font-mono text-xs text-[var(--semi-color-text-3)] tabular-nums">
            {(obj.strokeWidth as number | undefined) ?? 0}px
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            defaultValue={(obj.stroke as string | undefined) ?? "#000000"}
            onChange={(e) => onUpdate({ stroke: e.target.value })}
            className="w-8 h-7 rounded cursor-pointer border border-[var(--semi-color-border)] bg-transparent p-0.5"
          />
          <input
            type="range"
            min={0}
            max={20}
            defaultValue={(obj.strokeWidth as number | undefined) ?? 0}
            onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) })}
            className="wb-fs-range flex-1"
          />
        </div>
      </div>
    </div>
  );
}
