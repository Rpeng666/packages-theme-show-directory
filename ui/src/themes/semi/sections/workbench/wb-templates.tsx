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
      <div className="wb-tpl-cats">
        {templateCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`wb-tpl-cat${cat === c.id ? " wb-tpl-cat-active" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {t(c.labelKey)}
          </button>
        ))}
      </div>

      {/* Template cards */}
      <div className="wb-tpl-grid">
        {list.map((tp) => (
          <motion.button
            key={tp.id}
            type="button"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="wb-tpl-card"
            title={t(tp.labelKey)}
            onClick={() => onApply(tp.id)}
          >
            <span
              className="wb-tpl-thumb"
              style={{
                background: tp.preview.accent
                  ? `linear-gradient(135deg, ${tp.preview.bg}, ${tp.preview.accent})`
                  : tp.preview.bg,
              }}
            >
              <span
                className="wb-tpl-thumb-text"
                style={{ color: tp.preview.textColor ?? "#fff" }}
              >
                {tp.preview.text}
              </span>
              {tp.preview.accent && (
                <span
                  className="wb-tpl-thumb-bar"
                  style={{ background: tp.preview.textColor ?? "#fff" }}
                />
              )}
            </span>
            <span className="wb-tpl-name">{t(tp.labelKey)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
