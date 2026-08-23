'use client';

import * as React from 'react';
import { resolveDither } from '@template/ui';

/**
 * pixel DitherPreview block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DitherPreview(props: any) {
  const Comp = resolveDither('DitherPreview' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
