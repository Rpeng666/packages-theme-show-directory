import { resolveComponent } from "@template/ui";
import lightWallpaper from "@themes/assets/bg-light.jpeg";
import darkWallpaper from "@themes/assets/bg-dark.jpeg";
import { Dock } from "@themes/components/dock";

const WorkbenchDesktop = resolveComponent("WorkbenchDesktop");

export function Desktop({ children }: { children?: React.ReactNode }) {
  return (
    <WorkbenchDesktop
      data-desktop
      darkWallpaper={darkWallpaper as unknown as string}
      lightWallpaper={lightWallpaper as unknown as string}
      dock={<Dock />}
    >
      {children}
    </WorkbenchDesktop>
  );
}