'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * pixel RelatedPosts block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function RelatedPosts(props: any) {
  const Comp = resolveSection('RelatedPosts' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
