import type { Section } from "@template/ui";

export const props = {
    mode: "empty",
    eyebrow: "AI Chat",
    title: "What can I help you with?",
    subtitle: "Ask anything — code, writing, research.",
    suggestions: [
      { key: "summarize", title: "Summarize this article", description: "3 bullets", icon: "sparkles", tone: "blue" },
      { key: "refactor", title: "Refactor this code", description: "TS/React", icon: "code", tone: "purple" },
      { key: "translate", title: "Translate to French", description: "Natural", icon: "globe", tone: "green" },
    ],
    onSuggestionClick: () => {},
    chatTitle: "Summarize a research paper",
    chatStatus: "Thinking…",
    modelLabel: "gpt-4o",
    footerHint: "AI can make mistakes. Verify important info.",
  };
