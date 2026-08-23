'use client';

import { resolveSection } from '@template/ui';
import type { FaqProps } from '@template/ui';

/** Default faq block — forwarder to the registered Faq section. */
export function Faq(props: FaqProps) {
  const Comp = resolveSection('Faq');
  return <Comp {...props} />;
}