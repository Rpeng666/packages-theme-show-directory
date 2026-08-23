'use client'

import hotkeys, { KeyHandler } from 'hotkeys-js'
import { useEffect } from 'react'

/**
 * useWorkbenchHotkeys — ray.so 工作台快捷键 hook（hotkeys-js）。
 * 复刻 app utils/useHotkeys：编辑焦点/选项元素忽略快捷键，Alt+Shift+F
 * （格式化）除外。主题侧提供，控件/弹窗可直接复用。
 */
hotkeys.filter = (event: KeyboardEvent) => {
  const target = (event.target || event.srcElement) as HTMLElement

  const { tagName } = target
  let flag = true

  // allow formatting shortcut even if the focus is on the textarea
  if (event.keyCode === 70 && event.shiftKey && event.altKey) {
    return true
  }

  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>
  if (
    target.isContentEditable ||
    target.getAttribute('role') === 'option' ||
    ((tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') &&
      'readOnly' in target &&
      !target.readOnly)
  ) {
    flag = false
  }
  return flag
}

export function useWorkbenchHotkeys(key: string, handler: KeyHandler) {
  useEffect(() => {
    hotkeys(key, handler)

    return () => {
      hotkeys.unbind(key, handler)
    }
  }, [key, handler])
}
