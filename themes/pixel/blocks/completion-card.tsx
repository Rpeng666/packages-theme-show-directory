'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel CompletionCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CompletionCard(props: any) {
  const Comp = resolvePerler('CompletionCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
