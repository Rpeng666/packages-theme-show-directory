import type { Section } from "@template/ui";

export const props = {
    result: {
      aiScore: 72,
      readability: 64,
      wordCount: 486,
      classification: "Likely AI-generated",
      confidence: "High",
      probabilities: { human: 0.18, mixed: 0.24, ai: 0.58 },
      issues: [
        { type: "repetition", text: "Moreover, it is important to note that…", severity: "high", suggestion: "Remove redundant phrases." },
        { type: "passive", text: "was done by the team", severity: "medium", suggestion: "Use active voice." },
        { type: "hedging", text: "it could be argued that", severity: "low", suggestion: "State it directly." },
      ],
      normalizedText: "Normalized text sample…",
      summary: "This text shows strong signs of AI generation with repetitive phrasing.",
      bayesian: {
        verdict: "AI",
        charAiRate: 0.71,
        perModelBreakdown: [
          { name: "GPT-4", percent: 0.55 },
          { name: "Claude", percent: 0.25 },
        ],
        sentences: [
          { text: "In today's fast-paced world…", isAi: true, models: ["GPT-4"] },
          { text: "The report was reviewed.", isAi: false, models: [] },
        ],
        isReliable: true,
      },
    },
    t: (key: string) => key,
    typeLabels: { repetition: "Repetition", passive: "Passive voice", hedging: "Hedging" },
    severityLabels: { critical: "Critical", high: "High", medium: "Medium", low: "Low" },
    onFixWithAi: () => {},
    isRewriting: false,
    onExportMarkdown: () => {},
    onExportPdf: () => {},
    onShareLink: () => {},
    shareCopied: false,
    contextMode: "auto",
    detectedContextMode: "general",
    onContextModeChange: () => {},
  };
