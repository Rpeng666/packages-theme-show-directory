import type { Section } from "@template/ui";

export const props = {
    label: "Language",
    placeholder: "Pick a language",
    options: [
      { value: "ts", label: "TypeScript" },
      { value: "js", label: "JavaScript" },
      { value: "py", label: "Python" },
    ],
    className: "w-full max-w-xs",
  };
