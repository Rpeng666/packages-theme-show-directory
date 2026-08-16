'use client';
import { cn } from '../../../../lib/utils';

import React from 'react';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerSettingsPanelProps {
  guidanceMode: 'nearest' | 'largest' | 'edge-first';
  onGuidanceModeChange: (mode: 'nearest' | 'largest' | 'edge-first') => void;
  gridSectionInterval: number;
  onGridSectionIntervalChange: (interval: number) => void;
  showSectionLines: boolean;
  onShowSectionLinesChange: (show: boolean) => void;
  sectionLineColor: string;
  onSectionLineColorChange: (color: string) => void;
  enableCelebration: boolean;
  onEnableCelebrationChange: (enable: boolean) => void;
  onClose: () => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

const SettingsPanel: React.FC<PerlerSettingsPanelProps> = ({
  guidanceMode,
  onGuidanceModeChange,
  gridSectionInterval,
  onGridSectionIntervalChange,
  showSectionLines,
  onShowSectionLinesChange,
  sectionLineColor,
  onSectionLineColorChange,
  enableCelebration,
  onEnableCelebrationChange,
  onClose,
  t = defaultPerlerT
}) => {
  // 分割线颜色选项
  const sectionLineColors = [
    { color: '#007acc', name: t('cnBlue') },
    { color: '#28a745', name: t('cnGreen') },
    { color: '#dc3545', name: t('cnRed') },
    { color: '#6f42c1', name: t('cnPurple') },
    { color: '#fd7e14', name: t('cnOrange') },
    { color: '#6c757d', name: t('cnGray') }
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="w-80 max-w-[90vw] h-full bg-background shadow-md border-2 border-foreground/15 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/15">
          <h2 className="text-lg font-medium text-foreground">{t('settings')}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 设置内容 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* 引导设置 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-3">{t('fmSmartGuide')}</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="guidanceMode"
                  value="nearest"
                  checked={guidanceMode === 'nearest'}
                  onChange={(e) => onGuidanceModeChange(e.target.value as 'nearest')}
                  className="mr-3 text-retro-cyan"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{t('fmNearestFirst')}</div>
                  <div className="text-xs text-muted-foreground">{t('fmNearest')}</div>
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="guidanceMode"
                  value="largest"
                  checked={guidanceMode === 'largest'}
                  onChange={(e) => onGuidanceModeChange(e.target.value as 'largest')}
                  className="mr-3 text-retro-cyan"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{t('fmBigFirst')}</div>
                  <div className="text-xs text-muted-foreground">{t('fmBigFirstDesc')}</div>
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="guidanceMode"
                  value="edge-first"
                  checked={guidanceMode === 'edge-first'}
                  onChange={(e) => onGuidanceModeChange(e.target.value as 'edge-first')}
                  className="mr-3 text-retro-cyan"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{t('fmEdgeFirst')}</div>
                  <div className="text-xs text-muted-foreground">{t('fmEdgeFirstDesc')}</div>
                </div>
              </label>
            </div>
          </div>

          {/* 显示设置 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-3">{t('stDisplay')}</h3>
            <div className="space-y-4">
              {/* 分割线开关 */}
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{t('dsShowDivider')}</div>
                  <div className="text-xs text-muted-foreground">{t('fmChunkGuide')}</div>
                </div>
                <input
                  type="checkbox"
                  checked={showSectionLines}
                  onChange={(e) => onShowSectionLinesChange(e.target.checked)}
                  className="h-4 w-4 text-retro-cyan rounded"
                />
              </label>

              {/* 只有开启分割线时才显示后续选项 */}
              {showSectionLines && (
                <>
                  {/* 分割线间隔 */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      {t('stSectionInterval')}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="5"
                        max="20"
                        value={gridSectionInterval}
                        onChange={(e) => onGridSectionIntervalChange(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 pxl-corner-sm appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground min-w-[3rem]">
                        {t('stGrid', { n: gridSectionInterval })}
                      </span>
                    </div>
                  </div>

                  {/* 分割线颜色 */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      {t('dsGridColor')}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {sectionLineColors.map((colorOption) => (
                        <button
                          key={colorOption.color}
                          onClick={() => onSectionLineColorChange(colorOption.color)}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            sectionLineColor === colorOption.color
                              ? 'border-foreground/40 scale-110'
                              : 'border-foreground/25 hover:border-foreground/30'
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 庆祝动画开关 */}
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{t('fmCelebrate')}</div>
                  <div className="text-xs text-muted-foreground">{t('fmCelebrateDesc')}</div>
                </div>
                <input
                  type="checkbox"
                  checked={enableCelebration}
                  onChange={(e) => onEnableCelebrationChange(e.target.checked)}
                  className="h-4 w-4 text-retro-cyan rounded"
                />
              </label>
            </div>
          </div>



          {/* 进度重置 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-3">{t('data')}</h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-orange-100 text-orange-700 pxl-corner-sm hover:bg-orange-200 transition-colors text-sm">
                {t('fmDownloadProgress')}
              </button>
              
              <button className="w-full py-2 px-4 bg-red-100 text-red-700 pxl-corner-sm hover:bg-red-200 transition-colors text-sm">
                {t('fmResetProgress')}
              </button>
            </div>
          </div>

          {/* 关于信息 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-3">{t('about')}</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>{t('fmV1')}</p>
              <p>{t('fmMobileDesc')}</p>
              <div className="pt-2 text-xs text-muted-foreground">
                <p>{t('ccLongPressHint')}</p>
                <p>{t('ccPinchHint')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel };