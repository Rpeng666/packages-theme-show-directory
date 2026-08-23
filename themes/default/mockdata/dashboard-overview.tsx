import type { Section } from "@template/ui";

export const props = {
    stats: [
      { key: "revenue", label: "Revenue", value: "$12,480", icon: "dollar", tone: "green", hint: "+8% this week" },
      { key: "users", label: "Users", value: "3,214", icon: "users", tone: "blue", hint: "+120 today" },
      { key: "tasks", label: "AI tasks", value: "486", icon: "sparkles", tone: "purple", hint: "42 running" },
      { key: "storage", label: "Storage", value: "68%", icon: "database", tone: "gold", hint: "of 100 GB" },
    ],
    activities: {
      title: "Recent activity",
      viewAllUrl: "#",
      items: [
        { id: "a1", title: "New signup from Twitter", description: "via referral link", time: "5 min ago", icon: "user", badge: { label: "New", tone: "green" } },
        { id: "a2", title: "Payment received", description: "$49.00 · Pro plan", time: "1 hour ago", icon: "dollar", badge: { label: "Paid", tone: "blue" } },
        { id: "a3", title: "Export completed", description: "report.pdf", time: "3 hours ago", icon: "file", badge: { label: "Done", tone: "gold" } },
      ],
    },
    quickActions: {
      title: "Quick actions",
      items: [
        { key: "q1", title: "New project", description: "Start from scratch", icon: "plus", url: "#" },
        { key: "q2", title: "Invite team", description: "Add members", icon: "users", url: "#" },
        { key: "q3", title: "View reports", description: "Last 30 days", icon: "chart", url: "#" },
      ],
    },
  };
