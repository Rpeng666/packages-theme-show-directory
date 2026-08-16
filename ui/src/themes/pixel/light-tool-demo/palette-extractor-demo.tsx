'use client';

import * as React from 'react';

import { PixelButton, PixelSlider } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';

interface Swatch {
  hex: string;
}

/**
 * PaletteExtractorDemo — upload an image → palette grid of swatches with HEX
 * codes + copy. Reusable asset (packages/ui).
 */
export function PaletteExtractorDemo() {
  const [srcImg, setSrcImg] = React.useState<string | null>(null);
  const [swatches, setSwatches] = React.useState<Swatch[]>([]);
  const [count, setCount] = React.useState(16);
  const [copied, setCopied] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const extract = React.useCallback(
    (dataUrl: string, maxColors: number) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const s = ctx.getImageData(0, 0, img.width, img.height).data;
        const counts = new Map<number, number>();
        for (let i = 0; i < s.length; i += 4) {
          if (s[i + 3] < 128) continue;
          const key = ((s[i] >> 5) << 6) | ((s[i + 1] >> 5) << 3) | (s[i + 2] >> 5);
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
        const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, maxColors);
        const hex = (key: number) => {
          const r = ((key >> 6) & 7) << 5;
          const g = ((key >> 3) & 7) << 5;
          const b = (key & 7) << 5;
          return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
        };
        setSwatches(top.map(([key]) => ({ hex: hex(key) })));
      };
      img.src = dataUrl;
    },
    [],
  );

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setSrcImg(dataUrl);
      extract(dataUrl, count);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard?.writeText(swatches.map((s) => s.hex).join(', ')).catch(() => {});
    setCopied('#all');
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className={cn('flex flex-col gap-5 border-2 border-foreground/15 bg-retro-surface/20 p-4 pxl-corner-md')}>
      <input type="file" accept="image/*" onChange={onFile} ref={fileRef} className="hidden" />

      {!srcImg ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-2 border-2 border-dashed border-foreground/25 bg-retro-bg/40 px-6 py-10 text-center pxl-corner-sm transition-colors hover:border-retro-cyan/50"
        >
          <PixelIcon name="upload" size={24} />
          <span className="font-mono text-sm text-muted-foreground">Upload an image to extract its palette</span>
        </button>
      ) : (
        <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Source</span>
            <img src={srcImg} alt="source" className="max-h-56 w-full border-2 border-foreground/10 bg-retro-bg object-contain pxl-corner-sm [image-rendering:pixelated]" />
            <PixelButton tone="neutral" variant="outline" size="sm" onClick={() => fileRef.current?.click()} iconLeft={<PixelIcon name="upload" size={13} />}>
              Change image
            </PixelButton>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Palette</span>
              {swatches.length > 0 ? (
                <PixelButton tone="green" variant="soft" size="sm" onClick={copyAll}>
                  {copied === '#all' ? 'Copied ✓' : 'Copy all'}
                </PixelButton>
              ) : null}
            </div>
            {swatches.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {swatches.map((s) => (
                  <button
                    key={s.hex}
                    type="button"
                    onClick={() => copyHex(s.hex)}
                    className="flex items-center gap-2 border-2 border-foreground/10 p-1.5 pxl-corner-sm transition-colors hover:border-retro-cyan/50"
                    title="Click to copy"
                  >
                    <span className="block h-8 w-8 shrink-0 border border-foreground/20" style={{ backgroundColor: s.hex }} />
                    <span className="truncate font-mono text-[10px] text-foreground">
                      {copied === s.hex ? 'Copied ✓' : s.hex.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid min-h-24 place-items-center border-2 border-dashed border-foreground/15 bg-retro-bg/40 pxl-corner-sm">
                <span className="font-mono text-xs text-muted-foreground">Extracting…</span>
              </div>
            )}
          </div>
        </div>
      )}

      {srcImg ? (
        <div className="flex items-end gap-4">
          <div className="min-w-40 flex-1">
            <PixelSlider
              label="Max colors"
              min={4}
              max={32}
              step={1}
              value={count}
              onChange={(v: number) => {
                setCount(v);
                if (srcImg) extract(srcImg, v);
              }}
              tone="cyan"
              showMinMax
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
