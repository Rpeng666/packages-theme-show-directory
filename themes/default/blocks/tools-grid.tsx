'use client';

import { resolveSection } from '@template/ui';
import type { ToolsGridProps } from '@template/ui';

/** Default tools-grid block — forwarder to the registered ToolsGrid section. */
export function ToolsGrid(props: ToolsGridProps) {
  const Comp = resolveSection('ToolsGrid');
  return <Comp {...props} />;
}