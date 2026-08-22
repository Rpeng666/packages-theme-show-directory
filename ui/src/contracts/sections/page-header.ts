import type { ReactNode } from 'react'
import type { Crumb, Tab, Search, Filter, Button } from '../features/common'

/**
 * PageHeader - console page header (admin / settings / activity / workbench).
 * Registered as a section so each theme renders its own page-header chrome,
 * while the data model reuses the console contracts (Crumb / Tab / Search /
 * Filter / Button) so app pages pass the same objects they already build.
 *
 * Layout (designed):
 *   - breadcrumb row   (crumbs, muted, small)
 *   - title + description (left) / action buttons (right)
 *   - toolbar row      (URL tabs left, search + filters right)
 */
export interface PageHeaderProps {
  /** Page title */
  title?: ReactNode
  /** One-line description under the title */
  description?: ReactNode
  /** Breadcrumb navigation */
  crumbs?: Crumb[]
  /** Action buttons on the right of the title */
  actions?: Button[]
  /** URL-navigating tabs */
  tabs?: Tab[]
  /** Keyword search box (writes URL query params) */
  search?: Search
  /** Filter dropdowns (write URL query params) */
  filters?: Filter[]
  className?: string
}
