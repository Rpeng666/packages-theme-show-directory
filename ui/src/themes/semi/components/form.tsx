'use client'

import * as React from 'react'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from '@template/ui'

export function Select({
  label, options = [], value, defaultValue, onChange, placeholder, disabled, size = 'md', className = '', ...props
}: SelectProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label ? <label style={{ fontSize: 13, fontWeight: 550, color: 'var(--semi-color-text-1)' }}>{label}</label> : null}
      <select
        {...(props as object)}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          height: size === 'sm' ? 30 : size === 'lg' ? 42 : 36,
          padding: '0 10px', borderRadius: 10,
          border: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-1)', color: 'var(--semi-color-text-0)',
          fontSize: 14, outline: 'none',
        }}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export function Toggle({ value, pressed, children, onClick, className = '', ...props }: ToggleProps) {
  return (
    <button type="button" {...(props as object)} aria-pressed={pressed} onClick={onClick} className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8,
        border: '1px solid var(--semi-color-border)', cursor: 'pointer',
        background: pressed ? 'var(--app-brand-grad)' : 'var(--semi-color-bg-1)',
        color: pressed ? '#fff' : 'var(--semi-color-text-1)', fontSize: 13, fontWeight: 600,
      }}>
      {children}
    </button>
  )
}

export function ToggleGroup({
  type = 'single', value, defaultValue, onChange, size = 'md', variant = 'soft', className = '', ...props
}: ToggleGroupProps) {
  const items = (props as { items?: Array<{ value: string; label: string }> }).items ?? []
  const multi = type === 'multiple'
  const selected = value ?? defaultValue ?? (multi ? [] : '')
  const isActive = (v: string) => multi ? Array.isArray(selected) && (selected as string[]).includes(v) : selected === v
  const toggle = (v: string) => {
    if (multi) {
      const cur = Array.isArray(selected) ? selected : []
      const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]
      onChange?.(next)
    } else {
      onChange?.(v)
    }
  }
  return (
    <div className={className} style={{ display: 'inline-flex', gap: 4, padding: 3, borderRadius: 10, background: 'var(--semi-color-fill-0)' }}>
      {items.map((it) => (
        <button key={it.value} type="button" onClick={() => toggle(it.value)} aria-pressed={isActive(it.value)}
          style={{ padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: isActive(it.value) ? 'var(--semi-color-bg-1)' : 'transparent',
            color: isActive(it.value) ? 'var(--semi-color-text-0)' : 'var(--semi-color-text-2)',
            boxShadow: isActive(it.value) ? '0 1px 4px rgba(0,0,0,0.2)' : 'none' }}>
          {it.label}
        </button>
      ))}
    </div>
  )
}

export function BareTextarea(props: BareTextareaProps) {
  return <textarea {...(props as any)} />
}
