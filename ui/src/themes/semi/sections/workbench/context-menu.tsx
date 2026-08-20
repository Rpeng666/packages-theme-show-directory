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
      className={`wb-ctx-item${tone === "danger" ? " wb-ctx-item-danger" : ""}`}
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
      className="wb-ctx"
      style={{
        left: Math.min(x, window.innerWidth - 224),
        top: Math.min(y, window.innerHeight - 360),
      }}
      role="menu"
    >
      <div className="wb-ctx-label">{t("ctx_selection")}</div>
      <MenuItem label={t("ctx_bring_front")} onClick={onBringFront} />
      <MenuItem label={t("ctx_forward")} onClick={onForward} />
      <MenuItem label={t("ctx_backward")} onClick={onBackward} />
      <MenuItem label={t("ctx_send_back")} onClick={onBack} />
      <div className="wb-ctx-sep" />
      <MenuItem label={t("ctx_flip_h")} onClick={onFlipX} />
      <MenuItem label={t("ctx_flip_v")} onClick={onFlipY} />
      <div className="wb-ctx-sep" />
      <MenuItem label={t("ctx_duplicate")} onClick={onDuplicate} />
      <MenuItem label={locked ? t("ctx_unlock") : t("ctx_lock")} onClick={onToggleLock} />
      <MenuItem label={t("ctx_delete")} onClick={onDelete} tone="danger" />
    </motion.div>
  );
}
