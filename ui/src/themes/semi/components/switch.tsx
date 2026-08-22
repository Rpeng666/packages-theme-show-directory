'use client'

import * as React from 'react'
import { Switch as HeroSwitch } from '@heroui/react'
import type { SwitchProps } from '@template/ui'

/** Semi Switch — HeroUI Switch with the shared checked/onCheckedChange vocabulary. */
export function Switch({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className = '',
  ...props
}: SwitchProps) {
  return (
    <HeroSwitch
      {...(props as any)}
      isSelected={checked}
      defaultSelected={defaultChecked}
      onValueChange={onCheckedChange}
      isDisabled={disabled}
      className={className}
    >
      {label}
    </HeroSwitch>
  )
}
