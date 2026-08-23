'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ActivityOverview block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ActivityOverview(props: any) {
  const Comp = resolveSection('ActivityOverview' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
