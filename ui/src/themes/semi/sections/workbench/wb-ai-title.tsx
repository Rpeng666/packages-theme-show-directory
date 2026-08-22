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
      <div className="grid grid-cols-3 gap-1.5">
        {styleOptions.map((s) => {
          const preview = STYLE_PREVIEWS[s];
          const active = style === s;
          return (
            <button
              key={s}
              type="button"
              className={`flex cursor-pointer flex-col items-center gap-[3px] rounded-xl border px-1 py-1.5 transition-all ${
                active
                  ? "border-[#fc725a] bg-[rgba(252,114,90,0.08)]"
                  : "border-[#e9e6e1] bg-[#f7f5f2] hover:border-[rgba(252,114,90,0.5)]"
              }`}
              onClick={() => setStyle(s)}
              title={t(`ai_${s}`)}
            >
              <span
                className="flex h-[26px] w-full items-center justify-center rounded-[7px] text-[13px] font-black"
                style={{
                  background: preview.bg,
                  color: preview.color,
                  textShadow: preview.shadow,
                }}
              >
                Aa
              </span>
              <span className="text-[9px] font-semibold text-[#6b6760]">{t(`ai_${s}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Magic generate button */}
      <button
        type="button"
        className="relative inline-flex h-[34px] w-full cursor-pointer items-center justify-center gap-[7px] overflow-hidden rounded-[11px] text-[13px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(252,114,90,0.6)] transition-[filter,transform] duration-200 hover:brightness-[1.08] hover:-translate-y-px disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none animate-[wb-grad-drift_6s_ease_infinite]"
        style={{ background: "linear-gradient(120deg, #fd8a6e, #f0563a, #e5371d)", backgroundSize: "200% 200%" }}
        disabled={loading || !title.trim()}
        onClick={generate}
      >
        {loading ? (
          t("ai_generating")
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t("ai_generate")}
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">2</span>
          </>
        )}
      </button>

      {loading && <div className="relative h-[6px] overflow-hidden rounded-full bg-[#ece8e3]">
        <div className="absolute inset-0 animate-[wb-shimmer-slide_1.2s_ease_infinite] bg-[linear-gradient(90deg,transparent,rgba(252,114,90,0.5),transparent)]" />
      </div>}

      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {resultUrl && (
        <div className="space-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="AI generated"
            className="w-full aspect-video rounded-lg border border-[#e9e6e1] object-cover"
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
