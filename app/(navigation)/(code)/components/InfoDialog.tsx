import { useThemeComponent } from "@template/ui";
import type { WorkbenchShortcut } from "@template/ui/themes/raycast";
import { SocialFooter } from "@/components/social-footer";
import usePngClipboardSupported from "../util/usePngClipboardSupported";

export function InfoDialog() {
  const WorkbenchInfoDialog = useThemeComponent("WorkbenchInfoDialog");
  const pngClipboardSupported = usePngClipboardSupported();

  const shortcuts: WorkbenchShortcut[] = [
    { label: "Focus text editor", keys: ["F"] },
    { label: "Unfocus text editor", keys: ["Esc"] },
    { label: "Change colors", keys: ["C"] },
    { label: "Toggle background", keys: ["B"] },
    { label: "Toggle dark mode", keys: ["D"] },
    { label: "Toggle line numbers", keys: ["N"] },
    { label: "Change padding", keys: ["P"] },
    { label: "Select language", keys: ["L"] },
    { label: "Highlight line", keys: ["⌥", "click"] },
    { label: "Format code", keys: ["⌥", "shift", "F"] },
    { label: "Toggle Export Menu", keys: ["⌘", "K"] },
    { label: "Save PNG", keys: ["⌘", "S"] },
    { label: "Save SVG", keys: ["⌘", "⇧", "S"] },
    ...(pngClipboardSupported ? [{ label: "Copy image", keys: ["⌘", "C"] }] : []),
    { label: "Copy URL", keys: ["⌘", "⇧", "C"] },
    { label: "Open shortcuts", keys: ["?"] },
  ];

  return (
    <WorkbenchInfoDialog
      description={
        <>
          <p>Code Images by Raycast is a tool to create beautiful screenshots of your code.</p>
          <p>
            Pick a theme from a range of syntax colors and backgrounds, the language of your code and choose between
            light or dark mode.
          </p>
          <p>
            Customize the padding and when you’re ready, click export image in the top-right corner to save the image
            as a png, svg or share a link to your code.
          </p>
          <p>You can also change the image resolution in the export menu.</p>
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
            <a href="mailto:feedback+rayso@raycast.com" className="text-gray-12 underline underline-offset-2">
              send us an email
            </a>
            .
          </p>
        </>
      }
      shortcuts={shortcuts}
      footerSlot={<SocialFooter referral="code-image" />}
    />
  );
}
