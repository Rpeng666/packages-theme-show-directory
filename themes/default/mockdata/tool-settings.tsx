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
    t: (key: string) => key,
  };
