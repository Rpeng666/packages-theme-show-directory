"use client";

import { useThemeComponent } from "@template/ui";
import type { WorkbenchShortcut } from "@template/ui/themes/raycast";
import { SocialFooter } from "@/components/social-footer";

const shortcuts: WorkbenchShortcut[] = [
  { label: "Add to Raycast", keys: ["⌘", "⏎"] },
  { label: "Toggle Export Menu", keys: ["⌘", "K"] },
  { label: "Download JSON", keys: ["⌘", "D"] },
  { label: "Copy JSON", keys: ["⌘", "⌥", "C"] },
  { label: "Copy URL", keys: ["⌘", "⇧", "C"] },
  { label: "Select Next", keys: ["→"] },
  { label: "Select Previous", keys: ["←"] },
  { label: "Open shortcuts", keys: ["?"] },
];

export function InfoDialog() {
  const WorkbenchInfoDialog = useThemeComponent("WorkbenchInfoDialog");
  return (
    <WorkbenchInfoDialog
      description={
        <>
          <p>
            Theme Explorer is a tool to easily browse, share, and add themes to{" "}
            <a href="https://raycast.com">Raycast</a>.
          </p>
          <p>Click the “Add to Raycast” button to import any theme directly.</p>
          <h2 className="text-base font-medium text-gray-12">Contribute</h2>
          <p>
            The project is Open Source and{" "}
            <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
              available on GitHub
            </a>
            .
          </p>
          <p>
            To add your own theme, export it as JSON from Theme Studio and upload it to the{" "}
            <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
              GitHub repository
            </a>
          </p>
          <p>
            If you have any questions or feedback, please write to us on{" "}
            <a href="https://x.com/raycast" className="text-gray-12 underline underline-offset-2">
              𝕏
            </a>{" "}
            or{" "}
            <a
              href="mailto:feedback+rayso@raycast.com?subject=Themes"
              className="text-gray-12 underline underline-offset-2"
            >
              send us an email
            </a>
            .
          </p>
        </>
      }
      shortcuts={shortcuts}
      footerSlot={<SocialFooter referral="themes" />}
    />
  );
}
