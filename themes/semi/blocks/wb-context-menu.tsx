'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbContextMenu block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbContextMenu(props: any) {
  const Comp = resolveSection('WbContextMenu' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
