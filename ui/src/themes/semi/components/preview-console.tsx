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
 * callbacks come from the consumer.
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
    <div className="overflow-hidden rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
      {src ? (
        <>
          <div className="relative aspect-video bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Thumbnail" className="h-full w-full object-cover" />
            {label ? (
              <span className="absolute left-2.5 top-2.5 inline-flex items-center justify-center rounded-full bg-[rgb(var(--semi-cyan-6))] px-2 py-0.5 text-[11px] font-extrabold tracking-[0.05em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {label}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2.5 px-3 py-2.5">
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
              <span className="text-[11.5px] text-[var(--semi-color-text-2)]">
                {uploadFormatHint}
              </span>
            ) : null}
          </div>
        </>
      ) : (
        <button
          type="button"
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 border-[1.5px] border-dashed border-[rgba(var(--semi-cyan-5),0.5)] rounded-[14px] bg-[rgba(var(--semi-cyan-0),0.35)] px-4 py-6 text-[var(--semi-color-text-1)] transition-all duration-[180ms] hover:border-[rgb(var(--semi-cyan-6))]"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files?.[0];
            if (file) load(file);
          }}
        >
          <span className="mb-1 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[rgba(var(--semi-cyan-1),0.8)] text-[rgb(var(--semi-cyan-7))]">
            <SmartIcon name="Upload" size={18} />
          </span>
          <span className="text-[14px] font-semibold text-[var(--semi-color-text-0)]">
            {uploadTitle} <b>{label}</b>
          </span>
          <span className="text-[12.5px] text-[var(--semi-color-text-2)]">
            {uploadHint}
          </span>
          <span className="text-[11px] text-[var(--semi-color-text-3)]">
            {uploadFormatHint}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
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
    <aside className="rounded-3xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-5 shadow-[0_12px_34px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex gap-1 rounded-xl bg-[var(--semi-color-fill-0)] p-1">
          <button
            type="button"
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-none bg-transparent px-4 py-2 text-[13px] font-semibold text-[var(--semi-color-text-2)] transition-all duration-[180ms]",
              mode === "single" &&
                "bg-[var(--semi-color-bg-0)] text-[var(--semi-color-text-0)] shadow",
            )}
            onClick={() => onModeChange?.("single")}
          >
            <SmartIcon name="Desktop" size={15} />
            <span>{singleLabel}</span>
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-none bg-transparent px-4 py-2 text-[13px] font-semibold text-[var(--semi-color-text-2)] transition-all duration-[180ms]",
              mode === "ab" &&
                "bg-[var(--semi-color-bg-0)] text-[var(--semi-color-text-0)] shadow",
            )}
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
          className="text-[var(--semi-color-text-1)]"
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
            className="text-[var(--semi-color-text-1)]"
            onClick={onToggleFoldLine}
          >
            <span className="text-[14px] leading-none">⌁</span>
            <span>{foldLine ? foldLineHideLabel : foldLineLabel}</span>
          </Button>
        ) : null}
        {onToggleColorBlind ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="text-[var(--semi-color-text-1)]"
            onClick={onToggleColorBlind}
          >
            <SmartIcon name="Eye" size={14} />
            <span>{colorBlind ? colorBlindOffLabel : colorBlindLabel}</span>
          </Button>
        ) : null}
      </div>

      {mode === "ab" && abHint ? (
        <p className="mx-0.5 mt-3.5 flex items-center gap-2 text-[12.5px] leading-[1.5] text-[rgb(var(--semi-cyan-7))]">
          <SmartIcon name="Sparkles" size={14} />
          <span>{abHint}</span>
        </p>
      ) : null}

      <div className={cn("mt-4 grid grid-cols-1 gap-4", mode === "ab" && "grid-cols-1")}>
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
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold tracking-[0.02em] text-[var(--semi-color-text-2)]">
            {titleLabel}
          </span>
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
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold tracking-[0.02em] text-[var(--semi-color-text-2)]">
            {channelLabel}
          </span>
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
        <div className="mt-[18px] flex flex-wrap items-center gap-3.5">
          {sceneLabel ? (
            <span className="text-xs font-bold tracking-[0.02em] text-[var(--semi-color-text-2)]">
              {sceneLabel}
            </span>
          ) : null}
          <div className="flex flex-1 flex-wrap gap-2">
            {scenes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "inline-flex cursor-pointer items-center gap-[7px] rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3 py-2 text-[12.5px] font-semibold text-[var(--semi-color-text-1)] transition-all duration-[180ms]",
                  s.id === scene &&
                    "border-[rgba(var(--semi-cyan-5),0.45)] bg-[rgba(var(--semi-cyan-1),0.5)] text-[rgb(var(--semi-cyan-7))]",
                )}
                onClick={() => onSceneChange?.(s.id)}
              >
                <SmartIcon name={s.icon} size={15} />
                <span className="whitespace-nowrap text-[12.5px] font-semibold leading-none">
                  {s.label}
                </span>
                <span className="rounded-md bg-[rgba(var(--semi-cyan-2),0.7)] px-1 py-0.5 text-[11px] font-semibold text-[rgb(var(--semi-cyan-8))]">
                  {s.size}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
