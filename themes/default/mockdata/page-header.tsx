import type { Section } from "@template/ui";

export const props = {
    title: "Workspace settings",
    description: "Manage your team, billing, and preferences.",
    crumbs: [
      { title: "Home", url: "#" },
      { title: "Settings", url: "#" },
      { title: "Workspace" },
    ],
    actions: [
      { title: "Invite", url: "#", variant: "primary" },
      { title: "Export", url: "#" },
    ],
    tabs: [
      { title: "General", url: "#" },
      { title: "Members", url: "#" },
      { title: "Billing", url: "#" },
    ],
    search: { name: "q", placeholder: "Search settings…", value: "" },
    filters: [
      { name: "status", title: "Status", options: [{ value: "active", label: "Active" }, { value: "paused", label: "Paused" }] },
    ],
  };
