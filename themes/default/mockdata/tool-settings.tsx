import type { Section } from "@template/ui";

export const props = {
    granularityInput: "4",
    onGranularityInputChange: () => {},
    similarityThresholdInput: "0.6",
    onSimilarityThresholdInputChange: () => {},
    onConfirmParameters: () => {},
    onAutoRemoveBackground: () => {},
    onUndoBgRemoval: () => {},
    canAutoRemoveBackground: true,
    canUndoBgRemoval: false,
    pixelationMode: "dominant",
    onPixelationModeChange: () => {},
    colorSystemOptions: [
      { key: "rgb", name: "RGB" },
      { key: "cmyk", name: "CMYK" },
    ],
    selectedColorSystem: "rgb",
    onColorSystemSelect: () => {},
    onOpenCustomPalette: () => {},
    customPaletteCount: 0,
    isCustomPalette: false,
    t: (key: string, values?: Record<string, string | number>) => {
      const EN: Record<string, string> = {
        granularity: "X-axis cuts (10-300)",
        threshold: "Color merge threshold (0-100)",
        apply: "Apply",
        removeBg: "Remove background",
        undo: "Undo",
        mode: "Processing mode",
        modeCartoon: "Cartoon (dominant)",
        modeReal: "Real (average)",
        colorSystem: "Color system",
        managePalette: "Manage palette ({count} colors)",
        customPaletteActive: "Custom palette active",
      };
      let text = EN[key] ?? key;
      if (values) {
        for (const [k, v] of Object.entries(values)) {
          text = text.replace(new RegExp(`\\{${k}\\}`), String(v));
        }
      }
      return text;
    },
  };
