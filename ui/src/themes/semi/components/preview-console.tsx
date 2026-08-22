"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import type { PreviewSceneDef, PreviewSceneId } from "@template/ui";

import { Button } from "./button";
import { Input } from "./input";
import { SmartIcon } from "../icons";

/**
 * Semi PreviewConsole — the preview studio's narrow control rail: single /
 * A-B mode, dark / fold-line / color-blind toggles, the upload slots, the
 * title + channel inputs and the scene tabs. Presentational — all data and
 * callbacks come from the consumer. Lifted out of the preview-workbench
 * section so other tool workbenches can reuse the same studio control rail.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ── Upload slot ───────────────────────────────────────────────────────────────

function UploadSlot({
  label,
  src,
  onUpload,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
}: {
  label?: ReactNode;
  src?: string | null;
  onUpload?: (dataUrl: string) => void;
  uploadTitle?: ReactNode;
  uploadHint?: ReactNode;
  uploadFormatHint?: ReactNode;
  replaceLabel?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const load = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => onUpload?.(String(event.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="pstudio-slot">
      {src ? (
        <>
          <div className="pstudio-slot-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Thumbnail" />
            {label ? <span className="pstudio-slot-tag">{label}</span> : null}
          </div>
          <div className="pstudio-slot-actions">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              <SmartIcon name="Refresh" size={14} />
              <span>{replaceLabel}</span>
            </Button>
            {uploadFormatHint ? (
              <span className="pstudio-slot-hint">{uploadFormatHint}</span>
            ) : null}
          </div>
        </>
      ) : (
        <button
          type="button"
          className="pstudio-drop"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files?.[0];
            if (file) load(file);
          }}
        >
          <span className="pstudio-drop-icon">
            <SmartIcon name="Upload" size={18} />
          </span>
          <span className="pstudio-drop-title">
            {uploadTitle} <b>{label}</b>
          </span>
          <span className="pstudio-drop-hint">{uploadHint}</span>
          <span className="pstudio-drop-format">{uploadFormatHint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="pstudio-hidden-input"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) load(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

// ── Console rail ──────────────────────────────────────────────────────────────

export function PreviewConsole({
  mode,
  onModeChange,
  singleLabel,
  abLabel,
  abHint,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
  uploadA,
  uploadB,
  onUploadA,
  onUploadB,
  titleLabel,
  titleValue,
  titlePlaceholder,
  onTitleChange,
  channelLabel,
  channelValue,
  channelPlaceholder,
  onChannelChange,
  dark,
  onToggleDark,
  darkLabel,
  lightLabel,
  foldLine,
  onToggleFoldLine,
  foldLineLabel,
  foldLineHideLabel,
  colorBlind,
  onToggleColorBlind,
  colorBlindLabel,
  colorBlindOffLabel,
  sceneLabel,
  scenes = [],
  scene,
  onSceneChange,
  aLabel,
  bLabel,
}: {
  mode: "single" | "ab";
  onModeChange?: (mode: "single" | "ab") => void;
  singleLabel?: ReactNode;
  abLabel?: ReactNode;
  abHint?: ReactNode;
  uploadTitle?: ReactNode;
  uploadHint?: ReactNode;
  uploadFormatHint?: ReactNode;
  replaceLabel?: ReactNode;
  uploadA?: string | null;
  uploadB?: string | null;
  onUploadA?: (dataUrl: string) => void;
  onUploadB?: (dataUrl: string) => void;
  titleLabel?: ReactNode;
  titleValue?: string;
  titlePlaceholder?: ReactNode;
  onTitleChange?: (value: string) => void;
  channelLabel?: ReactNode;
  channelValue?: string;
  channelPlaceholder?: ReactNode;
  onChannelChange?: (value: string) => void;
  dark?: boolean;
  onToggleDark?: () => void;
  darkLabel?: ReactNode;
  lightLabel?: ReactNode;
  foldLine?: boolean;
  onToggleFoldLine?: () => void;
  foldLineLabel?: ReactNode;
  foldLineHideLabel?: ReactNode;
  colorBlind?: boolean;
  onToggleColorBlind?: () => void;
  colorBlindLabel?: ReactNode;
  colorBlindOffLabel?: ReactNode;
  sceneLabel?: ReactNode;
  scenes?: PreviewSceneDef[];
  scene?: PreviewSceneId;
  onSceneChange?: (scene: PreviewSceneId) => void;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
}) {
  return (
    <aside className="pstudio-console">
      <div className="pstudio-toolbar">
        <div className="pstudio-mode">
          <button
            type="button"
            className={cn(
              "pstudio-mode-btn",
              mode === "single" && "is-active",
            )}
            onClick={() => onModeChange?.("single")}
          >
            <SmartIcon name="Desktop" size={15} />
            <span>{singleLabel}</span>
          </button>
          <button
            type="button"
            className={cn("pstudio-mode-btn", mode === "ab" && "is-active")}
            onClick={() => onModeChange?.("ab")}
          >
            <SmartIcon name="CheckList" size={15} />
            <span>{abLabel}</span>
          </button>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="pstudio-dark-toggle"
          onClick={onToggleDark}
        >
          <SmartIcon name={dark ? "Sun" : "Moon"} size={14} />
          <span>{dark ? lightLabel : darkLabel}</span>
        </Button>
        {onToggleFoldLine ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pstudio-dark-toggle"
            onClick={onToggleFoldLine}
          >
            <span className="pstudio-fold-glyph">⌁</span>
            <span>{foldLine ? foldLineHideLabel : foldLineLabel}</span>
          </Button>
        ) : null}
        {onToggleColorBlind ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pstudio-dark-toggle"
            onClick={onToggleColorBlind}
          >
            <SmartIcon name="Eye" size={14} />
            <span>{colorBlind ? colorBlindOffLabel : colorBlindLabel}</span>
          </Button>
        ) : null}
      </div>

      {mode === "ab" && abHint ? (
        <p className="pstudio-ab-hint">
          <SmartIcon name="Sparkles" size={14} />
          <span>{abHint}</span>
        </p>
      ) : null}

      <div
        className={cn(
          "pstudio-slots",
          mode === "ab" && "pstudio-slots-duo",
        )}
      >
        <UploadSlot
          label={aLabel}
          src={uploadA}
          onUpload={onUploadA}
          uploadTitle={uploadTitle}
          uploadHint={uploadHint}
          uploadFormatHint={uploadFormatHint}
          replaceLabel={replaceLabel}
        />
        {mode === "ab" ? (
          <UploadSlot
            label={bLabel}
            src={uploadB}
            onUpload={onUploadB}
            uploadTitle={uploadTitle}
            uploadHint={uploadHint}
            uploadFormatHint={uploadFormatHint}
            replaceLabel={replaceLabel}
          />
        ) : (
          <div className="pstudio-slot-fill" />
        )}
      </div>

      <div className="pstudio-fields">
        <label className="pstudio-field">
          <span className="pstudio-field-label">{titleLabel}</span>
          <Input
            prefix={<SmartIcon name="Text" size={15} />}
            placeholder={
              typeof titlePlaceholder === "string"
                ? titlePlaceholder
                : "Your video title here…"
            }
            value={titleValue ?? ""}
            onChange={(event) => onTitleChange?.(event.target.value)}
          />
        </label>
        <label className="pstudio-field">
          <span className="pstudio-field-label">{channelLabel}</span>
          <Input
            prefix={<SmartIcon name="User" size={15} />}
            placeholder={
              typeof channelPlaceholder === "string"
                ? channelPlaceholder
                : "Your Channel"
            }
            value={channelValue ?? ""}
            onChange={(event) => onChannelChange?.(event.target.value)}
          />
        </label>
      </div>

      {scenes.length > 0 ? (
        <div className="pstudio-scenes">
          {sceneLabel ? (
            <span className="pstudio-scenes-label">{sceneLabel}</span>
          ) : null}
          <div className="pstudio-scene-tabs">
            {scenes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "pstudio-scene-tab",
                  s.id === scene && "is-active",
                )}
                onClick={() => onSceneChange?.(s.id)}
              >
                <SmartIcon name={s.icon} size={15} />
                <span className="pstudio-scene-tab-label">{s.label}</span>
                <span className="pstudio-scene-tab-size">{s.size}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
