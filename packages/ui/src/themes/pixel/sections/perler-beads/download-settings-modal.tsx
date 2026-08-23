'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { resolveComponent } from '../../../../registry';
import type { GridDownloadOptions } from '../../../../contracts/perler-beads/download-types';
import { defaultPerlerT, type PerlerT } from './i18n';

const gridLineColorOptions = [
  { name: 'cnDarkGray', value: '#555555' },
  { name: 'cnRed', value: '#FF0000' },
  { name: 'cnBlue', value: '#0000FF' },
  { name: 'cnGreen', value: '#008000' },
  { name: 'cnPurple', value: '#800080' },
  { name: 'cnOrange', value: '#FFA500' },
];
export { gridLineColorOptions };

export interface PerlerDownloadSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: GridDownloadOptions;
  onOptionsChange: (options: GridDownloadOptions) => void;
  onDownload: (opts?: GridDownloadOptions) => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads download settings modal — pixel retro chrome. Owns only the
 * temp-options editing state (pure UI); the app's onDownload/onOptionsChange
 * are injected.
 */
export function DownloadSettingsModal({
  isOpen,
  onClose,
  options,
  onOptionsChange,
  onDownload,
  t = defaultPerlerT,
}: PerlerDownloadSettingsModalProps) {
  const [tempOptions, setTempOptions] = React.useState<GridDownloadOptions>({ ...options });

  if (!isOpen) return null;

  const handleOptionChange = (key: keyof GridDownloadOptions, value: string | number | boolean) => {
    setTempOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onOptionsChange(tempOptions);
    onDownload(tempOptions);
    onClose();
  };

  const Dialog = resolveComponent('Dialog');
  const Button = resolveComponent('Button');
  const Input = resolveComponent('Input');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md overflow-hidden border-2 border-foreground/15 bg-background pxl-corner-md shadow-lg">
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between border-b-2 border-foreground/10 pb-3">
            <h3 className="font-display text-lg uppercase tracking-wider">{t('dsTitle')}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground/70 hover:text-foreground"
              aria-label={t('close')}
            >
              <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-muted-foreground">{t('dsShowGrid')}</label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={tempOptions.showGrid}
                  onChange={(e) => handleOptionChange('showGrid', e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full border-2 border-foreground/20 bg-retro-surface/40 peer-checked:bg-retro-green/40 after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-foreground/60 after:transition-all peer-checked:after:translate-x-5 after:content-['']" />
              </label>
            </div>

            {tempOptions.showGrid && (
              <div className="ml-1 space-y-4 border-l-2 border-foreground/15 pl-2 pt-2 pb-1">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">{t('dsGridInterval')}</label>
                  <div className="flex items-center justify-between space-x-3">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      value={tempOptions.gridInterval}
                      onChange={(e) => handleOptionChange('gridInterval', parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none bg-retro-surface/40 pxl-corner-sm"
                    />
                    <span className="flex min-w-[40px] items-center justify-center font-mono text-sm text-foreground">
                      {tempOptions.gridInterval}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">{t('dsGridColor')}</label>
                  <div className="flex flex-wrap gap-2">
                    {gridLineColorOptions.map((colorOpt) => (
                      <button
                        key={colorOpt.value}
                        type="button"
                        onClick={() => handleOptionChange('gridLineColor', colorOpt.value)}
                        className={cn(
                          'flex size-8 items-center justify-center rounded-full border-2 transition-all duration-150',
                          tempOptions.gridLineColor === colorOpt.value
                            ? 'border-retro-cyan ring-2 ring-retro-cyan/40'
                            : 'border-foreground/20 hover:border-foreground/50'
                        )}
                        title={t(colorOpt.name)}
                      >
                        <span
                          className="block size-6 rounded-full"
                          style={{ backgroundColor: colorOpt.value }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-muted-foreground">{t('dsShowCoords')}</label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={tempOptions.showCoordinates}
                  onChange={(e) => handleOptionChange('showCoordinates', e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full border-2 border-foreground/20 bg-retro-surface/40 peer-checked:bg-retro-green/40 after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-foreground/60 after:transition-all peer-checked:after:translate-x-5 after:content-['']" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-muted-foreground">{t('dsHideNumbers')}</label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={tempOptions.showCellNumbers}
                  onChange={(e) => handleOptionChange('showCellNumbers', e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full border-2 border-foreground/20 bg-retro-surface/40 peer-checked:bg-retro-green/40 after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-foreground/60 after:transition-all peer-checked:after:translate-x-5 after:content-['']" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-muted-foreground">{t('dsIncludeStats')}</label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={tempOptions.includeStats}
                  onChange={(e) => handleOptionChange('includeStats', e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full border-2 border-foreground/20 bg-retro-surface/40 peer-checked:bg-retro-green/40 after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-foreground/60 after:transition-all peer-checked:after:translate-x-5 after:content-['']" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-muted-foreground">{t('dsExportCsv')}</label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={tempOptions.exportCsv}
                  onChange={(e) => handleOptionChange('exportCsv', e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full border-2 border-foreground/20 bg-retro-surface/40 peer-checked:bg-retro-green/40 after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-foreground/60 after:transition-all peer-checked:after:translate-x-5 after:content-['']" />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t-2 border-foreground/10 pt-4">
            <Button type="button" variant="outline" tone="neutral" size="sm" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="button" variant="default" tone="green" size="sm" onClick={handleSave}>
              {t('download')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
