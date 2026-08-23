"use client";

import { motion } from "framer-motion";
import { Square, Circle, Triangle, Minus, ArrowRight } from "lucide-react";
import type {
  WorkbenchElementKind,
  WorkbenchT,
} from "@template/ui";

const STICKERS = ["🔥", "⭐", "💥", "❤️", "😎", "👍", "🎯", "🚀", "💡", "🎬", "📺", "👑", "💎", "⚡", "🏆", "✅"];

const ELEMENT_BTN =
  "inline-flex h-8 cursor-pointer items-center justify-center rounded-[9px] border border-transparent bg-[#f1efeb] text-[#4a4642] transition-all hover:border-[rgba(252,114,90,0.4)] hover:bg-[#e9e6e1]";

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
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">
          {t("elements_stickers")}
        </span>
        <div className="grid grid-cols-8 gap-1">
          {STICKERS.map((s) => (
            <motion.button
              key={s}
              type="button"
              whileHover={{ scale: 1.22, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={ELEMENT_BTN}
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
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">
          {t("elements_shapes")}
        </span>
        <div className="flex gap-1">
          <button type="button" className={`${ELEMENT_BTN} flex-1`} title={t("tool_rect")} onClick={() => onAdd("rect")}>
            <Square className="w-4 h-4" />
          </button>
          <button type="button" className={`${ELEMENT_BTN} flex-1`} title={t("tool_circle")} onClick={() => onAdd("circle")}>
            <Circle className="w-4 h-4" />
          </button>
          <button type="button" className={`${ELEMENT_BTN} flex-1`} title={t("elements_triangle")} onClick={() => onAdd("triangle")}>
            <Triangle className="w-4 h-4" />
          </button>
          <button type="button" className={`${ELEMENT_BTN} flex-1`} title={t("tool_line")} onClick={() => onAdd("line")}>
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`${ELEMENT_BTN} flex-1 [&>svg]:-scale-x-100`}
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
