'use client';

import { resolveSection } from '@template/ui';
import type { FeaturesProps } from '@template/ui';

/**
 * Default features block — forwarder. The visual grid lives in packages/ui
 * (registered Features section); this block resolves it through the registry
 * and injects the section data.
 */
export function Features({ section, className }: FeaturesProps) {
  const Comp = resolveSection('Features');
  return <Comp section={section} className={className} />;
}