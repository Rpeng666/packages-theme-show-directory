import { ThemeShowcase } from "./showcase";

export interface ThemePageProps {
  params: Promise<{ theme: string }>;
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { theme } = await params;
  return <ThemeShowcase theme={theme} />;
}