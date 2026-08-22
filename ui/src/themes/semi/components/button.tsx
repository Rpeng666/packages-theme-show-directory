'use client'

import * as React from 'react'
import { Button as HeroButton, Spinner } from '@heroui/react'
import type { ButtonProps } from '@template/ui'

/**
 * Semi Button — maps the shared `variant`/`size`/`loading` vocabulary onto
 * HeroUI v3's Button (react-aria based: `onPress` not `onClick`). `tone` is
 * ignored; `iconLeft`/`iconRight` become start/end content.
 */
export function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  tone: _tone,
  iconLeft,
  iconRight,
  fullWidth,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const heroVariant =
    variant === 'destructive' ? 'danger'
    : variant === 'outline' ? 'outline'
    : variant === 'secondary' ? 'secondary'
    : variant === 'ghost' || variant === 'link' ? 'ghost'
    : 'primary'

  const iconOnly = size === 'icon' || size === 'icon-sm'
  const heroSize = size === 'lg' ? 'lg' : size === 'sm' || iconOnly ? 'sm' : 'md'

  const childAsChild =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement<{ className?: string }>).props.className
      : undefined

  const content = (
    <>
      {loading ? <Spinner size="sm" color="current" /> : iconLeft}
      {children}
      {iconRight}
    </>
  )

  return (
    <HeroButton
      variant={heroVariant}
      size={heroSize}
      fullWidth={fullWidth}
      isIconOnly={iconOnly}
      isDisabled={props.disabled || loading}
      slot={childAsChild}
      type={props.type}
      onPress={(e) => {
        if (props.onClick) {
          props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
        }
      }}
      aria-label={props['aria-label']}
      className={className}
    >
      {content}
    </HeroButton>
  )
}
