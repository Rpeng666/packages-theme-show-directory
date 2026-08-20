"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ArrowLeft,
  Eye,
  Grid3x3,
  Images,
} from "lucide-react";
import type { WorkbenchT } from "@template/ui";

const EXPORT_FORMATS = ["jpeg", "png", "webp"] as const;

interface WbTopBarProps {
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
  canvasW: number;
  canvasH: number;
  gridVisible: boolean;
  brandHref: string;
  brandName: string;
  brandLogo: string;
  backHref: string;
  previewHref: string;
  t: WorkbenchT;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onToggleGrid: () => void;
  onOpenGallery: () => void;
  onExport: (format: "jpeg" | "png" | "webp") => void;
}

export function WbTopBar({
  zoom,
  canUndo,
  canRedo,
  canvasW,
  canvasH,
  gridVisible,
  brandHref,
  brandName,
  brandLogo,
  backHref,
  previewHref,
  t,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFit,
  onToggleGrid,
  onOpenGallery,
  onExport,
}: WbTopBarProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="wb-topbar">
      {/* Back */}
      <a href={backHref} className="wb-topbar-link">
        <ArrowLeft className="w-3.5 h-3.5" />
        {t("back")}
      </a>

      <div className="wb-topbar-divider" />

      {/* Brand */}
      <a href={brandHref} className="wb-topbar-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandLogo} alt={brandName} className="wb-topbar-brand-logo" />
        <span>{brandName}</span>
        <span className="text-gray-500 text-xs font-normal">
          / {t("workbench_name")}
        </span>
      </a>

      <div className="wb-topbar-spacer" />

      {/* Preview link */}
      <a
        href={previewHref}
        className="wb-topbar-link"
        title={t("preview_title")}
      >
        <Eye className="w-3.5 h-3.5" />
        {t("preview")}
      </a>

      <div className="wb-topbar-divider" />

      {/* Undo / Redo */}
      <button
        type="button"
        title={t("undo_title")}
        disabled={!canUndo}
        onClick={onUndo}
        className="wb-topbar-iconbtn"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        title={t("redo_title")}
        disabled={!canRedo}
        onClick={onRedo}
        className="wb-topbar-iconbtn"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <div className="wb-topbar-divider" />

      {/* Zoom */}
      <button
        type="button"
        title={t("zoom_out")}
        onClick={onZoomOut}
        className="wb-topbar-iconbtn"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <span className="wb-topbar-zoom">{Math.round(zoom * 100)}%</span>
      <button
        type="button"
        title={t("zoom_in")}
        onClick={onZoomIn}
        className="wb-topbar-iconbtn"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        type="button"
        title={t("fit")}
        onClick={onFit}
        className="wb-topbar-iconbtn"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="wb-topbar-divider" />

      {/* Drafting grid */}
      <button
        type="button"
        title={t(gridVisible ? "grid_hide" : "grid_show")}
        onClick={onToggleGrid}
        className={`wb-topbar-iconbtn${
          gridVisible ? " wb-topbar-iconbtn-active" : ""
        }`}
      >
        <Grid3x3 className="w-4 h-4" />
      </button>

      {/* Image gallery selector */}
      <button
        type="button"
        title={t("gallery_open")}
        onClick={onOpenGallery}
        className="wb-topbar-iconbtn wb-topbar-iconbtn-accent"
      >
        <Images className="w-4 h-4" />
      </button>

      <div className="wb-topbar-divider" />

      {/* Export */}
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="wb-export-btn"
          onClick={() => setExportOpen((v) => !v)}
        >
          <Download className="w-4 h-4" />
          {t("export")}
          <ChevronDown className="w-3 h-3" />
        </button>

        {exportOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)] p-1.5 shadow-2xl z-50">
            {EXPORT_FORMATS.map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => {
                  onExport(fmt);
                  setExportOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[var(--semi-color-text-1)] hover:bg-[var(--semi-color-fill-0)] hover:text-[var(--semi-color-text-0)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase">{fmt}</span>
                <span className="ml-auto text-[var(--semi-color-text-3)] tabular-nums">
                  {canvasW}×{canvasH}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
