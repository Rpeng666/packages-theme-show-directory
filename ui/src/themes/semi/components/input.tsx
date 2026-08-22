'use client'

import * as React from 'react'
import { Input as SemiInput, Spin } from '@douyinfe/semi-ui'
import type { InputProps } from '@template/ui'

/**
 * Semi Input — maps the shared InputProps onto Semi Input. `label`, `prefix`/
 * `suffix` slots and `showCount`/`clearable` map directly; size maps to
 * Semi's small/default/large.
 */
const SIZE = { sm: 'small', md: 'default', lg: 'large' } as const

export function Input({
  label,
  hint,
  error,
  size = 'md',
  prefix,
  suffix,
  icon,
  clearable,
  onClear,
  showCount,
  loading,
  tone: _tone,
  onChange,
  className = '',
  ...props
}: InputProps) {
  // Semi's onChange is (value, e); the shared contract is (e) — forward the
  // native event so `e.target.value` works no matter which theme is active.
  const adaptedOnChange = onChange
    ? (_value: string, e: React.ChangeEvent<HTMLInputElement>) => onChange(e)
    : undefined

  // The shared contract uses the native `type` attribute (text/password/
  // email/…). Semi has no `type` prop — it uses `mode` for the password
  // variant (with the reveal toggle), so translate `type="password"` here and
  // strip it from the passthrough props.
  const { type: _nativeType, ...restProps } = (props as any) || {}
  const mode =
    _nativeType === 'password' ? 'password' : undefined

  const input = (
    <SemiInput
      {...(restProps as any)}
      mode={mode}
      size={SIZE[size as keyof typeof SIZE] ?? 'default'}
      prefix={prefix ?? icon}
      suffix={loading ? <Spin size="small" /> : suffix}
      showClear={clearable}
      onClear={onClear}
      onChange={adaptedOnChange}
      prefixPosition="left"
      className={className}
      showCount={showCount === undefined ? false : !!showCount}
    />
  )

  if (!label && !hint && !error) return input

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{label}</label>
      )}
      {input}
      {error && (
        <span style={{ fontSize: 12, color: 'var(--semi-color-danger)' }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: 12, color: 'var(--semi-color-text-3)' }}>{hint}</span>
      )}
    </div>
  )
}