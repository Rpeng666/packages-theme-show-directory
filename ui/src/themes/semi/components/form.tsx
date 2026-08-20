'use client'

import * as React from 'react'
import { Select as SemiSelect, Button as SemiButton } from '@douyinfe/semi-ui'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from '@template/ui'

/** Semi Select size vocabulary — maps the shared sm/md/lg onto Semi's. */
const SIZE_MAP: Record<string, 'small' | 'default' | 'large'> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
}

/**
 * Semi form controls: Select / Toggle (+ group) / BareTextarea backing the
 * shared contract keys that the schema-driven Form/Table stack resolve.
 */
export function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  size = 'md',
  tone: _tone,
  className = '',
}: SelectProps) {
  return (
    <div style={{ minWidth: 120 }}>
      {label ? (
        <label style={{ display: 'block', fontSize: 13, color: 'var(--semi-color-text-2)', marginBottom: 6 }}>
          {label}
        </label>
      ) : null}
      <SemiSelect
        value={value}
        defaultValue={defaultValue}
        onChange={(v: string | string[] | undefined) => {
          if (typeof v === 'string') onChange?.(v)
        }}
        placeholder={placeholder}
        disabled={disabled}
        size={SIZE_MAP[size] ?? 'default'}
        className={className}
        style={{ width: '100%' }}
        optionList={options.map((o) => ({ label: o.label, value: o.value }))}
      />
    </div>
  )
}

export function Toggle({ value, pressed, children, onClick, className = '', ...props }: ToggleProps) {
  return (
    <SemiButton
      theme={pressed ? 'solid' : 'light'}
      size="small"
      onClick={onClick}
      className={className}
      aria-pressed={pressed}
      data-value={value}
      {...(props as object)}
    >
      {children}
    </SemiButton>
  )
}

export function ToggleGroup({
  type = 'single',
  value,
  defaultValue,
  onChange,
  size = 'md',
  variant = 'solid',
  className = '',
  children,
  ...props
}: ToggleGroupProps) {
  const isMultiple = type === 'multiple'
  const current = value as string | string[] | undefined
  const defaultVal = defaultValue as string | string[] | undefined

  return (
    <div
      role="group"
      aria-label={props['aria-label']}
      className={className}
      style={{ display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<ToggleProps>(child)) return child
        const childValue = child.props.value
        const pressed = isMultiple
          ? Array.isArray(current) && current.includes(childValue)
          : current === childValue
        const defaultPressed = isMultiple
          ? Array.isArray(defaultVal) && defaultVal.includes(childValue)
          : defaultVal === childValue
        const active = value !== undefined ? pressed : defaultPressed
        return React.cloneElement(child, {
          pressed: active,
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            child.props.onClick?.(e)
            if (isMultiple) {
              const next = Array.isArray(current) ? [...current] : []
              const i = next.indexOf(childValue)
              if (i >= 0) next.splice(i, 1)
              else next.push(childValue)
              onChange?.(next)
            } else {
              onChange?.(childValue)
            }
          },
        })
      })}
    </div>
  )
}

export function BareTextarea(props: BareTextareaProps) {
  return <textarea {...props} />
}
