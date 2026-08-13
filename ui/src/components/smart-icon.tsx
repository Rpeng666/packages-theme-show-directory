import { ComponentType, Suspense } from 'react';

import { riIconWhitelist } from './smart-icon-ri';
import { lucideIconWhitelist } from './smart-icon-lucide';

const iconCache: { [key: string]: ComponentType<any> } = {};

// Function to automatically detect icon library
function detectIconLibrary(name: string): 'ri' | 'lucide' {
  if (name && name.startsWith('Ri')) {
    return 'ri';
  }

  return 'lucide';
}

export function SmartIcon({
  name,
  size = 24,
  className,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
  [key: string]: any;
}) {
  const library = detectIconLibrary(name);
  const cacheKey = `${library}-${name}`;

  if (!iconCache[cacheKey]) {
    if (library === 'ri') {
      // React Icons (Remix Icons). Every icon the app renders is statically
      // imported in smart-icon-ri.ts, so the bundler tree-shakes to just those
      // ~36 SVGs instead of the full 2MB library. Unknown names (config drift
      // or a newly added icon) fall back to RiQuestionLine. There is NO lazy
      // `import('react-icons/ri')` here on purpose: once a module is both
      // statically and dynamically imported, bundlers hoist the whole library
      // back into the eager graph, which is exactly the 1.9MB chunk this fixes.
      iconCache[cacheKey] =
        riIconWhitelist[name] ?? riIconWhitelist.RiQuestionLine;
    } else {
      // Lucide React (default). Same whitelist pattern as the Ri branch: the
      // icons are statically imported in smart-icon-lucide.ts, so the bundler
      // tree-shakes to just those instead of the full ~600-icon library. There
      // is intentionally NO lazy `import('lucide-react')` fallback — dynamic
      // + static imports of the same module hoist the whole library back into
      // the eager graph. Unknown names fall back to HelpCircle.
      iconCache[cacheKey] =
        lucideIconWhitelist[name] ?? lucideIconWhitelist.HelpCircle;
    }
  }

  const IconComponent = iconCache[cacheKey];

  return (
    <Suspense fallback={<div style={{ width: size, height: size }} />}>
      <IconComponent size={size} className={className} {...props} />
    </Suspense>
  );
}
