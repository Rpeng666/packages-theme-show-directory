import type { Section } from "@template/ui";
import * as React from "react";
import {
  EditorToolbar,
  EditorSidebar,
  EditorCanvas,
  EditorPanel,
  PresetGrid,
  ToolButton,
  AdjustmentRow,
} from "@template/ui/themes/pixel/editor";

export const props = {
  toolbar: (
    <EditorToolbar
      left={<span className="px-2 font-mono text-[10px] text-retro-muted">pixel-editor</span>}
      center={<span className="font-mono text-[10px] text-retro-muted">zoom 100%</span>}
      right={
        <span className="flex gap-1">
          <ToolButton icon="undo" label="Undo" tone="neutral" />
          <ToolButton icon="redo" label="Redo" tone="neutral" />
          <ToolButton icon="download" label="Export" active tone="cyan" />
        </span>
      }
    />
  ),
  left: (
    <EditorSidebar
      items={[
        { id: "colors", icon: "palette", label: "Colors", render: () => <PresetGrid items={[
          { id: "vibrant", label: "Vibrant" },
          { id: "retro", label: "Retro" },
          { id: "mono", label: "Mono" },
        ]} activeId="retro" onSelect={() => {}} cols={2} variant="bar" /> },
        { id: "adjust", icon: "sliders", label: "Adjust", render: () => <AdjustmentRow label="Brightness" value={65} onChange={() => {}} onReset={() => {}} tone="cyan" /> },
      ]}
      activeId="colors"
      onItemSelect={() => {}}
    />
  ),
  center: (
    <EditorCanvas
      canvasRef={React.createRef<HTMLCanvasElement>()}
      width={640}
      height={360}
      originalSrc={"data:image/svg+xml;utf8," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#f3e8ff"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
      )}
      zoom={1}
      onZoomChange={() => {}}
      onFit={() => {}}
      showOriginal
      comparePosition={0.5}
      onCompareChange={() => {}}
      backdrop="#1a1a2e"
      backdropPattern="checker"
      t={(key) => key}
    />
  ),
  right: (
    <EditorPanel title="Export" icon="download" onCollapse={() => {}}>
      <div className="space-y-2 font-mono text-[10px] text-retro-muted">
        <div>PNG · 4×</div>
        <div>WebP · 2×</div>
      </div>
    </EditorPanel>
  ),
  status: "Ready",
};
