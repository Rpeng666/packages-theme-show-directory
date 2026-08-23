import type { Section } from "@template/ui";

export const props = {
    t: (key: string) => key,
    outputView: "changes",
    outputCount: 3,
    output: "The team completed the task efficiently.",
    activeDiffParts: [
      { value: "The team " },
      { value: "was able to", removed: true },
      { value: "completed" },
    ],
    activeHasChanges: true,
    analyzeResult: {
      aiScore: 72,
      readability: 64,
      wordCount: 486,
      classification: "Likely AI-generated",
      confidence: "High",
      probabilities: { human: 0.18, mixed: 0.24, ai: 0.58 },
      issues: [
        { type: "repetition", text: "Moreover, it is important to note that…", severity: "high", suggestion: "Remove redundant phrases." },
      ],
      normalizedText: "Normalized text sample…",
      summary: "This text shows strong signs of AI generation.",
    },
    isRewriting: false,
    showAiHint: true,
    typeLabels: { repetition: "Repetition" },
    severityLabels: { high: "High", medium: "Medium", low: "Low" },
    onAnalyze: () => {},
    onFixWithAi: () => {},
    onExportMarkdown: () => {},
    onExportPdf: () => {},
    onShareLink: () => {},
    shareCopied: false,
    contextMode: "auto",
    detectedContextMode: "general",
  };
