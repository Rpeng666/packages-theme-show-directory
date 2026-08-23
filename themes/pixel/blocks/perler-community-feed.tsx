'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerCommunityFeed block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerCommunityFeed(props: any) {
  const Comp = resolvePerler('PerlerCommunityFeed' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
