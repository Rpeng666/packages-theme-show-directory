'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default Features block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Features(props: any) {
  const Comp = resolveSection('Features' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
