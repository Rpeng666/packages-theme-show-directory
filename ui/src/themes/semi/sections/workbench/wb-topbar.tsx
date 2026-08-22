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
    <header className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-[#e9e6e1] bg-white px-3.5 shadow-[0_1px_2px_rgba(28,26,23,0.04)]">
      {/* Back */}
      <a
        href={backHref}
        className="inline-flex items-center gap-1.5 rounded-[10px] px-2 py-1.5 text-[13px] font-medium text-[#6b6760] transition-colors hover:bg-[#f1efeb] hover:text-[#1c1a17]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t("back")}
      </a>

      <div className="h-[22px] w-px bg-[#e9e6e1]" />

      {/* Brand */}
      <a href={brandHref} className="inline-flex items-center gap-2 text-[14px] font-bold text-[#1c1a17]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandLogo} alt={brandName} className="h-7 w-7 rounded-[9px]" />
        <span>{brandName}</span>
        <span className="text-xs font-normal text-gray-500">
          / {t("workbench_name")}
        </span>
      </a>

      <div className="flex-1" />

      {/* Preview link */}
      <a
        href={previewHref}
        className="inline-flex items-center gap-1.5 rounded-[10px] px-2 py-1.5 text-[13px] font-medium text-[#6b6760] transition-colors hover:bg-[#f1efeb] hover:text-[#1c1a17]"
        title={t("preview_title")}
      >
        <Eye className="w-3.5 h-3.5" />
        {t("preview")}
      </a>

      <div className="h-[22px] w-px bg-[#e9e6e1]" />

      {/* Undo / Redo */}
      <button
        type="button"
        title={t("undo_title")}
        disabled={!canUndo}
        onClick={onUndo}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#6b6760] transition-all hover:bg-[#f1efeb] hover:text-[#1c1a17] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        title={t("redo_title")}
        disabled={!canRedo}
        onClick={onRedo}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#6b6760] transition-all hover:bg-[#f1efeb] hover:text-[#1c1a17] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <div className="h-[22px] w-px bg-[#e9e6e1]" />

      {/* Zoom */}
      <button
        type="button"
        title={t("zoom_out")}
        onClick={onZoomOut}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#6b6760] transition-all hover:bg-[#f1efeb] hover:text-[#1c1a17]"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <span className="min-w-[52px] text-center text-xs font-semibold tabular-nums text-[#6b6760]">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        title={t("zoom_in")}
        onClick={onZoomIn}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#6b6760] transition-all hover:bg-[#f1efeb] hover:text-[#1c1a17]"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        type="button"
        title={t("fit")}
        onClick={onFit}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#6b6760] transition-all hover:bg-[#f1efeb] hover:text-[#1c1a17]"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="h-[22px] w-px bg-[#e9e6e1]" />

      {/* Drafting grid */}
      <button
        type="button"
        title={t(gridVisible ? "grid_hide" : "grid_show")}
        onClick={onToggleGrid}
        className={`inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent transition-all ${
          gridVisible
            ? "bg-[#fc725a] text-white shadow-[0_6px_16px_-6px_rgba(252,114,90,0.55)]"
            : "bg-transparent text-[#6b6760] hover:bg-[#f1efeb] hover:text-[#1c1a17]"
        }`}
      >
        <Grid3x3 className="w-4 h-4" />
      </button>

      {/* Image gallery selector */}
      <button
        type="button"
        title={t("gallery_open")}
        onClick={onOpenGallery}
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-transparent bg-transparent text-[#8b5cf6] transition-all hover:bg-[rgba(139,92,246,0.1)] hover:text-[#8b5cf6]"
      >
        <Images className="w-4 h-4" />
      </button>

      <div className="h-[22px] w-px bg-[#e9e6e1]" />

      {/* Export */}
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="inline-flex h-[34px] items-center gap-1.5 rounded-[10px] border-none bg-[#fc725a] px-[15px] text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(252,114,90,0.55)] transition-[filter] hover:brightness-[1.07]"
          onClick={() => setExportOpen((v) => !v)}
        >
          <Download className="w-4 h-4" />
          {t("export")}
          <ChevronDown className="w-3 h-3" />
        </button>

        {exportOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-[#e9e6e1] bg-white p-1.5 shadow-2xl">
            {EXPORT_FORMATS.map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => {
                  onExport(fmt);
                  setExportOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[#4a4642] transition-colors hover:bg-[#f1efeb] hover:text-[#1c1a17]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase">{fmt}</span>
                <span className="ml-auto text-[#a09b94] tabular-nums">
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
