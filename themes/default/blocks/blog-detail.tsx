'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default BlogDetail block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function BlogDetail(props: any) {
  const Comp = resolveSection('BlogDetail' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
