"use client";
import React from "react";
import copy from "copy-to-clipboard";
import { PlusCircleIcon } from "@raycast/icons";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { isTouchDevice } from "@themes/lib/isTouchDevice";
import { makeRaycastImportUrl } from "@themes/lib/url";
import { resolveComponent } from "@template/ui";

const WorkbenchActionMenu = resolveComponent("WorkbenchActionMenu");

export function AddToRaycast() {
  const [isTouch, setIsTouch] = React.useState<boolean | null>(null);
  const [showActions, setShowActions] = React.useState(false);
  const { activeTheme } = useRaycastTheme();

  const handleCopyTheme = React.useCallback(() => {
    if (!activeTheme) return;
    const { slug, ...theme } = activeTheme;
    copy(JSON.stringify(theme, null, 2));
  }, [activeTheme]);

  const handleCopyUrl = React.useCallback(async () => {
    if (!activeTheme) return;
    const { slug } = activeTheme;

    const url = `https://themes.ray.so/${slug}`;
    // Copying the base URL before copying the shortened URL
    // Because we don't have a loading state while the URL is being shortened
    // So... yeah, it's a bit of a hack
    copy(url);
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=themes`).then((res) =>
      res.json(),
    );

    if (response.error) {
      console.error(response.error);
      return;
    }

    copy(response.link);
  }, [activeTheme]);

  const handleDownload = React.useCallback(() => {
    if (!activeTheme) return;
    const { slug, ...theme } = activeTheme;
    const encodedThemeData = encodeURIComponent(JSON.stringify(theme, null, 2));
    const jsonString = `data:text/json;chatset=utf-8,${encodedThemeData}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${theme.name}.json`;
    link.click();
  }, [activeTheme]);

  const handleAddToRaycast = React.useCallback(async () => {
    if (!activeTheme) return;

    console.log("Opening theme in Raycast from button");
    const importUrl = await makeRaycastImportUrl(activeTheme);
    window.open(importUrl);
  }, [activeTheme]);

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
  }, [isTouch, setIsTouch]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        setShowActions((prev) => !prev);
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (event.keyCode === 67 && event.metaKey && event.altKey) {
        event.preventDefault();
        handleCopyTheme();
      }

      if (event.key === "c" && event.metaKey && event.shiftKey) {
        event.preventDefault();
        handleCopyUrl();
      }

      if (event.key === "d" && event.metaKey) {
        event.preventDefault();
        handleDownload();
      }

      if (event.key === "Enter" && event.metaKey) {
        event.preventDefault();
        handleAddToRaycast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopyTheme, handleCopyUrl, handleDownload, handleAddToRaycast]);

  return !isTouch ? (
    <WorkbenchActionMenu
      label="Add to Raycast"
      icon={<PlusCircleIcon />}
      onPrimaryClick={() => handleAddToRaycast()}
      open={showActions}
      onOpenChange={setShowActions}
      items={[
        {
          key: "download",
          label: "Download JSON",
          shortcut: ["⌘", "D"],
          onSelect: () => handleDownload(),
        },
        {
          key: "copy",
          label: "Copy JSON",
          shortcut: ["⌘", "⌥", "C"],
          onSelect: () => handleCopyTheme(),
        },
        {
          key: "url",
          label: "Copy URL to share",
          shortcut: ["⌘", "⇧", "C"],
          onSelect: () => handleCopyUrl(),
        },
      ]}
    />
  ) : null;
}
