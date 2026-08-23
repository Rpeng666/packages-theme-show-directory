import { WorkbenchSidebar } from "@template/ui/themes/raycast/components/sidebar";
import { THEME_NAMES } from "@template/ui/registry";
import Link from "next/link";
import { cn } from "@/utils/cn";
import type { ThemeName } from "@template/ui";

export default async function ThemeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ theme: string }>;
}) {
  const { theme } = await params;
  const activeTheme = (THEME_NAMES as readonly string[]).includes(theme)
    ? (theme as ThemeName)
    : "default";

  return (
    <div className="flex min-h-screen bg-background text-gray-12">
      <WorkbenchSidebar
        top={
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 text-[13px] font-medium text-gray-9">Themes</div>
            {THEME_NAMES.map((name) => (
              <Link
                key={name}
                href={`/${name}`}
                className={cn(
                  "flex items-center h-8 rounded-md px-3 text-[13px]",
                  name === activeTheme
                    ? "bg-background text-gray-12"
                    : "text-gray-9 hover:bg-panel"
                )}
              >
                {name}
              </Link>
            ))}
          </div>
        }
      />
      {children}
    </div>
  );
}