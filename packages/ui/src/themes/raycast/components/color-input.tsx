'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { SketchPicker, type ColorChangeHandler } from 'react-color'
import { cn } from '../../../lib/utils'
import { WorkbenchInput, WorkbenchInputSlot } from './input'
import styles from './color-input.module.css'

/**
 * WorkbenchColorInput — 颜色输入 + 取色弹窗（react-color SketchPicker）。
 *
 * 复刻 app icon-generator 的 ColorInput：文本输入框展示色值 + 左侧色块，
 * 点击弹出 SketchPicker（含最近使用色）。数据驱动，无业务耦合。
 *
 *   <WorkbenchColorInput
 *     value={settings.iconColor}
 *     name="iconColor"
 *     recentColors={recentColors}
 *     onChange={onColorChange}
 *     disabled={...}
 *   />
 */
export interface WorkbenchColorInputProps {
  value: string
  name: string
  recentColors: string[]
  onChange: ColorChangeHandler
  disabled?: boolean
  className?: string
}

export function WorkbenchColorInput({
  value,
  name,
  recentColors,
  onChange,
  disabled = false,
  className,
}: WorkbenchColorInputProps) {
  return (
    <Popover.Root>
      <div className={cn(styles.inputWrapper, className)}>
        <Popover.Trigger className={styles.popoverTrigger}>
          <WorkbenchInput
            name={name}
            type="text"
            value={value}
            disabled={disabled}
            readOnly
            className="w-[120px]"
            size="large"
          >
            <WorkbenchInputSlot side="left">
              <div className={styles.colorExample} style={{ backgroundColor: value }} />
            </WorkbenchInputSlot>
          </WorkbenchInput>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content align="end" sideOffset={4} className="z-10">
            <div className={styles.colorInput}>
              <SketchPicker onChange={onChange} color={value} disableAlpha={true} presetColors={recentColors} />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  )
}
