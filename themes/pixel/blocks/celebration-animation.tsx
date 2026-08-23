'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel CelebrationAnimation block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CelebrationAnimation(props: any) {
  const Comp = resolvePerler('CelebrationAnimation' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
