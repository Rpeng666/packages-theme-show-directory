import { resolveComponent } from "@template/ui";

/** 转发层：raycast 主题 WorkbenchKbd（经注册表解析，去重，样式统一由主题提供） */
const WorkbenchKbd = resolveComponent("WorkbenchKbd");
const WorkbenchKbds = resolveComponent("WorkbenchKbds");
const WorkbenchShortcutRow = resolveComponent("WorkbenchShortcutRow");

export function Kbd({ children, size = "small" }: { children: React.ReactNode; size?: "small" | "medium" }) {
  return <WorkbenchKbd size={size}>{children}</WorkbenchKbd>;
}

export function Kbds({ children }: { children: React.ReactNode }) {
  return <WorkbenchKbds>{children}</WorkbenchKbds>;
}

export function Shortcut({ children, keys }: { children: React.ReactNode; keys: string[] }) {
  return <WorkbenchShortcutRow label={children} keys={keys} />;
}
