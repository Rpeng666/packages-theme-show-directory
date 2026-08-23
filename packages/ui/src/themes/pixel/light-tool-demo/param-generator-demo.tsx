'use client';

import * as React from 'react';

import { PixelButton, PixelColorInput, PixelSelect, PixelSlider } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import { setToolHandoff } from './handoff';

/** A single parameter control definition. */
export interface GenParam {
  key: string;
  label: string;
  type: 'select' | 'text' | 'slider' | 'color';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  default: string | number;
  presets?: string[];
}

/** Values map (all params, string keys → string|number). */
export type GenValues = Record<string, string | number>;

/**
 * A parameterized generator tool definition. `draw` renders the preview onto
 * a canvas; the skeleton owns all controls + export.
 */
export interface GenTool {
  id: string;
  params: GenParam[];
  /** Draw the preview onto `canvas` given current values. */
  draw: (canvas: HTMLCanvasElement, values: GenValues) => void;
  /** Export filename (uses values). */
  filename: (values: GenValues) => string;
  /** Pixel output scale for export (nearest-neighbor). Default 1. */
  exportScale?: number;
  /**
   * Color usage list (color code x quantity) - the "shopping list" craft
   * users need. When present the skeleton shows an inline bead-list table +
   * CSV export. Counting is per chart cell (not screen pixels).
   */
  list?: (values: GenValues) => { hex: string; count: number }[];
}

export interface GenListRow {
  hex: string;
  count: number;
}

/** Convert values → param-typed accessors. */
export function genNum(v: string | number): number {
  return typeof v === 'number' ? v : parseFloat(v);
}
export function genStr(v: string | number): string {
  return String(v);
}
export function genBool(v: unknown, fallback = false): boolean {
  if (typeof v === 'boolean') return v;
  if (v === 'true') return true;
  if (v === 'false') return false;
  return fallback;
}

/**
 * ParamGeneratorDemo — the shared "params → live preview → export" skeleton
 * for the generator tools. Config-driven: pass a `GenTool` and the component
 * renders the controls, calls `draw` on change, and exports a PNG. No upload —
 * these tools generate from settings. Reusable across the pixel-art lineup.
 */
export interface ParamGeneratorDemoProps {
  /** The generator-tool definition (params + draw fn). */
  tool: GenTool;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: (key: string) => string;
}

const ZH: Record<string, string> = {
  preview: '预览',
  export: '导出',
  downloadPng: '下载 PNG',
  beadList: '色号用量',
  copyCsv: '复制 CSV',
  total: '合计',
};

export function ParamGeneratorDemo({ tool, t = (k) => ZH[k] ?? k }: ParamGeneratorDemoProps) {
  const [values, setValues] = React.useState<GenValues>(() => {    const init: GenValues = {};
    for (const p of tool.params) init[p.key] = p.default;
    return init;
  });

  const previewRef = React.useRef<HTMLCanvasElement>(null);
  const exportRef = React.useRef<HTMLCanvasElement>(null);

  const drawAll = React.useCallback(
    (v: GenValues) => {
      const canvas = previewRef.current;
      if (!canvas) return;
      tool.draw(canvas, v);
      const ex = exportRef.current;
      if (!ex) return;
      const scale = tool.exportScale ?? 1;
      ex.width = canvas.width * scale;
      ex.height = canvas.height * scale;
      const ctx = ex.getContext('2d');
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, ex.width, ex.height);
      // Record the generated chart so the workbench CTA can carry it over.
      setToolHandoff({ toolSlug: tool.id, resultDataUrl: ex.toDataURL('image/png') });
    },
    [tool],
  );

  React.useEffect(() => {
    drawAll(values);
  }, [values, drawAll]);

  const set = (key: string, next: string | number) => {
    setValues((prev) => ({ ...prev, [key]: next }));
  };

  const download = () => {
    const canvas = exportRef.current;
    if (!canvas || canvas.width === 0) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = tool.filename(values);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* Bead list (color code x quantity) - the craft "shopping list". */
  const [showList, setShowList] = React.useState(false);
  const listRows: GenListRow[] | null = React.useMemo(
    () => (tool.list ? tool.list(values) : null),
    [tool, values],
  );
  const listTotal = React.useMemo(
    () => (listRows ? listRows.reduce((sum, r) => sum + r.count, 0) : 0),
    [listRows],
  );

  const copyListCsv = () => {
    if (!listRows) return;
    const csv = ['hex,count', ...listRows.map((r) => `${r.hex},${r.count}`)].join('\n');
    void navigator.clipboard?.writeText(csv);
  };

  const renderControl = (p: GenParam) => {
    switch (p.type) {
      case 'select':
        return (
          <PixelSelect
            key={p.key}
            label={p.label}
            value={genStr(values[p.key])}
            onChange={(v) => set(p.key, v)}
            options={p.options ?? []}
            tone="cyan"
          />
        );
      case 'text':
        return (
          <label key={p.key} className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-muted-foreground">{p.label}</span>
            <input
              type="text"
              id={p.key === 'text' ? 'craft-entry-letters' : undefined}
              value={genStr(values[p.key])}
              onChange={(e) => set(p.key, e.target.value)}
              className="scroll-mt-24 border-2 border-foreground/20 bg-retro-surface/30 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-retro-cyan/50 pxl-corner-sm"
            />
          </label>
        );
      case 'slider':
        return (
          <PixelSlider
            key={p.key}
            label={p.label}
            min={p.min ?? 0}
            max={p.max ?? 100}
            step={p.step ?? 1}
            value={genNum(values[p.key])}
            onChange={(v: number) => set(p.key, v)}
            tone="cyan"
            showMinMax
            showTooltip="always"
          />
        );
      case 'color':
        return (
          <PixelColorInput
            key={p.key}
            label={p.label}
            value={genStr(values[p.key])}
            onChange={(v) => set(p.key, v)}
            presets={p.presets}
          />
        );
    }
  };

  return (
    <div className={cn('flex flex-col-reverse gap-5 border-2 border-foreground/15 bg-retro-surface/20 p-4 pxl-corner-md md:flex-row md:gap-6')}>
      {/* Left: controls (below the preview on mobile - output first) */}
      <div className="flex w-full flex-col gap-4 md:w-72 md:shrink-0">
        {tool.params.map(renderControl)}
        <PixelButton tone="green" variant="solid" size="sm" onClick={download} iconLeft={<PixelIcon name="download" size={13} />}>
          {t('downloadPng')}
        </PixelButton>

        {/* Bead list - color code x quantity ("shopping list") */}
        {listRows && listRows.length > 0 && (
          <div className="flex flex-col gap-2 border-2 border-foreground/10 bg-retro-bg/40 p-3 pxl-corner-sm">
            <button
              type="button"
              onClick={() => setShowList((v) => !v)}
              className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{t('beadList')} ({listRows.length})</span>
              <span aria-hidden>{showList ? '−' : '+'}</span>
            </button>
            {showList && (
              <div className="flex flex-col gap-2">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-left font-normal">Color</th>
                      <th className="text-right font-normal">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRows.map((r) => (
                      <tr key={r.hex}>
                        <td className="py-0.5">
                          <span className="mr-1.5 inline-block size-3 border border-foreground/20 align-middle" style={{ backgroundColor: r.hex }} />
                          {r.hex}
                        </td>
                        <td className="py-0.5 text-right">{r.count}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-foreground/10 text-foreground">
                      <td className="pt-1">{t('total')}</td>
                      <td className="pt-1 text-right">{listTotal}</td>
                    </tr>
                  </tfoot>
                </table>
                <PixelButton tone="cyan" variant="outline" size="sm" onClick={copyListCsv} iconLeft={<PixelIcon name="copy" size={13} />}>
                  {t('copyCsv')}
                </PixelButton>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: previews */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t('preview')}</span>
          <div className="grid place-items-center border-2 border-foreground/10 bg-[repeating-conic-gradient(#ddd_0_25%,#fff_0_50%)] bg-[length:12px_12px] p-3 pxl-corner-sm">
            <canvas ref={previewRef} className="max-h-64 max-w-full border border-foreground/10 [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t('export')}</span>
          <div className="grid place-items-center overflow-auto border-2 border-foreground/10 bg-[repeating-conic-gradient(#ddd_0_25%,#fff_0_50%)] bg-[length:12px_12px] p-3 pxl-corner-sm">
            <canvas ref={exportRef} className="max-h-56 max-w-full border border-foreground/10 [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
