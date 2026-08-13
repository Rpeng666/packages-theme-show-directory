/**
 * Whitelist of Remix Icons used across the site.
 *
 * SmartIcon used to `await import('react-icons/ri')`, which pulled the entire
 * ~2MB icon library (3020 SVGs) into a shared client chunk (measured ~1.9MB
 * gzip'd on the homepage). This module statically imports only the icons the
 * app actually renders, so the bundler tree-shakes to those few KB. There is
 * intentionally NO lazy `import('react-icons/ri')` fallback here — the moment
 * a module is both statically and dynamically imported, bundlers hoist the
 * whole library back into the eager graph. If a new icon is needed, add its
 * named import below.
 *
 * Sources for this set (all flow into <SmartIcon name="...">):
 * - `icon: 'Ri...'` assignments in route code (admin/settings/activity)
 * - `sidebar` configs under locale messages (settings/activity/admin/ai.chat)
 * - landing + pages/tools + pages/index section/item icons
 * - social nav icons (footer/discord/twitter-x)
 *
 * RiGithubFill / RiGoogleFill are NOT here: sign/payment blocks import them
 * directly from 'react-icons/ri' and tree-shake fine.
 */
import { ComponentType } from 'react';
import {
  RiAddLine,
  RiArticleLine,
  RiBookOpenLine,
  RiChat2Line,
  RiCheckDoubleLine,
  RiClipboardLine,
  RiCpuLine,
  RiDeleteBinLine,
  RiDiscordFill,
  RiEdit2Line,
  RiEditLine,
  RiExpandWidthLine,
  RiEyeLine,
  RiFileReduceLine,
  RiFileTextLine,
  RiFingerprintLine,
  RiFlashlightFill,
  RiInputCursorMove,
  RiKeyLine,
  RiLayout4Line,
  RiLockPasswordLine,
  RiMagicLine,
  RiMailLine,
  RiQuestionLine,
  RiRefreshLine,
  RiRepeat2Line,
  RiScan2Line,
  RiSearchEyeLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiSparkling2Line,
  RiTaskLine,
  RiTimeLine,
  RiTwitterXFill,
  RiUserSmileLine,
  RiVoiceprintLine,
} from 'react-icons/ri';

/** Static (tree-shaken) registry of all Ri icons the app renders. */
export const riIconWhitelist: Record<string, ComponentType<any>> = {
  RiAddLine,
  RiArticleLine,
  RiBookOpenLine,
  RiChat2Line,
  RiCheckDoubleLine,
  RiClipboardLine,
  RiCpuLine,
  RiDeleteBinLine,
  RiDiscordFill,
  RiEdit2Line,
  RiEditLine,
  RiExpandWidthLine,
  RiEyeLine,
  RiFileReduceLine,
  RiFileTextLine,
  RiFingerprintLine,
  RiFlashlightFill,
  RiInputCursorMove,
  RiKeyLine,
  RiLayout4Line,
  RiLockPasswordLine,
  RiMagicLine,
  RiMailLine,
  RiQuestionLine,
  RiRefreshLine,
  RiRepeat2Line,
  RiScan2Line,
  RiSearchEyeLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiSparkling2Line,
  RiTaskLine,
  RiTimeLine,
  RiTwitterXFill,
  RiUserSmileLine,
  RiVoiceprintLine,
};
