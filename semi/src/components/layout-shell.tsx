'use client'

import * as React from 'react'
import { Layout as SemiLayout } from '@douyinfe/semi-ui'
import type { LayoutShellProps } from '@template/ui'

const { Header, Content, Footer, Sider } = SemiLayout

/**
 * Semi LayoutShell — renders Semi Layout with an optional Sider rail plus an
 * inner Layout stacking Header / Content / Footer. Sider must be a direct
 * child of the outer Layout for Semi's sider-hook (flex negotiation) to work.
 */
export function LayoutShell({
  sider,
  header,
  children,
  footer,
  siderWidth,
  className = '',
  style,
}: LayoutShellProps) {
  return (
    <SemiLayout hasSider={Boolean(sider)} className={className} style={style}>
      {sider ? (
        <Sider style={siderWidth != null ? { width: siderWidth, flexBasis: siderWidth } : undefined}>
          {sider}
        </Sider>
      ) : null}
      <SemiLayout>
        {header ? <Header>{header}</Header> : null}
        <Content>{children}</Content>
        {footer ? <Footer>{footer}</Footer> : null}
      </SemiLayout>
    </SemiLayout>
  )
}
