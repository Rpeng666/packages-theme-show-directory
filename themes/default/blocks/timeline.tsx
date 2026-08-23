'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Timeline block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Timeline(props: any) {
  const Comp = resolveComponent('Timeline' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
