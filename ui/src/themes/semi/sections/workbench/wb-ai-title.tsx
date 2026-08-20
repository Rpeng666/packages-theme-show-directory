"use client";

import { useCallback, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import type {
  WorkbenchAiTask,
  WorkbenchT,
  WorkbenchTextStyle,
} from "@template/ui";

import { Button } from "../../components/button";
import { Input } from "../../components/input";

// Live style previews — how the generated thumbnail will feel.
const STYLE_PREVIEWS: Record<
  WorkbenchTextStyle,
  { bg: string; color: string; shadow?: string }
> = {
  bold: { bg: "linear-gradient(135deg,#f76a6a,#b91c1c)", color: "#fff" },
  minimal: { bg: "linear-gradient(135deg,#f8f8f6,#d8d5cc)", color: "#151210" },
  dramatic: {
    bg: "linear-gradient(135deg,#0f0c1d,#3b0764)",
    color: "#fff",
    shadow: "0 0 12px rgba(251,191,36,0.8)",
  },
};

export function WbAiTitleGenerator({
  task,
  run,
  onResult,
  t,
}: {
  task: WorkbenchAiTask;
  run: (title: string, style: WorkbenchTextStyle) => Promise<void>;
  onResult: (imageUrl: string) => void;
  t: WorkbenchT;
}) {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState<WorkbenchTextStyle>("bold");
  const { loading, error, resultUrl, reset } = task;

  const generate = useCallback(async () => {
    if (!title.trim()) return;
    await run(title.trim(), style);
  }, [title, style, run]);

  const styleOptions: WorkbenchTextStyle[] = ["bold", "minimal", "dramatic"];

  return (
    <div className="space-y-2.5">
      <Input
        placeholder={t("ai_placeholder")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && generate()}
        className="text-xs"
      />

      {/* Style chips with live previews */}
      <div className="wb-ai-styles">
        {styleOptions.map((s) => {
          const preview = STYLE_PREVIEWS[s];
          const active = style === s;
          return (
            <button
              key={s}
              type="button"
              className={`wb-ai-chip${active ? " wb-ai-chip-active" : ""}`}
              onClick={() => setStyle(s)}
              title={t(`ai_${s}`)}
            >
              <span
                className="wb-ai-chip-preview"
                style={{
                  background: preview.bg,
                  color: preview.color,
                  textShadow: preview.shadow,
                }}
              >
                Aa
              </span>
              <span className="wb-ai-chip-label">{t(`ai_${s}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Magic generate button */}
      <button
        type="button"
        className="wb-magic-btn"
        disabled={loading || !title.trim()}
        onClick={generate}
      >
        {loading ? (
          t("ai_generating")
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t("ai_generate")}
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">
              2
            </span>
          </>
        )}
      </button>

      {loading && <div className="wb-shimmer" />}

      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {resultUrl && (
        <div className="space-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="AI generated"
            className="w-full aspect-video rounded-lg object-cover border border-[var(--semi-color-border)]"
          />
          <div className="flex gap-1">
            <Button
              type="button"
              onClick={() => onResult(resultUrl)}
              className="flex-1 justify-center h-7 px-3 text-xs bg-primary text-primary-foreground"
            >
              <Check className="w-3 h-3" /> {t("ai_use_image")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                reset();
                setTitle("");
              }}
              className="h-7 px-2 text-xs"
            >
              {t("ai_regenerate")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
