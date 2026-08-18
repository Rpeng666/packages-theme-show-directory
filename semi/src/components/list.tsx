'use client'

import * as React from 'react'
import { List as SemiList } from '@douyinfe/semi-ui'
import type { ListProps } from '@template/ui'

/**
 * Semi List — dataSource + renderItem contract over Semi List. grid →
 * Semi List's grid config ({column, gutter}).
 */
export function List<T>({
  dataSource = [],
  renderItem,
  header,
  footer,
  size = 'default',
  layout,
  grid,
  loading,
  emptyContent,
  className = '',
}: ListProps<T>) {
  return (
    <SemiList<T>
      dataSource={dataSource}
      renderItem={renderItem ? (item, ind) => renderItem(item, ind) : undefined}
      header={header}
      footer={footer}
      size={size}
      layout={layout}
      grid={grid as never}
      loading={loading}
      emptyContent={emptyContent}
      className={className}
    />
  )
}
