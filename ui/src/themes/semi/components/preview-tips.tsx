"use client";

import type { ReactNode } from "react";
import type { PreviewSceneId, PreviewWorkbenchTip } from "@template/ui";

import { SmartIcon } from "../icons";

/**
 * Semi PreviewTips — the preview studio's checklist rail: a card listing the
 * thing-to-check tips for the active scene. Scene tips render as tabs that
 * switch the stage scene; plain tips render as same-locale links.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PreviewTips({
  tipsTitle,
  tips,
  scene,
  onSceneChange,
}: {
  tipsTitle?: ReactNode;
  tips?: PreviewWorkbenchTip[];
  scene?: PreviewSceneId;
  onSceneChange?: (scene: PreviewSceneId) => void;
}) {
  return (
    <section className="mt-6 rounded-[20px] border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-5">
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[rgba(var(--semi-cyan-1),0.6)] text-[rgb(var(--semi-cyan-7))]">
          <SmartIcon name="Sparkles" size={15} />
        </span>
        <h2 className="m-0 text-[14px] font-bold text-[var(--semi-color-text-0)]">
          {tipsTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {tips?.map((tip) =>
          tip.scene ? (
            <button
              key={tip.scene}
              type="button"
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3 py-[11px] text-left text-xs font-semibold leading-[1.4] text-[var(--semi-color-text-1)] transition-all duration-[180ms]",
                tip.scene === scene &&
                  "border-[rgba(var(--semi-cyan-5),0.45)] bg-[rgba(var(--semi-cyan-1),0.5)] text-[rgb(var(--semi-cyan-7))]",
              )}
              onClick={() => onSceneChange?.(tip.scene as PreviewSceneId)}
            >
              <span className="inline-flex">
                <SmartIcon name="EyeOpened" size={13} />
              </span>
              <span>{tip.label}</span>
            </button>
          ) : (
            <a
              key={tip.href}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3 py-[11px] text-left text-xs font-semibold leading-[1.4] text-[var(--semi-color-text-1)] transition-all duration-[180ms] hover:border-[rgba(var(--semi-cyan-5),0.45)]"
              href={tip.href}
            >
              <SmartIcon name="ArrowRight" size={13} />
              <span>{tip.label}</span>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
