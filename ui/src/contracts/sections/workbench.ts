import type { ReactNode, RefObject } from "react";

/**
 * Workbench — the full-screen thumbnail editor studio (select/text/shapes,
 * layers, templates, AI tools, export). A *composite* section: the entire
 * editor surface — top bar, tool rail, canvas stage, collapsible properties
 * panel, status bar, export modal and empty-state onboarding — plus its
 * right-click context menu.
 *
 * Pure presentational, like the other workbench sections: the app owns ALL
 * business (the fabric.js canvas engine in `useWorkbench`, the AI task runner,
 * template data, routing/brand hrefs, gallery card assets) and passes it in as
 * state + callbacks + `t` (a next-intl-compatible copy getter). The package
 * never imports next-intl, lucide/framer, or any app module — it only renders.
 *
 * The single `t(key)` getter covers every copy string across the panels (the
 * app passes `useTranslations("pages.tools.workbench")`), mirroring the
 * `CleanerT` contract. State + callbacks are the flattened `useWorkbench`
 * return; app-only assets (template data, gallery cards, brand/hrefs, AI ops)
 * are injected explicitly.
 */

/** Translation getter the section receives (same shape as CleanerT). */
export type WorkbenchT = (key: string) => string;

/* ── fabric-free entity DTOs ────────────────────────────────────────────── */

export type WorkbenchTool = "select" | "text" | "crop" | "rect" | "circle" | "line";

export interface WorkbenchEnhance {
  exposure: number;
  contrast: number;
  warmth: number;
}

export type WorkbenchBackground =
  | { type: "solid"; color: string }
  | { type: "gradient"; from: string; to: string }
  | { type: "checker" };

/**
 * A live user object on the canvas. Loosely typed: the panels only read a
 * thin shape and pass the object through; the app's fabric engine owns it.
 */
export interface WorkbenchObject {
  type: string;
  __layerId__?: number;
  __locked__?: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  opacity?: number;
  globalCompositeOperation?: string;
  text?: string;
  set?: (patch: Record<string, unknown>) => void;
  canvas?: { renderAll?: () => void };
  [key: string]: unknown;
}

export interface WorkbenchLayer {
  id: number;
  type: string;
  label: string;
  visible: boolean;
  locked: boolean;
  isSelected: boolean;
}

export interface WorkbenchExportResult {
  blob: Blob;
  sizeBytes: number;
  format: "jpeg" | "png" | "webp";
  width: number;
  height: number;
  url: string;
  hasText: boolean;
}

/** A structured template the canvas can apply (from app `templates.ts`). */
export interface WorkbenchTemplate {
  id: string;
  category: string;
  labelKey: string;
  preview: {
    bg: string;
    accent?: string;
    text?: string;
    textColor?: string;
  };
}

export interface WorkbenchTemplateCategory {
  id: string;
  labelKey: string;
}

/** Gallery card shown in the scanner picker (app-owned /imgs assets). */
export interface WorkbenchGalleryCard {
  id: string;
  src: string;
  label: string;
}

export type WorkbenchExportFormat = "jpeg" | "png" | "webp";
export type WorkbenchAlignDir =
  | "left"
  | "centerX"
  | "right"
  | "top"
  | "middleY"
  | "bottom";
export type WorkbenchDistributeAxis = "horizontal" | "vertical";
export type WorkbenchLayerMoveDir = "up" | "down";
export type WorkbenchZOp = "front" | "forward" | "backward" | "back";
export type WorkbenchTextStyle = "bold" | "minimal" | "dramatic";
export type WorkbenchElementKind =
  | "emoji"
  | "rect"
  | "circle"
  | "line"
  | "triangle"
  | "arrow";

/** Shared AI task state injected into the AI-driven panels (from useAITask). */
export interface WorkbenchAiTask {
  loading: boolean;
  error: string | null;
  resultUrl: string | null;
  reset: () => void;
}

/**
 * A text style preset (quick-styles grid in the text properties panel). The
 * package renders the live `preview` card and calls `onApplyStylePreset(id)`;
 * the app owns the actual fabric mutation (fill/stroke/shadow application).
 */
export interface WorkbenchTextPreset {
  id: string;
  labelKey: string;
  descKey: string;
  preview: {
    fontFamily: string;
    color: string;
    textShadow?: string;
    stroke?: string;
  };
}

export interface WorkbenchContextMenu {
  x: number;
  y: number;
}

/**
 * WorkbenchProps — the full editor surface, data + callbacks injected by the
 * app. `t` provides every panel's copy; `canvasElRef` is the live `<canvas>`
 * the app's fabric engine attaches to; `ctxMenu`/`exportResult` come from the
 * app's canvas/export state; the AI panels receive their business as runners.
 *
 * The shell's own toggle state (properties panel open/close, gallery overlay,
 * export modal) is internal to the section — those are pure presentation.
 */
export interface WorkbenchProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  locale?: string;

  /* ── canvas + state ──────────────────────────────────────────────── */
  /** ref the section attaches to <canvas>; the app's fabric engine reads it */
  canvasElRef: RefObject<HTMLCanvasElement | null>;
  zoom: number;
  canvasW: number;
  canvasH: number;
  mouseX: number;
  mouseY: number;
  activeTool: WorkbenchTool;
  bgColor: string;
  background?: WorkbenchBackground;
  canUndo: boolean;
  canRedo: boolean;
  selectedObject: WorkbenchObject | null;
  selectionCount: number;
  isCropping: boolean;
  isEmpty: boolean;
  hasAutosave: boolean;
  gridVisible: boolean;
  enhance: WorkbenchEnhance;
  /**
   * Structural version of the canvas object stack — the app bumps it on any
   * add / remove / reorder so the layers panel re-syncs its drag order
   * (selection-only updates don't bump it, keeping the drag order stable).
   */
  layersVersion: number;
  /**
   * true once an injected initial image has been applied — suppresses the
   * onboarding / autosave-restore flash during the app's delayed first load.
   */
  initialImageLoaded?: boolean;

  /** copy getter — the app passes useTranslations("pages.tools.workbench") */
  t: WorkbenchT;

  /* ── app-injected assets ─────────────────────────────────────────── */
  brandHref: string;
  brandName: string;
  brandLogo: string;
  backHref: string;
  previewHref: string;
  templates: WorkbenchTemplate[];
  templateCategories: WorkbenchTemplateCategory[];
  galleryCards: WorkbenchGalleryCard[];

  /* ── AI business (app-owned runners) ───────────────────────────────── */
  aiRemoveBg: {
    task: WorkbenchAiTask;
    run: (file: File) => Promise<void>;
  };
  aiTitle: {
    task: WorkbenchAiTask;
    run: (title: string, style: WorkbenchTextStyle) => Promise<void>;
  };

  /* ── callbacks (business) ────────────────────────────────────────── */
  onSetTool: (tool: WorkbenchTool) => void;
  onSetBgColor: (color: string) => void;
  onSetBackground: (bg: WorkbenchBackground) => void;
  onSetZoom: (zoom: number) => void;
  onFitToScreen: () => void;
  onResizeCanvas: (w: number, h: number) => void;
  onLoadImage: (dataUrl: string) => void;
  /** upload a picked File onto the canvas (app converts File → dataURL) */
  onUploadFile: (file: File) => void;
  /** fetch a YouTube thumbnail by URL and drop it on the canvas (app business) */
  onYouTubeFetch: (url: string) => Promise<void>;
  onAddElement: (kind: WorkbenchElementKind, value?: string) => void;
  onDeleteSelected: () => void;
  onStartCrop: () => void;
  onApplyCrop: () => void;
  onCancelCrop: () => void;
  onRestoreAutosave: () => void;
  onDismissAutosave: () => void;
  onApplyTemplate: (templateIndex: number) => void;
  onApplyTemplateById: (id: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onGetLayers: () => WorkbenchLayer[];
  onSelectLayer: (id: number) => void;
  onSelectLayerMulti: (id: number) => void;
  onMoveLayer: (id: number, dir: WorkbenchLayerMoveDir) => void;
  onReorderLayers: (orderedIds: number[]) => void;
  onGroupSelected: () => void;
  onUngroupSelected: () => void;
  onAlignSelected: (dir: WorkbenchAlignDir) => void;
  onDistributeSelected: (axis: WorkbenchDistributeAxis) => void;
  onDuplicateSelected: () => void;
  onFlipSelected: (axis: "horizontal" | "vertical") => void;
  onZOpSelected: (op: WorkbenchZOp) => void;
  onToggleLayer: (id: number) => void;
  onToggleLockLayer: (id: number) => void;
  onDeleteLayer: (id: number) => void;
  onToggleGrid: () => void;
  onUpdateSelectedObject: (patch: Record<string, unknown>) => void;
  /** compound text style presets — app applies the fabric mutation by id */
  onApplyStylePreset: (presetId: string) => void;
  onSetEnhance: (patch: Partial<WorkbenchEnhance>) => void;
  onExportImage: (format: WorkbenchExportFormat) => void;

  /* ── text style presets (app-owned previews for the quick-styles grid) ─ */
  textStylePresets: WorkbenchTextPreset[];

  /* ── canvas-display callbacks (from the app) ─────────────────────── */
  ctxMenu: WorkbenchContextMenu | null;
  onCloseContextMenu: () => void;
  /** the live object currently under the context menu (for locked state) */
  exportResult: WorkbenchExportResult | null;
  onCloseExport: () => void;
  galleryOpen?: boolean;
  onGrabGallery: (src: string) => void;
}