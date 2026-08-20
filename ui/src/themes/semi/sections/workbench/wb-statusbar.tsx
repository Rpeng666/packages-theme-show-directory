"use client";

import type { WorkbenchT } from "@template/ui";

interface WbStatusBarProps {
  zoom: number;
  canvasW: number;
  canvasH: number;
  mouseX: number;
  mouseY: number;
  t: WorkbenchT;
}

export function WbStatusBar({
  zoom,
  canvasW,
  canvasH,
  mouseX,
  mouseY,
  t,
}: WbStatusBarProps) {
  const percent = Math.round(zoom * 100);

  return (
    <footer className="wb-statusbar">
      <span>{percent}%</span>
      <span className="wb-topbar-divider" style={{ height: 14 }} />
      <span>
        {canvasW} × {canvasH} px
      </span>
      <span className="wb-topbar-divider" style={{ height: 14 }} />
      <span>
        x: {mouseX}  y: {mouseY}
      </span>
      <span className="wb-statusbar-spacer" />
      <span>{t("status_hint")}</span>
    </footer>
  );
}
