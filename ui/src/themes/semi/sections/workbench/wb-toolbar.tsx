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

const TONE_HOVER: Record<string, string> = {
  default: "hover:bg-[#f1efeb] hover:text-[#1c1a17]",
  danger: "hover:bg-[rgba(226,59,59,0.1)] hover:text-[#e23b3b]",
  ok: "hover:bg-[rgba(47,158,95,0.1)] hover:text-[#2f9e5f]",
  accent: "hover:bg-[rgba(139,92,246,0.1)] hover:text-[#8b5cf6]",
};

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
          "relative inline-flex h-9 w-[38px] items-center justify-center rounded-[10px] border border-transparent transition-all",
          TONE_HOVER[def.tone ?? "default"],
          active
            ? "bg-[#fc725a] text-white shadow-[0_8px_18px_-6px_rgba(252,114,90,0.5)]"
            : "bg-transparent text-[#6b6760]",
        )}
        onClick={onClick}
        aria-pressed={active}
      >
        {active && (
          <span
            className="absolute bottom-[3px] left-1/2 h-[2.5px] w-[14px] -translate-x-1/2 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.65)]"
            aria-hidden
          />
        )}
        <Icon className="w-4 h-4" />
        {children}
      </button>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[calc(100%+9px)] z-50 flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-white/10 bg-[rgba(28,26,23,0.92)] px-2 py-[5px] text-[11px] leading-none text-[#f5f4f1] shadow-[0_10px_28px_-8px_rgba(28,26,23,0.45)]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <span>{t(def.labelKey)}</span>
            {def.kbd && (
              <kbd className="rounded-[5px] border border-white/15 bg-white/12 px-[5px] py-[2px] font-mono text-[10px] text-[#e9e6e1]">
                {def.kbd}
              </kbd>
            )}
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
    <nav
      className="flex shrink-0 flex-row items-center justify-start gap-0.5 border-b border-[#e9e6e1] bg-white px-3.5 py-[7px] shadow-[0_4px_14px_-12px_rgba(28,26,23,0.2)]"
      aria-label={t("tools_aria")}
    >
      {/* Draw / transform tools */}
      <div className="flex flex-row items-center gap-0.5">
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

      <div className="mx-[7px] h-[22px] w-px bg-[#e9e6e1]" />

      {/* Crop flow (apply / cancel) or selection actions */}
      {isCropping ? (
        <div className="flex flex-row items-center gap-0.5">
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
        <div className="flex flex-row items-center gap-0.5">
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
          <div className="mx-[7px] h-[22px] w-px bg-[#e9e6e1]" />
          <div className="flex flex-row items-center gap-0.5">
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
          <div className="mx-[7px] h-[22px] w-px bg-[#e9e6e1]" />
          <div className="flex flex-row items-center gap-0.5">
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

      <div className="mx-[7px] h-[22px] w-px bg-[#e9e6e1]" />

      {/* Media + destructive actions */}
      <div className="flex flex-row items-center gap-0.5">
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
