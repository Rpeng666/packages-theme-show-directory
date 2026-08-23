'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Tag block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Tag(props: any) {
  const Comp = resolveComponent('Tag' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
