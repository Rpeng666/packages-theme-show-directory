"use client";

import { useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MousePointer2,
  Type,
  Crop,
  Trash2,
  Check,
  X,
  Boxes,
  Ungroup,
  Square,
  Circle,
  Minus,
  Upload,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignHorizontalSpaceAround,
  AlignVerticalSpaceAround,
} from "lucide-react";
import type {
  WorkbenchAlignDir,
  WorkbenchDistributeAxis,
  WorkbenchT,
  WorkbenchTool,
} from "@template/ui";

import { cn } from "./helpers";

interface WbToolBarProps {
  activeTool: WorkbenchTool;
  isCropping: boolean;
  /** Number of objects in the active selection (0/1/many). */
  selectionCount: number;
  /** Type of the active object — 'group' enables Ungroup. */
  selectedType: string | null;
  t: WorkbenchT;
  onToolChange: (tool: WorkbenchTool) => void;
  onDelete: () => void;
  onGroup: () => void;
  onUngroup: () => void;
  onAlign: (dir: WorkbenchAlignDir) => void;
  onDistribute: (axis: WorkbenchDistributeAxis) => void;
  onApplyCrop: () => void;
  onCancelCrop: () => void;
  onUploadImage: (file: File) => void;
}

interface ToolDef {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  labelKey: string;
  kbd?: string;
  tone?: "default" | "ok" | "danger" | "accent";
}

/** Draw / transform tools shown at the top of the rail. */
const DRAW_TOOLS: ToolDef[] = [
  { id: "select", Icon: MousePointer2, labelKey: "tool_select", kbd: "V" },
  { id: "text", Icon: Type, labelKey: "tool_text", kbd: "T" },
  { id: "rect", Icon: Square, labelKey: "tool_rect", kbd: "R" },
  { id: "circle", Icon: Circle, labelKey: "tool_circle" },
  { id: "line", Icon: Minus, labelKey: "tool_line" },
];

/** A single rail button with a hover tooltip (label + shortcut badge). */
function ToolButton({
  def,
  active = false,
  t,
  onClick,
  children,
}: {
  def: ToolDef;
  active?: boolean;
  t: WorkbenchT;
  onClick: () => void;
  children?: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = def;
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className={cn(
          "wb-tool",
          def.tone && `wb-tool-${def.tone}`,
          active && "wb-tool-active",
        )}
        onClick={onClick}
        aria-pressed={active}
      >
        {active && <span className="wb-tool-indicator" aria-hidden />}
        <Icon className="w-4 h-4" />
        {children}
      </button>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="wb-tooltip"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <span>{t(def.labelKey)}</span>
            {def.kbd && <kbd>{def.kbd}</kbd>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WbToolBar({
  activeTool,
  isCropping,
  selectionCount,
  selectedType,
  t,
  onToolChange,
  onDelete,
  onGroup,
  onUngroup,
  onAlign,
  onDistribute,
  onApplyCrop,
  onCancelCrop,
  onUploadImage,
}: WbToolBarProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const canGroup = selectionCount > 1;
  const canUngroup = selectedType === "group";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUploadImage(file);
    e.target.value = "";
  };

  return (
    <nav className="wb-toolbar" aria-label={t("tools_aria")}>
      {/* Draw / transform tools */}
      <div className="wb-toolbar-group">
        {DRAW_TOOLS.map((def) => (
          <ToolButton
            key={def.id}
            def={def}
            active={activeTool === def.id}
            t={t}
            onClick={() => onToolChange(def.id as WorkbenchTool)}
          />
        ))}
      </div>

      <div className="wb-toolbar-divider" />

      {/* Crop flow (apply / cancel) or selection actions */}
      {isCropping ? (
        <div className="wb-toolbar-group">
          <ToolButton
            def={{ id: "apply", Icon: Check, labelKey: "apply_crop_title", tone: "ok" }}
            t={t}
            onClick={onApplyCrop}
          />
          <ToolButton
            def={{ id: "cancel", Icon: X, labelKey: "cancel_crop_title" }}
            t={t}
            onClick={onCancelCrop}
          />
        </div>
      ) : (
        <div className="wb-toolbar-group">
          {canUngroup && (
            <ToolButton
              def={{ id: "ungroup", Icon: Ungroup, labelKey: "ungroup_title", tone: "accent" }}
              t={t}
              onClick={onUngroup}
            />
          )}
          {canGroup && (
            <ToolButton
              def={{ id: "group", Icon: Boxes, labelKey: "group_title", tone: "accent" }}
              t={t}
              onClick={onGroup}
            />
          )}
        </div>
      )}

      {/* Align / distribute — only meaningful with multiple objects selected */}
      {selectionCount > 1 && (
        <>
          <div className="wb-toolbar-divider" />
          <div className="wb-toolbar-group">
            {(
              [
                ["align_left", AlignHorizontalJustifyStart, () => onAlign("left")],
                ["align_centerx", AlignHorizontalJustifyCenter, () => onAlign("centerX")],
                ["align_right", AlignHorizontalJustifyEnd, () => onAlign("right")],
                ["align_top", AlignVerticalJustifyStart, () => onAlign("top")],
                ["align_middley", AlignVerticalJustifyCenter, () => onAlign("middleY")],
                ["align_bottom", AlignVerticalJustifyEnd, () => onAlign("bottom")],
              ] as const
            ).map(([k, Icon, fn]) => (
              <ToolButton key={k} def={{ id: k, Icon, labelKey: k }} t={t} onClick={fn} />
            ))}
          </div>
          <div className="wb-toolbar-divider" />
          <div className="wb-toolbar-group">
            {(
              [
                ["distribute_h", AlignHorizontalSpaceAround, () => onDistribute("horizontal")],
                ["distribute_v", AlignVerticalSpaceAround, () => onDistribute("vertical")],
              ] as const
            ).map(([k, Icon, fn]) => (
              <ToolButton key={k} def={{ id: k, Icon, labelKey: k }} t={t} onClick={fn} />
            ))}
          </div>
        </>
      )}

      <div className="wb-toolbar-divider" />

      {/* Media + destructive actions */}
      <div className="wb-toolbar-group">
        <ToolButton
          def={{ id: "upload", Icon: Upload, labelKey: "tool_upload" }}
          t={t}
          onClick={() => fileRef.current?.click()}
        />
        <ToolButton
          def={{ id: "delete", Icon: Trash2, labelKey: "delete_title", tone: "danger" }}
          t={t}
          onClick={onDelete}
        />
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </nav>
  );
}
