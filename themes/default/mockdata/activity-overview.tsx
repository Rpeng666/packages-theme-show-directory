import type { Section } from "@template/ui";

export const activityOverviewProps = {
  welcomeTitle: "Welcome back, Ada",
  welcomeDescription: "Here's what's been happening across your workspace today.",
  stats: [
    { key: "tasks", label: "AI tasks", value: "128", icon: "sparkles", tone: "blue" as const, hint: "+12 today" },
    { key: "images", label: "Images", value: "342", icon: "image", tone: "purple" as const, hint: "24 in queue" },
    { key: "songs", label: "Songs", value: "56", icon: "music", tone: "green" as const, hint: "3 new" },
    { key: "videos", label: "Videos", value: "12", icon: "video", tone: "gold" as const, hint: "1 exporting" },
  ],
  recentTasks: {
    title: "Recent AI tasks",
    viewAllLabel: "View all",
    viewAllUrl: "#",
    items: [
      { id: "t1", title: "Music generation", description: "Suno · v3", icon: "music", badge: { label: "Done", tone: "green" as const }, time: "3 min ago" },
      { id: "t2", title: "Image upscale", description: "Stable Diffusion · x4", icon: "image", badge: { label: "Running", tone: "blue" as const }, time: "12 min ago" },
      { id: "t3", title: "Prompt rewrite", description: "GPT-4o", icon: "sparkles", badge: { label: "Done", tone: "green" as const }, time: "1 h ago" },
      { id: "t4", title: "Video trim", description: "CapCut · 0:42", icon: "video", badge: { label: "Failed", tone: "red" as const }, time: "2 h ago" },
    ],
  },
  quickActions: {
    title: "Quick start",
    items: [
      { key: "qa1", title: "New chat", description: "Start a conversation", icon: "message", tone: "blue" as const, url: "#" },
      { key: "qa2", title: "Generate image", description: "Text to image", icon: "image", tone: "purple" as const, url: "#" },
      { key: "qa3", title: "Clean background", description: "Remove background", icon: "eraser", tone: "green" as const, url: "#" },
      { key: "qa4", title: "Export PDF", description: "Convert to PDF", icon: "file", tone: "gold" as const, url: "#" },
    ],
  },
};

export const props = activityOverviewProps;
