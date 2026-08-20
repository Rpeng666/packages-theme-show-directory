'use client'

import * as React from 'react'
import { Switch as SemiSwitch } from '@douyinfe/semi-ui'
import type { SwitchProps } from '@template/ui'

export function Switch({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  tone: _tone,
  value: _value,
  id,
  className = '',
}: SwitchProps) {
  return (
    <SemiSwitch
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(next: boolean) => onCheckedChange?.(next)}
      disabled={disabled}
      id={id}
      className={className}
      aria-label={typeof label === 'string' ? label : undefined}
    />
  )
}
