'use client';

import { resolveSection } from '@template/ui';
import type { CtaProps } from '@template/ui';

/** Default cta block — forwarder to the registered Cta section. */
export function Cta(props: CtaProps) {
  const Comp = resolveSection('Cta');
  return <Comp {...props} />;
}