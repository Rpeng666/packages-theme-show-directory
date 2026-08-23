'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerSampleItem {
  id: string;
  label: string;
  /** Rendered PNG dataURL for the thumbnail (computed app-side, client-only). */
  dataUrl: string;
}

export interface PerlerSampleGalleryProps {
  /** Sample thumbnails (excluding the upload tile). */
  items: PerlerSampleItem[];
  /** Click a sample → load it into the workbench. */
  onSelect: (item: PerlerSampleItem) => void;
  /** Open the file picker (first tile). */
  onUpload: () => void;
  /** Label under the upload tile. */
  uploadLabel?: string;
  /** Section label. */
  label?: string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

/**
 * SampleGallery — a 3-column grid of preset pixel-art thumbnails (heart,
 * star, mushroom, ghost, smiley). The FIRST tile is the upload entry; the rest
 * load a sample pattern into the workbench. Pure presentation — thumbnails are
 * passed in as dataURLs (computed by the app, client-only), so the component
 * is SSR-safe and reusable across the pixel-art workbenches.
 */
export function SampleGallery({
  items,
  onSelect,
  onUpload,
  uploadLabel = 'Upload',
  label = 'Samples',
  className,
}: PerlerSampleGalleryProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="font-mono text-xs text-foreground">{label}</span>

      <div className="grid grid-cols-3 gap-2">
        {/* First tile — upload */}
        <button
          type="button"
          onClick={onUpload}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-1 border-2 border-dashed border-foreground/20 bg-retro-surface/20 pxl-corner-sm text-muted-foreground transition-colors hover:border-retro-cyan/50 hover:text-retro-cyan"
          title={uploadLabel}
        >
          <PixelIcon name="upload" size={16} />
          <span className="font-mono text-[9px] uppercase tracking-wide">{uploadLabel}</span>
        </button>

        {/* Sample thumbnails */}
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className="aspect-[4/3] overflow-hidden border-2 border-foreground/10 bg-retro-bg pxl-corner-sm transition-colors hover:border-retro-cyan/50"
            title={item.label}
          >
            <img
              src={item.dataUrl}
              alt={item.label}
              className="h-full w-full object-contain [image-rendering:pixelated]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
