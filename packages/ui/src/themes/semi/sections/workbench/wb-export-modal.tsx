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
  Package,
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

  const downloadZip = () => {
    if (!result.multiZip) return;
    const a = document.createElement("a");
    a.href = result.multiZip.url;
    a.download = `workbench-all-sizes.zip`;
    a.click();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(28,26,23,0.4)] p-6 backdrop-blur-[10px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="w-[min(460px,92vw)] rounded-[20px] border border-[#e9e6e1] bg-white p-[18px] shadow-[0_30px_70px_-20px_rgba(28,26,23,0.4)]"
        initial={{ scale: 0.92, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-[7px] text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b6760]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#fc725a] shadow-[0_0_10px_rgba(252,114,90,0.9)] animate-[wb-dot-pulse_1.6s_ease-in-out_infinite]" />
            {t("export_ready")}
          </span>
          <button
            type="button"
            className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[9px] border-none bg-[#f1efeb] text-[#6b6760] transition-all hover:bg-[#e9e6e1] hover:text-[#1c1a17]"
            onClick={onClose}
            title={t("export_close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e9e6e1] shadow-[0_0_40px_-12px_rgba(252,114,90,0.4)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt="Exported thumbnail" className="block aspect-video w-full object-cover" />
        </div>

        <div className="my-3 flex items-center gap-2.5">
          <span className="rounded-[7px] border border-[#e9e6e1] bg-[#f1efeb] px-2 py-[3px] text-[11px] font-bold tracking-[0.08em] text-[#1c1a17]">{fmt}</span>
          <span className="text-xs tabular-nums text-[#4a4642]">{result.width} × {result.height}</span>
          <span className="ml-auto text-xs font-semibold tabular-nums text-[#4a4642]">{sizeLabel}</span>
        </div>

        {result.multiZip && result.multiZip.sizes.length > 0 ? (
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#a09b94]">{t("export_all_sizes")}</span>
            <div className="flex flex-wrap gap-1.5">
              {result.multiZip.sizes.map((s) => (
                <span key={`${s.width}x${s.height}`} className="rounded-full border border-[#e9e6e1] bg-[#f1efeb] px-2 py-[3px] text-[11px] font-semibold text-[#4a4642]">
                  {s.label} · {s.width}×{s.height}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mb-3.5 flex flex-col gap-1.5">
          {checks.map((c) => (
            <div
              key={c.label}
              className={`flex items-center gap-2 rounded-[10px] border px-2.5 py-[7px] text-[11.5px] ${
                c.ok
                  ? "border-[rgba(47,158,95,0.25)] bg-[rgba(47,158,95,0.08)] text-[#2f9e5f]"
                  : "border-[rgba(217,119,6,0.3)] bg-[rgba(217,119,6,0.08)] text-[#b45309]"
              }`}
            >
              {c.ok ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span className="flex-1">{c.label}</span>
              <span className="text-[10.5px] font-bold opacity-90">{c.ok ? t("export_ok") : t("export_warn")}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 flex-1 items-center justify-center gap-[7px] rounded-[11px] border border-transparent bg-[#fc725a] text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(252,114,90,0.55)] transition-[filter] hover:brightness-[1.07]"
            onClick={download}
          >
            <Download className="w-4 h-4" />
            {t("export_download")}
          </button>
          <button type="button" className="inline-flex h-10 flex-1 items-center justify-center gap-[7px] rounded-[11px] border border-[#e9e6e1] bg-[#f7f5f2] text-[13px] font-semibold text-[#4a4642] transition-all hover:bg-[#ece8e3] hover:text-[#1c1a17]" onClick={copy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t("export_copied") : t("export_copy")}
          </button>
          {result.multiZip ? (
            <button
              type="button"
              className="inline-flex h-10 flex-1 items-center justify-center gap-[7px] rounded-[11px] border border-[rgba(47,158,95,0.3)] bg-[rgba(47,158,95,0.12)] text-[13px] font-semibold text-[#2f9e5f] transition-all hover:bg-[rgba(47,158,95,0.2)] hover:text-[#1f7a47]"
              onClick={downloadZip}
            >
              <Package className="w-4 h-4" />
              {t("export_zip")}
            </button>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
