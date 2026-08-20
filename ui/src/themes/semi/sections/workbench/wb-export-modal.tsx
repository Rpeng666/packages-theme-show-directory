"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Copy,
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import type { WorkbenchExportResult, WorkbenchT } from "@template/ui";

interface WbExportModalProps {
  result: WorkbenchExportResult;
  t: WorkbenchT;
  onClose: () => void;
}

function formatSize(bytes: number): string {
  const kb = bytes / 1024;
  if (kb >= 1024) return `${(kb / 1024).toFixed(2)} MB`;
  return `${Math.round(kb)} KB`;
}

/** Post-export "reveal" modal — preview, compliance check, copy / download. */
export function WbExportModal({ result, onClose, t }: WbExportModalProps) {
  const [copied, setCopied] = useState(false);

  const sizeLabel = formatSize(result.sizeBytes);
  const ratioOk = Math.abs(result.width / result.height - 16 / 9) < 0.01;
  const sizeOk = result.sizeBytes <= 1.9 * 1024 * 1024;
  const fmt = result.format.toUpperCase();

  const checks = [
    { ok: ratioOk, label: t("export_check_dimensions") },
    { ok: sizeOk, label: t("export_check_size") },
    { ok: result.hasText, label: t("export_check_text"), warn: !result.hasText },
  ];

  // Esc closes; revoke the object URL on unmount.
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
      URL.revokeObjectURL(result.url);
    };
  }, [onClose, result.url]);

  const copy = async () => {
    try {
      const mime =
        result.format === "jpeg"
          ? "image/jpeg"
          : result.format === "png"
            ? "image/png"
            : "image/webp";
      await navigator.clipboard.write([
        new ClipboardItem({ [mime]: result.blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable (non-secure context) */
    }
  };

  const download = () => {
    const ext = result.format === "jpeg" ? "jpg" : result.format;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `workbench-${result.width}x${result.height}.${ext}`;
    a.click();
  };

  return (
    <motion.div
      className="wb-export-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="wb-export-modal"
        initial={{ scale: 0.92, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wb-export-head">
          <span className="wb-export-eyebrow">
            <span className="wb-export-eyebrow-dot" />
            {t("export_ready")}
          </span>
          <button
            type="button"
            className="wb-export-close"
            onClick={onClose}
            title={t("export_close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reveal: preview with brand glow */}
        <div className="wb-export-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt="Exported thumbnail" />
        </div>

        <div className="wb-export-meta">
          <span className="wb-export-badge">{fmt}</span>
          <span className="wb-export-dims">
            {result.width} × {result.height}
          </span>
          <span className="wb-export-size">{sizeLabel}</span>
        </div>

        {/* YouTube compliance checklist */}
        <div className="wb-export-checks">
          {checks.map((c) => (
            <div
              key={c.label}
              className={`wb-export-check${c.ok ? "" : " wb-export-check-warn"}`}
            >
              {c.ok ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
              <span className="wb-export-check-label">{c.label}</span>
              <span className="wb-export-check-state">
                {c.ok ? t("export_ok") : t("export_warn")}
              </span>
            </div>
          ))}
        </div>

        <div className="wb-export-actions">
          <button
            type="button"
            className="wb-export-btn wb-export-btn-primary"
            onClick={download}
          >
            <Download className="w-4 h-4" />
            {t("export_download")}
          </button>
          <button type="button" className="wb-export-btn" onClick={copy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t("export_copied") : t("export_copy")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
