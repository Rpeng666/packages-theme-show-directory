"use client";

import type { ReactNode } from "react";
import type { PreviewSceneId, PreviewWorkbenchTip } from "@template/ui";

import { SmartIcon } from "../icons";

/**
 * Semi PreviewTips — the preview studio's checklist rail: a card listing the
 * thing-to-check tips for the active scene. Scene tips render as tabs that
 * switch the stage scene; plain tips render as same-locale links. Lifted out
 * of the preview-workbench section for reuse.
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
    <section className="pstudio-tips-card">
      <div className="pstudio-tips-head">
        <span className="pstudio-tips-icon">
          <SmartIcon name="Sparkles" size={15} />
        </span>
        <h2 className="pstudio-tips-title">{tipsTitle}</h2>
      </div>
      <div className="pstudio-tips">
        {tips?.map((tip) =>
          tip.scene ? (
            <button
              key={tip.scene}
              type="button"
              className={cn(
                "pstudio-tip",
                tip.scene === scene && "is-active",
              )}
              onClick={() => onSceneChange?.(tip.scene as PreviewSceneId)}
            >
              <span className="pstudio-tip-icon">
                <SmartIcon name="EyeOpened" size={13} />
              </span>
              <span>{tip.label}</span>
            </button>
          ) : (
            <a key={tip.href} className="pstudio-tip" href={tip.href}>
              <SmartIcon name="ArrowRight" size={13} />
              <span>{tip.label}</span>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
