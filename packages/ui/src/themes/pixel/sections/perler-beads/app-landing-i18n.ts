import { defaultPerlerT, type PerlerT } from './i18n';

/**
 * App download landing i18n — Chinese default fallbacks for the perler app
 * landing page components (PerlerAppLanding + sub-parts). App injects the
 * resolved `t` (useTranslations('perler')) so all 11 locales are used at
 * runtime; these defaults keep the package self-contained (mirrors the other
 * perler modules' defaultPerlerT pattern).
 */
export const appDefaultPerlerT: PerlerT = (key, values) => {
  let text = APP_ZH[key] ?? defaultPerlerT(key, values);
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
};

/** App 下载页相关中文文案（与 app 的 zh/perler.json 保持一致） */
const APP_ZH: Record<string, string> = {
  // hero
  apEyebrow: '官方应用',
  apTitle: 'Pixilart 手机应用',
  apSubtitle:
    '随时随地释放像素级创造力！免费下载 Pixilart App，与艺术爱好者社区连接，随时随地创作惊艳的像素画。',
  // store badges
  apGetOnGooglePlay: '在 Google Play 获取',
  apDownloadOnAppStore: '在 App Store 下载',
  // device mockup
  apMockupAlt: '桌面端与 iPhone 上的 Pixilart 手机应用',
  // rows
  apRow1Eyebrow: '创作',
  apRow1Title: '像素艺术，尽在指尖',
  apRow1Desc: '为触控优化的完整绘画套件——调色板、橡皮擦、图层与辅助线，全部以原生像素分辨率清晰呈现。',
  apRow1B1: '触控友好的画布，支持双指缩放',
  apRow1B2: '轻点即可换色、擦除与翻转',
  apRow2Eyebrow: '连接',
  apRow2Title: '与数百万人分享作品',
  apRow2Desc: '浏览全球像素艺术信息流，关注艺术家，还能把他们的作品直接复刻到你的画布上。',
  apRow2B1: '信息流、点赞、关注与评论',
  apRow2B2: '复刻任何公开作品',
  apRow3Eyebrow: '同步',
  apRow3Title: '你的作品，无处不在',
  apRow3Desc: '在手机上开始，在桌面端完成。作品自动保存并同步，让你永远不会丢失任何一颗豆子。',
  apRow3B1: '自动保存 + 云端同步',
  apRow3B2: '随时随地接着创作',
  // features tabs
  apTab1Label: '绘画',
  apTab1Title: '完整的像素编辑器',
  apTab1Desc: '像素艺术家需要的每一个工具，都为手机屏幕精心设计。',
  apTab1B1: '含数百种颜色的调色板',
  apTab1B2: '橡皮擦、取色器与缩放',
  apTab1B3: '网格与镜像辅助线',
  apTab2Label: '社区',
  apTab2Title: '不再独自创作',
  apTab2Desc: '发布作品、关注创作者，从全球信息流中获得灵感。',
  apTab2B1: '探索热门像素艺术',
  apTab2B2: '关注艺术家，获取更新',
  apTab2B3: '评论与复刻',
  apTab3Label: '同步',
  apTab3Title: '多设备无缝衔接',
  apTab3Desc: '流畅的云端同步，让每一块画布都完美如初。',
  apTab3B1: '实时自动保存',
  apTab3B2: '任意设备继续创作',
  apTab3B3: '离线模式，随时可用',
  // final CTA
  apCtaTitle: '立即开始——创作美丽的像素艺术',
  apCtaSubtitle: '永久免费，无需注册即可绘画。',
};
