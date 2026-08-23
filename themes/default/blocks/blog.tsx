'use client';

import { resolveSection } from '@template/ui';
import type { BlogProps } from '@template/ui';

/** Default blog block — forwarder to the registered Blog section. */
export function Blog(props: BlogProps) {
  const Comp = resolveSection('Blog');
  return <Comp {...props} />;
}