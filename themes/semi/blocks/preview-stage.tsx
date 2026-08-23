'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi PreviewStage block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PreviewStage(props: any) {
  const Comp = resolveComponent('PreviewStage' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
