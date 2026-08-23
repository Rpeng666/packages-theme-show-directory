import { WorkbenchPage, WorkbenchSidebar } from "@template/ui";
import { ThemeDirectory } from "./directory";
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
    <WorkbenchPage
      header={
        <div className="flex items-center justify-between h-[50px] px-6 bg-[#000] text-gray-12">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ background: "var(--color-brand)" }} />
            <span className="text-[13px] font-semibold">Theme Directory</span>
          </div>
          <span className="text-[13px] text-gray-9">{activeTheme} theme</span>
        </div>
      }
    >
      <div className="flex flex-1 h-full">
        <WorkbenchSidebar top={<ThemeDirectory theme={activeTheme} />} />
        <main className="flex-1 min-w-0 overflow-y-auto pl-[340px] pr-8 pt-6">
          {children}
        </main>
      </div>
    </WorkbenchPage>
  );
}