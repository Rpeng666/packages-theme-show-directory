/**
 * Editor workbench — shared i18n helper (mirrors perler/dither i18n.ts).
 *
 * The generic editor chrome components (shell / toolbar / sidebar / canvas /
 * panels) accept an optional `t` translation function (namespace-scoped,
 * `useTranslations('workbench')` from the app bridge). When omitted, a Chinese
 * default is used so the package stays self-contained.
 */
export type EditorT = (
  key: string,
  values?: Record<string, string | number>
) => string;

/** 默认中文文案表（与页面缺省行为一致） */
const ZH: Record<string, string> = {
  // toolbar quick actions
  reset: '重置',
  compare: '对比',
  background: '背景',
  gradient: '渐变',
  export: '导出',
  exportPng: '导出 PNG',
  upgrade: '升级',
  upgradeSoon: 'Pro 功能即将推出，敬请期待',
  whatsNew: 'What’s new',
  // zoom
  zoomOut: '缩小',
  zoomIn: '放大',
  zoomFit: '适应画布',
  zoom100: '100%',
  // sidebar
  collapsePanel: '收起面板',
  expandPanel: '展开面板',
  // compare slider
  compareDrag: '拖动以对比原图与结果',
  compareOriginal: '原图',
  compareResult: '结果',
  // canvas
  canvasEmpty: '上传一张图片，开始创作',
  dropImage: '将图片拖到此处，或点击上传',
};

/**
 * Default Chinese translation resolver — used when a component is rendered
 * without an injected `t` (package self-contained; preserves current copy).
 */
export const defaultEditorT: EditorT = (key, values) => {
  let text = ZH[key] ?? key;
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
};
