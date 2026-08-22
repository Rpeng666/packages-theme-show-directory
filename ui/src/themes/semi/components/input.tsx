'use client'

import * as React from 'react'
import { Input as HeroInput } from '@heroui/react'
import type { InputProps } from '@template/ui'

/**
 * Semi Input — a field shell (label/hint/error) around HeroUI's Input.
 * `prefix`/`suffix` slots map to Hero's start/end content; `clearable` maps
 * to isClearable; error state maps to isInvalid.
 */
export function Input({
  label,
  hint,
  error,
  size = 'md',
  tone: _tone,
  prefix,
  suffix,
  icon,
  clearable,
  onClear,
  showCount: _showCount,
  loading: _loading,
  className = '',
  ...props
}: InputProps) {
  const heroSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'
  const shell = (child: React.ReactNode) => (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label ? (
        <label style={{ fontSize: 13, fontWeight: 550, color: 'var(--semi-color-text-1)' }}>{label}</label>
      ) : null}
      {child}
      {error ? (
        <span style={{ fontSize: 12.5, color: 'rgba(var(--semi-red-5), 1)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 12.5, color: 'var(--semi-color-text-3)' }}>{hint}</span>
      ) : null}
    </div>
  )

  const input = (
    <HeroInput
      {...(props as any)}
      size={heroSize as never}
      isInvalid={Boolean(error)}
      isClearable={clearable}
      startContent={prefix ?? icon}
      endContent={suffix}
      onClear={onClear}
      classNames={{
        inputWrapper: 'bg-[var(--semi-color-bg-1)] border-[var(--semi-color-border)]',
      }}
    />
  )

  return shell(input)
}
