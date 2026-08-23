'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default UploadZone block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function UploadZone(props: any) {
  const Comp = resolveComponent('UploadZone' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
