'use client';

import * as React from 'react';

import { PixelButton, PixelColorInput, PixelSelect } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import { ICON_TEMPLATES, renderIcon, type IconColors, type IconTemplateId } from './patterns/icon-templates';
import { setToolHandoff } from './handoff';

const SIZES = [16, 32, 64] as const;

/**
 * GameIconGeneratorDemo — a parameterized game-icon generator.
 * Icon-template library + color pickers + size + transparent preview + PNG
 * export. Reusable asset (packages/ui).
 */
export function GameIconGeneratorDemo({ className }: { className?: string }) {
  const [template, setTemplate] = React.useState<IconTemplateId>('sword');
  const [colors, setColors] = React.useState<IconColors>({
    primary: '#C94F3D',
    secondary: '#F5D76E',
    outline: '#3A3A3A',
  });
  const [size, setSize] = React.useState<number>(32);

  const previewRef = React.useRef<HTMLCanvasElement>(null);
  const exportRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = previewRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(renderIcon(template, colors, size), 0, 0);
    // Record the generated icon so the workbench CTA can carry it over.
    setToolHandoff({ toolSlug: 'game-icon-generator', resultDataUrl: canvas.toDataURL('image/png') });
  }, [template, colors, size]);

  React.useEffect(() => {
    const canvas = exportRef.current;
    if (!canvas) return;
    canvas.width = size * 4;
    canvas.height = size * 4;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const offCtx = off.getContext('2d');
    if (!offCtx) return;
    offCtx.putImageData(renderIcon(template, colors, size), 0, 0);
    ctx.drawImage(off, 0, 0, size * 4, size * 4);
  }, [template, colors, size]);

  const download = () => {
    const canvas = exportRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `game-icon-${template}-${size}px.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateColor = (key: keyof IconColors, next: string) => {
    setColors((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <div className={cn('flex flex-col gap-5 border-2 border-retro-border bg-retro-surface/30 p-4 pxl-corner-md md:flex-row md:gap-6', className)}>
      {/* Left: controls */}
      <div className="flex w-full flex-col md:w-72 md:shrink-0">
        {/* Template */}
        <div className="border-b border-retro-border/40 pb-4">
          <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            <span className="font-bold text-retro-cyan">01</span> Icon template
          </span>
          <PixelSelect
            value={template}
            onChange={(v) => setTemplate(v as IconTemplateId)}
            options={ICON_TEMPLATES.map((t) => ({ value: t.id, label: t.label }))}
            tone="cyan"
            placeholder="Choose an icon"
          />
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-3 border-b border-retro-border/40 py-4">
          <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            <span className="font-bold text-retro-cyan">02</span> Colors
          </span>
          <PixelColorInput label="Primary" value={colors.primary} onChange={(v) => updateColor('primary', v)} presets={['#C94F3D', '#2F7FE0', '#4CAF50', '#9C27B0', '#00BCD4', '#F5C542']} />
          <PixelColorInput label="Accent" value={colors.secondary} onChange={(v) => updateColor('secondary', v)} presets={['#F5D76E', '#FFFFFF', '#FF9800', '#E91E63', '#8BC34A', '#03A9F4']} />
          <PixelColorInput label="Outline" value={colors.outline} onChange={(v) => updateColor('outline', v)} presets={['#3A3A3A', '#1A1A1A', '#5D4037', '#455A64', '#212121']} />
        </div>

        {/* Size */}
        <div className="py-4">
          <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            <span className="font-bold text-retro-cyan">03</span> Size
          </span>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`flex-1 border-2 px-2 py-1.5 font-mono text-xs transition-colors pxl-corner-sm ${
                  size === s
                    ? 'border-retro-cyan/60 bg-retro-cyan/15 text-retro-cyan'
                    : 'border-retro-border bg-retro-surface/30 text-muted-foreground hover:border-retro-cyan/40 hover:text-foreground'
                }`}
              >
                {s}×{s}
              </button>
            ))}
          </div>
        </div>

        <PixelButton tone="green" variant="solid" size="sm" onClick={download} iconLeft={<PixelIcon name="download" size={13} />}>
          Download PNG
        </PixelButton>
      </div>

      {/* Right: previews */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            <span className="font-bold text-retro-cyan">04</span> Preview (transparent)
          </span>
          <div className="grid h-32 place-items-center border-2 border-retro-border bg-[repeating-conic-gradient(#3a3a3a_0_25%,#1a1a2e_0_50%)] bg-[length:12px_12px] p-3 pxl-corner-sm">
            <canvas ref={previewRef} className="border-2 border-retro-border [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            <span className="font-bold text-retro-cyan">05</span> 4× zoom
          </span>
          <div className="grid place-items-center overflow-auto border-2 border-retro-border bg-[repeating-conic-gradient(#3a3a3a_0_25%,#1a1a2e_0_50%)] bg-[length:12px_12px] p-3 pxl-corner-sm">
            <canvas ref={exportRef} className="max-h-56 max-w-full border-2 border-retro-border [image-rendering:pixelated]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
