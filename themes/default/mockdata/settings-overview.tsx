import type { Section } from "@template/ui";

export const props = {
    title: "Settings",
    description: "Everything about your account in one place.",
    items: [
      { key: "profile", title: "Profile", description: "Name, avatar, contact", icon: "user", url: "#" },
      { key: "billing", title: "Billing", description: "Plans, invoices, payment", icon: "card", badge: "Pro", tone: "blue", url: "#" },
      { key: "team", title: "Team", description: "Members and roles", icon: "users", url: "#" },
      { key: "api", title: "API keys", description: "Manage access tokens", icon: "key", url: "#" },
      { key: "notifications", title: "Notifications", description: "Email and push", icon: "bell", url: "#" },
    ],
  };
