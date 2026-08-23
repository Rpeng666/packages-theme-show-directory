import {
  WorkbenchFrameContext,
  WorkbenchFrameProvider,
} from "@template/ui/themes/raycast";

/**
 * 转发层：raycast 主题 WorkbenchFrameContext / WorkbenchFrameProvider
 * （原 app 本地 FrameContextStore 已注册进主题，调用方零改动）。
 *
 * 注意：context 对象是编排原语（非组件），不能经 resolveComponent 解析，
 * 直接导入已被 local/no-direct-theme-import 的编排原语白名单豁免。
 */
export const FrameContext = WorkbenchFrameContext;
export default WorkbenchFrameProvider;
