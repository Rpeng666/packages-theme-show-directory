'use client'

import * as React from "react"

import { PixelCard } from "@pxlkit/ui-kit"
import { stripTemplateTokens } from "../../lib/strip-tokens"
import type { CardProps } from "../../contracts/card"

/**
 * Pixel-theme card — adapts the flat CardProps contract onto PixelCard.
 * `children` renders into PixelCard's body; composite sub-components passed as
 * children (default-flavored) render inside the body with degraded visuals but
 * don't break.
 */
function Card({
  className,
  title,
  description,
  icon,
  footer,
  media,
  badge,
  href,
  target,
  interactive,
  onClick,
  padding,
  children,
  ...props
}: CardProps) {
  return (
    <PixelCard
      title={typeof title === 'string' ? title : undefined}
      icon={icon}
      description={typeof description === 'string' ? description : undefined}
      footer={footer}
      media={media}
      badge={badge}
      href={href}
      target={target}
      interactive={interactive}
      onClick={onClick}
      padding={padding}
      className={stripTemplateTokens(className)}
      {...props}
    >
      {children}
    </PixelCard>
  )
}

export { Card }
