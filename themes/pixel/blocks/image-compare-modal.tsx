'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ImageCompareModal block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ImageCompareModal(props: any) {
  const Comp = resolvePerler('ImageCompareModal' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
