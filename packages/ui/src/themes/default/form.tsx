'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from '../../contracts/form'

/* ── Select ──────────────────────────────────────────────────────────── */

const selectSize: Record<string, string> = {
  sm: 'h-8 text-xs px-3',
  md: 'h-9 text-sm px-3',
  lg: 'h-11 text-sm px-4',
}

/** Default (shadcn) select — native <select> for a11y + zero JS. */
function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  size = 'md',
  tone: _tone,
  className,
  ...props
}: SelectProps) {
  const generatedId = React.useId()
  const id = `select-${generatedId}`
  const hasValue = value !== undefined ? value !== '' : undefined

  return (
    <div className="w-full space-y-1.5">
      {label != null && (
        <label htmlFor={id} className="text-sm leading-none font-medium select-none">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-input bg-background text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          selectSize[size],
          className,
        )}
        {...props}
      >
        {placeholder != null && (
          <option value="" disabled={hasValue !== undefined}>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

/* ── Toggle / ToggleGroup ────────────────────────────────────────────── */

const toggleSize: Record<string, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-8 px-3 text-sm',
  lg: 'h-10 px-4 text-sm',
}

/** Default (shadcn) toggle — segmented button. */
function Toggle({ value, pressed, className, children, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent font-medium whitespace-nowrap transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50',
        pressed
          ? 'bg-primary text-primary-foreground'
          : 'border-input bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/** Default (shadcn) toggle group — renders children inside a segmented container. */
function ToggleGroup({
  type = 'single',
  value,
  defaultValue,
  onChange,
  size = 'md',
  variant = 'outline',
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const resolvedDefault = defaultValue !== undefined ? defaultValue : type === 'multiple' ? [] : ''
  const [internal, setInternal] = React.useState<string | string[]>(resolvedDefault)
  const controlled = value !== undefined

  const current = controlled ? value : internal
  const isPressed = (val: string) =>
    type === 'multiple'
      ? (current as string[]).includes(val)
      : (current as string) === val

  const toggleValue = (val: string) => {
    if (type === 'multiple') {
      const next = (current as string[]).includes(val)
        ? (current as string[]).filter((x) => x !== val)
        : [...(current as string[]), val]
      if (!controlled) setInternal(next)
      onChange?.(next)
    } else {
      const next = (current as string) === val ? '' : val
      if (!controlled) setInternal(next)
      onChange?.(next)
    }
  }

  const childrenWithToggle = React.Children.map(children, (child) => {
    if (!React.isValidElement<ToggleProps>(child)) return child
    const childValue = child.props.value
    return React.cloneElement(child, {
      pressed: isPressed(childValue),
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(e)
        toggleValue(childValue)
      },
    })
  })

  return (
    <div
      role={type === 'single' ? 'radiogroup' : 'group'}
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    >
      {childrenWithToggle}
    </div>
  )
}

/* ── BareTextarea ────────────────────────────────────────────────────── */

/** Default (shadcn) bare textarea — unstyled passthrough. */
function BareTextarea({ className, ...props }: BareTextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full resize-none bg-transparent outline-none placeholder:text-muted-foreground/60',
        className,
      )}
      {...props}
    />
  )
}

export { Select, Toggle, ToggleGroup, BareTextarea }
