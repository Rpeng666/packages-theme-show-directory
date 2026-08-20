"use client";

import { motion } from "framer-motion";
import { Square, Circle, Triangle, Minus, ArrowRight } from "lucide-react";
import type {
  WorkbenchElementKind,
  WorkbenchT,
} from "@template/ui";

const STICKERS = ["🔥", "⭐", "💥", "❤️", "😎", "👍", "🎯", "🚀", "💡", "🎬", "📺", "👑", "💎", "⚡", "🏆", "✅"];

/** One-click content library — emoji stickers + quick shapes. */
export function WbElementsPanel({
  onAdd,
  t,
}: {
  onAdd: (kind: WorkbenchElementKind, value?: string) => void;
  t: WorkbenchT;
}) {
  return (
    <div className="space-y-3">
      {/* Emoji stickers */}
      <div>
        <span className="wb-dims-label" style={{ marginBottom: 8 }}>
          {t("elements_stickers")}
        </span>
        <div className="wb-elements-grid">
          {STICKERS.map((s) => (
            <motion.button
              key={s}
              type="button"
              whileHover={{ scale: 1.22, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="wb-element-btn"
              title={t("elements_add_sticker")}
              onClick={() => onAdd("emoji", s)}
            >
              <span style={{ fontSize: 22 }}>{s}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick shapes */}
      <div>
        <span className="wb-dims-label" style={{ marginBottom: 8 }}>
          {t("elements_shapes")}
        </span>
        <div className="wb-elements-shapes">
          <button type="button" className="wb-element-btn" title={t("tool_rect")} onClick={() => onAdd("rect")}>
            <Square className="w-4 h-4" />
          </button>
          <button type="button" className="wb-element-btn" title={t("tool_circle")} onClick={() => onAdd("circle")}>
            <Circle className="w-4 h-4" />
          </button>
          <button type="button" className="wb-element-btn" title={t("elements_triangle")} onClick={() => onAdd("triangle")}>
            <Triangle className="w-4 h-4" />
          </button>
          <button type="button" className="wb-element-btn" title={t("tool_line")} onClick={() => onAdd("line")}>
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="wb-element-btn wb-element-btn-arrow"
            title={t("elements_arrow")}
            onClick={() => onAdd("arrow")}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
