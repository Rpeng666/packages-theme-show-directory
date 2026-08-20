'use client'

import * as React from 'react'
import { useMemo, useState } from 'react'
import {
  Breadcrumb as SemiBreadcrumb,
  Input as SemiInput,
  Select as SemiSelect,
} from '@douyinfe/semi-ui'
import { IconChevronRight, IconSearch } from '@douyinfe/semi-icons'
import type { PageHeaderProps } from '@template/ui'
import { ConsoleLink, useConsoleBridge } from '@template/ui'

import { Button } from '../components/button'
import { SmartIcon } from '../icons'

function buildQuery(current: string, name: string, value: string): string {
  const params = new URLSearchParams(current)
  if (value) params.set(name, value)
  else params.delete(name)
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

/**
 * Semi PageHeader — console page header (admin / settings / activity).
 *
 * Designed as a quiet, scannable header: a muted breadcrumb row, then a
 * title + description block with actions anchored to the right, then an
 * optional toolbar (URL tabs left, search + filters right). All navigation
 * flows through the console bridge (locale-aware router + search params), so
 * the section stays theme-package-local.
 */
export function PageHeader({
  title,
  description,
  crumbs,
  actions,
  tabs,
  search,
  filters,
  className = '',
}: PageHeaderProps) {
  const { routerPush, pathname, searchParams } = useConsoleBridge()
  const [keyword, setKeyword] = useState(search?.value || '')

  const activeTab = useMemo(() => {
    if (!tabs?.length) return undefined
    const direct = tabs.find((tab) => tab.is_active)
    if (direct) return direct
    return tabs.find(
      (tab) => tab.url && pathname && pathname.startsWith(tab.url),
    )
  }, [tabs, pathname])

  const submitSearch = () => {
    if (!search || !routerPush) return
    if (keyword === (search.value || '')) return
    routerPush(buildQuery(searchParams || '', search.name, keyword))
  }

  return (
    <div className={`page-header ${className}`.trim()}>
      {crumbs && crumbs.length > 0 ? (
        <SemiBreadcrumb
          compact
          separator={<IconChevronRight size="small" />}
          style={{ fontSize: 13 }}
        >
          {crumbs.map((crumb, idx) => (
            <SemiBreadcrumb.Item
              key={idx}
              href={crumb.url || ''}
              noLink={!crumb.url || !!crumb.is_active}
              active={!!crumb.is_active}
            >
              {crumb.icon && (
                <span style={{ display: 'inline-flex', marginRight: 4 }}>
                  <SmartIcon name={crumb.icon as string} size={14} />
                </span>
              )}
              {crumb.title}
            </SemiBreadcrumb.Item>
          ))}
        </SemiBreadcrumb>
      ) : null}

      <div className="page-header-main">
        <div style={{ minWidth: 0 }}>
          {title ? <h1 className="page-header-title">{title}</h1> : null}
          {description ? (
            <p className="page-header-description">{description}</p>
          ) : null}
        </div>
        {actions && actions.length > 0 ? (
          <div className="page-header-actions">
            {actions.map((action, idx) => {
              const icon =
                typeof action.icon === 'string' ? (
                  <SmartIcon name={action.icon} size={14} />
                ) : (
                  action.icon
                )
              const button = (
                <Button
                  key={idx}
                  variant={action.variant}
                  size={
                    action.size === 'lg'
                      ? 'lg'
                      : action.size === 'sm'
                        ? 'sm'
                        : 'default'
                  }
                  onClick={action.onClick}
                >
                  {icon}
                  {action.title}
                </Button>
              )
              return action.url ? (
                <ConsoleLink
                  key={idx}
                  href={action.url}
                  target={action.target || '_self'}
                >
                  {button}
                </ConsoleLink>
              ) : (
                button
              )
            })}
          </div>
        ) : null}
      </div>

      {tabs?.length || search || (filters && filters.length > 0) ? (
        <div className="page-header-toolbar">
          {tabs && tabs.length > 0 ? (
            <div className="page-header-tabs">
              {tabs.map((tab) => {
                const active =
                  activeTab === tab || activeTab?.name === tab.name
                return (
                  <button
                    key={tab.name || tab.title || String(tab)}
                    type="button"
                    className={`page-header-tab${active ? ' is-active' : ''}`}
                    onClick={() => tab.url && routerPush?.(tab.url)}
                  >
                    {tab.title}
                  </button>
                )
              })}
            </div>
          ) : null}
          <div className="page-header-toolbar-right">
            {search ? (
              <SemiInput
                value={keyword}
                onChange={setKeyword}
                onEnterPress={submitSearch}
                prefix={<IconSearch size="small" />}
                placeholder={search.placeholder || search.title}
                showClear
                onClear={() => setKeyword('')}
                style={{ width: 220 }}
              />
            ) : null}
            {filters?.map((filter) => (
              <SemiSelect
                key={filter.name}
                value={filter.value || ''}
                onChange={(value) =>
                  routerPush?.(
                    buildQuery(
                      searchParams || '',
                      filter.name,
                      (value as string) || '',
                    ),
                  )
                }
                optionList={(
                  filter.options?.filter(
                    (option) => option.value && option.value !== '',
                  ) || []
                ).map((option) => ({
                  label: option.label,
                  value: option.value as string,
                }))}
                placeholder={filter.title}
                size="small"
                style={{ width: 160 }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
