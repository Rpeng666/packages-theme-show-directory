import { defaultPerlerT, type PerlerT } from './i18n';

/**
 * Community gallery i18n — Chinese default fallbacks for the gallery feed
 * components. App injects the resolved `t` (useTranslations('perler')) so all
 * 11 locales are used at runtime; these defaults keep the package
 * self-contained (mirrors the other perler modules' defaultPerlerT pattern).
 */
export const galleryDefaultPerlerT: PerlerT = (key, values) => {
  let text = GALLERY_ZH[key] ?? defaultPerlerT(key, values);
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
};

/** 画廊相关中文文案（与 app 的 zh/perler.json 保持一致） */
const GALLERY_ZH: Record<string, string> = {
  cmTitle: '社区画廊',
  cmSubtitle: '用户公开分享的拼豆图纸 — 查看详情或在编辑器中打开',
  cmAll: '全部',
  cmTopicFruit: '水果',
  cmTopicAnimals: '动物',
  cmTopicOcean: '海洋',
  cmTopicPixelArt: '像素画',
  cmTopicParty: '派对',
  cmBeads: '豆',
  cmEditOnIt: '编辑',
  cmShowMore: '查看更多',
  cmShowLess: '收起',
  cmExploreTopics: '探索主题',
  cmShare: '分享',
};
