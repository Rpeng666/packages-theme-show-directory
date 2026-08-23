'use client';

import * as React from 'react';

import { PixelButton, PixelColorInput, PixelSelect, PixelSlider } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import { renderPattern, BG_PATTERNS, type BgColors, type BgPatternId } from './patterns/bg-patterns';
import { setToolHandoff } from './handoff';

/**
 * BackgroundGeneratorDemo — a parameterized pixel-background generator.
 * Pattern library + color pickers + seamless 4×4 preview + size/export.
 * Reusable asset (packages/ui) — the app just mounts it.
 */
export function BackgroundGeneratorDemo() {
  const [pattern, setPattern] = React.useState<BgPatternId>('checker');
  const [colors, setColors] = React.useState<BgColors>({
    primary: '#2F7FE0',
    secondary: '#1A4C8B',
    background: '#EAF2FB',
  });
  const [size, setSize] = React.useState(64);
  const [exportScale, setExportScale] = React.useState(4);

  const previewRef = React.useRef<HTMLCanvasElement>(null);
  const exportRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = previewRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(renderPattern(pattern, colors, size), 0, 0);
    // Record the generated tile so the workbench CTA can carry it over.
    setToolHandoff({ toolSlug: 'pixel-background-generator', resultDataUrl: canvas.toDataURL('image/png') });
  }, [pattern, colors, size]);

  const renderExport = React.useCallback(
    (scale: number) => {
      const canvas = exportRef.current;
      if (!canvas) return;
      const tile = renderPattern(pattern, colors, size);
      canvas.width = size * 4 * scale;
      canvas.height = size * 4 * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const offCtx = off.getContext('2d');
      if (!offCtx) return;
      offCtx.putImageData(tile, 0, 0);
      for (let gy = 0; gy < 4; gy++) {
        for (let gx = 0; gx < 4; gx++) {
          ctx.drawImage(off, gx * size * scale, gy * size * scale, size * scale, size * scale);
        }
      }
    },
    [pattern, colors, size],
  );

  React.useEffect(() => {
    renderExport(exportScale);
  }, [renderExport, exportScale]);

  const download = () => {
    const canvas = exportRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `pixel-background-${pattern}-${size * 4}px.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateColor = (key: keyof BgColors, next: string) => {
    setColors((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <div className={cn('flex flex-col gap-5 border-2 border-foreground/15 bg-retro-surface/20 p-4 pxl-corner-md md:flex-row md:gap-6')}>
      {/* Left: controls */}
      <div className="flex w-full flex-col gap-4 md:w-72 md:shrink-0">
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Pattern
          </span>
          <PixelSelect
            value={pattern}
            onChange={(v) => setPattern(v as BgPatternId)}
            options={BG_PATTERNS.map((p) => ({ value: p.id, label: p.id }))}
            tone="cyan"
            placeholder="Choose a pattern"
          />
        </div>

        <div className="flex flex-col gap-3">
          <PixelColorInput label="Primary" value={colors.primary} onChange={(v) => updateColor('primary', v)} presets={['#2F7FE0', '#E53935', '#F5C542', '#4CAF50', '#9C27B0', '#00BCD4']} />
          <PixelColorInput label="Secondary" value={colors.secondary} onChange={(v) => updateColor('secondary', v)} presets={['#1A4C8B', '#7A1F1F', '#B8860B', '#2E7D32', '#6A1B9A', '#00838F']} />
          <PixelColorInput label="Background" value={colors.background} onChange={(v) => updateColor('background', v)} presets={['#FFFFFF', '#EAF2FB', '#FFF8E1', '#F1F8E9', '#F3E5F5', '#E0F7FA']} />
        </div>

        <PixelSlider label="Tile size" min={16} max={128} step={8} value={size} onChange={setSize} tone="cyan" showMinMax />

        <div className="flex items-end gap-2">
          <PixelSlider label="Export scale" min={1} max={8} step={1} value={exportScale} onChange={setExportScale} tone="green" showMinMax />
          <PixelButton tone="green" variant="solid" size="sm" onClick={download} iconLeft={<PixelIcon name="download" size={13} />}>
            PNG
          </PixelButton>
        </div>
      </div>

      {/* Right: previews */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Seamless preview (4×4)</span>
          <div className="grid place-items-center border-2 border-foreground/10 bg-retro-bg/50 p-3 pxl-corner-sm">
            <canvas ref={previewRef} className="h-40 w-40 border border-foreground/10 [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Export preview</span>
          <div className="grid place-items-center overflow-auto border-2 border-foreground/10 bg-retro-bg/50 p-3 pxl-corner-sm">
            <canvas ref={exportRef} className="max-h-64 max-w-full border border-foreground/10 [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
