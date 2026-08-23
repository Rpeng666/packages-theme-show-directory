'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * pixel BlogToolCta block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function BlogToolCta(props: any) {
  const Comp = resolveSection('BlogToolCta' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
