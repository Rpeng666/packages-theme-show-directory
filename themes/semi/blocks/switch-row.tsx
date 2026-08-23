'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SwitchRow block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SwitchRow(props: any) {
  const Comp = resolveSection('SwitchRow' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
