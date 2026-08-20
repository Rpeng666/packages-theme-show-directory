"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import {
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Trash2,
  Image,
  Type,
  Square,
  GripVertical,
  Box,
  Lock,
  LockOpen,
} from "lucide-react";
import type {
  WorkbenchLayer,
  WorkbenchLayerMoveDir,
  WorkbenchT,
} from "@template/ui";

import { cn } from "./helpers";

interface WbLayersPanelProps {
  layers: WorkbenchLayer[];
  /** Structural version — re-syncs the drag order when the canvas stack changes. */
  version: number;
  t: WorkbenchT;
  onSelect: (id: number) => void;
  /** Shift-click — add/remove this layer from the active multi-selection. */
  onSelectMulti: (id: number) => void;
  /** New top-first order (index 0 = topmost layer). */
  onReorder: (orderedIds: number[]) => void;
  onMove: (id: number, dir: WorkbenchLayerMoveDir) => void;
  onToggle: (id: number) => void;
  onToggleLock: (id: number) => void;
  onDelete: (id: number) => void;
}

const TYPE_DOT: Record<string, string> = {
  text: "#60a5fa",
  image: "#f87171",
  rect: "#4ade80",
  circle: "#fbbf24",
  group: "#c084fc",
};

export function WbLayersPanel({
  layers,
  version,
  t,
  onSelect,
  onSelectMulti,
  onReorder,
  onMove,
  onToggle,
  onToggleLock,
  onDelete,
}: WbLayersPanelProps) {
  // Top of the list = topmost layer. Reorder animates a top-first id array.
  const reversed = [...layers].reverse();
  const [order, setOrder] = useState<number[]>(() => reversed.map((l) => l.id));

  // Re-sync with the fabric stack whenever the layer structure changes
  // (add / remove / reorder). Selection-only updates don't bump `version`,
  // so the drag order stays stable while `isSelected` refreshes live.
  // (Adjusting state during render keeps the re-sync effect-free.)
  const [lastVersion, setLastVersion] = useState(version);
  if (version !== lastVersion) {
    setLastVersion(version);
    setOrder(reversed.map((l) => l.id));
  }

  const handleReorder = (next: number[]) => {
    setOrder(next);
    onReorder(next);
  };

  if (layers.length === 0) {
    return (
      <p className="text-xs px-1 py-2 text-[var(--semi-color-text-3)]">
        {t("layers_empty")}
      </p>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      as="div"
      values={order}
      onReorder={handleReorder}
      className="flex flex-col gap-1"
    >
      {order.map((id) => {
        const layer = reversed.find((l) => l.id === id);
        if (!layer) return null;
        const canUp = order.indexOf(id) > 0;
        const canDown = order.indexOf(id) < order.length - 1;
        const LayerIcon =
          layer.type === "text"
            ? Type
            : layer.type === "rect" || layer.type === "circle"
              ? Square
              : layer.type === "group"
                ? Box
                : Image;
        const dotColor = TYPE_DOT[layer.type] ?? "#a78bfa";
        return (
          <Reorder.Item
            key={layer.id}
            value={layer.id}
            as="div"
            className={cn(
              "wb-layer",
              layer.isSelected && "wb-layer-active",
              !layer.visible && "wb-layer-hidden",
            )}
            onClick={(e) => {
              if (e.shiftKey) {
                e.preventDefault();
                onSelectMulti(layer.id);
              } else {
                onSelect(layer.id);
              }
            }}
          >
            {/* Drag affordance */}
            <GripVertical className="w-3 h-3 wb-layer-grip" />

            <button
              type="button"
              title={layer.locked ? t("layers_unlock") : t("layers_lock")}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLock(layer.id);
              }}
              className={`wb-layer-btn${layer.locked ? " wb-layer-btn-locked" : ""}`}
            >
              {layer.locked ? <Lock className="w-3 h-3" /> : <LockOpen className="w-3 h-3" />}
            </button>

            <button
              type="button"
              title={layer.visible ? t("layers_hide") : t("layers_show")}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(layer.id);
              }}
              className="wb-layer-btn"
            >
              {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>

            <span className="wb-layer-dot" style={{ backgroundColor: dotColor }} />

            <LayerIcon className="w-3 h-3 wb-layer-icon" />

            <span className="wb-layer-label">{layer.label}</span>

            <span className="wb-layer-type">{layer.type}</span>

            <span className="wb-layer-actions">
              <button
                type="button"
                title={t("layers_up")}
                disabled={!canUp}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(layer.id, "up");
                }}
                className="wb-layer-btn disabled:opacity-30"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                type="button"
                title={t("layers_down")}
                disabled={!canDown}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(layer.id, "down");
                }}
                className="wb-layer-btn disabled:opacity-30"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                type="button"
                title={t("layers_delete")}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(layer.id);
                }}
                className="wb-layer-btn wb-layer-btn-danger"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
