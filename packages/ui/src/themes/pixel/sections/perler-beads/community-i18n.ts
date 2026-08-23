import { defaultPerlerT, type PerlerT } from './i18n';

/**
 * Community feed i18n — Chinese default fallbacks for the community layout
 * components. App injects the resolved `t` (useTranslations('perler')) so all
 * 11 locales are used at runtime; these defaults keep the package
 * self-contained (mirrors the other perler modules' defaultPerlerT pattern).
 */
export const communityDefaultPerlerT: PerlerT = (key, values) => {
  let text = COMMUNITY_ZH[key] ?? defaultPerlerT(key, values);
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
};

/** 社区相关中文文案（与 app 的 zh/perler.json 保持一致） */
const COMMUNITY_ZH: Record<string, string> = {
  cmExploreTopics: '探索主题',
  cmExploreStaffPicks: '探索精选',
  cmAllPatterns: '全部图纸',
  cmShowMore: '查看更多',
  cmShowLess: '收起',
  cmEditOnIt: '编辑',
  cmShare: '分享',
  cmView: '查看',
  cmBy: '作者',
  cmColors: '色',
  cmBeads: '豆',
};
