"use client";

import {
  WorkbenchInput,
  WorkbenchInputSlot,
  inputVariants,
  type WorkbenchInputProps,
} from "@template/ui";

/** 转发层：raycast 主题 WorkbenchInput（经包 barrel 导入，样式统一由主题提供） */
export const Input = WorkbenchInput;
export const InputSlot = WorkbenchInputSlot;
export { inputVariants };
export type InputProps = WorkbenchInputProps;
