"use client";

import * as React from "react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
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
} from "@template/ui";

import { Button } from "../components/button";
import { Card } from "../components/card";
import { Collapse } from "../components/collapse";
import { CopyText } from "../components/copy-text";
import { Empty } from "../components/empty";
import { Input } from "../components/input";
import { InputNumber } from "../components/input-number";
import { Spin } from "../components/spin";
import { Table } from "../components/table";
import { Tabs } from "../components/tabs";
import { Tag } from "../components/tag";
import { Timeline } from "../components/timeline";
import { SmartIcon } from "../icons";
import {
  cn,
  ColorRow,
  Segmented,
  SettingLabel,
  SliderRow,
  SwitchRow,
} from "./designer-studio-controls";

/**
 * Semi DesignerStudio - the flagship thumbnail design atelier.
 *
 * Visual language shared with the other studios, given a rose "creative
 * atelier" identity: a gradient hero with a floating mini-canvas, a four-stage
 * rail (Source -> Templates -> Design -> Export), a template gallery with live
 * CSS previews, a split design studio (checkerboard canvas + grouped settings)
 * and an export hub (rendered-sizes timeline + downloads table + HTML embed).
 * All data + callbacks come from the app; this section only renders.
 */

function downloadItem(item: DesignerExportItem) {
  if (!item.dataUrl) return;
  const a = document.createElement("a");
  a.href = item.dataUrl;
  a.download = `thumbnail-${item.width}x${item.height}.png`;
  a.click();
}

// ── Hero ─────────────────────────────────────────────────────────────────────

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
    <div className="designstudio-hero">
      <div className="designstudio-hero-dots" />
      <div className="designstudio-hero-inner">
        <div className="designstudio-hero-copy">
          <span className="designstudio-eyebrow">
            <SmartIcon name="Sparkles" size={14} />
            {eyebrow}
          </span>
          <h2 className="designstudio-title">{title}</h2>
          <p className="designstudio-desc">{description}</p>
          {badges && badges.length > 0 ? (
            <div className="designstudio-badges">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className={cn(
                    "designstudio-badge",
                    b.tone === "free" && "designstudio-badge-free",
                    b.tone === "pro" && "designstudio-badge-pro",
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
            <div className="designstudio-meta">
              {meta.map((m, i) => (
                <span key={i} className="designstudio-meta-chip">
                  <SmartIcon name={m.icon} size={14} />
                  {m.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {heroCanvas ? (
          <div className="designstudio-hero-art" aria-hidden>
            <div
              className="designstudio-hero-canvas"
              style={{
                background: `linear-gradient(135deg, ${heroCanvas.swatch[0]}, ${heroCanvas.swatch[1]})`,
              }}
            >
              <span
                className="designstudio-hero-canvas-accent"
                style={{ background: heroCanvas.accent }}
              />
              <div className="designstudio-hero-canvas-text">
                <span className="designstudio-hero-canvas-title">
                  {heroCanvas.title}
                </span>
                {heroCanvas.subtitle ? (
                  <span className="designstudio-hero-canvas-sub">
                    {heroCanvas.subtitle}
                  </span>
                ) : null}
              </div>
              <span className="designstudio-hero-canvas-play" />
              <span className="designstudio-hero-canvas-hd">HD</span>
            </div>
            {heroCanvasBadge ? (
              <span className="designstudio-float-chip designstudio-float-chip-badge">
                <SmartIcon name="EyeOpened" size={13} />
                {heroCanvasBadge}
              </span>
            ) : null}
            {heroCanvasTag ? (
              <span className="designstudio-float-chip designstudio-float-chip-tag">
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

// ── Stage rail ───────────────────────────────────────────────────────────────

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
    <div className="designstudio-rail">
      <div className="designstudio-rail-steps">
        {list.map((s, i) => {
          const active = s.key === stage;
          const done = i < activeIndex;
          return (
            <button
              key={s.key}
              type="button"
              className={cn(
                "designstudio-rail-step",
                active && "designstudio-rail-step-active",
                done && "designstudio-rail-step-done",
              )}
              onClick={() => onStageChange?.(s.key)}
            >
              <span className="designstudio-rail-ic">
                {done ? (
                  <SmartIcon name="Check" size={13} />
                ) : (
                  <SmartIcon name={s.icon} size={15} />
                )}
              </span>
              <span className="designstudio-rail-label">{s.label}</span>
            </button>
          );
        })}
      </div>
      <span className="designstudio-rail-count">
        {stageOfLabel} {activeIndex + 1} {stageTotalLabel} {list.length}
      </span>
    </div>
  );
}
// ── Source stage ─────────────────────────────────────────────────────────────

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
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) onFile?.(file);
  };
  const loadUrl = () => {
    const v = url.trim();
    if (v) onUrl?.(v);
  };

  return (
    <div className="designstudio-stage designstudio-source">
      <div className="designstudio-stage-head">
        <span className="designstudio-stage-eyebrow">
          <SmartIcon name="Upload" size={13} />
          {sourceEyebrow}
        </span>
        <h3 className="designstudio-stage-title">{sourceTitle}</h3>
        <p className="designstudio-stage-hint">{sourceHint}</p>
      </div>

      <div
        className={cn(
          "designstudio-drop",
          dragOver && "designstudio-drop-over",
        )}
        onClick={pick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") pick();
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="designstudio-hidden-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile?.(file);
            e.target.value = "";
          }}
        />
        <span className="designstudio-drop-ring">
          <SmartIcon name="ImageIcon" size={26} />
        </span>
        <span className="designstudio-drop-main">{sourceHint}</span>
        <span className="designstudio-drop-sub">{sourceFormatHint}</span>
      </div>

      <div className="designstudio-source-row">
        <div className="designstudio-url">
          <Input
            size="md"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadUrl();
            }}
            placeholder={String(urlPlaceholder ?? "")}
            prefix={<SmartIcon name="Link2" size={14} />}
            className="designstudio-url-input"
          />
          <Button type="button" size="md" variant="outline" onClick={loadUrl}>
            {urlLoadLabel}
          </Button>
        </div>
        <Button type="button" size="md" variant="ghost" onClick={onSample}>
          <SmartIcon name="Wand2" size={14} />
          {sampleLabel}
        </Button>
      </div>

      {hasSource && sourcePreview ? (
        <div className="designstudio-source-preview">
          <span className="designstudio-source-thumb-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sourcePreview}
              alt=""
              className="designstudio-source-thumb"
            />
          </span>
          <div className="designstudio-source-preview-copy">
            <span className="designstudio-source-ready">
              <SmartIcon name="CheckCircle2" size={15} />
              {sourceEyebrow}
            </span>
            <Button
              type="button"
              size="lg"
              iconRight={<SmartIcon name="ArrowRight" size={15} />}
              onClick={() => onStageChange?.("templates")}
            >
              {continueLabel}
            </Button>
          </div>
        </div>
      ) : null}

      <p className="designstudio-source-privacy">
        <SmartIcon name="Shield" size={13} />
        {sourcePrivacy}
      </p>
    </div>
  );
}

// ── Templates stage ──────────────────────────────────────────────────────────

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
        "designstudio-tpl-preview",
        large && "designstudio-tpl-preview-lg",
      )}
      style={{
        background: `linear-gradient(135deg, ${template.swatch[0]}, ${template.swatch[1]})`,
      }}
    >
      <span
        className="designstudio-tpl-accent"
        style={{ background: template.accent }}
      />
      <div className="designstudio-tpl-text" style={{ color: d.titleColor }}>
        <span className="designstudio-tpl-title">{d.title || "TITLE"}</span>
        {d.subtitle ? (
          <span className="designstudio-tpl-sub">{d.subtitle}</span>
        ) : null}
      </div>
      <span className="designstudio-tpl-play" />
    </div>
  );
}

function TemplateCard({
  template,
  applied,
  appliedLabel,
  useTemplateLabel,
  onApply,
}: {
  template: DesignerTemplate;
  applied: boolean;
  appliedLabel?: ReactNode;
  useTemplateLabel?: ReactNode;
  onApply: (t: DesignerTemplate) => void;
}) {
  return (
    <Card
      interactive
      padding="sm"
      className="designstudio-tpl-card"
      onClick={() => onApply(template)}
    >
      <TemplatePreview template={template} />
      <div className="designstudio-tpl-card-body">
        <div className="designstudio-tpl-card-head">
          <span className="designstudio-tpl-name">{template.name}</span>
          {applied ? (
            <Tag color="green" size="small">
              {appliedLabel}
            </Tag>
          ) : null}
        </div>
        <p className="designstudio-tpl-desc">{template.description}</p>
        <Button
          type="button"
          size="sm"
          variant={applied ? "outline" : "default"}
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onApply(template);
          }}
        >
          {applied ? appliedLabel : useTemplateLabel}
        </Button>
      </div>
    </Card>
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

  const tabs = [
    { key: "all", label: templatesEyebrow },
    ...(templateCategories ?? []).map((c) => ({ key: c.key, label: c.label })),
  ];

  return (
    <div className="designstudio-stage designstudio-templates">
      <div className="designstudio-stage-head">
        <span className="designstudio-stage-eyebrow">
          <SmartIcon name="LayoutTemplate" size={13} />
          {templatesEyebrow}
        </span>
        <h3 className="designstudio-stage-title">{templatesTitle}</h3>
        <p className="designstudio-stage-hint">{templatesHint}</p>
      </div>

      {featured.length > 0 ? (
        <div className="designstudio-featured">
          <div className="designstudio-featured-head">
            <span className="designstudio-featured-label">
              <SmartIcon name="Star" size={13} />
              {featuredLabel}
            </span>
          </div>
          <div className="designstudio-featured-row">
            {featured.map((t) => (
              <Card
                key={t.id}
                interactive
                padding="none"
                className="designstudio-featured-card"
                onClick={() => onApplyTemplate?.(t)}
              >
                <TemplatePreview template={t} large />
                <div className="designstudio-featured-meta">
                  <span className="designstudio-featured-name">{t.name}</span>
                  <span
                    className="designstudio-featured-cat"
                    style={{ color: t.accent }}
                  >
                    {t.category}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      <div className="designstudio-tpl-tabs">
        <Tabs
          type="segment"
          size="small"
          items={tabs}
          activeKey={category}
          onChange={(key) =>
            setCategory(key as DesignerTemplateCategory | "all")
          }
          className="designstudio-tpl-tabs-inner"
        />
      </div>

      {visible.length === 0 ? (
        <Empty description={String(emptyLabel ?? "")} />
      ) : (
        <div className="designstudio-tpl-grid">
          {visible.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              applied={appliedTemplateId === t.id}
              appliedLabel={appliedLabel}
              useTemplateLabel={useTemplateLabel}
              onApply={(tt) => onApplyTemplate?.(tt)}
            />
          ))}
        </div>
      )}

      <div className="designstudio-tpl-skip">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onSkipTemplates}
        >
          {skipLabel}
        </Button>
      </div>
    </div>
  );
}

// ── Design stage ─────────────────────────────────────────────────────────────

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

  const canvasItems = [
    {
      key: "canvas",
      title: (
        <span className="designstudio-collapse-title">
          <SmartIcon name="Palette" size={15} />
          {canvasGroupLabel}
        </span>
      ),
      children: (
        <div className="designstudio-settings">
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
              <div className="designstudio-setting-row">
                <SettingLabel>{borderWidthLabel}</SettingLabel>
                <InputNumber
                  size="sm"
                  min={0}
                  max={40}
                  value={d.borderWidth}
                  onChange={(v) => v != null && update?.({ borderWidth: v })}
                  className="designstudio-setting-input"
                />
              </div>
            </>
          ) : null}
        </div>
      ),
    },
    {
      key: "image",
      title: (
        <span className="designstudio-collapse-title">
          <SmartIcon name="Image" size={15} />
          {imageGroupLabel}
        </span>
      ),
      children: (
        <div className="designstudio-settings">
          <div className="designstudio-setting-row">
            <SettingLabel>{fitLabel}</SettingLabel>
            <Segmented
              value={d?.imageFit ?? "cover"}
              options={[
                { value: "cover", label: fitCoverLabel },
                { value: "contain", label: fitContainLabel },
              ]}
              onChange={(v) => update?.({ imageFit: v as DesignerImageFit })}
            />
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
      title: (
        <span className="designstudio-collapse-title">
          <SmartIcon name="Type" size={15} />
          {textGroupLabel}
        </span>
      ),
      children: (
        <div className="designstudio-settings">
          <div className="designstudio-setting-col">
            <SettingLabel>{titleLabel}</SettingLabel>
            <Input
              size="sm"
              className="designstudio-setting-input"
              value={d?.title ?? ""}
              placeholder="Headline"
              onChange={(e) => update?.({ title: e.target.value })}
            />
          </div>
          <div className="designstudio-setting-col">
            <SettingLabel>{subtitleLabel}</SettingLabel>
            <Input
              size="sm"
              className="designstudio-setting-input"
              value={d?.subtitle ?? ""}
              placeholder="Subheadline"
              onChange={(e) => update?.({ subtitle: e.target.value })}
            />
          </div>
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
          <div className="designstudio-setting-row">
            <SettingLabel>{alignmentLabel}</SettingLabel>
            <Segmented
              value={d?.titleAlign ?? "center"}
              options={[
                { value: "left", label: alignLeftLabel },
                { value: "center", label: alignCenterLabel },
              ]}
              onChange={(v) => update?.({ titleAlign: v as DesignerTextAlign })}
            />
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
    <div className="designstudio-stage designstudio-design">
      <div className="designstudio-design-toolbar">
        <div className="designstudio-stage-head designstudio-stage-head-tight">
          <span className="designstudio-stage-eyebrow">
            <SmartIcon name="Palette" size={13} />
            {designEyebrow}
          </span>
          <h3 className="designstudio-stage-title">{designTitle}</h3>
          <p className="designstudio-stage-hint">{designHint}</p>
        </div>
        <div className="designstudio-design-actions">
          <Tag color="pink" size="small" className="designstudio-design-tag">
            {previewTag}
          </Tag>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onOpenTemplates}
          >
            <SmartIcon name="LayoutTemplate" size={14} />
            {templatesButtonLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onResetDesign}
          >
            <SmartIcon name="RefreshCcw" size={14} />
            {resetLabel}
          </Button>
        </div>
      </div>

      <div className="designstudio-design-grid">
        <div className="designstudio-canvas">
          <div className="designstudio-canvas-stage">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt=""
                className="designstudio-canvas-img"
              />
            ) : (
              <span className="designstudio-canvas-empty">
                <SmartIcon name="Loader2" size={20} />
                Rendering…
              </span>
            )}
            <span className="designstudio-canvas-size">
              <SmartIcon name="Maximize2" size={12} />
              {previewTag}
            </span>
          </div>
        </div>

        <div className="designstudio-settings-panel">
          <Collapse
            accordion={false}
            defaultActiveKeys={["canvas", "image", "text"]}
            items={canvasItems}
          />
          <p className="designstudio-design-tip">
            <SmartIcon name="Bolt" size={13} />
            {designTip}
          </p>
        </div>
      </div>

      <div className="designstudio-design-footer">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onStageChange?.("templates")}
        >
          <SmartIcon name="ArrowLeft" size={14} />
          {backToTemplatesLabel}
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={() => onStageChange?.("export")}
        >
          <SmartIcon name="Download" size={15} />
          {continueExportLabel}
        </Button>
      </div>
    </div>
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
      ? `<img src="${hd.dataUrl}" width="1280" height="720" alt="YouTube thumbnail" />`
      : "";
  }, [items]);

  const columns = [
    {
      key: "preview",
      title: "",
      width: 84,
      render: (_v: unknown, record: unknown) => {
        const item = record as DesignerExportItem;
        return item.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.dataUrl}
            alt={item.label}
            className="designstudio-export-thumb"
          />
        ) : null;
      },
    },
    {
      key: "label",
      title: String(formatLabel ?? ""),
      render: (_v: unknown, record: unknown) => {
        const item = record as DesignerExportItem;
        return <span className="designstudio-export-label">{item.label}</span>;
      },
    },
    {
      key: "dims",
      title: String(dimensionsLabel ?? ""),
      render: (_v: unknown, record: unknown) => {
        const item = record as DesignerExportItem;
        return (
          <span className="designstudio-export-dims">
            {item.width} × {item.height}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "",
      align: "right" as const,
      render: (_v: unknown, record: unknown) => {
        const item = record as DesignerExportItem;
        return (
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!item.dataUrl}
            onClick={() => downloadItem(item)}
          >
            <SmartIcon name="Download" size={14} />
            {downloadLabel}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="designstudio-stage designstudio-export">
      <div className="designstudio-stage-head">
        <span className="designstudio-stage-eyebrow">
          <SmartIcon name="Download" size={13} />
          {exportEyebrow}
        </span>
        <h3 className="designstudio-stage-title">{exportTitle}</h3>
        <p className="designstudio-stage-hint">{exportHint}</p>
      </div>

      <Spin spinning={Boolean(exporting)} tip={String(exportAllTip ?? "")}>
        {ready ? (
          <div className="designstudio-export-success">
            <span className="designstudio-export-success-ic">
              <SmartIcon name="CheckCircle2" size={30} />
            </span>
            <h4 className="designstudio-export-success-title">
              {successTitle}
            </h4>
            <p className="designstudio-export-success-desc">{successDesc}</p>
          </div>
        ) : (
          <Card padding="lg" className="designstudio-export-empty">
            <Empty description={String(exportAllTip ?? "")} />
            {!exportError ? (
              <Button type="button" size="lg" onClick={onExport}>
                <SmartIcon name="RefreshCw" size={15} />
                {exportAllLabel}
              </Button>
            ) : null}
          </Card>
        )}

        {ready ? (
          <>
            <div className="designstudio-export-block">
              <h4 className="designstudio-export-sub">{renderedTitle}</h4>
              <Timeline
                items={items.map((item) => ({
                  content: item.label,
                  time: `${item.width} × ${item.height}`,
                  type: "success" as const,
                  dot: <SmartIcon name="Check" size={13} />,
                }))}
              />
            </div>

            <div className="designstudio-export-block">
              <div className="designstudio-export-table-head">
                <h4 className="designstudio-export-sub">{downloadsTitle}</h4>
                <div className="designstudio-export-table-actions">
                  <Tag color="pink" size="small">
                    {recommendedLabel}
                  </Tag>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      items.forEach((item, i) => {
                        setTimeout(() => downloadItem(item), i * 180);
                      });
                    }}
                  >
                    <SmartIcon name="Download" size={14} />
                    {downloadAllLabel}
                  </Button>
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={items}
                rowKey={(r) => String((r as DesignerExportItem).width)}
                size="middle"
              />
            </div>

            {embed ? (
              <div className="designstudio-export-embed">
                <div className="designstudio-export-embed-head">
                  <h4 className="designstudio-export-sub">{embedTitle}</h4>
                  <CopyText text={embed} copyable>
                    <code className="designstudio-export-code">
                      &lt;img
                      src=&quot;data:image/png;base64,&hellip;&quot;&hellip;&gt;
                    </code>
                  </CopyText>
                </div>
                <p className="designstudio-export-embed-hint">{embedHint}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </Spin>

      <div className="designstudio-export-footer">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBackToDesign}
        >
          <SmartIcon name="ArrowLeft" size={14} />
          {backToDesignLabel}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onStartOver}>
          <SmartIcon name="Restart" size={14} />
          {startOverLabel}
        </Button>
      </div>
    </div>
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
    <div className={cn("designstudio", className)} data-registry={dataRegistry}>
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

      <div className="designstudio-shell">
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
          <p className="designstudio-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </div>
  );
}

export default DesignerStudio;
