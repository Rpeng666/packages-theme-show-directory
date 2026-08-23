'use client';

import { resolveSection } from '@template/ui';
import type { ShowcasesProps } from '@template/ui';

/** Default showcases block — forwarder to the registered Showcases section. */
export function Showcases(props: ShowcasesProps) {
  const Comp = resolveSection('Showcases');
  return <Comp {...props} />;
}