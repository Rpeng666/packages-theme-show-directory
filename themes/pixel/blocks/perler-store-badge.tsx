'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerStoreBadge block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerStoreBadge(props: any) {
  const Comp = resolvePerler('PerlerStoreBadge' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
