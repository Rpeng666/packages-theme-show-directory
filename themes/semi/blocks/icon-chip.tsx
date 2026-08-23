'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi IconChip block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function IconChip(props: any) {
  const Comp = resolveSection('IconChip' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
