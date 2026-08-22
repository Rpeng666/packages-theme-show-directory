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
    <footer className="flex h-7 shrink-0 items-center gap-3.5 border-t border-[#e9e6e1] bg-white px-4 text-[11px] text-[#a09b94] tabular-nums">
      <span>{percent}%</span>
      <span className="h-[14px] w-px bg-[#e9e6e1]" />
      <span>
        {canvasW} × {canvasH} px
      </span>
      <span className="h-[14px] w-px bg-[#e9e6e1]" />
      <span>
        x: {mouseX}  y: {mouseY}
      </span>
      <span className="flex-1" />
      <span>{t("status_hint")}</span>
    </footer>
  );
}
