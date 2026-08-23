import { useThemeComponent } from "@template/ui";
import type { WorkbenchShortcut } from "@template/ui/themes/raycast";
import { SocialFooter } from "@/components/social-footer";

const shortcuts: WorkbenchShortcut[] = [
  { label: "Add to Raycast", keys: ["⌘", "⏎"] },
  { label: "Download JSON", keys: ["⌘", "D"] },
  { label: "Copy JSON", keys: ["⌘", "⌥", "C"] },
  { label: "Toggle export menu", keys: ["⌘", "K"] },
  { label: "Copy URL", keys: ["⌘", "⇧", "C"] },
  { label: "Open shortcuts", keys: ["?"] },
];

export function InfoDialog() {
  const WorkbenchInfoDialog = useThemeComponent("WorkbenchInfoDialog");
  return (
    <WorkbenchInfoDialog
      description={
        <>
          <p>
            Quicklink Explorer is a tool to easily browse, share, and add quicklinks to{" "}
            <a href="https://raycast.com">Raycast</a>.
          </p>
          <p>
            Select the quicklinks by clicking on them. To select multiple, hold ⌘ or select them with your mouse.
          </p>
          <p>
            You can quickly edit a quicklink before importing by clicking on the link preview or pencil icon. Great for
            editing dynamic parameters, numbers or addresses. Note that changes are temporarily saved for the current
            session only.
          </p>
          <p>
            Then, click the “Add to Raycast” button to import them. You can also download the quicklinks as a JSON file,
            or copy the URL to share with others.
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
              href="mailto:feedback+rayso@raycast.com?subject=Prompts"
              className="text-gray-12 underline underline-offset-2"
            >
              send us an email
            </a>
            .
          </p>
        </>
      }
      shortcuts={shortcuts}
      footerSlot={<SocialFooter referral="prompts" />}
    />
  );
}
