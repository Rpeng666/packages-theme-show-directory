import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  brand: "Studio",
  nav: [
    { itemKey: "dashboard", text: "Dashboard" },
    { itemKey: "tools", text: "Tools" },
    { itemKey: "settings", text: "Settings" },
  ],
  navFooter: <span className="text-xs text-muted-foreground">v1.0.0</span>,
  footer: <span className="text-xs text-muted-foreground">© 2024 Studio</span>,
  topbar: <span className="text-xs font-medium">Workspace</span>,
  title: "Console",
  railWidth: 264,
  defaultCollapsed: false,
  onCollapseChange: () => {},
  selectedKey: "dashboard",
  onNavigate: () => {},
  contentScroll: true,
  children: (
    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
      Console content
    </div>
  ),
};
