/**
 * Raycast theme barrel — the ray.so-style workbench theme.
 *
 * Registers the workbench chrome as theme components/sections/pages:
 *
 *   components/header.tsx   → WorkbenchHeader / WorkbenchActions
 *   components/footer.tsx   → WorkbenchFooter
 *   sections/code-workbench.tsx → CodeWorkbench（中间区域 shell）
 *   pages/workbench.tsx     → WorkbenchPage（工作台页面骨架）
 *
 * All components are data-driven with injected slots (brandSlot, actions,
 * social, LinkComponent) so the package carries no app / Next dependency.
 */
export { WorkbenchHeader, WorkbenchActions } from './components/header'
export type { WorkbenchHeaderProps, WorkbenchHeaderLink } from './components/header'
export { WorkbenchFooter, WorkbenchControlItem } from './components/footer'
export { WorkbenchInfoDialog } from './components/info-dialog'
export type { WorkbenchInfoDialogProps } from './components/info-dialog'
export { WorkbenchKbd, WorkbenchKbds, WorkbenchShortcutRow } from './components/kbd'
export type { WorkbenchShortcut } from './components/kbd'
export { WorkbenchSwitch } from './components/switch'
export { WorkbenchInput, WorkbenchInputSlot, inputVariants } from './components/input'
export { WorkbenchColorInput } from './components/color-input'
export type { WorkbenchColorInputProps } from './components/color-input'
export { WorkbenchFormSection, WorkbenchFormItem } from './components/form-section'
export { WorkbenchToolbarActions } from './components/toolbar-actions'
export type { WorkbenchToolbarActionsProps } from './components/toolbar-actions'
export { WorkbenchPanel } from './components/panel'
export type { WorkbenchPanelProps } from './components/panel'
export { WorkbenchIconPicker } from './components/icon-picker'
export type { WorkbenchIconPickerProps } from './components/icon-picker'
export { WorkbenchIconPreviewStage } from './components/icon-preview-stage'
export type { WorkbenchIconPreviewStageProps } from './components/icon-preview-stage'
export { WorkbenchSidebar } from './components/sidebar'
export type { WorkbenchSidebarProps } from './components/sidebar'
export { WorkbenchSidebarNav } from './components/sidebar-nav'
export type { WorkbenchSidebarNavItem } from './components/sidebar-nav'
export { WorkbenchSidebarFilter } from './components/sidebar-filter'
export type { WorkbenchSidebarFilterSection } from './components/sidebar-filter'
export { WorkbenchPromptCard } from './components/prompt-card'
export type { WorkbenchPromptCardProps } from './components/prompt-card'
export { WorkbenchSelectionSummary } from './components/selection-summary'
export type { WorkbenchSelectionSummaryProps, WorkbenchSelectionSummaryItem } from './components/selection-summary'
export { WorkbenchFloatingActionBar } from './components/floating-action-bar'
export type { WorkbenchFloatingAction, WorkbenchFloatingActionBarProps } from './components/floating-action-bar'
export { WorkbenchThemeCard } from './components/theme-card'
export type { WorkbenchThemeCardProps, WorkbenchThemeCardData } from './components/theme-card'
export { WorkbenchThemeSwitcher } from './components/theme-switcher'
export type { WorkbenchThemeSwitcherProps } from './components/theme-switcher'
export { WorkbenchThemeControls } from './components/theme-controls'
export type { WorkbenchThemeControlsProps } from './components/theme-controls'
export { WorkbenchActionMenu } from './components/action-menu'
export type { WorkbenchActionMenuProps, WorkbenchActionMenuItem } from './components/action-menu'
export { WorkbenchDot } from './components/dot'
export { WorkbenchDock } from './components/dock'
export type { WorkbenchDockProps } from './components/dock'
export { WorkbenchDesktop } from './components/desktop'
export type { WorkbenchDesktopProps } from './components/desktop'
export { WorkbenchIconGrid } from './components/icon-grid'
export type { WorkbenchIconGridProps, WorkbenchIconGridItem } from './components/icon-grid'
export { useWorkbenchHotkeys } from './hooks/use-hotkeys'
export {
  WorkbenchToast,
  WorkbenchToastViewport,
  WorkbenchToastProvider,
  WorkbenchToastTitle,
} from './components/toast'
export { WorkbenchKeyboardShortcutsDialog } from './components/keyboard-shortcuts'
export type { WorkbenchKeyboardShortcutsDialogProps } from './components/keyboard-shortcuts'
export { WorkbenchPage } from './pages/workbench'
export type { WorkbenchPageProps } from './pages/workbench'
export { CodeWorkbench } from './sections/code-workbench'
export type { CodeWorkbenchProps } from './sections/code-workbench'
export {
  WorkbenchFrameContext,
  WorkbenchFrameProvider,
} from './components/frame-context'
export { WorkbenchNoSSR } from './components/no-ssr'
