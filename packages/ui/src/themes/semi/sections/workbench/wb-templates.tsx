"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type {
  WorkbenchT,
  WorkbenchTemplate,
  WorkbenchTemplateCategory,
} from "@template/ui";

/** Gallery of structured templates with category filter + live-looking cards. */
export function WbTemplateGallery({
  templates,
  templateCategories,
  onApply,
  t,
}: {
  templates: WorkbenchTemplate[];
  templateCategories: WorkbenchTemplateCategory[];
  onApply: (id: string) => void;
  t: WorkbenchT;
}) {
  const [cat, setCat] = useState<string>("all");

  const list =
    cat === "all"
      ? templates
      : templates.filter((tp) => tp.category === cat);

  return (
    <div className="space-y-2.5">
      {/* Category chips */}
      <div className="flex flex-wrap gap-1">
        {templateCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`rounded-full border px-[9px] py-[3px] text-[11px] transition-all ${
              cat === c.id
                ? "border-transparent bg-[#fc725a] text-white"
                : "border-[#e9e6e1] bg-transparent text-[#6b6760] hover:border-[rgba(252,114,90,0.4)] hover:text-[#1c1a17]"
            }`}
            onClick={() => setCat(c.id)}
          >
            {t(c.labelKey)}
          </button>
        ))}
      </div>

      {/* Template cards */}
      <div className="grid grid-cols-2 gap-2">
        {list.map((tp) => (
          <motion.button
            key={tp.id}
            type="button"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex cursor-pointer flex-col gap-1 rounded-xl border border-[#e9e6e1] bg-[#f7f5f2] p-1 transition-colors hover:border-[rgba(252,114,90,0.45)]"
            title={t(tp.labelKey)}
            onClick={() => onApply(tp.id)}
          >
            <span
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg"
              style={{
                background: tp.preview.accent
                  ? `linear-gradient(135deg, ${tp.preview.bg}, ${tp.preview.accent})`
                  : tp.preview.bg,
              }}
            >
              <span
                className="px-1 text-center text-[9px] font-black leading-[1.1] tracking-[0.02em]"
                style={{ color: tp.preview.textColor ?? "#fff" }}
              >
                {tp.preview.text}
              </span>
              {tp.preview.accent && (
                <span
                  className="absolute bottom-2 left-1/2 h-[3px] w-[30px] -translate-x-1/2 rounded opacity-90"
                  style={{ background: tp.preview.textColor ?? "#fff" }}
                />
              )}
            </span>
            <span className="truncate pb-0.5 text-center text-[10px] text-[#6b6760]">
              {t(tp.labelKey)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
