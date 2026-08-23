"use client";

import * as React from "react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  DesignerDesign,
  DesignerDesignPatch,
  DesignerExportItem,
  DesignerImageFit,
  DesignerStage,
  DesignerStudioProps,
  DesignerTemplate,
  DesignerTemplateCategory,
  DesignerTextAlign,
} from "../../../contracts/sections/designer-studio";

/**
 * Default DesignerStudio - shadcn-styled fallback of the flagship thumbnail
 * design atelier (see the Semi implementation for the full design notes).
 * Same contract: rose hero with mini-canvas, four-stage rail, template
 * gallery, split design studio and export hub. Raw HTML controls so the
 * fallback stays dependency-free.
 */

function downloadItem(item: DesignerExportItem) {
  if (!item.dataUrl) return;
  const a = document.createElement("a");
  a.href = item.dataUrl;
  a.download = `thumbnail-${item.width}x${item.height}.png`;
  a.click();
}

function Hero({
  eyebrow,
  title,
  description,
  badges,
  meta,
  heroCanvas,
  heroCanvasBadge,
  heroCanvasTag,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: DesignerStudioProps["badges"];
  meta?: DesignerStudioProps["meta"];
  heroCanvas?: DesignerStudioProps["heroCanvas"];
  heroCanvasBadge?: ReactNode;
  heroCanvasTag?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-700 via-pink-600 to-fuchsia-700 px-6 py-12 text-white sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            <SmartIcon name="Sparkles" size={13} />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            {description}
          </p>
          {badges && badges.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                    b.tone === "pro"
                      ? "bg-amber-400 text-amber-950"
                      : "bg-white/15 text-white backdrop-blur",
                  )}
                >
                  <SmartIcon
                    name={b.tone === "pro" ? "Crown" : "Check"}
                    size={12}
                  />
                  {b.label}
                </span>
              ))}
            </div>
          ) : null}
          {meta && meta.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/15 px-3 py-1.5 text-xs font-semibold"
                >
                  <SmartIcon name={m.icon} size={13} />
                  {m.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {heroCanvas ? (
          <div className="relative mx-auto w-full max-w-sm" aria-hidden>
            <div
              className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/30"
              style={{
                background: `linear-gradient(135deg, ${heroCanvas.swatch[0]}, ${heroCanvas.swatch[1]})`,
              }}
            >
              <span
                className="absolute left-3 top-3 h-1.5 w-10 rounded-full"
                style={{ background: heroCanvas.accent }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                <span className="text-lg font-black uppercase leading-tight">
                  {heroCanvas.title}
                </span>
                {heroCanvas.subtitle ? (
                  <span className="mt-1 text-[10px] opacity-80">
                    {heroCanvas.subtitle}
                  </span>
                ) : null}
              </div>
              <span className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white/25 backdrop-blur">
                <span className="absolute inset-0 m-auto h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-white" />
              </span>
              <span className="absolute right-3 top-3 rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] font-black">
                HD
              </span>
            </div>
            {heroCanvasBadge ? (
              <span className="absolute -left-3 top-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-rose-600 shadow-lg">
                <SmartIcon name="EyeOpened" size={13} />
                {heroCanvasBadge}
              </span>
            ) : null}
            {heroCanvasTag ? (
              <span className="absolute -bottom-3 -right-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg">
                <SmartIcon name="Maximize2" size={13} />
                {heroCanvasTag}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
function StageRail({
  stage,
  onStageChange,
  stages,
  stageOfLabel,
  stageTotalLabel,
}: {
  stage?: DesignerStage;
  onStageChange?: (stage: DesignerStage) => void;
  stages?: DesignerStudioProps["stages"];
  stageOfLabel?: ReactNode;
  stageTotalLabel?: ReactNode;
}) {
  const list = stages ?? [];
  const activeIndex = Math.max(
    0,
    list.findIndex((s) => s.key === stage),
  );
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {list.map((s, i) => {
          const active = s.key === stage;
          const done = i < activeIndex;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onStageChange?.(s.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all",
                active
                  ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : done
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-border bg-card text-muted-foreground hover:border-rose-300 hover:text-foreground",
              )}
            >
              <span className="inline-flex">
                <SmartIcon name={done ? "Check" : s.icon} size={13} />
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-muted-foreground">
        {stageOfLabel} {activeIndex + 1} {stageTotalLabel} {list.length}
      </span>
    </div>
  );
}

function SourceStage({
  sourceEyebrow,
  sourceTitle,
  sourceHint,
  sourceFormatHint,
  sourcePrivacy,
  urlPlaceholder,
  urlLoadLabel,
  sampleLabel,
  continueLabel,
  hasSource,
  sourcePreview,
  onFile,
  onUrl,
  onSample,
  onStageChange,
}: {
  sourceEyebrow?: ReactNode;
  sourceTitle?: ReactNode;
  sourceHint?: ReactNode;
  sourceFormatHint?: ReactNode;
  sourcePrivacy?: ReactNode;
  urlPlaceholder?: ReactNode;
  urlLoadLabel?: ReactNode;
  sampleLabel?: ReactNode;
  continueLabel?: ReactNode;
  hasSource?: boolean;
  sourcePreview?: string | null;
  onFile?: (file: File) => void;
  onUrl?: (url: string) => void;
  onSample?: () => void;
  onStageChange?: (stage: DesignerStage) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const pick = () => fileRef.current?.click();

  return (
    <section className="space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
          <SmartIcon name="Upload" size={13} />
          {sourceEyebrow}
        </span>
        <h3 className="mt-1 text-2xl font-extrabold">{sourceTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{sourceHint}</p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={pick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") pick();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer?.files?.[0];
          if (file) onFile?.(file);
        }}
        className={cn(
          "mx-auto flex max-w-xl cursor-pointer flex-col items-center gap-2 rounded-3xl border-2 border-dashed px-6 py-14 text-center transition-all",
          dragOver
            ? "border-rose-500 bg-rose-50 shadow-lg shadow-rose-500/20"
            : "border-border bg-card hover:border-rose-300 hover:bg-rose-50/40",
        )}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile?.(file);
            e.target.value = "";
          }}
        />
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30">
          <SmartIcon name="ImageIcon" size={26} />
        </span>
        <span className="mt-2 text-base font-bold">{sourceHint}</span>
        <span className="text-xs text-muted-foreground">
          {sourceFormatHint}
        </span>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row">
        <div className="flex w-full items-center gap-2">
          <div className="relative flex-1">
            <SmartIcon name="Link2" size={14} />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && url.trim()) onUrl?.(url.trim());
              }}
              placeholder={String(urlPlaceholder ?? "")}
              className="w-full rounded-xl border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-rose-400"
            />
          </div>
          <button
            type="button"
            onClick={() => url.trim() && onUrl?.(url.trim())}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            {urlLoadLabel}
          </button>
        </div>
        <button
          type="button"
          onClick={onSample}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline"
        >
          <SmartIcon name="Wand2" size={14} />
          {sampleLabel}
        </button>
      </div>

      {hasSource && sourcePreview ? (
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sourcePreview}
            alt=""
            className="h-20 w-36 rounded-xl border object-cover"
          />
          <div className="flex flex-1 flex-col items-center gap-2 sm:items-end">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <SmartIcon name="CheckCircle2" size={15} />
              {sourceEyebrow}
            </span>
            <button
              type="button"
              onClick={() => onStageChange?.("templates")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition-transform hover:-translate-y-0.5"
            >
              {continueLabel}
              <SmartIcon name="ArrowRight" size={15} />
            </button>
          </div>
        </div>
      ) : null}

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <SmartIcon name="Shield" size={13} />
        {sourcePrivacy}
      </p>
    </section>
  );
}

function TemplatePreview({
  template,
  large,
}: {
  template: DesignerTemplate;
  large?: boolean;
}) {
  const d = template.design;
  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl px-3 text-center",
        large && "rounded-2xl",
      )}
      style={{
        background: `linear-gradient(135deg, ${template.swatch[0]}, ${template.swatch[1]})`,
      }}
    >
      <span
        className="absolute left-2.5 top-2.5 h-1 w-8 rounded-full"
        style={{ background: template.accent }}
      />
      <div style={{ color: d.titleColor }}>
        <span
          className={cn(
            "block font-black uppercase leading-tight",
            large ? "text-2xl" : "text-sm",
          )}
        >
          {d.title || "TITLE"}
        </span>
        {d.subtitle ? (
          <span
            className={cn(
              "mt-0.5 block opacity-80",
              large ? "text-[11px]" : "text-[8px]",
            )}
          >
            {d.subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TemplatesStage({
  templatesEyebrow,
  templatesTitle,
  templatesHint,
  featuredLabel,
  useTemplateLabel,
  appliedLabel,
  skipLabel,
  emptyLabel,
  templateCategories,
  templates,
  appliedTemplateId,
  onApplyTemplate,
  onSkipTemplates,
}: {
  templatesEyebrow?: ReactNode;
  templatesTitle?: ReactNode;
  templatesHint?: ReactNode;
  featuredLabel?: ReactNode;
  useTemplateLabel?: ReactNode;
  appliedLabel?: ReactNode;
  skipLabel?: ReactNode;
  emptyLabel?: ReactNode;
  templateCategories?: DesignerStudioProps["templateCategories"];
  templates?: DesignerTemplate[];
  appliedTemplateId?: string | null;
  onApplyTemplate?: (t: DesignerTemplate) => void;
  onSkipTemplates?: () => void;
}) {
  const [category, setCategory] = useState<DesignerTemplateCategory | "all">(
    "all",
  );
  const all = templates ?? [];
  const featured = all.slice(0, 3);
  const visible =
    category === "all" ? all : all.filter((t) => t.category === category);
  const cats = [
    { key: "all" as const, label: templatesEyebrow },
    ...(templateCategories ?? []),
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
          <SmartIcon name="LayoutTemplate" size={13} />
          {templatesEyebrow}
        </span>
        <h3 className="mt-1 text-2xl font-extrabold">{templatesTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{templatesHint}</p>
      </div>

      {featured.length > 0 ? (
        <div>
          <span className="mb-2 flex items-center gap-1.5 text-sm font-bold">
            <SmartIcon name="Star" size={14} />
            {featuredLabel}
          </span>
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onApplyTemplate?.(t)}
                className="group overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/10"
              >
                <TemplatePreview template={t} large />
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-bold">{t.name}</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: t.accent }}
                  >
                    {t.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-1.5">
        {cats.map((c) => (
          <button
            key={String(c.key)}
            type="button"
            onClick={() => setCategory(c.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
              category === c.key
                ? "bg-rose-600 text-white"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((t) => {
            const applied = appliedTemplateId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onApplyTemplate?.(t)}
                className="group overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/10"
              >
                <TemplatePreview template={t} />
                <div className="space-y-2 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold">{t.name}</span>
                    {applied ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {appliedLabel}
                      </span>
                    ) : null}
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {t.description}
                  </p>
                  <span
                    className={cn(
                      "block rounded-lg py-1.5 text-center text-xs font-bold",
                      applied
                        ? "border text-muted-foreground"
                        : "bg-rose-600 text-white group-hover:bg-rose-500",
                    )}
                  >
                    {applied ? appliedLabel : useTemplateLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onSkipTemplates}
          className="text-sm font-semibold text-muted-foreground hover:text-rose-600"
        >
          {skipLabel}
        </button>
      </div>
    </section>
  );
}

// ── Design stage ─────────────────────────────────────────────────────────────

function SettingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-bold text-muted-foreground">{children}</span>
  );
}

function TextRow({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: ReactNode;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <SettingLabel>{label}</SettingLabel>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-rose-400"
      />
    </div>
  );
}

function SliderRow({
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SettingLabel>{label}</SettingLabel>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-bold tabular-nums">
          {value}
          {unit ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-rose-600"
      />
    </div>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <SettingLabel>{label}</SettingLabel>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-rose-600" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </label>
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <SettingLabel>{label}</SettingLabel>
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-2 py-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-8 cursor-pointer border-0 bg-transparent p-0"
        />
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {value}
        </span>
      </label>
    </div>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<{ value: string; label: ReactNode }>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-xl border bg-muted/40 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
            value === o.value
              ? "bg-white text-rose-600 shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
function DesignStage({
  designEyebrow,
  designTitle,
  designHint,
  previewTag,
  templatesButtonLabel,
  resetLabel,
  backToTemplatesLabel,
  continueExportLabel,
  canvasGroupLabel,
  imageGroupLabel,
  textGroupLabel,
  fitCoverLabel,
  fitContainLabel,
  alignLeftLabel,
  alignCenterLabel,
  backgroundLabel,
  cornerRadiusLabel,
  borderLabel,
  borderColorLabel,
  borderWidthLabel,
  fitLabel,
  brightnessLabel,
  contrastLabel,
  saturationLabel,
  titleLabel,
  subtitleLabel,
  textColorLabel,
  titleSizeLabel,
  positionLabel,
  alignmentLabel,
  shadowLabel,
  designTip,
  design,
  previewUrl,
  onUpdateDesign,
  onResetDesign,
  onOpenTemplates,
  onStageChange,
}: {
  designEyebrow?: ReactNode;
  designTitle?: ReactNode;
  designHint?: ReactNode;
  previewTag?: ReactNode;
  templatesButtonLabel?: ReactNode;
  resetLabel?: ReactNode;
  backToTemplatesLabel?: ReactNode;
  continueExportLabel?: ReactNode;
  canvasGroupLabel?: ReactNode;
  imageGroupLabel?: ReactNode;
  textGroupLabel?: ReactNode;
  fitCoverLabel?: ReactNode;
  fitContainLabel?: ReactNode;
  alignLeftLabel?: ReactNode;
  alignCenterLabel?: ReactNode;
  backgroundLabel?: ReactNode;
  cornerRadiusLabel?: ReactNode;
  borderLabel?: ReactNode;
  borderColorLabel?: ReactNode;
  borderWidthLabel?: ReactNode;
  fitLabel?: ReactNode;
  brightnessLabel?: ReactNode;
  contrastLabel?: ReactNode;
  saturationLabel?: ReactNode;
  titleLabel?: ReactNode;
  subtitleLabel?: ReactNode;
  textColorLabel?: ReactNode;
  titleSizeLabel?: ReactNode;
  positionLabel?: ReactNode;
  alignmentLabel?: ReactNode;
  shadowLabel?: ReactNode;
  designTip?: ReactNode;
  design?: DesignerDesign;
  previewUrl?: string | null;
  onUpdateDesign?: (patch: DesignerDesignPatch) => void;
  onResetDesign?: () => void;
  onOpenTemplates?: () => void;
  onStageChange?: (stage: DesignerStage) => void;
}) {
  const d = design;
  const update = onUpdateDesign;

  const groups = [
    {
      key: "canvas",
      icon: "Palette",
      title: canvasGroupLabel,
      children: (
        <div className="space-y-4">
          <ColorRow
            label={backgroundLabel}
            value={d?.bgColor ?? "#0f172a"}
            onChange={(v) => update?.({ bgColor: v })}
          />
          <SliderRow
            label={cornerRadiusLabel}
            value={d?.rounded ?? 0}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => update?.({ rounded: v })}
          />
          <SwitchRow
            label={borderLabel}
            checked={d?.showBorder ?? false}
            onChange={(v) => update?.({ showBorder: v })}
          />
          {d?.showBorder ? (
            <>
              <ColorRow
                label={borderColorLabel}
                value={d.borderColor}
                onChange={(v) => update?.({ borderColor: v })}
              />
              <SliderRow
                label={borderWidthLabel}
                value={d.borderWidth}
                min={0}
                max={40}
                unit="px"
                onChange={(v) => update?.({ borderWidth: v })}
              />
            </>
          ) : null}
        </div>
      ),
    },
    {
      key: "image",
      icon: "ImageIcon",
      title: imageGroupLabel,
      children: (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <SettingLabel>{fitLabel}</SettingLabel>
            <div className="w-44 shrink-0">
              <Segmented
                value={d?.imageFit ?? "cover"}
                options={[
                  { value: "cover", label: fitCoverLabel },
                  { value: "contain", label: fitContainLabel },
                ]}
                onChange={(v) => update?.({ imageFit: v as DesignerImageFit })}
              />
            </div>
          </div>
          <SliderRow
            label={brightnessLabel}
            value={d?.effects.brightness ?? 0}
            min={-100}
            max={100}
            onChange={(v) => update?.({ effects: { brightness: v } })}
          />
          <SliderRow
            label={contrastLabel}
            value={d?.effects.contrast ?? 0}
            min={-100}
            max={100}
            onChange={(v) => update?.({ effects: { contrast: v } })}
          />
          <SliderRow
            label={saturationLabel}
            value={d?.effects.saturation ?? 0}
            min={-100}
            max={100}
            onChange={(v) => update?.({ effects: { saturation: v } })}
          />
        </div>
      ),
    },
    {
      key: "text",
      icon: "Type",
      title: textGroupLabel,
      children: (
        <div className="space-y-4">
          <TextRow
            label={titleLabel}
            value={d?.title ?? ""}
            placeholder="Headline"
            onChange={(v) => update?.({ title: v })}
          />
          <TextRow
            label={subtitleLabel}
            value={d?.subtitle ?? ""}
            placeholder="Subheadline"
            onChange={(v) => update?.({ subtitle: v })}
          />
          <ColorRow
            label={textColorLabel}
            value={d?.titleColor ?? "#ffffff"}
            onChange={(v) => update?.({ titleColor: v })}
          />
          <SliderRow
            label={titleSizeLabel}
            value={d?.titleSize ?? 96}
            min={36}
            max={180}
            unit="px"
            onChange={(v) => update?.({ titleSize: v })}
          />
          <SliderRow
            label={positionLabel}
            value={d?.textY ?? 50}
            min={5}
            max={95}
            unit="%"
            onChange={(v) => update?.({ textY: v })}
          />
          <div className="flex items-center justify-between gap-3">
            <SettingLabel>{alignmentLabel}</SettingLabel>
            <div className="w-44 shrink-0">
              <Segmented
                value={d?.titleAlign ?? "center"}
                options={[
                  { value: "left", label: alignLeftLabel },
                  { value: "center", label: alignCenterLabel },
                ]}
                onChange={(v) =>
                  update?.({ titleAlign: v as DesignerTextAlign })
                }
              />
            </div>
          </div>
          <SwitchRow
            label={shadowLabel}
            checked={d?.shadow ?? true}
            onChange={(v) => update?.({ shadow: v })}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border bg-card p-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
            <SmartIcon name="Palette" size={13} />
            {designEyebrow}
          </span>
          <h3 className="mt-1 text-2xl font-extrabold">{designTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{designHint}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            <SmartIcon name="Maximize2" size={13} />
            {previewTag}
          </span>
          <button
            type="button"
            onClick={onOpenTemplates}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            <SmartIcon name="LayoutTemplate" size={14} />
            {templatesButtonLabel}
          </button>
          <button
            type="button"
            onClick={onResetDesign}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-rose-600"
          >
            <SmartIcon name="RefreshCcw" size={14} />
            {resetLabel}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border bg-card p-4 sm:p-6">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-inner"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#e2e8f0 0% 25%, #f8fafc 0% 50%)",
              backgroundSize: "22px 22px",
            }}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                <SmartIcon name="Loader2" size={20} className="animate-spin" />
                Rendering…
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <SmartIcon name="Maximize2" size={13} />
              {previewTag}
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold tabular-nums text-muted-foreground">
              16:9 · 1280 × 720
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {groups.map((g) => (
            <div
              key={g.key}
              className="overflow-hidden rounded-2xl border bg-card"
            >
              <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5 text-sm font-extrabold">
                <SmartIcon name={g.icon} size={15} className="text-rose-600" />
                {g.title}
              </div>
              <div className="p-4">{g.children}</div>
            </div>
          ))}
          <p className="flex items-start gap-1.5 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700">
            <SmartIcon name="Bolt" size={13} className="mt-0.5 shrink-0" />
            {designTip}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onStageChange?.("templates")}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-rose-600"
        >
          <SmartIcon name="ArrowLeft" size={14} />
          {backToTemplatesLabel}
        </button>
        <button
          type="button"
          onClick={() => onStageChange?.("export")}
          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition-transform hover:-translate-y-0.5"
        >
          {continueExportLabel}
          <SmartIcon name="ArrowRight" size={15} />
        </button>
      </div>
    </section>
  );
}
// ── Export stage ─────────────────────────────────────────────────────────────

function ExportStage({
  exportEyebrow,
  exportTitle,
  exportHint,
  exportAllLabel,
  exportAllTip,
  downloadLabel,
  downloadAllLabel,
  renderedTitle,
  downloadsTitle,
  recommendedLabel,
  embedTitle,
  embedHint,
  successTitle,
  successDesc,
  backToDesignLabel,
  startOverLabel,
  formatLabel,
  dimensionsLabel,
  exportItems,
  exporting,
  exportError,
  onExport,
  onBackToDesign,
  onStartOver,
}: {
  exportEyebrow?: ReactNode;
  exportTitle?: ReactNode;
  exportHint?: ReactNode;
  exportAllLabel?: ReactNode;
  exportAllTip?: ReactNode;
  downloadLabel?: ReactNode;
  downloadAllLabel?: ReactNode;
  renderedTitle?: ReactNode;
  downloadsTitle?: ReactNode;
  recommendedLabel?: ReactNode;
  embedTitle?: ReactNode;
  embedHint?: ReactNode;
  successTitle?: ReactNode;
  successDesc?: ReactNode;
  backToDesignLabel?: ReactNode;
  startOverLabel?: ReactNode;
  formatLabel?: ReactNode;
  dimensionsLabel?: ReactNode;
  exportItems?: DesignerExportItem[];
  exporting?: boolean;
  exportError?: string | null;
  onExport?: () => void;
  onBackToDesign?: () => void;
  onStartOver?: () => void;
}) {
  const items = exportItems ?? [];
  const ready = items.length > 0;
  const embed = React.useMemo(() => {
    const hd = items.find((i) => i.width === 1280);
    return hd?.dataUrl
      ? '<img src="' +
          hd.dataUrl +
          '" width="1280" height="720" alt="YouTube thumbnail" />'
      : "";
  }, [items]);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
          <SmartIcon name="Download" size={13} />
          {exportEyebrow}
        </span>
        <h3 className="mt-1 text-2xl font-extrabold">{exportTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{exportHint}</p>
      </div>

      {exporting ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card py-16 text-center">
          <SmartIcon
            name="Loader2"
            size={28}
            className="animate-spin text-rose-600"
          />
          <p className="text-sm font-semibold text-muted-foreground">
            {exportAllTip}
          </p>
        </div>
      ) : ready ? (
        <>
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
              <SmartIcon name="CheckCircle2" size={30} />
            </span>
            <h4 className="text-xl font-extrabold text-emerald-800">
              {successTitle}
            </h4>
            <p className="text-sm text-emerald-700/80">{successDesc}</p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h4 className="mb-3 text-sm font-extrabold">{renderedTitle}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.width}
                  className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-4 py-2.5"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <SmartIcon
                      name="Check"
                      size={14}
                      className="text-emerald-500"
                    />
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {item.width} × {item.height}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-sm font-extrabold">{downloadsTitle}</h4>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-700">
                  {recommendedLabel}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    items.forEach((item, i) => {
                      setTimeout(() => downloadItem(item), i * 180);
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-rose-500/30 transition-transform hover:-translate-y-0.5"
                >
                  <SmartIcon name="Download" size={14} />
                  {downloadAllLabel}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-3 font-bold">{formatLabel}</th>
                    <th className="py-2 pr-3 font-bold">{dimensionsLabel}</th>
                    <th className="py-2 text-right font-bold">
                      {downloadLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.width} className="border-b last:border-0">
                      <td className="py-2.5 pr-3">
                        <span className="flex items-center gap-3">
                          {item.dataUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.dataUrl}
                              alt={item.label}
                              className="h-10 w-[68px] shrink-0 rounded-md border object-cover"
                            />
                          ) : (
                            <span className="block h-10 w-[68px] shrink-0 rounded-md border bg-muted" />
                          )}
                          <span className="font-semibold">{item.label}</span>
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-xs font-semibold tabular-nums text-muted-foreground">
                        {item.width} × {item.height}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          disabled={!item.dataUrl}
                          onClick={() => downloadItem(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors hover:border-rose-300 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <SmartIcon name="Download" size={13} />
                          {downloadLabel}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {embed ? (
            <div className="rounded-2xl border bg-card p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-sm font-extrabold">{embedTitle}</h4>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(embed)}
                  title={String(embedHint ?? "")}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors hover:border-rose-300 hover:text-rose-600"
                >
                  <SmartIcon name="Copy" size={13} />
                </button>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">{embedHint}</p>
              <code className="block overflow-x-auto whitespace-pre rounded-xl bg-slate-950 px-4 py-3 text-xs text-emerald-300">
                &lt;img
                src=&quot;data:image/png;base64,&hellip;&quot;&hellip;&gt;
              </code>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SmartIcon name="RefreshCw" size={26} />
          </span>
          <p className="max-w-md text-sm text-muted-foreground">
            {exportAllTip}
          </p>
          {!exportError ? (
            <button
              type="button"
              onClick={onExport}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition-transform hover:-translate-y-0.5"
            >
              <SmartIcon name="RefreshCw" size={15} />
              {exportAllLabel}
            </button>
          ) : null}
          {exportError ? (
            <p className="text-xs font-semibold text-red-600">{exportError}</p>
          ) : null}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToDesign}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-rose-600"
        >
          <SmartIcon name="ArrowLeft" size={14} />
          {backToDesignLabel}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition-colors hover:border-rose-300 hover:text-rose-600"
        >
          <SmartIcon name="RefreshCcw" size={14} />
          {startOverLabel}
        </button>
      </div>
    </section>
  );
}
// ── DesignerStudio ───────────────────────────────────────────────────────────

export function DesignerStudio({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  badges,
  meta,
  heroCanvas,
  heroCanvasBadge,
  heroCanvasTag,
  stage,
  onStageChange,
  stages,
  stageOfLabel,
  stageTotalLabel,
  sourceEyebrow,
  sourceTitle,
  sourceHint,
  sourceFormatHint,
  sourcePrivacy,
  urlPlaceholder,
  urlLoadLabel,
  sampleLabel,
  continueLabel,
  hasSource,
  sourcePreview,
  onFile,
  onUrl,
  onSample,
  templatesEyebrow,
  templatesTitle,
  templatesHint,
  featuredLabel,
  useTemplateLabel,
  appliedLabel,
  skipLabel,
  emptyLabel,
  templateCategories,
  templates,
  appliedTemplateId,
  onApplyTemplate,
  onSkipTemplates,
  designEyebrow,
  designTitle,
  designHint,
  previewTag,
  templatesButtonLabel,
  resetLabel,
  backToTemplatesLabel,
  continueExportLabel,
  canvasGroupLabel,
  imageGroupLabel,
  textGroupLabel,
  fitCoverLabel,
  fitContainLabel,
  alignLeftLabel,
  alignCenterLabel,
  backgroundLabel,
  cornerRadiusLabel,
  borderLabel,
  borderColorLabel,
  borderWidthLabel,
  fitLabel,
  brightnessLabel,
  contrastLabel,
  saturationLabel,
  titleLabel,
  subtitleLabel,
  textColorLabel,
  titleSizeLabel,
  positionLabel,
  alignmentLabel,
  shadowLabel,
  designTip,
  design,
  previewUrl,
  onUpdateDesign,
  onResetDesign,
  onOpenTemplates,
  exportEyebrow,
  exportTitle,
  exportHint,
  exportAllLabel,
  exportAllTip,
  downloadLabel,
  downloadAllLabel,
  renderedTitle,
  downloadsTitle,
  recommendedLabel,
  embedTitle,
  embedHint,
  successTitle,
  successDesc,
  backToDesignLabel,
  startOverLabel,
  formatLabel,
  dimensionsLabel,
  exportItems,
  exporting,
  exportError,
  onExport,
  onBackToDesign,
  onStartOver,
  footerHint,
}: DesignerStudioProps) {
  const active = stage ?? "source";

  return (
    <div
      className={cn(
        "mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6",
        className,
      )}
      data-registry={dataRegistry}
    >
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        badges={badges}
        meta={meta}
        heroCanvas={heroCanvas}
        heroCanvasBadge={heroCanvasBadge}
        heroCanvasTag={heroCanvasTag}
      />

      <div className="space-y-8">
        <StageRail
          stage={active}
          onStageChange={onStageChange}
          stages={stages}
          stageOfLabel={stageOfLabel}
          stageTotalLabel={stageTotalLabel}
        />
        {active === "source" ? (
          <SourceStage
            sourceEyebrow={sourceEyebrow}
            sourceTitle={sourceTitle}
            sourceHint={sourceHint}
            sourceFormatHint={sourceFormatHint}
            sourcePrivacy={sourcePrivacy}
            urlPlaceholder={urlPlaceholder}
            urlLoadLabel={urlLoadLabel}
            sampleLabel={sampleLabel}
            continueLabel={continueLabel}
            hasSource={hasSource}
            sourcePreview={sourcePreview}
            onFile={onFile}
            onUrl={onUrl}
            onSample={onSample}
            onStageChange={onStageChange}
          />
        ) : null}

        {active === "templates" ? (
          <TemplatesStage
            templatesEyebrow={templatesEyebrow}
            templatesTitle={templatesTitle}
            templatesHint={templatesHint}
            featuredLabel={featuredLabel}
            useTemplateLabel={useTemplateLabel}
            appliedLabel={appliedLabel}
            skipLabel={skipLabel}
            emptyLabel={emptyLabel}
            templateCategories={templateCategories}
            templates={templates}
            appliedTemplateId={appliedTemplateId}
            onApplyTemplate={onApplyTemplate}
            onSkipTemplates={onSkipTemplates}
          />
        ) : null}

        {active === "design" ? (
          <DesignStage
            designEyebrow={designEyebrow}
            designTitle={designTitle}
            designHint={designHint}
            previewTag={previewTag}
            templatesButtonLabel={templatesButtonLabel}
            resetLabel={resetLabel}
            backToTemplatesLabel={backToTemplatesLabel}
            continueExportLabel={continueExportLabel}
            canvasGroupLabel={canvasGroupLabel}
            imageGroupLabel={imageGroupLabel}
            textGroupLabel={textGroupLabel}
            fitCoverLabel={fitCoverLabel}
            fitContainLabel={fitContainLabel}
            alignLeftLabel={alignLeftLabel}
            alignCenterLabel={alignCenterLabel}
            backgroundLabel={backgroundLabel}
            cornerRadiusLabel={cornerRadiusLabel}
            borderLabel={borderLabel}
            borderColorLabel={borderColorLabel}
            borderWidthLabel={borderWidthLabel}
            fitLabel={fitLabel}
            brightnessLabel={brightnessLabel}
            contrastLabel={contrastLabel}
            saturationLabel={saturationLabel}
            titleLabel={titleLabel}
            subtitleLabel={subtitleLabel}
            textColorLabel={textColorLabel}
            titleSizeLabel={titleSizeLabel}
            positionLabel={positionLabel}
            alignmentLabel={alignmentLabel}
            shadowLabel={shadowLabel}
            designTip={designTip}
            design={design}
            previewUrl={previewUrl}
            onUpdateDesign={onUpdateDesign}
            onResetDesign={onResetDesign}
            onOpenTemplates={onOpenTemplates}
            onStageChange={onStageChange}
          />
        ) : null}

        {active === "export" ? (
          <ExportStage
            exportEyebrow={exportEyebrow}
            exportTitle={exportTitle}
            exportHint={exportHint}
            exportAllLabel={exportAllLabel}
            exportAllTip={exportAllTip}
            downloadLabel={downloadLabel}
            downloadAllLabel={downloadAllLabel}
            renderedTitle={renderedTitle}
            downloadsTitle={downloadsTitle}
            recommendedLabel={recommendedLabel}
            embedTitle={embedTitle}
            embedHint={embedHint}
            successTitle={successTitle}
            successDesc={successDesc}
            backToDesignLabel={backToDesignLabel}
            startOverLabel={startOverLabel}
            formatLabel={formatLabel}
            dimensionsLabel={dimensionsLabel}
            exportItems={exportItems}
            exporting={exporting}
            exportError={exportError}
            onExport={onExport}
            onBackToDesign={onBackToDesign}
            onStartOver={onStartOver}
          />
        ) : null}

        {footerHint ? (
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <SmartIcon name="InfoIcon" size={13} />
            {footerHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default DesignerStudio;
