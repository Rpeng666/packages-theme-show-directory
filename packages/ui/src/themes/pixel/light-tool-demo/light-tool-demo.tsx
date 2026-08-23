'use client';

import * as React from 'react';

import { PixelButton, PixelSlider } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import { setToolHandoff } from './handoff';
import { BeforeAfter } from './before-after';

/** Light-tool processor result (mirrors the app's LightToolResult). */
export interface LightToolDemoResult {
  imageData: ImageData;
  caption?: string;
}

export type LightToolDemoProcessor = (
  src: ImageData,
  params?: Record<string, number | string | boolean>,
) => LightToolDemoResult;

/**
 * Per-tool parameter spec - replaces the old one-size-fits-all 4-128 slider.
 * `presets` gives craft-minded chips (e.g. "29 · 1 board") instead of an
 * abstract number. Injected by the app bridge.
 */
export interface LightToolParamSpec {
  label: string;
  min: number;
  max: number;
  step?: number;
  default: number;
  presets?: { value: number; label: string }[];
}

export interface LightToolDemoProps {
  /** Selects the processor for this tool (injected by the app bridge). */
  getProcessor?: (slug: string) => LightToolDemoProcessor;
  /** Tool slug (drives the processor + download filename). */
  toolSlug: string;
  /**
   * A default sample image (dataURL). When set, the demo auto-processes it on
   * mount so users immediately see the tool's effect (original -> result)
   * instead of a bare upload box. The upload control stays available.
   */
  defaultSrc?: string;
  /**
   * Generate-only mode (no upload input needed) - for tools like the
   * background generator / game-icon / circle that produce output from
   * settings alone. Renders the produced preview directly with a "regenerate"
   * control, no original/upload column.
   */
  generateOnly?: boolean;
  /** Per-tool parameter spec (label / range / preset chips). */
  param?: LightToolParamSpec;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: (key: string) => string;
  className?: string;
}

const ZH: Record<string, string> = {
  original: '原图',
  result: '结果',
  processing: '处理中…',
  upload: '上传',
  download: '下载',
  tryNow: '立即试用',
  beadList: '色号用量',
  copyCsv: '复制 CSV',
  moreColors: '更多颜色',
  loadFail: '图片加载失败，请换一张试试',
};

const DEFAULT_PARAM: LightToolParamSpec = { label: 'Grid size', min: 4, max: 128, step: 1, default: 8 };

/**
 * Derive the bead/color usage list from a processed (gridded) result.
 * Counts pixels per color, then divides by the GCD of the counts (each chart
 * cell renders as one flat k×k block, so the GCD is the cell area).
 */
function buildBeadList(img: ImageData): { hex: string; count: number }[] {
  const counts = new Map<number, number>();
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) continue;
    const key = (d[i] << 16) | (d[i + 1] << 8) | d[i + 2];
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const vals = [...counts.values()];
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const unit = Math.max(1, vals.reduce((acc, v) => gcd(acc, v), vals[0] ?? 1));
  return [...counts.entries()]
    .map(([k, v]) => ({
      hex: `#${k.toString(16).padStart(6, '0').toUpperCase()}`,
      count: Math.round(v / unit),
    }))
    .sort((a, b) => b.count - a.count);
}

/** The synthetic 128×128 input used by generate-only tools. */
function syntheticInput(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#4ECDC4';
    ctx.fillRect(0, 0, 128, 128);
  }
  return canvas.toDataURL('image/png');
}

/**
 * LightToolDemo - the generic "upload -> process -> download" demo for the
 * light pixel-art tools. Pure presentation: the app injects the processor
 * resolver + per-tool param spec (domain logic stays app-side); this
 * component owns the canvas + file pipeline + before/after preview +
 * bead-list export. Reusable across the tool lineup.
 */
export function LightToolDemo({
  getProcessor,
  toolSlug,
  defaultSrc,
  generateOnly = false,
  param: paramSpec = DEFAULT_PARAM,
  t = (k) => ZH[k] ?? k,
  className,
}: LightToolDemoProps) {
  const [srcImg, setSrcImg] = React.useState<string | null>(defaultSrc ?? null);
  const [processedUrl, setProcessedUrl] = React.useState<string | null>(null);
  const [caption, setCaption] = React.useState('');
  const [param, setParam] = React.useState(paramSpec.default);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [listRows, setListRows] = React.useState<{ hex: string; count: number }[] | null>(null);
  const [showList, setShowList] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<number | null>(null);

  const processRef = React.useRef<(dataUrl: string, paramValue: number) => void>(() => {});

  // Auto-process the default sample on mount so the effect is visible immediately.
  React.useEffect(() => {
    if (generateOnly) {
      setBusy(true);
      processRef.current?.(syntheticInput(), paramSpec.default);
      return;
    }
    if (defaultSrc) {
      setBusy(true);
      processRef.current?.(defaultSrc, paramSpec.default);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSrc, generateOnly]);

  // Clean up any pending debounced process on unmount.
  React.useEffect(() => () => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
  }, []);

  const process = React.useCallback(
    (dataUrl: string, paramValue: number) => {
      const img = new window.Image();
      img.onload = () => {
        setError(null);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const src = ctx.getImageData(0, 0, img.width, img.height);
        // Without an injected processor, fall back to a simple grayscale grid.
        const processor = getProcessor
          ? getProcessor(toolSlug)
          : (s: ImageData, p?: Record<string, number | string | boolean>) => {
              const size = Math.max(16, Math.min(64, Number(p?.gridSize ?? 32)));
              const out = new ImageData(size, Math.round(size * (s.height / s.width)));
              const sd = s.data;
              const od = out.data;
              const cellW = s.width / out.width;
              const cellH = s.height / out.height;
              for (let gy = 0; gy < out.height; gy++) {
                for (let gx = 0; gx < out.width; gx++) {
                  const sx = Math.min(s.width - 1, Math.floor((gx + 0.5) * cellW));
                  const sy = Math.min(s.height - 1, Math.floor((gy + 0.5) * cellH));
                  const si = (sy * s.width + sx) * 4;
                  const o = (gy * out.width + gx) * 4;
                  if (sd[si + 3] < 128) { od[o + 3] = 0; continue; }
                  const l = 0.299 * sd[si] + 0.587 * sd[si + 1] + 0.114 * sd[si + 2];
                  od[o] = l; od[o + 1] = l; od[o + 2] = l; od[o + 3] = 255;
                }
              }
              return { imageData: out, caption: `${out.width}×${out.height}` };
            };
        const result = processor(src, {
          gridSize: paramValue,
          blockSize: paramValue,
          scale: paramValue,
          colors: paramValue,
          levels: paramValue,
          size: paramValue,
        });
        const outCanvas = document.createElement('canvas');
        outCanvas.width = result.imageData.width;
        outCanvas.height = result.imageData.height;
        const outCtx = outCanvas.getContext('2d');
        if (!outCtx) return;
        outCtx.putImageData(result.imageData, 0, 0);
        const resultUrl = outCanvas.toDataURL('image/png');
        // Record the work so the workbench CTA can carry it across navigation.
        setToolHandoff({
          toolSlug,
          imageDataUrl: dataUrl,
          resultDataUrl: resultUrl,
          params: { gridSize: paramValue },
        });
        setProcessedUrl(resultUrl);
        setCaption(result.caption ?? '');
        setListRows(buildBeadList(result.imageData));
        setShowList(false);
        setBusy(false);
      };
      img.onerror = () => {
        setBusy(false);
        setError(t('loadFail'));
      };
      img.src = dataUrl;
    },
    [getProcessor, toolSlug, t],
  );
  processRef.current = process;

  /** Debounced re-process (slider drags fire many ticks - only run the last). */
  const scheduleProcess = React.useCallback(
    (value: number, delay = 150) => {
      setBusy(true);
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        debounceRef.current = null;
        if (srcImg) process(srcImg, value);
        else if (generateOnly) process(syntheticInput(), value);
      }, delay);
    },
    [srcImg, generateOnly, process],
  );

  const onParamChange = (v: number) => {
    setParam(v);
    scheduleProcess(v);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(t('loadFail'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setSrcImg(dataUrl);
      setBusy(true);
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
      process(dataUrl, param);
    };
    reader.onerror = () => setError(t('loadFail'));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const download = () => {
    if (!processedUrl) return;
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `${toolSlug}-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** Color-usage list below the result (top 24 rows; CSV copies all). */
  const beadListNode = listRows && listRows.length > 0 ? (
    <div className="flex w-full flex-col gap-2">
      <button
        type="button"
        onClick={() => setShowList((v) => !v)}
        className="self-start font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      >
        {t('beadList')} ({listRows.length}) {showList ? '−' : '+'}
      </button>
      {showList && (
        <div className="flex flex-col gap-2 border-2 border-foreground/10 bg-retro-bg/40 p-2.5 pxl-corner-sm">
          <table className="w-full font-mono text-xs">
            <tbody>
              {listRows.slice(0, 24).map((r) => (
                <tr key={r.hex}>
                  <td className="py-0.5">
                    <span className="mr-1.5 inline-block size-3 border border-foreground/20 align-middle" style={{ backgroundColor: r.hex }} />
                    {r.hex}
                  </td>
                  <td className="py-0.5 text-right">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {listRows.length > 24 ? (
            <span className="font-mono text-[10px] text-muted-foreground">+{listRows.length - 24} {t('moreColors')}</span>
          ) : null}
          <PixelButton
            tone="cyan"
            variant="outline"
            size="sm"
            onClick={() => {
              const csv = ['hex,count', ...listRows.map((r) => `${r.hex},${r.count}`)].join('\n');
              void navigator.clipboard?.writeText(csv);
            }}
            iconLeft={<PixelIcon name="copy" size={13} />}
          >
            {t('copyCsv')}
          </PixelButton>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className={cn('flex flex-col gap-4 border-2 border-foreground/15 bg-retro-surface/20 p-4 pxl-corner-md', className)}>
      <input type="file" accept="image/*" onChange={onFile} ref={fileRef} className="hidden" />

      {generateOnly ? (
        /* Generate-only: single centered result preview (no upload/original). */
        <div className="flex flex-col items-center gap-2">
          <span className="self-start font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t('result')}
            {busy ? '…' : ''}
          </span>
          {processedUrl ? (
            <img src={processedUrl} alt="result" className="max-h-72 border-2 border-foreground/10 bg-retro-bg object-contain pxl-corner-sm [image-rendering:pixelated]" />
          ) : (
            <div className="grid min-h-40 w-full place-items-center border-2 border-dashed border-foreground/15 bg-retro-bg/40 pxl-corner-sm">
              <span className="font-mono text-xs text-muted-foreground">{t('processing')}</span>
            </div>
          )}
          {caption ? <span className="font-mono text-[10px] text-retro-cyan">{caption}</span> : null}
          {beadListNode}
        </div>
      ) : !srcImg ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-2 border-2 border-dashed border-foreground/25 bg-retro-bg/40 px-6 py-10 text-center pxl-corner-sm transition-colors hover:border-retro-cyan/50"
        >
          <PixelIcon name="upload" size={24} />
          <span className="font-mono text-sm text-muted-foreground">{t('tryNow')}</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t('original')}
            <span className="mx-1.5 text-foreground/20">→</span>
            {t('result')}
            {busy ? '…' : ''}
          </span>
          {processedUrl ? (
            <BeforeAfter
              beforeSrc={srcImg}
              afterSrc={processedUrl}
              beforeLabel={t('original')}
              afterLabel={t('result')}
            />
          ) : (
            <div className="grid min-h-40 place-items-center border-2 border-dashed border-foreground/15 bg-retro-bg/40 pxl-corner-sm">
              <span className="font-mono text-xs text-muted-foreground">{t('processing')}</span>
            </div>
          )}
          {caption ? <span className="font-mono text-[10px] text-retro-cyan">{caption}</span> : null}
          {beadListNode}
        </div>
      )}

      {error ? (
        <p className="border-2 border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-500 pxl-corner-sm">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-end gap-4">
        {(srcImg || generateOnly) ? (
          <div className="min-w-40 flex-1">
            <PixelSlider
              label={paramSpec.label}
              min={paramSpec.min}
              max={paramSpec.max}
              step={paramSpec.step ?? 1}
              value={param}
              onChange={onParamChange}
              tone="cyan"
              showMinMax
            />
            {paramSpec.presets && paramSpec.presets.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {paramSpec.presets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => onParamChange(p.value)}
                    className={cn(
                      'border-2 px-2 py-0.5 font-mono text-[10px] transition-colors pxl-corner-sm',
                      param === p.value
                        ? 'border-retro-cyan/60 bg-retro-cyan/10 text-retro-cyan'
                        : 'border-foreground/15 bg-retro-surface/30 text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="flex gap-2">
          {!generateOnly ? (
            <PixelButton tone="neutral" variant="outline" size="sm" onClick={() => fileRef.current?.click()} iconLeft={<PixelIcon name="upload" size={13} />}>
              {t('upload')}
            </PixelButton>
          ) : null}
          <PixelButton tone="green" variant="solid" size="sm" onClick={download} disabled={!processedUrl} iconLeft={<PixelIcon name="download" size={13} />}>
            {t('download')}
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
