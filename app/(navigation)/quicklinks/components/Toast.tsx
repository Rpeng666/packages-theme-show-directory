"use client";

import {
  WorkbenchToast,
  WorkbenchToastViewport,
  WorkbenchToastProvider,
  WorkbenchToastTitle,
} from "@template/ui";

/** 转发层：raycast 主题 WorkbenchToast（经包 barrel 导入，样式统一由主题提供） */
export const Toast = WorkbenchToast;
export const ToastViewport = WorkbenchToastViewport;
export const ToastProvider = WorkbenchToastProvider;
export const ToastTitle = WorkbenchToastTitle;
