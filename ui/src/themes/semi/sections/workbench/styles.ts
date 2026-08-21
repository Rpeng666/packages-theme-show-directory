/**
 * Workbench — shared stylesheet.
 *
 * The `.wb-*` visual language (dark canvas editor chrome, semi-consistent).
 * Extracted verbatim from the app theme.css workbench block and shipped with
 * the section so the whole editor surface is self-contained.
 */
export const WORKBENCH_CSS = `

/* ═══ WorkbenchStudio — dark canvas editor chrome (semi-consistent) ═══ */
.wb-root {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--semi-color-bg-0);
  color: var(--semi-color-text-0);
  font-family: var(--font-sans, "Inter", sans-serif);
}

/* Top bar */
.wb-topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 14px;
  flex-shrink: 0;
  background: var(--semi-color-bg-1);
  border-bottom: 1px solid var(--semi-color-border);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.02);
  z-index: 5;
}
.wb-topbar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--semi-color-text-2);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
}
.wb-topbar-link:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-0);
}
.wb-topbar-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--semi-color-text-0);
}
.wb-topbar-brand-logo {
  width: 26px;
  height: 26px;
  border-radius: 8px;
}
.wb-topbar-divider {
  width: 1px;
  height: 20px;
  background: var(--semi-color-border);
}
.wb-topbar-spacer {
  flex: 1;
}
.wb-topbar-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--semi-color-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-topbar-iconbtn-active {
  color: #fff;
  background: var(--app-brand-grad);
  box-shadow: 0 6px 14px -6px rgba(var(--semi-red-5), 0.5);
}
.wb-topbar-iconbtn:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-0);
}
.wb-topbar-iconbtn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.wb-topbar-zoom {
  font-size: 12px;
  font-weight: 600;
  color: var(--semi-color-text-2);
  font-variant-numeric: tabular-nums;
  min-width: 52px;
  text-align: center;
}
.wb-export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border-radius: 9px;
  border: none;
  background: var(--app-brand-grad);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px -8px rgba(var(--semi-red-5), 0.55);
  transition: filter 0.15s ease;
}
.wb-export-btn:hover {
  filter: brightness(1.08);
}

/* Workspace row */
.wb-workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* Tool strip — horizontal, sticky under the top bar (moved from left rail) */
.wb-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  padding: 7px 14px;
  flex-shrink: 0;
  background: linear-gradient(180deg, var(--semi-color-bg-2), var(--semi-color-bg-1));
  border-bottom: 1px solid var(--semi-color-border);
  box-shadow: 0 8px 24px -18px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  z-index: 7;
}
.wb-toolbar-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
}
.wb-tool {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--semi-color-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-tool:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-0);
}
.wb-tool-active {
  color: #fff;
  background: var(--app-brand-grad);
  box-shadow: 0 8px 18px -6px rgba(var(--semi-red-5), 0.5);
}
.wb-tool-indicator {
  position: absolute;
  left: 50%;
  bottom: 3px;
  transform: translateX(-50%);
  width: 14px;
  height: 2.5px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.65);
}
/* Hover tooltip (label + shortcut badge) — drops below the button */
.wb-tooltip {
  position: absolute;
  left: 50%;
  top: calc(100% + 9px);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 8px;
  background: rgba(20, 16, 14, 0.94);
  border: 1px solid var(--semi-color-border);
  box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.65);
  font-size: 11px;
  line-height: 1;
  color: var(--semi-color-text-0);
  white-space: nowrap;
  pointer-events: none;
  z-index: 50;
}
.wb-tooltip kbd {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--semi-color-border);
  color: var(--semi-color-text-2);
}
.wb-toolbar-divider {
  width: 1px;
  height: 22px;
  background: var(--semi-color-border);
  margin: 0 7px;
}
.wb-tool-danger:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.12);
}
.wb-tool-ok:hover {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.12);
}
.wb-tool-accent:hover {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.14);
}
.wb-tool-accent {
  animation: wb-accent-pulse 2.4s ease-in-out infinite;
}
@keyframes wb-accent-pulse {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 0 1px rgba(192, 132, 252, 0.35); }
}

/* Canvas area */
.wb-canvas-area {
  position: relative;
  flex: 1;
  overflow: hidden;
  background:
    radial-gradient(720px 520px at 50% 32%, rgba(var(--semi-red-5), 0.14), transparent 72%),
    radial-gradient(320px 240px at 18% 82%, rgba(var(--semi-purple-6), 0.08), transparent 70%),
    linear-gradient(180deg, var(--semi-color-bg-0), #0e0c0a);
}
.wb-canvas-area::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 45%, transparent 100%);
}
.wb-canvas-area canvas {
  display: block;
}

/* Autosave banner */
.wb-autosave {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 12px;
  background: var(--semi-color-bg-2);
  border: 1px solid var(--semi-color-border);
  box-shadow: 0 16px 40px -16px rgba(0, 0, 0, 0.6);
  font-size: 13px;
  color: var(--semi-color-text-1);
}

/* Panel toggle */
.wb-panel-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 48px;
  border: 1px solid var(--semi-color-border);
  border-right: none;
  border-radius: 10px 0 0 10px;
  background: var(--semi-color-bg-1);
  color: var(--semi-color-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-panel-toggle:hover {
  color: var(--semi-color-text-0);
}

/* Properties panel — stack of floating glass control cards */
.wb-panel {
  width: 300px;
  flex-shrink: 0;
  background: var(--semi-color-bg-1);
  border-left: 1px solid var(--semi-color-border);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 14px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 3;
}
.wb-panel::-webkit-scrollbar {
  width: 8px;
}
.wb-panel::-webkit-scrollbar-thumb {
  background: var(--semi-color-border);
  border-radius: 4px;
}
.wb-section {
  padding: 16px;
  border-bottom: 1px solid var(--semi-color-border);
}
.wb-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--semi-color-text-2);
}
.wb-section-title::before {
  content: "";
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--app-brand-grad);
}

/* Status bar */
.wb-statusbar {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 28px;
  padding: 0 16px;
  flex-shrink: 0;
  background: var(--semi-color-bg-1);
  border-top: 1px solid var(--semi-color-border);
  font-size: 11px;
  color: var(--semi-color-text-3);
  font-variant-numeric: tabular-nums;
}
.wb-statusbar-spacer {
  flex: 1;
}

/* Onboarding dialog surface */
.wb-onboarding-backdrop {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 9, 8, 0.7);
  backdrop-filter: blur(6px);
}
.wb-onboarding-card {
  width: min(560px, calc(100vw - 40px));
  border-radius: 20px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-1);
  box-shadow: 0 40px 80px -24px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.wb-onboarding-head {
  padding: 22px 24px 0;
}
.wb-onboarding-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--semi-color-text-0);
}
.wb-onboarding-desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--semi-color-text-2);
}
.wb-onboarding-body {
  padding: 16px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.wb-onboarding-templates {
  border: 1px solid var(--semi-color-border);
  border-radius: 14px;
  background: var(--semi-color-bg-2);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wb-onboarding-templates-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--semi-color-text-2);
}
.wb-onboarding-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.wb-onboarding-tpl {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.wb-onboarding-tpl:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.6);
}
.wb-onboarding-tpl-hint {
  font-size: 10px;
  text-align: center;
  color: var(--semi-color-text-3);
  margin: 0;
}

/* Reusable layer row */
.wb-layer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 9px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-layer:hover {
  background: var(--semi-color-fill-0);
}
.wb-layer-active {
  border-color: rgba(var(--semi-red-5), 0.45);
  background: rgba(var(--semi-red-1), 0.16);
}
.wb-layer-hidden {
  opacity: 0.45;
}
.wb-layer-icon {
  color: var(--semi-color-text-3);
  flex-shrink: 0;
}
.wb-layer-grip {
  color: var(--semi-color-text-3);
  opacity: 0.35;
  flex-shrink: 0;
  cursor: grab;
  transition: opacity 0.12s ease;
}
.wb-layer:hover .wb-layer-grip {
  opacity: 0.8;
}
.wb-layer:active .wb-layer-grip {
  cursor: grabbing;
  opacity: 1;
}
.wb-layer-label {
  font-size: 12px;
  color: var(--semi-color-text-1);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wb-layer-actions {
  display: none;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.wb-layer:hover .wb-layer-actions {
  display: flex;
}
.wb-layer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--semi-color-text-3);
  cursor: pointer;
  transition: all 0.12s ease;
}
.wb-layer-btn:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-1);
}
.wb-layer-btn-danger:hover {
  color: #f87171;
}
.wb-layer-btn-locked {
  color: #fbbf24;
}

/* Blend mode select (object appearance) */
.wb-blend-select {
  width: 100%;
  height: 30px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-fill-0);
  color: var(--semi-color-text-1);
  font-size: 12px;
  cursor: pointer;
  outline: none;
}
.wb-blend-select:focus {
  border-color: rgba(var(--semi-red-5), 0.5);
}
.wb-blend-select option {
  background: var(--semi-color-bg-2);
  color: var(--semi-color-text-1);
}

/* Content library — emoji stickers + quick shapes */
.wb-elements-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}
.wb-element-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--semi-color-fill-0);
  color: var(--semi-color-text-1);
  cursor: pointer;
  transition: all 0.12s ease;
}
.wb-element-btn:hover {
  border-color: rgba(var(--semi-red-5), 0.4);
  background: var(--semi-color-fill-1);
}
.wb-element-btn-arrow svg {
  transform: scaleX(-1);
}
.wb-elements-shapes {
  display: flex;
  gap: 4px;
}
.wb-elements-shapes .wb-element-btn {
  flex: 1;
}

/* Template gallery */
.wb-tpl-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.wb-tpl-cat {
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--semi-color-border);
  background: transparent;
  color: var(--semi-color-text-2);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.12s ease;
}
.wb-tpl-cat:hover {
  color: var(--semi-color-text-0);
  border-color: rgba(var(--semi-red-5), 0.4);
}
.wb-tpl-cat-active {
  color: #fff;
  background: var(--app-brand-grad);
  border-color: transparent;
}
.wb-tpl-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.wb-tpl-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-2);
  cursor: pointer;
  transition: border-color 0.12s ease;
}
.wb-tpl-card:hover {
  border-color: rgba(var(--semi-red-5), 0.45);
}
.wb-tpl-thumb {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 7px;
  overflow: hidden;
}
.wb-tpl-thumb-text {
  font-size: 9px;
  font-weight: 900;
  line-height: 1.1;
  text-align: center;
  padding: 0 4px;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}
.wb-tpl-thumb-bar {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  border-radius: 2px;
  opacity: 0.9;
}
.wb-tpl-name {
  font-size: 10px;
  color: var(--semi-color-text-2);
  text-align: center;
  padding-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Export reveal modal */
.wb-export-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 6, 5, 0.62);
  backdrop-filter: blur(10px);
}
.wb-export-modal {
  width: min(460px, 92vw);
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(var(--semi-red-5), 0.35);
  background: linear-gradient(180deg, var(--semi-color-bg-2), var(--semi-color-bg-1));
  box-shadow:
    0 30px 70px -20px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 0 60px -18px rgba(var(--semi-red-5), 0.45);
}
.wb-export-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.wb-export-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--semi-color-text-2);
}
.wb-export-eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--app-brand-grad);
  box-shadow: 0 0 10px rgba(var(--semi-red-5), 0.9);
  animation: wb-dot-pulse 1.6s ease-in-out infinite;
}
@keyframes wb-dot-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
.wb-export-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: var(--semi-color-fill-0);
  color: var(--semi-color-text-2);
  cursor: pointer;
  transition: all 0.12s ease;
}
.wb-export-close:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-1);
}
.wb-export-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--semi-color-border);
  box-shadow: 0 0 40px -12px rgba(var(--semi-red-5), 0.4);
}
.wb-export-preview img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.wb-export-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
}
.wb-export-badge {
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--semi-color-fill-0);
  border: 1px solid var(--semi-color-border);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--semi-color-text-0);
}
.wb-export-dims {
  font-size: 12px;
  color: var(--semi-color-text-1);
  font-variant-numeric: tabular-nums;
}
.wb-export-size {
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  color: var(--semi-color-text-1);
  font-variant-numeric: tabular-nums;
}
.wb-export-checks {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.wb-export-check {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 9px;
  background: rgba(74, 222, 128, 0.07);
  border: 1px solid rgba(74, 222, 128, 0.25);
  color: #86efac;
  font-size: 11.5px;
}
.wb-export-check-warn {
  background: rgba(251, 191, 36, 0.08);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fcd34d;
}
.wb-export-check-label {
  flex: 1;
}
.wb-export-check-state {
  font-weight: 700;
  font-size: 10.5px;
  opacity: 0.9;
}
.wb-export-actions {
  display: flex;
  gap: 8px;
}
.wb-export-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex: 1;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-fill-0);
  color: var(--semi-color-text-1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-export-btn:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-1);
}
.wb-export-btn-primary {
  background: var(--app-brand-grad);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 8px 20px -8px rgba(var(--semi-red-5), 0.55);
}
.wb-export-btn-primary:hover {
  filter: brightness(1.08);
  color: #fff;
}

.wb-export-btn-zip {
  background: rgba(74, 222, 128, 0.12);
  border-color: rgba(74, 222, 128, 0.3);
  color: #86efac;
}
.wb-export-btn-zip:hover {
  background: rgba(74, 222, 128, 0.2);
  color: #bbf7d0;
}
.wb-export-multisize {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 4px 0 12px;
}
.wb-export-multisize-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--semi-color-text-3);
}
.wb-export-multisize-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.wb-export-multisize-chip {
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: var(--semi-color-text-1);
  background: var(--semi-color-fill-0);
  border: 1px solid var(--semi-color-border);
}

/* Scanner gallery overlay */
.wb-gallery {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  height: 224px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--semi-color-bg-1), var(--semi-color-bg-0));
  border-top: 1px solid var(--semi-color-border);
  box-shadow: 0 -18px 44px -22px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.wb-gallery-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-1);
}
.wb-gallery-title {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--semi-color-text-0);
}
.wb-gallery-title svg {
  color: rgb(var(--semi-purple-6));
}
.wb-gallery-hint {
  flex: 1;
  font-size: 11px;
  color: var(--semi-color-text-3);
  text-align: right;
  margin-right: 2px;
}
.wb-gallery-close {
  position: static;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 9px;
  background: var(--semi-color-fill-0);
  color: var(--semi-color-text-2);
  cursor: pointer;
  transition: all 0.12s ease;
}
.wb-gallery-close:hover {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-1);
}
.wb-topbar-iconbtn-accent {
  color: #c084fc;
}
.wb-topbar-iconbtn-accent:hover {
  color: #fff;
  background: rgba(192, 132, 252, 0.18);
}

@media (max-width: 720px) {
  .wb-panel {
    position: absolute;
    right: 0;
    top: 48px;
    bottom: 28px;
    z-index: 25;
    box-shadow: -20px 0 60px -20px rgba(0, 0, 0, 0.6);
  }
}

/* ═══ Workbench — playful design-tool controls (de-ERP) ═══ */

/* Add-image dropzone tile */
.wb-dropzone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 22px 12px;
  border: 1.5px dashed rgba(var(--semi-red-5), 0.35);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(var(--semi-red-0), 0.18), transparent);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.wb-dropzone:hover {
  border-color: rgba(var(--semi-red-5), 0.6);
  background: linear-gradient(180deg, rgba(var(--semi-red-0), 0.3), transparent);
  transform: translateY(-1px);
}
.wb-dropzone-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--app-brand-grad);
  color: #fff;
  box-shadow: 0 10px 22px -8px rgba(var(--semi-red-5), 0.55);
  transition: transform 0.2s ease;
}
.wb-dropzone:hover .wb-dropzone-icon { transform: translateY(-2px) scale(1.05); }
.wb-dropzone-label { font-size: 13px; font-weight: 600; color: var(--semi-color-text-0); }
.wb-dropzone-hint { font-size: 11px; color: var(--semi-color-text-3); }

/* Dimension row with ratio preview + lock */
.wb-dims {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wb-dims-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.wb-dims-field { flex: 1; min-width: 0; }
.wb-dims-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--semi-color-text-3);
  margin-bottom: 5px;
}
.wb-lock-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid var(--semi-color-border);
  background: transparent;
  color: var(--semi-color-text-3);
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-lock-btn:hover { color: var(--semi-color-text-0); border-color: rgba(var(--semi-red-5), 0.4); }
.wb-lock-btn-active { color: #fff; background: var(--app-brand-grad); border-color: transparent; box-shadow: 0 6px 16px -6px rgba(var(--semi-red-5), 0.5); }

/* Ratio preview box */
.wb-ratio-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-2);
}
.wb-ratio-box {
  width: 44px;
  height: 25px;
  border-radius: 4px;
  border: 2px solid rgba(var(--semi-red-5), 0.7);
  background:
    linear-gradient(135deg, rgba(var(--semi-red-4), 0.25), rgba(var(--semi-red-6), 0.1)),
    repeating-conic-gradient(#00000018 0% 25%, transparent 0% 50%) 0 0 / 8px 8px;
  flex-shrink: 0;
}
.wb-ratio-meta { display: flex; flex-direction: column; line-height: 1.2; }
.wb-ratio-meta b { font-size: 13px; color: var(--semi-color-text-0); font-variant-numeric: tabular-nums; }
.wb-ratio-meta span { font-size: 10px; color: var(--semi-color-text-3); }

/* Color swatches */
.wb-swatches { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.wb-swatch {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 2px solid var(--semi-color-bg-1);
  box-shadow: 0 0 0 1px var(--semi-color-border);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.wb-swatch:hover { transform: scale(1.15); }
.wb-swatch-active { box-shadow: 0 0 0 2px var(--semi-color-primary); }
.wb-swatch-custom {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px dashed var(--semi-color-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--semi-color-text-3);
  transition: all 0.15s ease;
}
.wb-swatch-custom:hover { color: var(--semi-color-text-0); border-color: rgba(var(--semi-red-5), 0.5); }

/* Style preset cards with live preview */
.wb-style-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.wb-style-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  border-radius: 11px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-2);
  cursor: pointer;
  transition: all 0.16s ease;
}
.wb-style-card:hover { border-color: rgba(var(--semi-red-5), 0.5); transform: translateY(-1px); }
.wb-style-card-active { border-color: var(--semi-color-primary); background: rgba(var(--semi-red-1), 0.16); }
.wb-style-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  border-radius: 7px;
  background: #151210;
  overflow: hidden;
}
.wb-style-label { font-size: 11px; font-weight: 600; color: var(--semi-color-text-1); }
.wb-style-desc { font-size: 9px; color: var(--semi-color-text-3); }

/* Magic (AI) buttons */
.wb-magic-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  height: 34px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(120deg, #f76a6a, #e5371d, #b91c1c);
  background-size: 200% 200%;
  box-shadow: 0 10px 24px -10px rgba(var(--semi-red-5), 0.6);
  transition: filter 0.2s ease, transform 0.2s ease;
  animation: wb-grad-drift 6s ease infinite;
  overflow: hidden;
}
.wb-magic-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.wb-magic-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
@keyframes wb-grad-drift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* AI title style chips with preview */
.wb-ai-styles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.wb-ai-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 4px;
  border-radius: 10px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.wb-ai-chip:hover { border-color: rgba(var(--semi-red-5), 0.5); }
.wb-ai-chip-active { border-color: var(--semi-color-primary); background: rgba(var(--semi-red-1), 0.16); }
.wb-ai-chip-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 26px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 900;
}
.wb-ai-chip-label { font-size: 9px; font-weight: 600; color: var(--semi-color-text-2); }

/* Processing shimmer */
.wb-shimmer {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: var(--semi-color-fill-1);
  overflow: hidden;
}
.wb-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(var(--semi-red-5), 0.5), transparent);
  animation: wb-shimmer-slide 1.2s ease infinite;
}
@keyframes wb-shimmer-slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* Enhanced layer rows */
.wb-layer-dot { width: 8px; height: 8px; border-radius: 3px; flex-shrink: 0; }
.wb-layer-type { font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--semi-color-text-3); }

/* Font-size slider */
.wb-fs-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 999px;
  background: rgba(var(--semi-red-5), 0.2);
  outline: none;
  cursor: pointer;
}
.wb-fs-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--app-brand-grad);
  border: 2px solid var(--semi-color-bg-1);
  box-shadow: 0 3px 8px rgba(var(--semi-red-5), 0.4);
  cursor: pointer;
}

/* ═══ Workbench — in-canvas empty-state invitation ═══ */
.wb-empty {
  position: absolute;
  inset: 0;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
}
.wb-empty-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(520px 360px at 50% 30%, rgba(var(--semi-red-5), 0.14), transparent 70%);
}
.wb-empty-card {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px;
  border-radius: 20px;
  border: 1px solid var(--semi-color-border);
  background: linear-gradient(180deg, var(--semi-color-bg-2), var(--semi-color-bg-1));
  box-shadow: 0 40px 90px -24px rgba(0, 0, 0, 0.75);
}
.wb-empty-head { display: flex; flex-direction: column; gap: 6px; }
.wb-empty-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(var(--semi-red-1), 0.7);
  color: rgb(var(--semi-red-6));
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}
.wb-empty-eyebrow-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--app-brand-grad); }
.wb-empty-title { margin: 0; font-size: 21px; font-weight: 750; letter-spacing: -0.01em; color: var(--semi-color-text-0); }
.wb-empty-desc { margin: 0; font-size: 13px; color: var(--semi-color-text-2); }
.wb-empty-primary { display: flex; flex-direction: column; gap: 10px; }
.wb-empty-upload { border-radius: 14px; }
.wb-empty-or { display: flex; align-items: center; gap: 10px; }
.wb-empty-or-line { flex: 1; height: 1px; background: var(--semi-color-border); }
.wb-empty-or-text { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--semi-color-text-3); }
.wb-empty-youtube { display: flex; gap: 8px; }
.wb-empty-youtube-input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  padding: 0 12px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-0);
}
.wb-empty-templates {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--semi-color-border);
  background: var(--semi-color-bg-0);
}
.wb-empty-templates-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--semi-color-text-2);
}
.wb-empty-templates-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
.wb-empty-tpl {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.wb-empty-tpl:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.7); }

/* Collapsible inspector groups */
/* Collapsible glass control card */
.wb-collapse {
  border-radius: 14px;
  border: 1px solid var(--semi-color-border);
  background: linear-gradient(180deg, var(--semi-color-bg-2), var(--semi-color-bg-1));
  box-shadow: 0 10px 26px -20px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
.wb-collapse-head {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 11px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--semi-color-text-0);
  transition: background 0.15s ease;
}
.wb-collapse-head:hover { background: var(--semi-color-fill-0); }
.wb-collapse-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--semi-color-text-2);
  text-align: left;
}
.wb-collapse-title::before { display: none; }
.wb-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--semi-color-fill-1);
  color: var(--semi-color-text-1);
  flex-shrink: 0;
  transition: all 0.15s ease;
}
.wb-collapse-head:hover .wb-card-icon {
  color: var(--semi-color-text-0);
  background: var(--semi-color-fill-2);
}
.wb-card-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--app-brand-grad);
  box-shadow: 0 0 8px rgba(var(--semi-red-5), 0.7);
  animation: wb-dot-pulse 1.8s ease-in-out infinite;
  flex-shrink: 0;
}
.wb-collapse-caret { color: var(--semi-color-text-3); transition: transform 0.2s ease; margin-left: auto; }
.wb-collapse-caret-open { transform: rotate(180deg); }
.wb-collapse-body { padding: 0 12px 12px; }

/* Layers hero — a card with a static header */
.wb-layers-hero {
  padding: 0;
}
.wb-layers-hero .wb-collapse-body {
  padding-top: 12px;
}

.wb-empty-reticle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 300px;
  height: auto;
  pointer-events: none;
  opacity: 0.7;
  z-index: 0;
  filter: drop-shadow(0 0 18px rgba(245, 73, 43, 0.25));
}
@media (max-width: 640px) {
  .wb-empty-reticle { width: 220px; opacity: 0.5; }
}

/* Right-click context menu — glass popup over the canvas */
.wb-ctx {
  position: fixed;
  z-index: 200;
  min-width: 180px;
  padding: 6px;
  border-radius: 12px;
  background: rgba(24, 20, 18, 0.92);
  border: 1px solid rgba(var(--semi-red-5), 0.22);
  box-shadow: 0 18px 48px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
.wb-ctx-label {
  padding: 4px 10px 6px;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--semi-color-text-3);
}
.wb-ctx-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 10px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  color: var(--semi-color-text-1);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.wb-ctx-item:hover {
  background: rgba(var(--semi-red-5), 0.16);
  color: #fff;
}
.wb-ctx-item-danger { color: rgb(var(--semi-red-6)); }
.wb-ctx-item-danger:hover {
  color: #fff;
  background: rgba(var(--semi-red-6), 0.6);
}
.wb-ctx-sep {
  height: 1px;
  margin: 5px 8px;
  background: rgba(255, 255, 255, 0.08);
}

`;
