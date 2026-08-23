'use client';

import * as React from 'react';
import { resolveCleaner } from '@template/ui';

/**
 * default CleanerOutput block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CleanerOutput(props: any) {
  const Comp = resolveCleaner('CleanerOutput' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
