"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import { SelectionArea, SelectionEvent } from "@viselect/react";
import { Category, Prompt, categories } from "../prompts";
import { extractPrompts } from "../utils/extractPrompts";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import copy from "copy-to-clipboard";
import { isTouchDevice } from "../utils/isTouchDevice";
import styles from "./prompts.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  AtSymbolIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarsIcon,
  StarsSquareIcon,
  TrashIcon,
} from "@raycast/icons";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "@/components/scroll-area";
import { Instructions } from "../components/Instructions";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import CreativityIcon from "../components/CreativityIcon";
import { NavigationActions } from "@/components/navigation";
import { resolveComponent } from "@template/ui";
import { InfoDialog } from "../components/InfoDialog";
import { AiModel } from "@/api/ai";
import { Tooltip, TooltipContent } from "@/components/tooltip";
import { TooltipTrigger } from "@/components/tooltip";
import { Extension } from "@/api/store";
import { AIExtension } from "@/components/ai-extension";
import { renderSafePromptContent } from "@/utils/sanitizePromptContent";

type Props = {
  models: AiModel[];
  extensions: Extension[];
};

// 经注册表解析主题工作台 UI 原语（模块级，避免直连具体主题实现）。
const WorkbenchSidebar = resolveComponent("WorkbenchSidebar");
const WorkbenchSidebarNav = resolveComponent("WorkbenchSidebarNav");
const WorkbenchPromptCard = resolveComponent("WorkbenchPromptCard");
const WorkbenchSelectionSummary = resolveComponent("WorkbenchSelectionSummary");
const WorkbenchFloatingActionBar = resolveComponent("WorkbenchFloatingActionBar");
const WorkbenchActionMenu = resolveComponent("WorkbenchActionMenu");

export function Prompts({ models, extensions }: Props) {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const router = useRouter();

  const [selectedPrompts, setSelectedPrompts] = React.useState<Prompt[]>([]);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedPrompts([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedPrompts = extractPrompts(added, categories);
    const removedPrompts = extractPrompts(removed, categories);

    setSelectedPrompts((prevPrompts) => {
      let prompts = [...prevPrompts];

      addedPrompts.forEach((prompt) => {
        if (!prompt) {
          return;
        }
        if (prompts.find((p) => p.id === prompt.id)) {
          return;
        }
        prompts.push(prompt);
      });

      removedPrompts.forEach((prompt) => {
        prompts = prompts.filter((s) => s?.id !== prompt?.id);
      });

      return prompts;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedPrompts);
  }, [selectedPrompts]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedPrompts);
    setToastMessage("Copied to clipboard");
    setShowToast(true);
  }, [selectedPrompts]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage("Copying URL to clipboard...");
    setShowToast(true);

    const url = makeUrl(selectedPrompts);
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=prompts`).then((res) =>
      res.json(),
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage("Copied URL to clipboard!");
  }, [selectedPrompts]);

  const handleCopyText = React.useCallback((prompt: Prompt) => {
    copy(prompt.prompt);
    setShowToast(true);
    setToastMessage("Copied to clipboard");
  }, []);

  const handleAddToRaycast = React.useCallback(() => {
    return addToRaycast(router, selectedPrompts, isTouch);
  }, [router, selectedPrompts, isTouch]);

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
    setEnableViewObserver(true);
  }, [isTouch, setIsTouch, setEnableViewObserver]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (selectedPrompts.length === 0) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "c" && metaKey && shiftKey) {
        event.preventDefault();
        handleCopyUrl();
        setActionsOpen(false);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setActionsOpen, selectedPrompts, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return (
    <div>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden">
          <InfoDialog />
          <ButtonGroup>
            <WorkbenchActionMenu
              label="Add to Raycast"
              icon={<PlusCircleIcon />}
              onPrimaryClick={() => handleAddToRaycast()}
              primaryDisabled={selectedPrompts.length === 0}
              primaryAriaLabel="Export options"
              open={actionsOpen}
              onOpenChange={setActionsOpen}
              items={[
                {
                  key: "download",
                  label: "Download JSON",
                  icon: <DownloadIcon />,
                  shortcut: ["⌘", "D"],
                  disabled: selectedPrompts.length === 0,
                  onSelect: () => handleDownload(),
                },
                {
                  key: "copy",
                  label: "Copy JSON",
                  icon: <CopyClipboardIcon />,
                  shortcut: ["⌘", "⌥", "C"],
                  disabled: selectedPrompts.length === 0,
                  onSelect: () => handleCopyData(),
                },
                {
                  key: "url",
                  label: "Copy URL to Share",
                  icon: <LinkIcon />,
                  shortcut: ["⌘", "⇧", "C"],
                  disabled: selectedPrompts.length === 0,
                  onSelect: () => handleCopyUrl(),
                },
              ]}
            />
          </ButtonGroup>
        </div>
      </NavigationActions>

      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle className={styles.toastTitle}>
          <CopyClipboardIcon /> {toastMessage}
        </ToastTitle>
      </Toast>

      <div className={styles.main}>
        <WorkbenchSidebar
          top={
            <>
                <div className={styles.sidebarNav}>
                  <p className={styles.sidebarTitle}>Categories</p>

                  {categories.map((category) => (
                    <NavItem key={category.slug} category={category} />
                  ))}
                </div>
            </>
          }
          bottom={
            <>
                {selectedPrompts.length === 0 && <Instructions />}

                {selectedPrompts.length > 0 && (
                  <WorkbenchSelectionSummary
                    count={selectedPrompts.length}
                    noun="Prompt"
                    items={selectedPrompts.map((prompt) => ({
                      key: prompt.id,
                      label: prompt.title,
                      onRemove: () => setSelectedPrompts(
                        selectedPrompts.filter((selectedPrompt) => selectedPrompt.id !== prompt.id),
                      ),
                    }))}
                    removeIcon={<TrashIcon />}
                    actions={
                      <>
                        <Button onClick={() => handleAddToRaycast()} variant="primary">
                          Add to Raycast
                        </Button>
                        <Button onClick={() => setSelectedPrompts([])}>Clear selected</Button>
                      </>
                    }
                  />
                )}
            </>
          }
        />

        <div className={styles.container}>
          {isTouch !== null && (
            <SelectionArea
              className="pt-8"
              onStart={onStart}
              onMove={onMove}
              selectables=".selectable"
              features={{
                // Disable support for touch devices
                touch: isTouch ? false : true,
                range: true,
                singleTap: {
                  allow: true,
                  intersect: "native",
                },
              }}
            >
              {categories.map((category) => {
                return (
                  <div
                    key={category.name}
                    data-section-slug={`/prompts${category.slug}`}
                    style={{
                      outline: "none",
                    }}
                    tabIndex={-1}
                  >
                    <h2 className={styles.subtitle}>
                      <category.iconComponent /> {category.name}
                    </h2>
                    <div className={styles.prompts}>
                      {category.prompts.map((prompt, index) => {
                        const isSelected = selectedPrompts.some((selectedPrompt) => selectedPrompt.id === prompt.id);
                        const model = models?.find((m) => m.id === prompt.model);
                        const hasAIExtensions = prompt.prompt.includes("{id=") && prompt.prompt.includes("@");
                        return (
                          <ContextMenu.Root key={prompt.id}>
                            <ContextMenu.Trigger>
                              <WorkbenchPromptCard
                                selected={isSelected}
                                className="selectable group"
                                data-key={`${category.slug}-${index}`}
                                body={
                                  <>
                                  <div className={styles.promptTemplate}>
                                    <ScrollArea>
                                      <pre className={styles.template}>
                                        {prompt.prompt.split(/(@[a-zA-Z0-9-]+\{id=[^}]+\})/).map((part, index) => {
                                          const match = part.match(/@([a-zA-Z0-9-]+)\{id=([^}]+)\}/);
                                          if (match) {
                                            const extension = extensions.find((e) => e.id === match[2]);
                                            return (
                                              <AIExtension
                                                variant="secondary"
                                                key={index}
                                                extension={extension}
                                                fallback={match[1]}
                                              />
                                            );
                                          }
                                          return (
                                            <span key={index}>{renderSafePromptContent(part, styles.placeholder)}</span>
                                          );
                                        })}
                                      </pre>
                                    </ScrollArea>
                                  </div>
                                  </>
                                }
                                info={
                                  <>
                                  <div className={styles.prompt}>
                                    <span className={styles.name}>
                                      <prompt.iconComponent />
                                      {prompt.title}
                                      {prompt.author ? (
                                        <span className={styles.promptAuthor}>
                                          by{" "}
                                          {prompt.author.link ? (
                                            <a href={prompt.author.link} target="_blank" rel="noopener noreferrer">
                                              {prompt.author.name}
                                            </a>
                                          ) : (
                                            prompt.author.name
                                          )}
                                        </span>
                                      ) : null}
                                    </span>
                                    {prompt.model ? (
                                      <span
                                        className={styles.promptModel}
                                        title={`${model?.provider_name} ${model?.name}`}
                                      >
                                        {model?.name}
                                      </span>
                                    ) : null}
                                    {prompt.creativity ? <CreativityIcon creativity={prompt.creativity} /> : null}
  
                                    {hasAIExtensions ? (
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <StarsSquareIcon />
                                        </TooltipTrigger>
                                        <TooltipContent>Includes AI Extensions</TooltipContent>
                                      </Tooltip>
                                    ) : null}
                                  </div>
                                  </>
                                }
                              />
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                              <ContextMenu.Content className={styles.contextMenuContent}>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => {
                                    if (isSelected) {
                                      return setSelectedPrompts((prevPrompts) =>
                                        prevPrompts.filter((prevPrompt) => prevPrompt.id !== prompt.id),
                                      );
                                    }
                                    setSelectedPrompts((prevPrompts) => [...prevPrompts, prompt]);
                                  }}
                                >
                                  {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
                                  {isSelected ? "Deselect Prompt" : "Select Prompt"}
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => handleCopyText(prompt)}
                                >
                                  <CopyClipboardIcon /> Copy Prompt Text{" "}
                                </ContextMenu.Item>
                              </ContextMenu.Content>
                            </ContextMenu.Portal>
                          </ContextMenu.Root>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </SelectionArea>
          )}
        </div>
      </div>

      {/* Floating Action Bar for Mobile */}
      {isTouch && selectedPrompts.length > 0 && (
        <WorkbenchFloatingActionBar
          actions={[
            {
              key: "add",
              label: "Add to Raycast",
              icon: <PlusCircleIcon />,
              primary: true,
              onClick: () => handleAddToRaycast(),
            },
            {
              key: "copy",
              label: "Copy JSON",
              icon: <CopyClipboardIcon />,
              onClick: handleCopyData,
            },
            {
              key: "share",
              label: "Share URL",
              icon: <LinkIcon />,
              onClick: handleCopyUrl,
            },
          ]}
        />
      )}
    </div>
  );
}

function NavItem({ category }: { category: Category }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/prompts${category.slug}`);
      }}
      className={styles.sidebarNavItem}
      data-active={activeSection === `/prompts${category.slug}`}
    >
      {category.icon ? <category.iconComponent /> : <StarsIcon />}

      {category.name}
      <span className={styles.badge}>{category.prompts.length}</span>
    </a>
  );
}
