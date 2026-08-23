'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ProgressBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ProgressBar(props: any) {
  const Comp = resolvePerler('ProgressBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
