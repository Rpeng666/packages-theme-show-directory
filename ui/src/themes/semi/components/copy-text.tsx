'use client'

import * as React from 'react'
import { Typography } from '@douyinfe/semi-ui'
import type { CopyTextProps } from '@template/ui'

const { Text } = Typography

/**
 * Semi CopyText — Typography.Text with the built-in copyable affordance.
 * Copies the rendered text content when no explicit `text` is given.
 */
export function CopyText({
  children,
  text,
  copyable = true,
  type,
  strong,
  code,
  className = '',
}: CopyTextProps) {
  return (
    <Text
      copyable={copyable ? { content: text, copyTip: 'Click to copy' } : false}
      type={type as never}
      strong={strong}
      code={code}
      className={className}
    >
      {children}
    </Text>
  )
}
