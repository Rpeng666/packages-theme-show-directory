import type { ReactNode } from "react";

/**
 * DesignerStudio - the flagship thumbnail design atelier.
 *
 * Pure presentational: the app keeps the file/URL source layer, the live
 * ThumbnailDesign state, the canvas renderer (renderThumbnailDesign) and the
 * multi-size export pipeline; this section renders the designed studio: a rose
 * "creative atelier" hero, a four-stage rail (Source -> Templates -> Design ->
 * Export), a template gallery with live CSS previews, a split design studio
 * (checkerboard canvas + grouped settings) and an export hub (timeline +
 * downloads table + HTML embed).
 */

export type DesignerStage = "source" | "templates" | "design" | "export";
export type DesignerImageFit = "cover" | "contain";
export type DesignerTextAlign = "left" | "center";
export type DesignerTemplateCategory =
  "gaming" | "tech" | "finance" | "minimal";

export interface DesignerEffects {
  /** -100..100 */
  brightness: number;
  /** -100..100 */
  contrast: number;
  /** -100..100 */
  saturation: number;
}

export interface DesignerDesign {
  bgColor: string;
  /** 0..100 - rounded-corner radius as % of half the min dimension */
  rounded: number;
  showBorder: boolean;
  /** border width in px at a 1280-wide output */
  borderWidth: number;
  borderColor: string;
  imageFit: DesignerImageFit;
  shadow: boolean;
  title: string;
  subtitle: string;
  titleColor: string;
  /** title font size in px at a 1280-wide output */
  titleSize: number;
  titleAlign: DesignerTextAlign;
  /** 0..100 - title baseline position from top */
  textY: number;
  effects: DesignerEffects;
}

/** A design patch - `effects` is itself partial so callers can set one slider. */
export type DesignerDesignPatch = Omit<Partial<DesignerDesign>, "effects"> & {
  effects?: Partial<DesignerEffects>;
};

export interface DesignerTemplate {
  id: string;
  name: string;
  category: DesignerTemplateCategory;
  description: string;
  /** full design applied on selection */
  design: DesignerDesign;
  /** card-preview swatch colors (dark -> light) */
  swatch: [string, string];
  /** accent shown as a card highlight */
  accent: string;
}

export interface DesignerExportItem {
  width: number;
  height: number;
  label: string;
  dataUrl?: string;
}

export interface DesignerStudioStageDef {
  key: DesignerStage;
  label: string;
  icon: string;
}

export interface DesignerStudioCategoryDef {
  key: DesignerTemplateCategory;
  label: string;
}

/** Badge / meta chip shapes shared with the other workbench heroes. */
export interface DesignerStudioBadge {
  label: string;
  tone?: "free" | "pro" | "neutral";
}
export interface DesignerStudioMeta {
  icon: string;
  text: string;
}

export interface DesignerStudioProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** ---- hero ---- */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: DesignerStudioBadge[];
  meta?: DesignerStudioMeta[];
  /** badge chip floating on the hero mini-canvas, e.g. Live preview */
  heroCanvasBadge?: ReactNode;
  /** resolution chip floating on the hero mini-canvas */
  heroCanvasTag?: ReactNode;
  /** decorative mini-canvas shown on the hero right rail */
  heroCanvas?: {
    title: string;
    subtitle: string;
    swatch: [string, string];
    accent: string;
  } | null;
  /** ---- stage rail ---- */
  stage?: DesignerStage;
  onStageChange?: (stage: DesignerStage) => void;
  stages?: DesignerStudioStageDef[];
  stageOfLabel?: ReactNode;
  stageTotalLabel?: ReactNode;
  /** ---- source stage ---- */
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
  /** ---- templates stage ---- */
  templatesEyebrow?: ReactNode;
  templatesTitle?: ReactNode;
  templatesHint?: ReactNode;
  featuredLabel?: ReactNode;
  useTemplateLabel?: ReactNode;
  appliedLabel?: ReactNode;
  skipLabel?: ReactNode;
  emptyLabel?: ReactNode;
  templateCategories?: DesignerStudioCategoryDef[];
  templates?: DesignerTemplate[];
  appliedTemplateId?: string | null;
  onApplyTemplate?: (template: DesignerTemplate) => void;
  onSkipTemplates?: () => void;
  /** ---- design stage ---- */
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
  /** ---- export stage ---- */
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
  /** ---- shared ---- */
  footerHint?: ReactNode;
}
