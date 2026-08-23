import { resolveComponent } from "@template/ui";
import { AddToRaycast } from "@themes/components/add-to-raycast";
import { ThemeFilter } from "@themes/components/theme-filter";
import { ThemeNavigation } from "@themes/components/theme-navigation";
import { Theme } from "@themes/lib/theme";

const WorkbenchThemeControls = resolveComponent("WorkbenchThemeControls");

export function ThemeControls({ themes }: { themes: Theme[] }) {
  return (
    <WorkbenchThemeControls
      data-theme-controls
      left={<ThemeFilter themes={themes} />}
      center={<AddToRaycast />}
      right={<ThemeNavigation themes={themes} />}
    />
  );
}
