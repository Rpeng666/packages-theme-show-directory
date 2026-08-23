import { WorkbenchPage, WorkbenchSidebar, ThemeRegistryProvider } from "@template/ui";
import { ThemeDirectory } from "./directory";
import { ThemeHeader } from "./header";
import { resolveTheme } from "./catalog";

export default async function ThemeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ theme: string }>;
}) {
  const { theme } = await params;
  const activeTheme = resolveTheme(theme);

  return (
    <ThemeRegistryProvider theme={activeTheme as "default" | "pixel" | "semi" | "raycast"}>
      <div data-theme={activeTheme} className="h-full">
        <WorkbenchPage header={<ThemeHeader theme={activeTheme} />}>
          <div className="flex flex-1 h-full">
            <WorkbenchSidebar top={<ThemeDirectory theme={activeTheme} />} />
            <main className="flex-1 min-w-0 overflow-y-auto pl-[340px] pr-8 pt-6">
              {children}
            </main>
          </div>
        </WorkbenchPage>
      </div>
    </ThemeRegistryProvider>
  );
}