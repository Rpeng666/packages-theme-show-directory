'use client';

import {
  ComponentType,
  createContext,
  ReactNode,
  useContext,
} from 'react';

/**
 * Console stack bridge - the injection seam between the registry package and
 * the host app's i18n navigation.
 *
 * The console components (Form/FormCard/Table/TableCard/PanelCard/
 * ConsoleLayout/Tabs) must not depend on the app's locale-aware router.
 * The host app wraps them with a provider that injects its own Link,
 * router.push and pathname; without a bridge the package falls back to a
 * plain <a>, next/navigation's router, and next/navigation's pathname.
 */
export interface ConsoleBridgeValue {
  /** Locale-aware Link component from the host app (e.g. next-intl). */
  LinkComponent?: ComponentType<{
    href: string;
    target?: string;
    className?: string;
    children?: ReactNode;
  }>;
  /** Locale-aware navigation (prefixes the active locale). */
  routerPush?: (url: string) => void;
  /** Locale-stripped pathname (matches NavItem.url semantics). */
  pathname?: string;
  /** Raw query string (e.g. "?page=2&email=x" or "") for URL-driven
   *  search/filter controls. The host app supplies it from next/navigation's
   *  useSearchParams; without it the package falls back to an empty query. */
  searchParams?: string;
}

const ConsoleBridgeContext = createContext<ConsoleBridgeValue>({});

export function ConsoleBridgeProvider({
  value,
  children,
}: {
  value: ConsoleBridgeValue;
  children: ReactNode;
}) {
  return (
    <ConsoleBridgeContext.Provider value={value}>
      {children}
    </ConsoleBridgeContext.Provider>
  );
}

export function useConsoleBridge() {
  return useContext(ConsoleBridgeContext);
}

/** Renders a link through the bridged LinkComponent, falling back to <a>. */
export function ConsoleLink({
  href,
  target,
  className,
  children,
}: {
  href: string;
  target?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { LinkComponent } = useConsoleBridge();
  if (LinkComponent) {
    const BridgedLink = LinkComponent as ComponentType<any>;
    return (
      <BridgedLink href={href} target={target} className={className}>
        {children}
      </BridgedLink>
    );
  }
  return (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  );
}
