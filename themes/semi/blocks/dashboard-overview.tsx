'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi DashboardOverview block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DashboardOverview(props: any) {
  const Comp = resolveSection('DashboardOverview' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
