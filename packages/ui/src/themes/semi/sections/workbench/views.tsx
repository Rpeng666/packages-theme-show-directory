"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Youtube,
  Instagram,
  Pin,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

import { Button } from "../../components/button";

/**
 * Workbench views — package-local equivalents of the app-only chrome the
 * editor shell previously consumed from the app:
 *
 *  - WbHudFrame       ← HudFrame (canvas viewfinder frame)
 *  - WbTargetingReticle ← TargetingUI (empty-state reticle)
 *  - WbNebulaGlow     ← QuantumNebula (particle backdrop → CSS glow)
 *  - WbExposureSlider ← ExposureSlider (motion ticker → styled range)
 *  - WbScannerStream  ← ScannerCardStream (gallery card stream, self-contained)
 *  - WbPlatformPicker ← PlatformSizePicker (platform presets)
 *
 * These own their little bits of extra CSS
 * alongside the editor chrome. Everything else is semi-consistent with
 * the surrounding editor chrome.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ── Canvas viewfinder frame (HudFrame) ─────────────────────────────────── */

export function WbHudFrame({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-2xl border border-[rgba(28,26,23,0.12)]", className)}>
      {children}
      <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-[rgba(28,26,23,0.3)] opacity-60" aria-hidden />
      <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 rounded-tr-lg border-r-2 border-t-2 border-[rgba(28,26,23,0.3)] opacity-60" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-[rgba(28,26,23,0.3)] opacity-60" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-[rgba(28,26,23,0.3)] opacity-60" aria-hidden />
    </div>
  );
}

/* ── Empty-state reticle (TargetingUI) ──────────────────────────────────── */

export function WbTargetingReticle({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none animate-[wb-reticle-breathe_3.2s_ease-in-out_infinite]", className)}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      <circle
        cx="110"
        cy="110"
        r="86"
        stroke="rgba(252,114,90,.4)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <circle cx="110" cy="110" r="3" fill="rgba(252,114,90,.8)" />
      <path
        d="M110 20v26M110 174v26M20 110h26M174 110h26"
        stroke="rgba(252,114,90,.5)"
        strokeWidth="1.5"
      />
      <path
        d="M46 60h-18v-18M174 42v18h18M46 160h-18v18M174 178v-18h18"
        stroke="rgba(28,26,23,.3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Nebula backdrop (QuantumNebula) ────────────────────────────────────── */

export function WbNebulaGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(62%_50%_at_50%_42%,rgba(252,114,90,0.12),transparent_72%)]", className)}
    />
  );
}

/* ── Exposure slider (ExposureSlider) ───────────────────────────────────── */

export function WbExposureSlider({
  value,
  min = -100,
  max = 100,
  step = 5,
  accentColor,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  accentColor?: string;
  onChange?: (value: number) => void;
}) {
  return (
    <input
      type="range"
      className="w-full cursor-pointer"
      style={{
        accentColor: accentColor ?? "#fc725a",
      } as React.CSSProperties}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
    />
  );
}

/* ── Scanner card stream (ScannerCardStream) ────────────────────────────── */

const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (w: number, h: number): string => {
  let out = "";
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      out += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }
    out += "\n";
  }
  return out;
};

export interface WbScannerCard {
  id: string;
  src: string;
  label?: string;
}

/**
 * Scanner card stream — an image *selector* with a cyberpunk flavor. Cards
 * loop horizontally; a glowing scan line passes over them and each card is
 * "decoded" from its real image into ASCII for a moment before settling.
 * Click a card to pick it. (Ported from the app component, self-contained.)
 */
export function WbScannerStream({
  cards,
  onPick,
  initialSpeed = 150,
  direction = -1,
  repeat = 6,
  cardGap = 60,
  cardWidth = 400,
  cardHeight = 250,
  friction = 0.95,
  hint,
}: {
  cards: WbScannerCard[];
  onPick: (src: string) => void;
  initialSpeed?: number;
  direction?: -1 | 1;
  repeat?: number;
  cardGap?: number;
  cardWidth?: number;
  cardHeight?: number;
  friction?: number;
  hint?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const items = useMemo(() => {
    const total = cards.length * repeat;
    return Array.from({ length: total }, (_, i) => ({
      id: `${cards[i % cards.length].id}-${Math.floor(i / cards.length)}`,
      src: cards[i % cards.length].src,
      label: cards[i % cards.length].label,
      ascii: generateCode(Math.floor(cardWidth / 6.5), Math.floor(cardHeight / 13)),
    }));
  }, [cards, repeat, cardWidth, cardHeight]);

  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const state = useRef({
    position: 0,
    velocity: initialSpeed,
    direction,
    isDragging: false,
    lastPointerX: 0,
    lastTime: 0,
    lineWidth: (cardWidth + cardGap) * items.length,
    friction,
    minVelocity: 30,
  });

  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    items.forEach((c, i) => originalAscii.current.set(i, c.ascii));

    let raf = 0;

    const scramble = (el: HTMLElement, cardId: number) => {
      if (el.dataset.scrambling === "true") return;
      el.dataset.scrambling = "true";
      const original = originalAscii.current.get(cardId) || "";
      let n = 0;
      const iv = setInterval(() => {
        el.textContent = generateCode(
          Math.floor(cardWidth / 6.5),
          Math.floor(cardHeight / 13),
        );
        n += 1;
        if (n >= 10) {
          clearInterval(iv);
          el.textContent = original;
          delete el.dataset.scrambling;
        }
      }, 30);
    };

    const updateCardEffects = () => {
      const vpRect = vp.getBoundingClientRect();
      const scannerX = vpRect.left + vpRect.width / 2;
      const halfLine = 5;
      let any = false;
      track.querySelectorAll<HTMLElement>(".scs-card").forEach((cardEl, idx) => {
        const rect = cardEl.getBoundingClientRect();
        const normal = cardEl.querySelector<HTMLElement>(".scs-normal")!;
        const ascii = cardEl.querySelector<HTMLElement>(".scs-ascii")!;
        const pre = ascii.querySelector<HTMLElement>("pre")!;
        const overlap =
          rect.left < scannerX + halfLine && rect.right > scannerX - halfLine;
        if (overlap) {
          any = true;
          if (cardEl.dataset.scanned !== "true") {
            scramble(pre, idx);
          }
          cardEl.dataset.scanned = "true";
          const il = Math.max(scannerX - halfLine - rect.left, 0);
          const ir = Math.min(scannerX + halfLine - rect.left, rect.width);
          normal.style.setProperty("--clip-right", `${(il / rect.width) * 100}%`);
          ascii.style.setProperty("--clip-left", `${(ir / rect.width) * 100}%`);
        } else {
          delete cardEl.dataset.scanned;
          if (rect.right < scannerX - halfLine) {
            normal.style.setProperty("--clip-right", "100%");
            ascii.style.setProperty("--clip-left", "100%");
          } else {
            normal.style.setProperty("--clip-right", "0%");
            ascii.style.setProperty("--clip-left", "0%");
          }
        }
      });
      setIsScanning(any);
    };

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - state.current.lastTime) / 1000);
      state.current.lastTime = now;
      const s = state.current;
      if (!s.isDragging) {
        if (s.velocity > s.minVelocity) s.velocity *= s.friction;
        s.position += s.velocity * s.direction * dt;
      }
      const vpW = vp.clientWidth || window.innerWidth;
      if (s.position < -s.lineWidth) s.position = vpW;
      else if (s.position > vpW) s.position = -s.lineWidth;
      track.style.transform = `translateX(${s.position}px)`;
      updateCardEffects();
      raf = requestAnimationFrame(animate);
    };
    state.current.lastTime = performance.now();
    raf = requestAnimationFrame(animate);

    const down = (e: PointerEvent) => {
      state.current.isDragging = true;
      state.current.lastPointerX = e.clientX;
      setIsDragging(true);
      track.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      const dx = e.clientX - s.lastPointerX;
      s.lastPointerX = e.clientX;
      s.position += dx;
      s.velocity = Math.max(30, Math.abs(dx) * 4);
      s.direction = dx < 0 ? -1 : 1;
    };
    const up = () => {
      state.current.isDragging = false;
      setIsDragging(false);
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = state.current;
      s.velocity = Math.min(600, s.velocity + (e.deltaY > 0 ? 24 : -24));
      if (s.velocity < 30) s.velocity = 30;
    };

    track.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    track.addEventListener("wheel", wheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      track.removeEventListener("wheel", wheel);
    };
  }, [items, cardGap, friction, cardWidth, cardHeight]);

  return (
    <div className="scs-root">
      <style>{`
        .scs-root{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;font-family:var(--font-sans,Inter,sans-serif)}
        .scs-viewport{position:relative;width:100%;height:${cardHeight + 40}px;overflow:hidden}
        .scs-track{position:absolute;top:50%;left:0;transform:translateY(-50%);display:flex;align-items:center;gap:${cardGap}px;cursor:grab;will-change:transform;user-select:none;touch-action:pan-y}
        .scs-track.scs-dragging{cursor:grabbing}
        .scs-card{position:relative;width:${cardWidth}px;height:${cardHeight}px;flex-shrink:0;border:none;background:transparent;padding:0;cursor:pointer;outline:none}
        .scs-card:focus-visible{outline:2px solid #a78bfa;outline-offset:2px}
        .scs-normal{position:absolute;inset:0;border-radius:16px;overflow:hidden;background:#111;box-shadow:0 15px 40px rgba(0,0,0,.45);z-index:2;clip-path:inset(0 0 0 var(--clip-right,0%));transition:clip-path .08s linear}
        .scs-normal img{width:100%;height:100%;object-fit:cover;border-radius:16px;transition:transform .25s ease}
        .scs-card:hover .scs-normal img{transform:scale(1.04)}
        .scs-ascii{position:absolute;inset:0;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#0b1120,#141b2e);z-index:1;clip-path:inset(0 calc(100% - var(--clip-left,0%)) 0 0);transition:clip-path .08s linear}
        .scs-ascii pre{position:absolute;inset:0;margin:0;padding:14px;color:rgba(196,181,253,.55);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:${Math.floor(cardWidth / 65)}px;line-height:${Math.floor(cardHeight / 13)}px;letter-spacing:.04em;overflow:hidden;white-space:pre;text-align:left;mask-image:linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,.85) 40%,rgba(0,0,0,.5) 75%,rgba(0,0,0,.25) 100%);animation:scs-glitch .12s infinite steps(2) alternate-reverse}
        @keyframes scs-glitch{0%{opacity:1}50%{opacity:.82}100%{opacity:.94}}
        .scs-line{position:absolute;top:50%;left:50%;width:3px;height:${cardHeight + 30}px;transform:translate(-50%,-50%);border-radius:999px;background:linear-gradient(to bottom,transparent,#a78bfa 20%,#8b5cf6 50%,#a78bfa 80%,transparent);box-shadow:0 0 10px #a78bfa,0 0 24px #8b5cf6,0 0 46px #6366f1;transition:opacity .3s ease;opacity:${isScanning ? 1 : 0};pointer-events:none;z-index:3;animation:scs-pulse 1.5s ease-in-out infinite alternate}
        @keyframes scs-pulse{from{filter:brightness(1)}to{filter:brightness(1.35)}}
        .scs-label{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);z-index:4;padding:3px 10px;border-radius:999px;background:rgba(28,26,23,.62);backdrop-filter:blur(6px);color:#fff;font-size:11px;letter-spacing:.06em;white-space:nowrap;pointer-events:none;border:1px solid rgba(252,114,90,.4)}
        .scs-hint{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);z-index:5;color:var(--semi-color-text-3,#8a8a93);font-size:11px;letter-spacing:.04em;pointer-events:none}
      `}</style>

      <div ref={viewportRef} className="scs-viewport">
        <div className="scs-line" aria-hidden />
        <div
          ref={trackRef}
          className={`scs-track${isDragging ? " scs-dragging" : ""}`}
          style={{ gap: `${cardGap}px` }}
        >
          {items.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className="scs-card"
              onClick={() => onPick(c.src)}
              title={c.label ?? "Pick image"}
            >
              <div className="scs-normal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.label ?? "card"} draggable={false} />
              </div>
              <div className="scs-ascii">
                <pre className="scs-ascii-pre">{c.ascii}</pre>
              </div>
              {c.label && <span className="scs-label">{c.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {hint && <span className="scs-hint">{hint}</span>}
    </div>
  );
}

/* ── Platform size picker (PlatformSizePicker) ──────────────────────────── */

export interface WbPlatformPreset {
  ratio: string;
  label: string;
  width: number;
  height: number;
}

interface WbPlatform {
  id: string;
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  presets: WbPlatformPreset[];
}

const PLATFORMS: WbPlatform[] = [
  {
    id: "youtube",
    name: "YouTube",
    Icon: Youtube,
    color: "#f03e3e",
    presets: [
      { ratio: "16:9", label: "Standard HD", width: 1280, height: 720 },
      { ratio: "16:9", label: "Full HD", width: 1920, height: 1080 },
      { ratio: "16:9", label: "2K", width: 2560, height: 1440 },
      { ratio: "1:1", label: "Channel Icon", width: 800, height: 800 },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    Icon: Instagram,
    color: "#e1306c",
    presets: [
      { ratio: "1:1", label: "Square Post", width: 1080, height: 1080 },
      { ratio: "9:16", label: "Story / Reel", width: 1080, height: 1920 },
      { ratio: "4:5", label: "Portrait Post", width: 1080, height: 1350 },
      { ratio: "16:9", label: "Landscape Post", width: 1080, height: 608 },
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    Icon: Pin,
    color: "#e60023",
    presets: [
      { ratio: "2:3", label: "Standard Pin", width: 1000, height: 1500 },
      { ratio: "1:1", label: "Square Pin", width: 1000, height: 1000 },
      { ratio: "9:16", label: "Story Pin", width: 1080, height: 1920 },
      { ratio: "4:5", label: "Portrait Pin", width: 1000, height: 1250 },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    Icon: Facebook,
    color: "#1877f2",
    presets: [
      { ratio: "16:9", label: "Link Preview", width: 1200, height: 630 },
      { ratio: "1:1", label: "Square Post", width: 1080, height: 1080 },
      { ratio: "9:16", label: "Story", width: 1080, height: 1920 },
      { ratio: "16:9", label: "Cover Photo", width: 1640, height: 924 },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    Icon: Linkedin,
    color: "#0a66c2",
    presets: [
      { ratio: "16:9", label: "Post Image", width: 1200, height: 627 },
      { ratio: "1:1", label: "Square Post", width: 1080, height: 1080 },
      { ratio: "4:5", label: "Portrait Post", width: 1080, height: 1350 },
      { ratio: "16:9", label: "Cover Image", width: 1584, height: 396 },
    ],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    Icon: Twitter,
    color: "#1d1d1f",
    presets: [
      { ratio: "16:9", label: "Post Image", width: 1600, height: 900 },
      { ratio: "1:1", label: "Square Post", width: 1080, height: 1080 },
      { ratio: "2:1", label: "Header Photo", width: 1500, height: 500 },
      { ratio: "1:1", label: "Profile Photo", width: 400, height: 400 },
    ],
  },
];

export function WbPlatformPicker({
  currentWidth,
  currentHeight,
  onSelect,
}: {
  currentWidth: number;
  currentHeight: number;
  onSelect: (width: number, height: number) => void;
}) {
  const [activePlatformId, setActivePlatformId] = useState("youtube");
  const platform =
    PLATFORMS.find((p) => p.id === activePlatformId) ?? PLATFORMS[0];

  return (
    <div className="space-y-3">
      {/* Platform tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {PLATFORMS.map((p) => {
          const active = p.id === activePlatformId;
          return (
            <Button
              key={p.id}
              type="button"
              variant={active ? "default" : "outline"}
              onClick={() => setActivePlatformId(p.id)}
              title={p.name}
              className="flex-shrink-0 h-auto flex-col gap-1 px-3 py-2"
            >
              <p.Icon
                className="w-5 h-5"
                style={{ color: active ? "var(--semi-color-bg-0)" : p.color }}
              />
              <span className="text-[10px] font-medium whitespace-nowrap leading-none">
                {p.name}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Size cards */}
      <div className="grid grid-cols-2 gap-2">
        {platform.presets.map((preset) => {
          const active =
            currentWidth === preset.width && currentHeight === preset.height;
          const maxSide = 32;
          const scale = maxSide / Math.max(preset.width, preset.height);
          const bw = Math.max(8, Math.round(preset.width * scale));
          const bh = Math.max(8, Math.round(preset.height * scale));

          return (
            <button
              key={`${preset.width}x${preset.height}`}
              type="button"
              onClick={() => onSelect(preset.width, preset.height)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                active
                  ? "border-[var(--semi-color-primary)] bg-[rgba(var(--semi-primary-5),0.12)] text-[var(--semi-color-primary)]"
                  : "border-[var(--semi-color-border)] hover:border-[rgba(var(--semi-primary-5),0.5)] hover:bg-[rgba(var(--semi-color-fill-0),0.5)] text-[var(--semi-color-text-0)]"
              }`}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                <div
                  className={`rounded-sm border-2 ${
                    active
                      ? "border-[var(--semi-color-primary)]"
                      : "border-[rgba(var(--semi-color-text-3),0.4)]"
                  }`}
                  style={{ width: bw, height: bh }}
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-semibold leading-tight ${
                    active ? "text-[var(--semi-color-primary)]" : ""
                  }`}
                >
                  {preset.width} × {preset.height}
                </p>
                <p className="text-[10px] text-[var(--semi-color-text-3)] leading-tight mt-0.5 truncate">
                  {preset.ratio} · {preset.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
