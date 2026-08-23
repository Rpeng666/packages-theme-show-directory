import { useThemeComponent } from "@template/ui";
import type { WorkbenchShortcut } from "@template/ui/themes/raycast";
import { SocialFooter } from "@/components/social-footer";

const shortcuts: WorkbenchShortcut[] = [
  { label: "Undo action", keys: ["⌘", "Z"] },
  { label: "Redo action", keys: ["⌘", "⇧", "Z"] },
  { label: "Search icons", keys: ["⌘", "F"] },
  { label: "Toggle interface", keys: ["⌘", "."] },
  { label: "Toggle export menu", keys: ["⌘", "K"] },
  { label: "Export", keys: ["⌘", "⇧", "E"] },
  { label: "Copy image", keys: ["⌘", "C"] },
  { label: "Copy URL", keys: ["⌘", "shift", "C"] },
  { label: "Open shortcuts", keys: ["?"] },
];

export function InfoDialog() {
  const WorkbenchInfoDialog = useThemeComponent("WorkbenchInfoDialog");
  return (
    <WorkbenchInfoDialog
      description={
        <>
          <p>Icon Maker by Raycast is a tool to easily create and export icons for your extensions.</p>
          <p>
            Use the Raycast icon library to search for an icon, change the color of the icon, and customize the
            background to create a beautifully simple icon.
          </p>
          <p>
            Edit the file name, and when you’re ready, click export in the top-right corner to export the icon in the
            correct size and format to submit to the Raycast Store.
          </p>
          <p>
            <a href="https://developers.raycast.com/" className="text-gray-12 underline underline-offset-2">
              View Documentation
            </a>
          </p>
          <h2 className="text-base font-medium text-gray-12">Contribute</h2>
          <p>
            The project is Open Source and{" "}
            <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
              available on GitHub
            </a>
            .
          </p>
          <p>
            If you have any questions or feedback, please write to us on{" "}
            <a href="https://x.com/raycast" className="text-gray-12 underline underline-offset-2">
              𝕏
            </a>{" "}
            or{" "}
            <a
              href="mailto:feedback+rayso@raycast.com?subject=Icon"
              className="text-gray-12 underline underline-offset-2"
            >
              send us an email
            </a>
            .
          </p>
        </>
      }
      shortcuts={shortcuts}
      footerSlot={<SocialFooter referral="icon" />}
    />
  );
}
