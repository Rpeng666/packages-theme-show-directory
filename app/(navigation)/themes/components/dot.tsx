import { WorkbenchDot } from "@template/ui";

/** 转发层：raycast 主题 WorkbenchDot（经包 barrel 导入，样式统一由主题提供） */
export function Dot({
  color,
  colorSecondary = color,
  size = 12,
}: {
  color?: string;
  colorSecondary?: string;
  size?: number;
}) {
  return <WorkbenchDot color={color} colorSecondary={colorSecondary} size={size} />;
}