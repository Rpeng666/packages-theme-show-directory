import type { Section } from "@template/ui";

export const props = {
    eyebrow: "Chats",
    title: "Recent conversations",
    description: "Pick up where you left off.",
    stats: [
      { key: "total", label: "Conversations", value: "128", icon: "message", tone: "brand" },
      { key: "today", label: "Today", value: "12", icon: "zap", tone: "success" },
      { key: "tokens", label: "Tokens", value: "2.4M", icon: "sparkles", tone: "warning" },
    ],
    newChatLabel: "New chat",
    newChatHref: "#",
    searchPlaceholder: "Search conversations…",
    groups: [
      {
        key: "today",
        label: "Today",
        items: [
          { id: "c1", title: "Summarize a research paper", model: "gpt-4o-mini", timeLabel: "10 min ago" },
          { id: "c2", title: "Plan a product launch", model: "claude-3.5", timeLabel: "2 hours ago" },
        ],
      },
      {
        key: "yesterday",
        label: "Yesterday",
        items: [
          { id: "c3", title: "Refactor the auth flow", model: "gpt-4o", timeLabel: "Yesterday" },
          { id: "c4", title: "Write release notes", model: "gpt-4o-mini", timeLabel: "Yesterday" },
        ],
      },
    ],
    signedIn: true,
    openChatLabel: "Open conversation",
    onOpenChat: () => {},
    perPageValue: 20,
    perPageOptions: [10, 20, 50],
  };
