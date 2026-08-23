'use client';

import { resolveSection } from '@template/ui';
import type { TestimonialsProps } from '@template/ui';

/** Default testimonials block — forwarder to the registered Testimonials section. */
export function Testimonials(props: TestimonialsProps) {
  const Comp = resolveSection('Testimonials');
  return <Comp {...props} />;
}