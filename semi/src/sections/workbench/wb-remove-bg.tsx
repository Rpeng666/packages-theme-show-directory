"use client";

import { useRef } from "react";
import { Wand2, Sparkles, Check, RefreshCw } from "lucide-react";
import type { WorkbenchAiTask, WorkbenchT } from "@template/ui";

import { Banner } from "../../components/banner";
import { Button } from "../../components/button";

export function WbRemoveBgPanel({
  task,
  run,
  onResult,
  t,
}: {
  task: WorkbenchAiTask;
  run: (file: File) => Promise<void>;
  onResult: (dataUrl: string) => void;
  t: WorkbenchT;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loading, error, resultUrl, reset } = task;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await run(file);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="wb-magic-btn"
        disabled={loading}
        onClick={() => fileInputRef.current?.click()}
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            {t("bg_removing")}
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            {t("bg_remove")}
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">
              AI
            </span>
          </>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={loading}
        onChange={handleFile}
      />

      {loading && <div className="wb-shimmer" />}

      <div className="flex items-center gap-1 text-[10px] text-[var(--semi-color-text-3)]">
        <Sparkles className="w-3 h-3" />
        <span>{t("bg_credits_hint")}</span>
      </div>

      {error && (
        <Banner type="danger" className="p-2! text-xs!">
          {error}
        </Banner>
      )}

      {resultUrl && (
        <div className="space-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="Background removed"
            className="w-full aspect-video rounded-lg object-contain border border-[var(--semi-color-border)] bg-[#141110]"
          />
          <div className="flex gap-1">
            <Button
              type="button"
              onClick={() => onResult(resultUrl)}
              className="flex-1 justify-center h-7 px-3 text-xs bg-primary text-primary-foreground"
            >
              <Check className="w-3 h-3" /> {t("bg_use_image")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={reset}
              className="h-7 px-2 text-xs"
            >
              {t("bg_try_another")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
