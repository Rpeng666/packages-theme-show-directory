"use client";

import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronLeft, X, ImageIcon } from "lucide-react";
import type { WorkbenchProps } from "@template/ui";

import { Button } from "../../components/button";
import { WORKBENCH_CSS } from "./styles";
import { VIEWS_CSS, WbHudFrame, WbScannerStream } from "./views";
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
 * Workbench — the full-screen thumbnail editor studio (semi theme).
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
    <div className={cn("wb-root", className)} data-registry={dataRegistry}>
      <style>{WORKBENCH_CSS + VIEWS_CSS}</style>

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

      {/* Horizontal tool strip — sticky under the top bar */}
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

      <div className="wb-workspace">
        {/* Canvas stage — wrapped in a HUD viewfinder frame */}
        <div className="wb-canvas-area">
          <WbHudFrame>
            <canvas ref={canvasElRef} className="absolute inset-0" />

            {/* Autosave restore banner */}
            {hasAutosave && isEmpty && !initialImageLoaded && (
              <div className="wb-autosave">
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
                  className="text-[var(--semi-color-text-3)] hover:text-[var(--semi-color-text-1)] text-xs transition-colors"
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
              className="wb-panel-toggle"
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
                  className="wb-gallery"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  <div className="wb-gallery-bar">
                    <span className="wb-gallery-title">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{t("gallery_title")}</span>
                    </span>
                    <span className="wb-gallery-hint">{t("gallery_hint")}</span>
                    <button
                      type="button"
                      className="wb-gallery-close"
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
