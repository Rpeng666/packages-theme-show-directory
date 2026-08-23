import { resolveComponent } from "@template/ui";
import { PropsWithChildren } from "react";

/** 转发层：经注册表解析 raycast 主题 WorkbenchNoSSR（原 next/dynamic ssr:false 封装） */
const WorkbenchNoSSR = resolveComponent("WorkbenchNoSSR");

const NoSSR: React.FC<PropsWithChildren> = ({ children }) => <WorkbenchNoSSR>{children}</WorkbenchNoSSR>;

export default NoSSR;
