import { redirect } from "next/navigation";
import { THEME_NAMES } from "@template/ui/registry";

export default function RootPage() {
  redirect(`/${THEME_NAMES[0]}`);
}