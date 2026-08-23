/**
 * Dither workbench — shared i18n helper (mirrors perler-beads/i18n.ts).
 *
 * Each display component accepts an optional `t` translation function
 * (namespace-scoped, `useTranslations('dither')` from the app bridge). When
 * omitted, a Chinese default is used so the package stays self-contained.
 */
export type DitherT = (
  key: string,
  values?: Record<string, string | number>
) => string;

/** 默认中文文案表（与页面缺省行为一致） */
const ZH: Record<string, string> = {
  // header
  hdTitle: 'Dither Workbench · 抖动工作台',
  hdSubtitle: '免费在线设计与图像处理工具，将普通图片或短视频转化为复古、颗粒感、像素艺术风格的视觉作品',
  hdTools: '全部工具',
  hdGithub: 'GitHub',
  hdVideoTag: '视频即将上线',
  // upload
  dropOr: '拖放图片到此处，或',
  clickToSelect: '点击选择文件',
  formatHint: '支持 JPG、PNG、GIF、WebP 等图片格式',
  tip: '小贴士：抖动适合低色深输出（如 1-bit 黑白或 4 级灰度）。想保留更多细节，就把「强度」调低一点。',
  // video placeholder
  videoSoonTitle: '视频抖动即将上线',
  videoSoonDesc: '短视频帧提取与逐帧抖动正在开发中。目前请上传静态图片体验抖动效果。',
  // settings
  stTitle: '抖动设置',
  stMethod: '算法',
  stMethodNone: '无',
  stMethodBayer2: 'Bayer 2×2',
  stMethodBayer4: 'Bayer 4×4',
  stMethodBayer8: 'Bayer 8×8',
  stMethodFloyd: 'Floyd-Steinberg',
  stMethodAtkinson: 'Atkinson',
  stMethodJarvis: 'Jarvis',
  stMethodStucki: 'Stucki',
  stMethodSierra: 'Sierra',
  stMode: '色彩模式',
  stModeBw: '黑白',
  stModeGrayscale: '灰度',
  stModeRgb: 'RGB 减色',
  stModeWebsafe: 'Web 安全色',
  stModeDuotone: '双色',
  stGrayLevels: '灰度级数',
  stRgbBits: '每通道位数',
  stStrength: '抖动强度',
  stSerpentine: '蛇形扫描（消除方向条纹）',
  // preview
  pvTitle: '预览',
  pvEmpty: '上传一张图片，抖动效果将实时显示在这里',
  pvOriginal: '原图',
  pvResult: '抖动结果',
  pvProcessing: '处理中…',
  pvDownload: '下载 PNG',
  pvExportScale: '导出尺寸',
  pvExportHint: '导出时用最近邻放大，保持像素边缘锐利',
  pvOriginalAlt: '原图预览',
  pvResultAlt: '抖动结果预览',
};

/**
 * Default Chinese translation resolver — used when a component is rendered
 * without an injected `t` (package self-contained; preserves current copy).
 */
export const defaultDitherT: DitherT = (key, values) => {
  let text = ZH[key] ?? key;
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
};
