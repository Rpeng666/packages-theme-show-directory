'use client';

import { resolveSection } from '@template/ui';
import type { BlogDetailProps } from '@template/ui';

/** Default blog-detail block — forwarder to the registered BlogDetail section. */
export function BlogDetail(props: BlogDetailProps) {
  const Comp = resolveSection('BlogDetail');
  return <Comp {...props} />;
}