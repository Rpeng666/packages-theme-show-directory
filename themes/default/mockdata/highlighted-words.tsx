import type { Section } from "@template/ui";

export const props = {
    text: "Moreover, the team was able to complete the task efficiently and effectively.",
    issues: [
      { type: "hedging", text: "Moreover", severity: "low", suggestion: "Remove" },
      { type: "passive", text: "was able to", severity: "medium", suggestion: "Use active voice" },
    ],
    typeLabels: { hedging: "Hedging", passive: "Passive voice" },
    t: (key: string) => key,
  };
