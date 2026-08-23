'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi PreviewTips block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PreviewTips(props: any) {
  const Comp = resolveComponent('PreviewTips' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
