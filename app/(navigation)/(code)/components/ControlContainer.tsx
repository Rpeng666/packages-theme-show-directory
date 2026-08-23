import { useThemeComponent } from "@template/ui";
import React, { PropsWithChildren } from "react";

/** 转发层：raycast 主题 WorkbenchControlItem（原 ControlContainer，已注册进主题） */
const ControlContainer: React.FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  const WorkbenchControlItem = useThemeComponent("WorkbenchControlItem");
  return <WorkbenchControlItem title={title}>{children}</WorkbenchControlItem>;
};

export default ControlContainer;
