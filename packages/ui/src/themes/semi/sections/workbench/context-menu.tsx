"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { WorkbenchT } from "@template/ui";

interface WbContextMenuProps {
  x: number;
  y: number;
  locked: boolean;
  t: WorkbenchT;
  onClose: () => void;
  onBringFront: () => void;
  onForward: () => void;
  onBackward: () => void;
  onBack: () => void;
  onFlipX: () => void;
  onFlipY: () => void;
  onDuplicate: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
}

function MenuItem({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone?: "danger";
}) {
  return (
    <button
      type="button"
      className={
        tone === "danger"
          ? "flex w-full cursor-pointer items-center rounded-[10px] border-none bg-transparent px-2.5 py-[7px] text-left text-[13px] text-[#e23b3b] transition-colors hover:bg-[#e23b3b] hover:text-white"
          : "flex w-full cursor-pointer items-center rounded-[10px] border-none bg-transparent px-2.5 py-[7px] text-left text-[13px] text-[#4a4642] transition-colors hover:bg-[rgba(252,114,90,0.1)] hover:text-[#1c1a17]"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/** Floating right-click menu over the canvas step. */
export function WbContextMenu({
  x,
  y,
  locked,
  t,
  onClose,
  onBringFront,
  onForward,
  onBackward,
  onBack,
  onFlipX,
  onFlipY,
  onDuplicate,
  onToggleLock,
  onDelete,
}: WbContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -4 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[200] min-w-[180px] rounded-[14px] border border-[#e9e6e1] bg-white/95 p-1.5 shadow-[0_18px_48px_-12px_rgba(28,26,23,0.35)] backdrop-blur-[14px]"
      style={{
        left: Math.min(x, (typeof window !== 'undefined' ? window.innerWidth : 800) - 224),
        top: Math.min(y, (typeof window !== 'undefined' ? window.innerHeight : 600) - 360),
      }}
      role="menu"
    >
      <div className="px-2.5 pb-1.5 pt-1 text-[11px] uppercase tracking-[0.05em] text-[#a09b94]">{t("ctx_selection")}</div>
      <MenuItem label={t("ctx_bring_front")} onClick={onBringFront} />
      <MenuItem label={t("ctx_forward")} onClick={onForward} />
      <MenuItem label={t("ctx_backward")} onClick={onBackward} />
      <MenuItem label={t("ctx_send_back")} onClick={onBack} />
      <div className="my-[5px] mx-2 h-px bg-[#ece8e3]" />
      <MenuItem label={t("ctx_flip_h")} onClick={onFlipX} />
      <MenuItem label={t("ctx_flip_v")} onClick={onFlipY} />
      <div className="my-[5px] mx-2 h-px bg-[#ece8e3]" />
      <MenuItem label={t("ctx_duplicate")} onClick={onDuplicate} />
      <MenuItem label={locked ? t("ctx_unlock") : t("ctx_lock")} onClick={onToggleLock} />
      <MenuItem label={t("ctx_delete")} onClick={onDelete} tone="danger" />
    </motion.div>
  );
}
