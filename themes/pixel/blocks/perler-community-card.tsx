'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerCommunityCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerCommunityCard(props: any) {
  const Comp = resolvePerler('PerlerCommunityCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
