"use client";

import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronLeft, X, ImageIcon } from "lucide-react";
import type { WorkbenchProps } from "@template/ui";

import { Button } from "../../components/button";
import { WbHudFrame, WbScannerStream } from "./views";
import { WbTopBar } from "./wb-topbar";
import { WbToolBar } from "./wb-toolbar";
import { WbPropertiesPanel } from "./wb-properties";
import { WbStatusBar } from "./wb-statusbar";
import { WbExportModal } from "./wb-export-modal";
import { WbOnboardingOverlay } from "./wb-onboarding";
import { WbContextMenu } from "./context-menu";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Workbench — the full-screen thumbnail editor studio (semi theme, HeroUI).
 *
 * The composite shell for the thumbnail editor: top bar, tool rail, canvas
 * stage inside a viewfinder frame, collapsible properties panel, status bar,
 * export reveal modal and the empty-state onboarding overlay — plus the
 * right-click context menu. All business (fabric canvas engine, AI runners,
 * template data, routing) is injected via `WorkbenchProps`; the shell only
 * renders and owns its purely-presentational toggle state (panel/gallery).
 */
export function Workbench({
  className,
  "data-registry": dataRegistry,
  canvasElRef,
  zoom,
  canvasW,
  canvasH,
  mouseX,
  mouseY,
  activeTool,
  bgColor,
  canUndo,
  canRedo,
  selectedObject,
  selectionCount,
  isCropping,
  isEmpty,
  hasAutosave,
  gridVisible,
  enhance,
  layersVersion,
  initialImageLoaded,
  t,
  brandHref,
  brandName,
  brandLogo,
  backHref,
  previewHref,
  templates,
  templateCategories,
  galleryCards,
  aiRemoveBg,
  aiTitle,
  textStylePresets,
  onSetTool,
  onSetBgColor,
  onSetBackground,
  onSetZoom,
  onFitToScreen,
  onResizeCanvas,
  onLoadImage,
  onUploadFile,
  onYouTubeFetch,
  onAddElement,
  onDeleteSelected,
  onStartCrop,
  onApplyCrop,
  onCancelCrop,
  onRestoreAutosave,
  onDismissAutosave,
  onApplyTemplate,
  onApplyTemplateById,
  onUndo,
  onRedo,
  onGetLayers,
  onSelectLayer,
  onSelectLayerMulti,
  onMoveLayer,
  onReorderLayers,
  onGroupSelected,
  onUngroupSelected,
  onAlignSelected,
  onDistributeSelected,
  onDuplicateSelected,
  onFlipSelected,
  onZOpSelected,
  onToggleLayer,
  onToggleLockLayer,
  onDeleteLayer,
  onToggleGrid,
  onUpdateSelectedObject,
  onApplyStylePreset,
  onSetEnhance,
  onExportImage,
  ctxMenu,
  onCloseContextMenu,
  exportResult,
  onCloseExport,
  onGrabGallery,
}: WorkbenchProps) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleToolChange = (tool: typeof activeTool) => {
    onSetTool(tool);
    if (tool === "crop") onStartCrop();
  };

  const handlePickImage = (src: string) => {
    setGalleryOpen(false);
    onGrabGallery(src);
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-screen flex-col overflow-hidden bg-[#f5f4f1] text-[#1c1a17]",
        className,
      )}
      data-registry={dataRegistry}
    >
      <WbTopBar
        zoom={zoom}
        canUndo={canUndo}
        canRedo={canRedo}
        canvasW={canvasW}
        canvasH={canvasH}
        gridVisible={gridVisible}
        brandHref={brandHref}
        brandName={brandName}
        brandLogo={brandLogo}
        backHref={backHref}
        previewHref={previewHref}
        t={t}
        onUndo={onUndo}
        onRedo={onRedo}
        onZoomIn={() => onSetZoom(zoom * 1.25)}
        onZoomOut={() => onSetZoom(zoom / 1.25)}
        onFit={onFitToScreen}
        onToggleGrid={onToggleGrid}
        onOpenGallery={() => setGalleryOpen(true)}
        onExport={onExportImage}
      />

      <WbToolBar
        activeTool={activeTool}
        isCropping={isCropping}
        selectionCount={selectionCount}
        selectedType={selectedObject?.type ?? null}
        t={t}
        onToolChange={handleToolChange}
        onDelete={onDeleteSelected}
        onGroup={onGroupSelected}
        onUngroup={onUngroupSelected}
        onAlign={onAlignSelected}
        onDistribute={onDistributeSelected}
        onApplyCrop={onApplyCrop}
        onCancelCrop={onCancelCrop}
        onUploadImage={onUploadFile}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Canvas stage — wrapped in a HUD viewfinder frame */}
        <div className="relative flex-1 overflow-hidden bg-[linear-gradient(180deg,#eeece8,#e7e4df)]">
          <WbHudFrame>
            <canvas ref={canvasElRef} className="absolute inset-0" />

            {/* Autosave restore banner */}
            {hasAutosave && isEmpty && !initialImageLoaded && (
              <div className="absolute left-1/2 top-3.5 z-20 flex -translate-x-1/2 items-center gap-3 rounded-[14px] border border-[#e9e6e1] bg-white px-4 py-2.5 text-[13px] text-[#4a4642] shadow-[0_16px_40px_-16px_rgba(28,26,23,0.3)]">
                <span>{t("restore_session")}</span>
                <Button
                  type="button"
                  size="sm"
                  onClick={onRestoreAutosave}
                  className="px-3 py-1 text-xs"
                >
                  {t("restore")}
                </Button>
                <button
                  type="button"
                  onClick={onDismissAutosave}
                  className="text-xs text-[#a09b94] transition-colors hover:text-[#4a4642]"
                >
                  {t("dismiss")}
                </button>
              </div>
            )}

            {/* Empty-state onboarding overlay */}
            {isEmpty && !hasAutosave && !initialImageLoaded && (
              <WbOnboardingOverlay
                templates={templates}
                onUpload={onUploadFile}
                onTemplate={onApplyTemplate}
                onYouTube={onYouTubeFetch}
                t={t}
              />
            )}

            {/* Panel toggle — floats on the right edge of canvas */}
            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              title={panelOpen ? t("hide_panel") : t("show_panel")}
              className="absolute right-0 top-1/2 z-[10] flex h-12 w-[22px] -translate-y-1/2 items-center justify-center cursor-pointer rounded-l-[10px] border border-[#e9e6e1] border-r-0 bg-white text-[#6b6760] transition-all hover:text-[#1c1a17]"
            >
              {panelOpen ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronLeft className="w-3 h-3" />
              )}
            </button>

            {/* Scanner image gallery — a bottom dock of swappable thumbnails */}
            <AnimatePresence>
              {galleryOpen && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-30 flex h-[224px] flex-col overflow-hidden border-t border-[#e9e6e1] bg-white shadow-[0_-18px_44px_-22px_rgba(28,26,23,0.35)]"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  <div className="flex shrink-0 items-center gap-2.5 border-b border-[#e9e6e1] bg-white px-4 py-[11px]">
                    <span className="inline-flex items-center gap-[7px] text-xs font-bold tracking-[0.04em] text-[#1c1a17]">
                      <ImageIcon className="h-3.5 w-3.5 text-[#8b5cf6]" />
                      <span>{t("gallery_title")}</span>
                    </span>
                    <span className="mr-0.5 flex-1 text-right text-[11px] text-[#a09b94]">
                      {t("gallery_hint")}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[9px] border-none bg-[#f1efeb] text-[#6b6760] transition-all hover:bg-[#e9e6e1] hover:text-[#1c1a17]"
                      title={t("gallery_close")}
                      onClick={() => setGalleryOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <WbScannerStream
                    cards={galleryCards}
                    onPick={handlePickImage}
                    initialSpeed={90}
                    cardWidth={230}
                    cardHeight={140}
                    cardGap={22}
                    repeat={10}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </WbHudFrame>
        </div>

        {/* Collapsible right panel */}
        {panelOpen && (
          <WbPropertiesPanel
            canvasW={canvasW}
            canvasH={canvasH}
            bgColor={bgColor}
            selectedObject={selectedObject}
            layers={onGetLayers()}
            layersVersion={layersVersion}
            enhance={enhance}
            templates={templates}
            templateCategories={templateCategories}
            textStylePresets={textStylePresets}
            t={t}
            aiRemoveBg={aiRemoveBg}
            aiTitle={aiTitle}
            onResize={onResizeCanvas}
            onBgColor={onSetBgColor}
            onSetBackground={onSetBackground}
            onLoadImage={onLoadImage}
            onSelectLayer={onSelectLayer}
            onSelectLayerMulti={onSelectLayerMulti}
            onReorderLayer={onReorderLayers}
            onMoveLayer={onMoveLayer}
            onToggleLayer={onToggleLayer}
            onToggleLayerLock={onToggleLockLayer}
            onDeleteLayer={onDeleteLayer}
            onEnhance={onSetEnhance}
            onAddElement={onAddElement}
            onApplyTemplateById={onApplyTemplateById}
            onUpdateObject={onUpdateSelectedObject}
            onApplyStylePreset={onApplyStylePreset}
          />
        )}
      </div>

      <WbStatusBar
        zoom={zoom}
        canvasW={canvasW}
        canvasH={canvasH}
        mouseX={mouseX}
        mouseY={mouseY}
        t={t}
      />

      {/* Export reveal modal */}
      <AnimatePresence>
        {exportResult && (
          <WbExportModal result={exportResult} onClose={onCloseExport} t={t} />
        )}
      </AnimatePresence>

      {/* Right-click context menu (fixed overlay, closes on backdrop/Esc) */}
      <AnimatePresence>
        {ctxMenu && (
          <WbContextMenu
            x={ctxMenu.x}
            y={ctxMenu.y}
            locked={!!selectedObject?.__locked__}
            t={t}
            onClose={onCloseContextMenu}
            onBringFront={() => {
              onZOpSelected("front");
              onCloseContextMenu();
            }}
            onForward={() => {
              onZOpSelected("forward");
              onCloseContextMenu();
            }}
            onBackward={() => {
              onZOpSelected("backward");
              onCloseContextMenu();
            }}
            onBack={() => {
              onZOpSelected("back");
              onCloseContextMenu();
            }}
            onFlipX={() => {
              onFlipSelected("horizontal");
              onCloseContextMenu();
            }}
            onFlipY={() => {
              onFlipSelected("vertical");
              onCloseContextMenu();
            }}
            onDuplicate={() => {
              onDuplicateSelected();
              onCloseContextMenu();
            }}
            onToggleLock={() => {
              const o = selectedObject as {
                __layerId__?: number;
              } | null;
              if (o?.__layerId__ != null) onToggleLockLayer(o.__layerId__);
              onCloseContextMenu();
            }}
            onDelete={() => {
              onDeleteSelected();
              onCloseContextMenu();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
