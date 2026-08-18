'use client'

import * as React from 'react'
import type { ReactNode } from 'react'
import type { Section, SectionLink, ToolHeroProps } from '@template/ui'
import { ToolHero } from '../sections/tool-hero'
import { ToolWorkspace } from '../sections/tool-workspace'
import { FeaturesStep } from '../sections/features-step'
import { FeaturesGrid } from '../sections/features-grid'
import { ToolsGrid } from '../sections/tools-grid'
import { Faq } from '../sections/faq'
import { Cta } from '../sections/cta'

export interface ToolWorkspaceData {
  title?: ReactNode
  badge?: ReactNode
  footer?: ReactNode
}

/**
 * ToolPage — the canonical tool-landing layout for the Semi theme, assembled
 * from registered sections:
 *
 *   ToolHero → ToolWorkspace(children) → FeaturesStep → FeaturesGrid →
 *   ToolsGrid → Faq → Cta
 *
 * Every visual is a @template/semi section; the app only supplies content data
 * and injects its locale-aware Link. This is the "page" counterpart of the
 * section registry — new tool pages (Resize, Compress, Extract, Preview,
 * Download) are one data object + one interactive child away.
 */
export interface ToolPageProps {
  id?: string
  hero: ToolHeroProps['section']
  workspace?: ToolWorkspaceData
  steps?: Section
  benefits?: Section
  related?: Section
  faq?: Section
  cta?: Section
  LinkComponent?: SectionLink
  children: ReactNode
}

export function ToolPage({
  id,
  hero,
  workspace,
  steps,
  benefits,
  related,
  faq,
  cta,
  LinkComponent,
  children,
}: ToolPageProps) {
  return (
    <div id={id} className="app-tool-page">
      <ToolHero section={hero} LinkComponent={LinkComponent} />
      <ToolWorkspace
        title={workspace?.title}
        badge={workspace?.badge}
        footer={workspace?.footer}
      >
        {children}
      </ToolWorkspace>
      {steps ? <FeaturesStep section={steps} /> : null}
      {benefits ? <FeaturesGrid section={benefits} /> : null}
      {related ? <ToolsGrid section={related} LinkComponent={LinkComponent} /> : null}
      {faq ? <Faq section={faq} /> : null}
      {cta ? <Cta section={cta} LinkComponent={LinkComponent} /> : null}
    </div>
  )
}
